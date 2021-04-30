<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('guest')->get('/', function () {
    return view('login');
})->name('login');

Route::get('dashboard', function () {
    return view('index');
})->name('dashboard');

Route::resources([
    'appointments' => 'AppointmentController',
    'schedules' => 'ScheduleController',
    'diseases' => 'DiseaseController',
    'examinations' => 'ExaminationController',
    'examination-details' => 'ExaminationDetailController',
    'news' => 'NewsController',
    'permissions' => 'PermissionController',
    'roles' => 'RoleController',
    'users' => 'UserController',
    'models' => 'ModelController'
]);

Route::post('schedules/change-status', 'AppointmentController@changeStatus')->name('schedules.change-status');

Route::post('login/authenticate', 'LoginController@authenticate')->name('login.authenticate');
Route::get('logout', 'LoginController@logout')->name('logout');

