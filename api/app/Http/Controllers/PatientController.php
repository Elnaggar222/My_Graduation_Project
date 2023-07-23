<?php
namespace App\Http\Controllers;
use App\Models\Patient;
use App\Models\MedicalRecord;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Resources\MedicalRecordResource;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
// use JWTAuth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class PatientController extends Controller
{
    use ApiResponseTrait;
//******************patientregister*****************/
    public function patientregister(REQUEST $request){
        $is_patient = $request->has('is_patient') ? ($request->is_patient ? 1 : 0) : 1;
        $patient=Patient::create([
        'name'=>$request->name,
        'email'=>$request->email,
        'password'=>Hash::make($request->password),
        'phone'=>$request->phone,
        'gender'=>$request->gender,
        'is_patient'=>$is_patient,
        // 'is_patient' => true, // set is_doctor to true by default
        // 'Hospital_id'=>$request->Hospital_id
    ]);
    if($patient){
        return response()->json([$patient,'status'=>true]);
    }
    else{
        return response()->json(['status'=>false]);
    }
    }
// /**********************patientregisterWithToken************************** */
public function patientregisterWithToken(Request $request)
{
    $is_patient = $request->has('is_patient') ? ($request->is_patient ? 1 : 0) : 1;

    $patient = Patient::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'phone' => $request->phone,
        'gender' => $request->gender,
        'is_patient' => $is_patient,
    ]);

    if ($patient) {
        // Generate a new JWT for the patient
        try {
            $token = JWTAuth::fromUser($patient);
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // Return the patient object and token in the JSON response
        return response()->json([
            'patient' => $patient,
            'token' => $token,
            'status' => true,
        ]);
    } else {
        return response()->json(['status' => false]);
    }
}
// /************************************************ */
public function patientlog(REQUEST $request){
    $credentials = request(['email', 'password']);
    if (!$token = auth()->guard('patient_api')->attempt($credentials)) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    $patient = auth()->guard('patient_api')->user();
    if (!$patient || !$patient->is_patient) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    return response()->json([
        'token' => $token,
        'patient' => $patient
    ]);
}
/**********************************************************************/
    public function patientme()
{
    if (!auth()->guard('patient_api')->check()) {
        return response()->json(null);
    }
    $patient = auth()->guard('patient_api')->user();
    return response()->json($patient);
}
/************************************** */
public function patientlogout()
    {
        auth()->guard('patient_api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

/************************************** */
    public function fetchMedicalRecords(Request $request, $patient_id)
    {
        try {
            $patient = Patient::findOrFail($patient_id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Patient of this '$patient_id' not found"
            ], 404);
        }
        $medicalRecords = MedicalRecord::where('patient_id', '=', $patient_id)->get();
        return MedicalRecordResource::collection($medicalRecords);
    }
/*****************************************************************/
public function getMonthlyPatientLogins()
{
    // Retrieve all patients
    $patients = Patient::all();
    // Group the patients by the month of their creation
    $groupedPatients = $patients->groupBy(function ($patient) {
        return $patient->created_at->format('M');
    });
    // Initialize an empty array to hold the monthly counts
    $monthlyCounts = [];
   // Loop through each month of the year
for ($i = 1; $i <= 12; $i++) {
    // Get the three-letter abbreviation for the month
    $monthAbbreviation = date("M", mktime(0, 0, 0, $i, 1));

    // Get the number of patients created in this month
    $count = 0;
    if ($groupedPatients->has($monthAbbreviation)) {
        $count = $groupedPatients->get($monthAbbreviation)->count();
    }
    // Add the count to the monthly counts array
    $monthlyCounts[] = [
        'month' => $monthAbbreviation,
        'count' => $count
    ];
}
    // Return the monthly counts as a JSON response
    return response()->json($monthlyCounts, 200);
}
public function xy()
{
    // Retrieve all patients
    $patients = Patient::all();
    return response()->json($patients);
}
/**************************************************************** */
}
/****************************************************** */
    // public function patientlog(REQUEST $request){
    //     $credentials = request(['email', 'password']);

    //     if (! $token = auth()->guard('patient_api')->attempt($credentials)) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }
    //     $x= response()->json(auth()->guard('patient_api')->user());
    // // $cookie = cookie('token', $token, 60);
    // return response()->json(['token' => $token,'info'=>$x]);
    // // ->cookie($cookie)
    // }
