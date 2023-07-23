<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\User;
use App\Models\Hospital;
use App\Enums\AppointmentStatusEnum;//
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Carbon\Carbon;
class AppointmentController extends Controller
{
    use ApiResponseTrait;
    //******************************************كل المواعيد****/
    public function index(){
        $appointments=AppointmentResource::collection(Appointment::get());
        return $this->ApiResponse($appointments,"all done",200);
    }
//******************************************ميعاد محدد***/
    public function show($id){
        $appointments=Appointment::find($id);
        if($appointments){
        return $this->ApiResponse(new AppointmentResource($appointments),"all done",200);
        }
        return $this->ApiResponse(null,"appointment not found",404);
    }
public function store(Request $request)
{
    // Validate the request data
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'phone' => 'required|string|max:15',
        'date' => 'nullable|date',
        'gender' => 'required|in:male,female',
        'Hospital_id' => 'required|exists:hospitals,id',
        'status' => 'nullable|in:scheduled,closed',
    ]);

    // Check if the validation fails
    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 400);
    }

    // Extract the validated data from the validator
    $validatedData = $validator->validated();

    // Check if the token is provided in the request headers
    if ($request->hasHeader('Authorization')) {
        // Extract the token from the Authorization header
        $token = str_replace('Bearer ', '', $request->header('Authorization'));
        $patient = auth()->guard('patient_api')->user();
        // Add the patient's ID to the request data
        $validatedData['patient_id'] = $patient->id;
    }

    // Set the default value of the status field if it is not present in the request data
    if (!isset($validatedData['status'])) {
        $validatedData['status'] = AppointmentStatusEnum::Scheduled;
    }

    // Check if the Hospital exists
    $hospital = Hospital::find($validatedData['Hospital_id']);

    if (!$hospital) {
        return response()->json([
            'success' => false,
            'message' => 'Hospital not found'
        ], 404);
    }

    // Create a new appointment using the validated data
    $appointment = Appointment::create($validatedData);

    // Check if the appointment was created successfully
    if ($appointment) {
        return response()->json([
            'success' => true,
            'data' => $appointment
        ], 201);
    } else {
        return response()->json([
            'success' => false,
            'message' => 'Appointment not saved'
        ], 400);
    }
}
/*******************************تحدث وتعدل ميعاد************************ */
    public function update(Request $request, $id)
{
    // Validate the request data
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'phone' => 'required|string|max:15',
        'date' => 'required|date_format:Y-m-d H:i:s',
        'gender' => 'required|in:male,female',
        'Hospital_id' => 'required|exists:hospitals,id',
        'status' => 'nullable|in:scheduled,closed',
    ]);
    //name phone date gender Hospital_id status
    // Find the appointment by ID
    $appointment = Appointment::find($id);
    if (!$appointment) {
        return $this->ApiResponse(null, "Appointment not found", 404);
    }
    // Update the appointment with the new data
    $appointment->update($validatedData);
    // Return a JSON response with the updated appointment data
    return $this->ApiResponse(new AppointmentResource($appointment), "Appointment updated successfully", 200);
}
/********************************تكنسل او تلغي ميعاد *********** */
    public function destroy($id){
        $appointment=Appointment::find($id);
        if(!$appointment){
            return $this->ApiResponse(null, "appointment not found",404);
        }
        $appointment->delete($id);
        if($appointment){
            return $this->ApiResponse(new AppointmentResource($appointment),"appointment deleted successfully",200);
        }}
/*********************************** idتجيب كل المستشفيات اللي ليهم نفس  ****************** */
public function getHospitalAppointments($hospitalId)
{
    $appointments = Appointment::where('hospital_id', $hospitalId)
        ->get();
    if ($appointments->isEmpty()) {
        return response()->json([
            'status' => false,
            'message' => 'No appointments found for this hospital ID'
        ]);
    }
    $output = $appointments->toArray();
    return response()->json($output);
}
/**************************change the status by id ************************* */
public function closeAppointment(Request $request, $id)
{
    $appointment = Appointment::find($id);
    if (!$appointment) {
        return $this->ApiResponse(null, "Appointment not found", 404);
    }
    if ($appointment->status != AppointmentStatusEnum::Scheduled) {
        return $this->ApiResponse(null, "Appointment is already closed or cancelled", 400);
    }
    $appointment->status = AppointmentStatusEnum::Closed;
    $appointment->save();
    return $this->ApiResponse(new AppointmentResource($appointment), "Appointment closed successfully", 200);
}
/*************************deleteAppointment****************************** */
public function deleteappointment(Request $request, $id)
{
    $hospital_id = auth()->guard('hospital_api')->user()->id;

    // Find the appointment by ID
    $appointment = Appointment::find($id);

    // Check if the appointment exists
    if (!$appointment) {
        return $this->ApiResponse(null, "Appointment not found", 404);
    }

    // Check if the hospital ID in the appointment matches the hospital ID in the token
    if ($appointment->Hospital_id != $hospital_id) {
        return $this->ApiResponse(null, "You are not authorized to delete this appointment", 401);
    }

    // Delete the appointment
    $appointment->delete();

    // Return a success message
    return $this->ApiResponse(null, "Appointment deleted successfully", 200);
}
/************************************************ */
}
/************************************************ */