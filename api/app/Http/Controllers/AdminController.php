<?php
namespace App\Http\Controllers;
use App\Models\Admin;
use App\Models\Patient;
use App\Models\Hospital;
use App\Models\Appointment;
use App\Models\MedicalRecord;
use App\Models\Doctor;
use App\Models\MedicalReport;
use App\Http\Resources\HospitalResource;
use App\Http\Resources\PatientResource;
use App\Http\Resources\DoctorResource;
use App\Http\Resources\AdminResource;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\MedicalRecordResource;
use App\Http\Resources\MedicalReportResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use App\Enums\MedicalRecordStatusEnum;
use Carbon\Carbon;
class AdminController extends Controller
{
/*************************************************************************** */
    use ApiResponseTrait;
/**************************adminregister************************ */
    public function adminregister(REQUEST $request){
        // $is_admin = $request->has('is_admin') ? $request->is_admin : true;
        $is_admin = $request->has('is_admin') ? ($request->is_admin ? 1 : 0) : 1;
        $admin=Admin::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            // 'is_admin'=>$request->is_admin
            'is_admin' => $is_admin
            ]);
        if($admin){
            return response()->json([$admin,'status'=>true]);
        }
        else{
        return response()->json(['status'=>false]);
        }
    }
/**********************adminregisterWithToken**************************** */
    public function adminregisterWithToken(Request $request)
{
    $is_admin = $request->has('admin_api') ? ($request->is_admin ? 1 : 0) : 1;

    $admin = Admin::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'is_admin' => $is_admin,
    ]);
    if ($admin) {
        // Generate a new JWT for the patient
        try {
            $token = JWTAuth::fromUser($admin);
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // Return the patient object and token in the JSON response
        return response()->json([
            'admin' =>$admin,
            'token' => $token,
            'status' => true,
        ]);
    } else {
        return response()->json(['status' => false]);
    }
}
// /************************************************ */
public function adminlog(Request $request)
{
    $credentials = request(['email', 'password']);
    if (!$token = auth()->guard('admin_api')->attempt($credentials)) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    $admin = auth()->guard('admin_api')->user();
    if (!$admin || !$admin->is_admin) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    return response()->json([
        'token' => $token,
        'admin' => $admin
    ]);
}
//************************************** */
    public function adminme()
    {
        return response()->json(auth()->guard('admin_api')->user());
    }
