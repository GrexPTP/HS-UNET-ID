# HS-UNET-ID: An Approach for Human Skin Classification Integrating between UNET and Improved Dense Convolutional Network
---

## Overview

### Data

The original dataset is from [ISIC](https://www.isic-archive.com), and I've downloaded it and completed the required pre-processing. There are 3801 photographs in total, which were chosen from female and male patients and grouped into four categories: carcinoma (1127), pigmented (1006), melanoma (1146), and normal skin (522). The size of each image varies from 6688×4439 pixels to 600×450 pixels.

### Data augmentation

We use Keras’s ImageDataGenerator to do data augmentation.

### Hair removal

We convert the colour of the original image from RGB to grayscale. We then construct a kernel for element structuring and apply BlackHat filtering to the grayscale image to locate hair contours. CV2's Thresholding process is used to enhance the hair contours. CV2's Inpaint method has been used. Convert the color model of the after-removal image back to RGB.

### Segmentation

We use U-Net for segmentation. With the target is decrease the unwanted skin area 

### Model

-thêm hình-

The network is extended from Densenet. But In the final process, we added four more layers to our model with details as follows.
*  A max-pooling layer for flattening the output layer to one-dimension
*  A fully-connected layer with hidden units and ReLU activation
*  A dropout layer to modify the dropout rate to 0.5
*  A final sigmoid layer for classification

### Training

-thêm hình-

The model is trained for 150 epochs.
The training accuracy has reached almost 100 percent, while the validation accuracy is getting near about 85 percent and starting to get stable as epoch 40 and above. The loss getting stable as the epoch number is getting near 40, and keeping the number down to below 1.

---

## Enviroment

### Dependencies

This code depends on the following libraries:

* Tensorflow >= 2.0
* Keras >= 2.4
* Python 3.6
