from flask import Flask, request, flash, jsonify
import os
import sys
import keras

from keras.preprocessing.image import ImageDataGenerator 
from keras.models import Model, Sequential, load_model
import tensorflow as tf 
import numpy as np
from tensorflow.keras.preprocessing import image 
from keras import backend as K
from datetime import datetime
from skimage.io import imread, imshow
from skimage.transform import resize
import cv2
import pickle
import sklearn
from google.cloud import storage
import requests
app = Flask(__name__)
client = storage.Client.from_service_account_json(json_credentials_path='./google_service.json')
bucket_origin = client.get_bucket('origin-image-hunet-1')
bucket_result = client.get_bucket('result-image-hunet-1')

def mean_iou(y_true, y_pred):
    prec = []
    for t in np.arange(0.5, 1.0, 0.05):
        y_pred_ = tf.to_int32(y_pred > t)
        score, up_opt = tf.metrics.mean_iou(y_true, y_pred_, 2)
        K.get_session().run(tf.local_variables_initializer())
        with tf.control_dependencies([up_opt]):
            score = tf.identity(score)
        prec.append(score)
    return K.mean(K.stack(prec), axis=0)
segment_model = load_model('./segment/segment.h5', custom_objects={'mean_iou': mean_iou})
hunet_model = keras.models.load_model('./collections/1/')
res_model = keras.models.load_model('./collections/2/')
random_model = pickle.load(open('./collections/3/rf_model.sav', 'rb'))

labels = ['carcinoma', 'melanoma', 'normal', 'pigmented']
IMG_WIDTH = 256
IMG_HEIGHT = 256
IMG_CHANNELS = 3
@app.route("/")
def hello():
    return 'hello'
@app.route("/predict", methods=['POST'])
def predict():
    r = requests.get('https://hunet-laravel-auto-deployment-uxefqj2t7q-uc.a.run.app/api/model_setting')
    response_data = r.json()
    now = datetime.now()
    time = now.strftime("%m_%d_%y_%H_%M%S")
    if 'image' not in request.files:
        flash('No file was uploaded.')
        return 'No image'
    image_file = request.files['image']
    if image_file.filename == '':
        flash('No file was uploaded.')
        return 'No image'
    if image_file:
        filename = image_file.filename
        filepath = os.path.join('./images', time+'_'+filename)
        image_file.save(filepath)
        origin_blob = bucket_origin.blob(time + '_' + filename)
        origin_blob.upload_from_filename(os.path.join('./images', time+'_'+filename))
        origin_blob.make_public()
        if response_data['isPreprocess']:
            process_image = processImage(filepath, time+'_'+filename)
        else:
            process_image = filepath
        result_blob = bucket_result.blob(time + '_' + filename)
        result_blob.upload_from_filename(process_image)
        result_blob.make_public()
        if response_data['selectedModel'] == '1' or response_data['selectedModel'] == '2':
            if response_data['selectedModel'] == '1':
                from keras.applications.densenet import preprocess_input, decode_predictions
            elif response_data['selectedModel'] == '2':
                from keras.applications.resnet import preprocess_input, decode_predictions
            #cnn predict
            img = image.load_img(process_image, target_size=(256, 256))
            x = image.img_to_array(img)
            x = np.expand_dims(x, axis=0)
            x = preprocess_input(x)
            if response_data['selectedModel'] == '1':
                preds = hunet_model.predict(x)
            elif response_data['selectedModel'] == '2':
                preds = res_model.predict(x)
            percent = preds.tolist()[0]
            os.remove(os.path.join('./images', time+'_'+filename))
            os.remove(process_image)
            return jsonify(
                result=labels[np.argmax(preds)],
                origin='https://storage.googleapis.com/origin-image-hunet-1/' + time+'_'+filename ,
                segment='https://storage.googleapis.com/result-image-hunet-1/' + time+'_'+filename ,
                message='Success',
                predict=dict(zip(labels, percent))
            )
        else:
            #use random predict
            return random_predict(filepath, time, filename, process_image)
def processImage(ImagePath, name):
    abd = np.zeros((1, IMG_HEIGHT, IMG_WIDTH, IMG_CHANNELS), dtype=np.uint8)
    sys.stdout.flush()

    img = imread(ImagePath)[:,:,:IMG_CHANNELS]
    img = resize(img, (IMG_HEIGHT, IMG_WIDTH), mode='constant', preserve_range=True)

    img = np.array(img, dtype=np.uint8)
    #chỗ này để khử nhiễu
    # Convert the original image to grayscale
    grayScale = cv2.cvtColor( img, cv2.COLOR_RGB2GRAY )
    # Kernel for the morphological filtering
    kernel = cv2.getStructuringElement(1,(17,17))

    # Perform the blackHat filtering on the grayscale image to find the 
    # hair countours
    blackhat = cv2.morphologyEx(grayScale, cv2.MORPH_BLACKHAT, kernel)

    # intensify the hair countours in preparation for the inpainting 
    # algorithm
    ret,thresh2 = cv2.threshold(blackhat,10,255,cv2.THRESH_BINARY)
    # print( thresh2.shape )

    # inpaint the original image depending on the mask
    result = cv2.inpaint(img,thresh2,1,cv2.INPAINT_TELEA)

    abd[0] = result
    RemovedNoiseImages = result
    preds_test = segment_model.predict(abd[:int(abd.shape[0])], verbose=1)

    # Threshold predictions
    preds_test_t = (preds_test > 0.5).astype(np.uint8)


    out_img = abd[0]
    out_mask = np.squeeze(preds_test_t[0]*255)
    #chập cái bụp :)))
    out_seg = out_img.copy()
    out_seg[out_mask == 0 ] = 0
    SegmentedImage = out_seg
    filename = name + '.jpg'
    width = 256
    height = 256
    dim = (width, height)
    out_seg = cv2.resize(out_seg, dim, interpolation = cv2.INTER_AREA)
    path = "./processed_images/"
    cv2.imwrite(os.path.join(path , filename), cv2.cvtColor(out_seg, cv2.COLOR_BGR2RGB))
    return path + filename
def random_predict(path, time, filename, process_image):
    name_arr = ['carcinoma', 'pigmented', 'melanoma', 'normal']
    image_size = 256
    im = cv2.imread(path, cv2.IMREAD_COLOR)
    # resize image
    im = cv2.resize(im, (image_size,image_size))

    # convert to RGB
    im = cv2.cvtColor(im, cv2.COLOR_BGR2RGB)
    img = np.array(im)

    img = img.reshape(-1, image_size * image_size * 3)

    predictions = random_model.predict(img)
    proba = random_model.predict_proba(img).tolist()
    os.remove(os.path.join('./images', time+'_'+filename))
    os.remove(process_image)
    return jsonify(
            result=name_arr[predictions[0]],
            origin='https://storage.googleapis.com/origin-image-hunet-1/' + time+'_'+filename ,
            segment='https://storage.googleapis.com/result-image-hunet-1/' + time+'_'+filename ,
            message='Success',
            predict=dict(zip(name_arr, proba[0]))
        )
if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000)