/*************************************************** */
    public function adminlogout()
    {
        auth()->guard('admin_api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
/********************getallhospitals******************* */
//is_admin,is_doctor,is_patient,is_hospital
public function getallhospitals(Request $request)
{
    // Get the JWT token from the request header
    $token = $request->header('Authorization');
    try {
        // Authenticate the user with the 'admin_api' guard
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        // Check if the authenticated user is an admin
        if (!$admin || !$admin->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        // Retrieve all hospitals and transform them using the HospitalResource
        $hospitals = HospitalResource::collection(Hospital::get());
        // Return a JSON response with the hospitals and a status message
        return $this->ApiResponse($hospitals, 'All hospitals retrieved successfully', 200);
    } catch (TokenExpiredException $e) {
        // Refresh the JWT token if it has expired
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $admin = JWTAuth::setToken($newToken)->toUser();

            // Check if the authenticated user is an admin
            if (!$admin || !$admin->is_admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve all hospitals and transform them using the HospitalResource
            $hospitals = HospitalResource::collection(Hospital::get());

            // Return a JSON response with the hospitals and a status message
            return $this->ApiResponse($hospitals, 'All hospitals retrieved successfully', 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/**********************getallpatients***************************/
public function getallpatients(Request $request)
{
    // Get the JWT token from the request header
    $token = $request->header('Authorization');

    try {
        // Authenticate the user with the 'admin_api' guard
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');

        // Check if the authenticated user is an admin
        if (!$admin || !$admin->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        // Retrieve all patients and transform them using the PatientResource
        $patients = PatientResource::collection(Patient::get());

        // Return a JSON response with the patients and a status message
        return $this->ApiResponse($patients, 'All patients retrieved successfully', 200);
    } catch (TokenExpiredException $e) {
        // Refresh the JWT token if it has expired
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $admin = JWTAuth::setToken($newToken)->toUser();

            // Check if the authenticated user is an admin
            if (!$admin || !$admin->is_admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve all patients and transform them using the PatientResource
            $patients = PatientResource::collection(Patient::get());

            // Return a JSON response with the patients and a status message
            return $this->ApiResponse($patients, 'All patients retrieved successfully', 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/*************************getalldoctors******************************** */
public function getalldoctors(Request $request)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin || !$admin->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $doctors = DoctorResource::collection(Doctor::get());
        return $this->ApiResponse($doctors, 'All doctors retrieved successfully', 200);
    } catch (TokenExpiredException $e) {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $admin = JWTAuth::setToken($newToken)->toUser();
            if (!$admin || !$admin->is_admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $doctors = DoctorResource::collection(Doctor::get());
            return $this->ApiResponse($doctors, 'All doctors retrieved successfully', 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/***********************getalladmins**************************/
public function getalladmins(Request $request)
{
    // Get the JWT token from the request header
    $token = $request->header('Authorization');
    try {
        // Authenticate the user with the 'admin_api' guard
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        // Check if the authenticated user is an admin
        if (!$admin || !$admin->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        // Retrieve all admins and transform them using the AdminResource
        $admins = AdminResource::collection(Admin::get());
        // Return a JSON response with the admins and a status message
        return $this->ApiResponse($admins, 'All admins retrieved successfully', 200);
    } catch (TokenExpiredException $e) {
        // Refresh the JWT token if it has expired
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $admin = JWTAuth::setToken($newToken)->toUser();
            // Check if the authenticated user is an admin
            if (!$admin || !$admin->is_admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            // Retrieve all admins and transform them using the AdminResource
            $admins = AdminResource::collection(Admin::get());
            // Return a JSON response with the admins and a status message
            return $this->ApiResponse($admins, 'All admins retrieved successfully', 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/*************************getAllAppointments************************************************ */
public function getAllAppointments(Request $request)
{
$token = $request->header('Authorization');
try {
    JWTAuth::setRequest($request);
    $admin = JWTAuth::parseToken()->authenticate('admin_api');
    if (!$admin || !$admin->is_admin) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    $Appointment = AppointmentResource::collection(Appointment::get());
    return $this->ApiResponse($Appointment, 'All Appointments retrieved successfully', 200);
} catch (TokenExpiredException $e) {
    try {
        $newToken = JWTAuth::refresh(JWTAuth::getToken());
        $admin = JWTAuth::setToken($newToken)->toUser();
        if (!$admin || !$admin->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $Appointment = AppointmentResource::collection(Appointment::get());
        return $this->ApiResponse($Appointment, 'All Appointments retrieved successfully', 200);
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
} catch (JWTException $e) {
    return response()->json(['error' => 'Invalid token'], 401);
}
}
/********************************getallMedicalRecords********************************** */
public function getAllMedicalRecords(Request $request)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin || !$admin->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $MedicalRecord = MedicalRecordResource::collection(MedicalRecord::get());
        return $this->ApiResponse($MedicalRecord, 'All $MedicalRecords retrieved successfully', 200);
    } catch (TokenExpiredException $e) {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $admin = JWTAuth::setToken($newToken)->toUser();
            if (!$admin || !$admin->is_admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $MedicalRecord = MedicalRecordResource::collection(MedicalRecord::get());
            return $this->ApiResponse($MedicalRecord, 'All $MedicalRecords retrieved successfully', 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/*********************Delete******************************************************/
/***************************deleteAdminById********************************* */
public function deleteAdminById(Request $request, $id)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin || !$admin->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $adminToDelete = Admin::find($id);
        if (!$adminToDelete) {
            return $this->ApiResponse(null, "Admin not found", 404);
        }
        if ($adminToDelete->id === $admin->id) {
            return response()->json(['error' => 'You cannot delete yourself'], 400);
        }
        $adminToDelete->delete();
        return $this->ApiResponse(null, "Admin deleted successfully", 200);
    } catch (JWTException $e) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
/******************** Delete a patient by ID*************************** */
public function deletepatient(Request $request)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $patientId = $request->input('id');
        $patientToDelete = Patient::find($patientId);
        if (!$patientToDelete) {
            return response()->json(['error' => 'Patient not found'], 404);
        }
        $patientToDelete->delete();
        return $this->ApiResponse(null, 'Patient deleted successfully', 200);
    } catch (TokenExpiredException $e) {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $patient = JWTAuth::setToken($newToken)->toUser();
            if (!$patient) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $patientId = $request->input('id');
            $patientToDelete = Patient::find($patientId);
            if (!$patientToDelete) {
                return response()->json(['error' => 'Patient not found'], 404);
            }
            $patientToDelete->delete();

            // Return a JSON response with a success message
            return $this->ApiResponse(null, 'Patient deleted successfully', 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/******************** Delete a hospital by ID***********************/
public function deletehospital(Request $request)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin || !$admin->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $hospitalId = $request->input('id');
        $hospitalToDelete = Hospital::find($hospitalId);
        if (!$hospitalToDelete) {
            return response()->json(['error' => 'Hospital not found'], 404);
        }
        $hospitalToDelete->delete();
        return $this->ApiResponse(null, 'Hospital deleted successfully', 200);
    } catch (TokenExpiredException $e) {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $admin = JWTAuth::setToken($newToken)->toUser();
            if (!$admin || !$admin->is_admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $hospitalId = $request->input('id');
            $hospitalToDelete = Hospital::find($hospitalId);
            if (!$hospitalToDelete) {
                return response()->json(['error' => 'Hospital not found'], 404);
            }
            $hospitalToDelete->delete();
            return $this->ApiResponse(null, 'Hospital deleted successfully', 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/******************************* */
// Delete a doctor by ID
public function deletedoctor(Request $request)
{
    // Get the JWT token from the request header
    $token = $request->header('Authorization');

    try {
        // Authenticate the user with the 'admin_api' guard
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');

        // Check if the authenticated user is an admin
        if (!$admin || !$admin->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Get the ID of the doctor to delete from the request body
        $doctorId = $request->input('id');

        // Delete the doctor with the given ID
        $doctorToDelete = Doctor::find($doctorId);
        if (!$doctorToDelete) {
            return response()->json(['error' => 'Doctor not found'], 404);
        }
        $doctorToDelete->delete();

        // Return a JSON response with a success message
        return $this->ApiResponse(null, 'Doctor deleted successfully', 200);
    } catch (TokenExpiredException $e) {
        // Refresh the JWT token if it has expired
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $admin = JWTAuth::setToken($newToken)->toUser();

            // Check if the authenticated user is an admin
            if (!$admin || !$admin->is_admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Get the ID of the doctor to delete from the request body
            $doctorId = $request->input('id');

            // Delete the doctor with the given ID
            $doctorToDelete = Doctor::find($doctorId);
            if (!$doctorToDelete) {
                return response()->json(['error' => 'Doctor not found'], 404);
            }
            $doctorToDelete->delete();

            // Return a JSON response with a success message
            return $this->ApiResponse(null, 'Doctor deleted successfully', 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/****************Delete an appointment by ID*************** */
public function deleteappointment(Request $request)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin ) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $appointmentId = $request->input('id');
        $appointmentToDelete = Appointment::find($appointmentId);
        if (!$appointmentToDelete) {
            return response()->json(['error' => 'Appointment not found'], 404);
        }
        $appointmentToDelete->delete();
        return $this->ApiResponse(null, 'Appointment deleted successfully', 200);
    } catch (TokenExpiredException $e) {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $patient = JWTAuth::setToken($newToken)->toUser();
            if (!$patient) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $appointmentId = $request->input('id');
            $appointmentToDelete = Appointment::find($appointmentId);
            if (!$appointmentToDelete) {
                return response()->json(['error' => 'Appointment not found'], 404);
            }
            $appointmentToDelete->delete();
            return $this->ApiResponse(null, 'Appointment deleted successfully', 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/*****************deletemedicalrecord************** */
// Delete a medical record by ID
public function deletemedicalrecord(Request $request)
{
    // Get the JWT token from the request header
    $token = $request->header('Authorization');

    try {
        // Authenticate the user with the 'doctor_api' guard
        JWTAuth::setRequest($request);
        $doctor = JWTAuth::parseToken()->authenticate('doctor_api');

        // Check if the authenticated user is authorized to delete a medical record
        if (!$doctor) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Get the ID of the medical record to delete from the request body
        $medicalRecordId = $request->input('id');

        // Delete the medical record with the given ID
        $medicalRecordToDelete = MedicalRecord::find($medicalRecordId);
        if (!$medicalRecordToDelete) {
            return response()->json(['error' => 'Medical record not found'], 404);
        }
        $medicalRecordToDelete->delete();

        // Return a JSON response with a success message
        return $this->ApiResponse(null, 'Medical record deleted successfully', 200);
    } catch (TokenExpiredException $e) {
        // Refresh the JWT token if it has expired
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $doctor = JWTAuth::setToken($newToken)->toUser();

            // Check if the authenticated user is authorized to delete a medical record
            if (!$doctor) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Get the ID of the medical record to delete from the request body
            $medicalRecordId = $request->input('id');

            // Delete the medical record with the given ID
            $medicalRecordToDelete = MedicalRecord::find($medicalRecordId);
            if (!$medicalRecordToDelete) {
                return response()->json(['error' => 'Medical record not found'], 404);
            }
            $medicalRecordToDelete->delete();

            // Return a JSON response with a success message
            return $this->ApiResponse(null, 'Medical record deleted successfully', 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/*****************Delete a medical report by ID**************/
public function deletemedicalreport(Request $request)
{
    // Get the JWT token from the request header
    $token = $request->header('Authorization');

    try {
        // Authenticate the user with the 'doctor_api' guard
        JWTAuth::setRequest($request);
        $doctor = JWTAuth::parseToken()->authenticate('admin_api');

        // Check if the authenticated user is authorized to delete a medical report
        if (!$doctor) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Get the ID of the medical report to delete from the request body
        $medicalReportId = $request->input('id');

        // Delete the medical report with the given ID
        $medicalReportToDelete = MedicalReport::find($medicalReportId);
        if (!$medicalReportToDelete) {
            return response()->json(['error' => 'Medical report not found'], 404);
        }
        $medicalReportToDelete->delete();

        // Return a JSON response with a success message
        return $this->ApiResponse(null, 'Medical report deleted successfully', 200);
    } catch (TokenExpiredException $e) {
        // Refresh the JWT token if it has expired
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $doctor = JWTAuth::setToken($newToken)->toUser();

            // Check if the authenticated user is authorized to delete a medical report
            if (!$doctor) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Get the ID of the medical report to delete from the request body
            $medicalReportId = $request->input('id');

            // Delete the medical report with the given ID
            $medicalReportToDelete = MedicalReport::find($medicalReportId);
            if (!$medicalReportToDelete) {
                return response()->json(['error' => 'Medical report not found'], 404);
            }
            $medicalReportToDelete->delete();

            // Return a JSON response with a success message
            return $this->ApiResponse(null, 'Medical report deleted successfully', 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/******************************* */
public function patientUpdate(Request $request ,$id)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin) {
            return response()->json(['error' => 'notadmin'], 401);
        }
        $patientToUpdate = Patient::find($id);
        if (!$patientToUpdate) {
            return response()->json(['error' => 'Patient not found'], 404);
        }
        // $is_patient = $request->has('is_patient') ? ($request->is_patient ? 1 : 0) : 1;
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins,email,' . $id,
            'password' => 'nullable|string|min:6',
            'phone' => 'required|string|max:15',
            'gender' => 'required|in:male,female',
            // 'is_patient' => $is_patient,
        ]);
        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }
        if (isset($validatedData['is_patient'])) {
            $validatedData['is_patient'] = null;
        }
        $patientToUpdate->update($validatedData);
        return $this->ApiResponse
        (new PatientResource($patientToUpdate) , 'Patient updated successfully', 200);
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/***********************updateAppoinment by id **************************** */
public function updateAppointmentById(Request $request, $id)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $appointment = Appointment::find($id);
        if (!$appointment) {
            return $this->ApiResponse(null, "Appointment not found", 404);
        }
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'date' => 'required|date_format:Y-m-d H:i:s',
            'gender' => 'required|in:male,female',
            'Hospital_id' => 'required|exists:hospitals,id',
            'status' => 'nullable|in:scheduled,closed',
        ]);
        $hospital = Hospital::find($validatedData['Hospital_id']);
        if (!$hospital) {
            return $this->ApiResponse(null, "Hospital not found", 404);
        }
        $appointment->update($validatedData);
        return $this->ApiResponse(new AppointmentResource($appointment), "Appointment updated successfully", 200);
    } catch (JWTException $e) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
/************************updateAdminById*******************************************/
public function updateAdminById(Request $request, $id)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin) {
            return response()->json(['error' => 'notadmin'], 401);
        }
        $adminToUpdate = Admin::find($id);
        if (!$adminToUpdate) {
            return $this->ApiResponse(null, "Admin not found", 404);
        }
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins,email,' . $id,
            'password' => 'nullable|string|min:6',
        ]);
        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }
        $adminToUpdate->update($validatedData);
        return $this->ApiResponse(new AdminResource($adminToUpdate), "Admin updated successfully", 200);
    } catch (JWTException $e) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
/*******************************************************************/
    public function updateStatus_date(Request $request, $id)
    {
        $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $medicalRecord = MedicalRecord::find($id);
        if (!$medicalRecord) {
            return response()->json(['message' => 'MedicalRecord not found'], 404);
        }

        // Check if the MedicalRecord status is Waiting
        if ($medicalRecord->status != MedicalRecordStatusEnum::Waiting) {
            return $this->ApiResponse(null, "MedicalRecord is already approved", 400);
        }

        // Validate the input data
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        // Update the MedicalRecord instance with the new data
        $inputDate = $request->input('date');
        // Check if the input date is in the future
        if (Carbon::parse($inputDate)->isFuture()) {
            $medicalRecord->status = MedicalRecordStatusEnum::Approved;
            $medicalRecord->date = $inputDate;
            $medicalRecord->save();
            return response()->json(['message' => 'MedicalRecord status and date updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Date must be in the future'], 400);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    }
/******************************************************************************/
public function updateHospitalById(Request $request, $id)
{
    $token = $request->header('Authorization');
        try {
            JWTAuth::setRequest($request);
            $admin = JWTAuth::parseToken()->authenticate('admin_api');
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $hospital = Hospital::find($id);
            if (!$hospital) {
                return $this->ApiResponse(null, "Hospital not found", 404);
            }
            $validatedData = $request->all();
            if (isset($validatedData['password'])) {
                $validatedData['password'] = bcrypt($validatedData['password']);
            }
            $hospital->update($validatedData);
            return $this->ApiResponse(new HospitalResource($hospital), "Hospital updated successfully", 200);
        }catch (JWTException $e) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
/*******************************************************************/
public function doctorUpdate(Request $request, $id)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $doctorToUpdate = Doctor::find($id);
        if (!$doctorToUpdate) {
            return response()->json(['error' => 'Doctor not found'], 404);
        }
        $doctorToUpdate->update($request->all());
        return $this->ApiResponse(null, 'Doctor updated successfully', 200);
    } catch (TokenExpiredException $e) {
        // Refresh the JWT token if it has expired
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $admin = JWTAuth::setToken($newToken)->toUser();
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $doctorId = $request->input('id');
            $doctorToUpdate = Doctor::find($doctorId);
            if (!$doctorToUpdate) {
                return response()->json(['error' => 'Doctor not found'], 404);
            }
            $doctorToUpdate->update($request->all());

            // Return a JSON response with a success message
            return $this->ApiResponse(null, 'Doctor updated successfully', 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    } catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
    }
}
/*******************************************************************/
    public function updateMedicalReport(Request $request, $id)
    {
        $token = $request->header('Authorization');
        try {
            JWTAuth::setRequest($request);
            $admin = JWTAuth::parseToken()->authenticate('admin_api');
            if (!$admin) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $medicalReport = MedicalReport::find($id);
            if (!$medicalReport) {
                return $this->ApiResponse(null, "MedicalReport not found", 400);
            }
            $medicalReport->update($request->all());
            return $this->ApiResponse(new MedicalReportResource($medicalReport), "MedicalReport updated successfully", 201);
        }catch (TokenExpiredException $e) {
            // Refresh the JWT token if it has expired
            try {
                $newToken = JWTAuth::refresh(JWTAuth::getToken());
                $admin = JWTAuth::setToken($newToken)->toUser();
                if (!$medicalReport) {
                    return response()->json(['error' => 'Unauthorized'], 401);
                }
                $MedicalReport= $request->input('id');
                $MedicalReportUpdate = MedicalReport::find($MedicalReport);
                if (!$MedicalReportUpdate) {
                    return response()->json(['error' => 'Doctor not found'], 404);
                }
                $MedicalReportUpdate->update($request->all());
                return $this->ApiResponse(null, 'MedicalReport updated successfully', 200);
            } catch (JWTException $e) {
                return response()->json(['error' => 'Invalid token'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    }
/**********************getMonthly MedicalRecord**********/
public function getMonthlyMedicalRecordCreations(Request $request)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin || !$admin->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $medicalRecords = MedicalRecord::all();
        $groupedMedicalRecords = $medicalRecords->groupBy(function ($medicalRecord) {
            return $medicalRecord->created_at->format('M');
        });
        $monthlyCounts = [];
        for ($i = 1; $i <= 12; $i++) {
            $monthAbbreviation = date("M", mktime(0, 0, 0, $i, 1));
            $count = 0;
            if ($groupedMedicalRecords->has($monthAbbreviation)) {
                $count = $groupedMedicalRecords->get($monthAbbreviation)->count();
            }
            $monthlyCounts[] = [
                'month' => $monthAbbreviation,
                'count' => $count
            ];
        }
    return response()->json($monthlyCounts, 200);
    } catch (JWTException $e) {
    return response()->json(['error' => 'Invalid token'], 401);
}
}
/*********************getMonthlyPatientLogins******************/
public function getMonthlyPatientLogins(Request $request)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin || !$admin->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $patients = Patient::all();
        $groupedPatients = $patients->groupBy(function ($patient) {
            return $patient->created_at->format('M');
        });
        $monthlyCounts = [];
        for ($i = 1; $i <= 12; $i++) {
        $monthAbbreviation = date("M", mktime(0, 0, 0, $i, 1));
        $count = 0;
        if ($groupedPatients->has($monthAbbreviation)) {
            $count = $groupedPatients->get($monthAbbreviation)->count();
        }
        $monthlyCounts[] = [
        'month' => $monthAbbreviation,
        'count' => $count
        ];
        }
        return response()->json($monthlyCounts, 200);
    }catch (JWTException $e) {
        return response()->json(['error' => 'Invalid token'], 401);
}
}
/*****************************getMonthlyHospitalRegistrations*****************/
public function getMonthlyHospitalRegistrations(Request $request)
{
    $token = $request->header('Authorization');
    try {
        JWTAuth::setRequest($request);
        $admin = JWTAuth::parseToken()->authenticate('admin_api');
        if (!$admin || !$admin->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $hospitals = Hospital::all();
        $groupedHospitals = $hospitals->groupBy(function ($hospital) {
            return $hospital->created_at->format('M');
        });
        $monthlyCounts = [];
        for ($i = 1; $i <= 12; $i++) {
            $monthAbbreviation = date("M", mktime(0, 0, 0, $i, 1));
            $count = 0;
            if ($groupedHospitals->has($monthAbbreviation)) {
                $count = $groupedHospitals->get($monthAbbreviation)->count();
            }
            $monthlyCounts[] = [
                'month' => $monthAbbreviation,
                'count' => $count
            ];
        }
        return response()->json($monthlyCounts, 200);
    } catch (JWTException $e) {
    return response()->json(['error' => 'Invalid token'], 401);
}
}
/*******************************************************************/
}


/******************************* */
// $users = User::select([
//     'users.*',
//     'last_posted_at' => Post::selectRaw('MAX(created_at)')
//             ->whereColumn('user_id', 'users.id')
// ])->withCasts([
//     'last_posted_at' => 'datetime'
// ])->get();
/****************************************/
