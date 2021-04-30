<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Helper;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('model_setting', function () {
    $file = file_get_contents(base_path('/model_settings.json'));
    $data = json_decode($file, true);
    return $data;
});
Route::post('test', function(Request $request) {
    $bucketName = 'news-description-images';
    $result = '';
    $helper = new Helper();
    if ($request->hasFile('image')) {
        $file = file_get_contents($request->image) ;
        $expectedPath = 'random'. $request->image->getClientOriginalName();
        $result = $helper->uploadFile($bucketName, $file, $expectedPath);
    }
    return $result;
});
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/test/post', 'RoleController@store');
