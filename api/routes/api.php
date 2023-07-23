<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\MedicalReportController;
use App\Http\Controllers\PhonePecontroller;//
// use \Mcamara\LaravelLocalization\Facades\LaravelLocalization;
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
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
/***************************************************************************** */
/////////////////////////hospital routes////////////////////////////////////////
Route::get('/hospitals',[HospitalController::class,'index']);
Route::get('/hospitalbyid/{id}',[HospitalController::class,'show']);
Route::post('/hospitals/{id}',[HospitalController::class,'update']);
Route::post('/hospital/{id}',[HospitalController::class,'destroy']);
            /***********/
Route::post('/hospitalss',[HospitalController::class,'store']);
Route::post('hospitallog', [HospitalController::class,'hospitallog'])->name('hospitallog');
Route::get('/monthly-hospital-registrations', [HospitalController::class, 'getMonthlyHospitalRegistrations']);
Route::delete('/deleteappointment/{id}',[AppointmentController::class,'deleteappointment']);
Route::group([
    'middleware' => 'hospital:hospital_api',
], function () {
    // Route::delete('/deleteappointment/{id}',[AppointmentController::class,'deleteappointment']);
    Route::post('hospitalme',[HospitalController::class,'hospitalme'])->name('hospitalme');
    Route::post('hospitallogout',[HospitalController::class,'hospitallogout'])->name('hospitallogout');
});
/**********************************doctor routes****************/
Route::post('doctorregister',[DoctorController::class,'doctorregister'])->name('doctorregister');
Route::post('doctorlog', [DoctorController::class,'doctorlog'])->name('doctorlog');
Route::group([
    'middleware' => 'doctor:doctor_api',
], function () {
    Route::post('doctorme',[DoctorController::class,'doctorme'])->name('doctorme');
    Route::post('doctorlogout',[DoctorController::class,'doctorlogout'])->name('doctorlogout');
});
/*******************************patient routes*************************/
Route::post('patientregister',[PatientController::class,'patientregister'])->name('patientregister');
Route::post('patientregisterWithToken',[PatientController::class,'patientregisterWithToken'])->name('patientregister');
Route::post('patientlog', [PatientController::class,'patientlog'])->name('patientlog');
Route::get('/fetchMedicalRecords/{id}', [PatientController::class,'fetchMedicalRecords']);
Route::get('/monthly-patient-logins', [PatientController::class, 'getMonthlyPatientLogins']);
Route::get('/xy', [PatientController::class, 'xy']);
Route::group([
    'middleware' => 'patient:patient_api',
], function () {
    Route::post('patientme',[PatientController::class,'patientme'])->name('patientme');
    Route::post('patientlogout',[PatientController::class,'patientlogout'])->name('patientlogout');
});
/****************************admin route***************************/
Route::post('adminregister',[AdminController::class,'adminregister'])->name('adminregister');
Route::post('adminregisterWithToken',[AdminController::class,'adminregisterWithToken'])->name('adminregisterWithToken');
Route::post('adminlog', [AdminController::class,'adminlog'])->name('adminlog');
Route::group([
    'middleware' => 'admin:admin_api',]
, function () {
    /**********************getall......******************************************* */
    Route::get('getAllAppointments', [App\Http\Controllers\AdminController::class, 'getAllAppointments']);
    Route::get('getAllMedicalRecords', [AdminController::class, 'getAllMedicalRecords']);
    Route::get('getallhospitals', [App\Http\Controllers\AdminController::class, 'getallhospitals']);
    Route::get('getallpatients', [App\Http\Controllers\AdminController::class, 'getallpatients']);
    Route::get('getalladmins', [App\Http\Controllers\AdminController::class, 'getalladmins']);
    Route::get('getalldoctors', [App\Http\Controllers\AdminController::class, 'getalldoctors']);
    /**********************delete******************************************* */
    Route::delete('/admin/{id}', [AdminController::class, 'deleteAdminById']);
    Route::post('deletepatient', [AdminController::class, 'deletepatient']);
    Route::post('deletehospital', [AdminController::class, 'deletehospital']);
    Route::post('deletedoctor', [AdminController::class, 'deletedoctor']);
    Route::post('deleteappointment', [AdminController::class, 'deleteappointment']);
    Route::post('deletemedicalrecord', [AdminController::class, 'deletemedicalrecord']);
    Route::post('deletemedicalreport', [AdminController::class, 'deletemedicalreport']);
    /************************Update***************************************** */
    Route::post('patientUpdate/{id}', [AdminController::class, 'patientUpdate']);
    Route::post('updateAppointmentById/{id}',[AdminController::class, 'updateAppointmentById']);
    Route::post('updateAdminById/{id}',[AdminController::class, 'updateAdminById']);
    Route::post('updateHospitalById/{id}',[AdminController::class, 'updateHospitalById']);
    Route::post('/updateStatus_date/{id}',[AdminController::class, 'updateStatus_date']);
    Route::post('/doctorUpdate/{id}',[AdminController::class, 'doctorUpdate']);
    Route::post('/updateMedicalReport/{id}',[AdminController::class, 'updateMedicalReport']);
    /****************************admin info months ****************************/
    Route::get('/monthly-medical-record-creations', [AdminController::class, 'getMonthlyMedicalRecordCreations']);
    Route::get('/monthly-hospital-registrations', [AdminController::class, 'getMonthlyHospitalRegistrations']);
    Route::get('/monthly-patient-logins', [AdminController::class, 'getMonthlyPatientLogins']);
    /***************************************************************** */
    Route::post('adminme',[AdminController::class,'adminme'])->name('adminme');
    Route::post('adminlogout',[AdminController::class,'adminlogout'])->name('adminlogout');
});
/***********************************************************************/
        //hospital routes
    // Route::get('/hospitals',[HospitalController::class,'index']);
    // Route::get('/hospitals/{id}',[HospitalController::class,'show']);
    // Route::post('/hospitals',[HospitalController::class,'store']);
    // Route::post('/hospitals/{id}',[HospitalController::class,'update']);
    // Route::post('/hospital/{id}',[HospitalController::class,'destroy']);
    /*********************************** */

