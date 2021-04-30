<?php

namespace App\Http\Controllers;

use App\Helper;

class ImageProcessingController extends Controller
{
    /**
     * Upload a file.
     *
     * @param $bucketName : the name of your Google Cloud bucket.
     * @param $imageName : the image name
     * @param $file : the file
     * @return false|string
     */
    public static function saveImageToServer($bucketName, $file, $imageName = null)
    {
        $fileContent = file_get_contents($file);
        if (!$imageName) {
            $imageName = time() . '.' . $file->getClientOriginalExtension();
        }
        $helper = new Helper();
        return $helper->uploadFile($bucketName, $fileContent, $imageName);
    }
}
