<?php
namespace App\Http\Controllers;
use App\Models\Doctor;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
class DoctorController extends Controller
{
    use ApiResponseTrait;
    public function doctorregister(REQUEST $request){
        $is_doctor = $request->has('is_doctor') ? ($request->is_doctor ? 1 : 0) : 1;//
        $doctor=Doctor::create([
        'name'=>$request->name,
        'email'=>$request->email,
        'password'=>Hash::make($request->password),
        'phone'=>$request->phone,
        'gender'=>$request->gender,
        'description'=>$request->description,
        // 'is_doctor' => true, // set is_doctor to true by default//
        'is_doctor' => $is_doctor,
    ]);
    if($doctor){
        return response()->json([$doctor,'status'=>true]);
    }
    else{
        return response()->json(['status'=>false]);
    }
    }
/***************************************************** */
public function doctorlog(Request $request)
{
    $credentials = request(['email', 'password']);

    if (!$token = auth()->guard('doctor_api')->attempt($credentials)) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    $doctor = auth()->guard('doctor_api')->user();

    if (!$doctor || !$doctor->is_doctor) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    return response()->json([
        'token' => $token,
        'doctor' => $doctor
    ]);
}
/********************************************** */
    // public function doctorlog(REQUEST $request){
    //     $credentials = request(['email', 'password']);

    //     if (! $token = auth()->guard('doctor_api')->attempt($credentials)) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }
    //     $x= response()->json(auth()->guard('doctor_api')->user());
    // // $cookie = cookie('token', $token, 60);//
    //     return response()->json(['token' => $token,'info'=>$x]);
    // // ->cookie($cookie)//
    // }
    public function doctorme()
    {
        return response()->json(auth()->guard('doctor_api')->user());
         // Check if the token is present in the request
    if (!auth()->guard('doctor_api')->check()) {
        // If the token is not present, return a null response
        return response()->json(null);
    }
    }
    public function doctorlogout()
    {
        auth()->guard('doctor_api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
/*********** */
  // public function doctorlog(REQUEST $request){
    //     $credentials = request(['email', 'password']);

    //     if (! $token = auth()->guard('doctor_api')->attempt($credentials)) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }
    // //Store the token in a cookie with a name of "token" and an expiration time of 1 hour
    // $cookie = cookie('token', $token, 60);
    // $x= response()->json(auth()->guard('doctor_api')->user());

    // //Return a response with the token and cookie attached
    // return response()->json(['token' => $token,'info'=>$x])->cookie($cookie);
    // }

    // public function patientlogout()
    // {
    //     auth()->guard('doctor_api')->logout();

    //     // Remove the 'token' cookie by creating a new cookie with an empty value and an expiration time in the past
    //     $cookie = cookie('token', '', -1);

    //     // Return a JSON response indicating that the logout was successful, with the 'token' cookie included to remove it from the client's browser
    //     return response()->json(['message' => 'Successfully logged out'])->withCookie($cookie);
    // }