/**************************appointment route******************* */
// Route::get('/appointments',[AppointmentController::class,'index']);
// Route::get('/appointment/{id}',[AppointmentController::class,'show']);
// Route::post('/appointment',[AppointmentController::class,'store']);
// Route::post('/appointments/{id}',[AppointmentController::class,'update']);
// Route::post('/appointment/{id}',[AppointmentController::class,'destroy']);
/********************medicalrecords route**************** */
// Route::get('/medicalrecords',[MedicalRecordController::class,'index']);
// Route::get('/medicalrecord/{id}',[MedicalRecordController::class,'show']);
// Route::post('/medicalrecords',[MedicalRecordController::class,'store']);
// Route::post('/medicalrecords/{id}',[MedicalRecordController::class,'update']);
// Route::post('/medicalrecord/{id}',[MedicalRecordController::class,'destroy']);
// Route::get('/medicalrecords/{id}',[MedicalRecordController::class,'showMR']);//
// Route::get('medicalrecordss',[MedicalRecordController::class,'getPercentageOfModelList']);//
// Route::get('medicalrecordss',[MedicalRecordController::class,'getPatientPercentageList']);//
// /*************************medicalreports route**************/
// Route::get('/medicalreports',[MedicalReportController::class,'index']);
// Route::get('/medicalreport/{id}',[MedicalReportController::class,'show']);
// Route::post('/medicalreports',[MedicalReportController::class,'store']);
// Route::post('/medicalreports/{id}',[MedicalReportController::class,'update']);
// Route::post('/medicalreport/{id}',[MedicalReportController::class,'destroy']);
/*******************************************************/
///////////////////////appointment route//////////////////////////////////////////////////
Route::get('/appointments',[AppointmentController::class,'index']);
Route::get('/appointment/{id}',[AppointmentController::class,'show']);
Route::post('/appointment1',[AppointmentController::class,'store']);//
Route::post('/appointmentsupdate/{id}',[AppointmentController::class,'update']);//
Route::get('appointmentsHospital/{hospital_id}',[AppointmentController::class,'getHospitalAppointments']);//1
Route::post('/appointments/{id}',[AppointmentController::class,'closeAppointment']);//by post
Route::put('/appointments/{id}',[AppointmentController::class,'closeAppointment']);//by put
Route::post('/deleteAppointment/{id}',[AppointmentController::class,'deleteAppointment']);//
Route::delete('/deleteappointment/{id}',[AppointmentController::class,'deleteappointment']);//
Route::post('/appointment/{id}',[AppointmentController::class,'destroy']);
// Route::post('hospital/{hospital_id}/patients','AppointmentController@getHospitalPatients');
// Route::get('/app/{hospital_id}',[AppointmentController::class,'getHospitalPatientsAppointments']);
/************************************************************************************** */
/********************medicalrecords route********************************************/
Route::get('/medicalrecords',[MedicalRecordController::class,'index']);
Route::get('/medicalrecord/{id}',[MedicalRecordController::class,'show']);
Route::post('/medicalrecords',[MedicalRecordController::class,'store']);
Route::post('/medicalrecords/{id}',[MedicalRecordController::class,'update']);
Route::post('/medicalrecord/{id}',[MedicalRecordController::class,'destroy']);
Route::post('/updateStatus_date/{id}',[MedicalRecordController::class,'updateStatus_date']);
Route::get('/medicalrecords/{id}',[MedicalRecordController::class,'showMR']);//
Route::get('/monthly-medical-record-creations', [MedicalRecordController::class, 'getMonthlyMedicalRecordCreations']);
Route::get('/getPercentageOfModelList',[MedicalRecordController::class,'getPercentageOfModelList']);//1
Route::get('medicalrecordss',[MedicalRecordController::class,'getPatientPercentageList']);//t
Route::get('applyRR',[MedicalRecordController::class,'applyRR']);//
Route::get('myControllerMethod',[MedicalRecordController::class,'myControllerMethod']);
/*************medicalreports route***************/
Route::get('/medicalreports',[MedicalReportController::class,'index']);
Route::get('/medicalreport/{id}',[MedicalReportController::class,'show']);
Route::post('/medicalreports',[MedicalReportController::class,'store']);
Route::post('/medicalreports/{id}',[MedicalReportController::class,'update']);
Route::post('/medicalreport/{id}',[MedicalReportController::class,'destroy']);
/********************************************************************** */