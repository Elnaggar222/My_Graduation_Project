<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Resources\HospitalResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Hospital;
use App\Models\Appointment;
use App\Http\Controllers\AppointmentController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
class HospitalController extends Controller
{
    use ApiResponseTrait;
//##############################################
    public function store(Request $request){
        $is_hospital = $request->has('is_hospital') ? ($request->is_hospital ? 1 : 0) : 1;
       // Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|unique:hospitals',
            'password' => 'required',
            'contactno' => 'required',
        //    'is_hospital' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->ApiResponse(null, $validator->errors(), 400);
        }
        $hospital = Hospital::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'contactno' => $request->contactno,
            'is_hospital' => $is_hospital,
            // 'is_hospital' =>true,//
        ]);
        if ($hospital) {
            return response()->json([$hospital,'status'=>true]);
            }
            else{
            return response()->json(['status'=>false]);
            }
            }
    //##############################################
    public function update(REQUEST $request,$id){
        // $is_hospital= $request->has('is_hospital') ? ($request->is_hospital ? 1 : 0) : 1;
        $is_hospital = $request->has('is_hospital') ? $request->is_hospital : true;
           //validation
        $validator=Validator::make($request->all(),[
            'name'=>'required|max:255',
            'email'=>'required',
            'password'=>'required',
            'contactno'=>'required',
            // 'is_hospital'=>'required'
            // 'is_hospital' =>true,//
        ]);
        if($validator->fails()){
            return $this->ApiResponse(null,$validator->errors(),400);
        }
        $hospital=Hospital::find($id);
        if(!$hospital){
            return $this->ApiResponse(null,"hospital not found",400);
        }
        $hospital->update($request->all());
        if($hospital){
            return $this->ApiResponse(new HospitalResource($hospital),"hospital updated successfully",201);
        }
    }
    //is_admin,is_doctor,is_patient,is_hospital
//##############################################
    public function hospitallog(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->guard('hospital_api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $hospital = auth()->guard('hospital_api')->user();
        if (!$hospital || !$hospital->is_hospital) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        // 'is_hospital'=>'is_hospital'
        return response()->json([
            'token' => $token,
            'hospital' => $hospital
        ]);
    }
//##############################################
public function hospitalme()
{
    if (!auth()->guard('hospital_api')->check()) {
        return response()->json(null);
    }
    $hospital = auth()->guard('hospital_api')->user();
    return response()->json($hospital);
}
//##############################################
public function hospitallogout(REQUEST $request){
    auth()->guard('hospital_api')->logout();

    return response()->json(['message' => 'Successfully logged out']);
}
//#######################كل #######################
    public function index(){
        $hospitals=HospitalResource::collection(Hospital::get());
        return $this->ApiResponse($hospitals,"all done",200);
    }
 //##############################################
    public function show($id){
        $hospital=Hospital::find($id);
        if($hospital){
            return $this->ApiResponse(new HospitalResource($hospital),"all done",200);
        }
        return $this->ApiResponse(null,"hospital not found",404);
    }
   //##############################################
public function destroy($id){
    $hospital=Hospital::find($id);
    if(!$hospital){
        return $this->ApiResponse(null, "hospital not found",404);
    }
    $hospital->delete($id);
    if($hospital){
        return $this->ApiResponse(new HospitalResource($hospital),"hospital deleted successfully",200);
    }
}
/************************************************************/

public function getMonthlyHospitalRegistrations()
{
    // Retrieve all hospitals
    $hospitals = Hospital::all();

    // Group the hospitals by the month of their registration
    $groupedHospitals = $hospitals->groupBy(function ($hospital) {
        return $hospital->created_at->format('M');
    });

    // Initialize an empty array to hold the monthly counts
    $monthlyCounts = [];

    // Loop through each month of the year
    for ($i = 1; $i <= 12; $i++) {
        // Get the three-letter abbreviation for the month
        $monthAbbreviation = date("M", mktime(0, 0, 0, $i, 1));

        // Get the number of hospitals registered in this month
        $count = 0;
        if ($groupedHospitals->has($monthAbbreviation)) {
            $count = $groupedHospitals->get($monthAbbreviation)->count();
        }

        // Add the count to the monthly counts array
        $monthlyCounts[] = [
            'month' => $monthAbbreviation,
            'count' => $count
        ];
    }

    // Return the monthly counts as a JSON response with a 200 status code
    return response()->json($monthlyCounts, 200);
}
}
//##############################################
    // public function hospitallog(REQUEST $request){
    //     $credentials = request(['email', 'password']);
    //     if (! $token = auth()->guard('hospital_api')->attempt($credentials)) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }
    //     // if (auth()->guard('hospital_api')->check()) {
    //     $x= response()->json(auth()->guard('hospital_api')->user());
    // return response()->json(['token' => $token,'info'=>$x]);
    // }