<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\AppointmentType;

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

//Route::get('/', function () {
    //return view('welcome');
   
   // return Inertia::render("Home");
//});

Route::get('/',["\App\Http\Controllers\AppointmentTypeController","view"])->name("home");
Route::get('/appointment_type/view',["\App\Http\Controllers\AppointmentTypeController","view"])->name("appointment_type.view");

Route::get('/appointment_type/create',["\App\Http\Controllers\AppointmentTypeController","create"]);
Route::post('/appointment_type/store',["\App\Http\Controllers\AppointmentTypeController","store"]);

Route::get('/appointment_type/edit/{appointmenttype}',["\App\Http\Controllers\AppointmentTypeController","edit"]);
Route::put('/appointment_type/save/{appointmenttype}',["\App\Http\Controllers\AppointmentTypeController","save"]);

Route::get('/service/view',["\App\Http\Controllers\ServiceController","view"])->name("service.view");
Route::get('/service/create',["\App\Http\Controllers\ServiceController","create"])->name("service.create");
Route::post('/service/store',["\App\Http\Controllers\ServiceController","store"])->name("service.store");
Route::get('/service/edit/{serv}',["\App\Http\Controllers\ServiceController","edit"])->name("service.edit");
Route::put('/service/save/{serv}',["\App\Http\Controllers\ServiceController","save"])->name("service.save");
Route::patch('/service/toggle/{serv}',["\App\Http\Controllers\ServiceController","toggle"])->name("service.toggle");
Route::get('/service/list',["\App\Http\Controllers\ServiceController","list"])->name("service.list");

Route::get('/appointment/reserve',["\App\Http\Controllers\AppointmentController","reserve"])->name("appointment.reserve");
Route::post('/appointment/create/{attendee?}',["\App\Http\Controllers\AppointmentController","create"])->name("appointment.create");
Route::get('/appointment/slots/{datestr?}',["\App\Http\Controllers\AppointmentController","slots"])->name("appointment.slots");
Route::get('/appointment/services/{appointment?}',["\App\Http\Controllers\AppointmentController","services"])->name("appointment.services");
Route::get('/appointment/serve/{appointment}/{service}/{status}',["\App\Http\Controllers\AppointmentController","serve"])->name("appointment.serve");

Route::get('/attendee/search/{searchkey}',["\App\Http\Controllers\AttendeeController","search"])->name("appointment.search");

Route::get('/appointment/todays',["\App\Http\Controllers\AppointmentController","todays"])->name("appointment.todays");

Route::get('/staff/list',["\App\Http\Controllers\StaffController","list"])->name("staff.list");
