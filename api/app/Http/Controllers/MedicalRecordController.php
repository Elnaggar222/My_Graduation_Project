<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\MedicalRecord;
use App\Http\Resources\MedicalRecordResource;
use App\Models\Patient;
use App\Models\Hospital;
use App\Http\Controllers\QueueWithPriority;
use App\Http\Controllers\Exception;
use Illuminate\Support\Facades\Log;
use App\Enums\MedicalRecordStatusEnum;
use Carbon\Carbon;
use SplPriorityQueue;
class MedicalRecordController extends Controller
{
    use ApiResponseTrait;
//###############################كل MR ###################\\
    public function index(){
        $MedicalRecords=MedicalRecordResource::collection(MedicalRecord::get());
        return $this->ApiResponse($MedicalRecords,"all done",200);
    }
//##########################واحد بس ########################\\
    public function show($id){
        $MedicalRecord=MedicalRecord::find($id);
        if($MedicalRecord){
        return $this->ApiResponse(new MedicalRecordResource($MedicalRecord),"all done",200);
        }
        return $this->ApiResponse(null,"MedicalRecord not found",404);
    }
//########################store##########################\\
    // id name  percentageofmodel  percentageofdoctor  Hospital_id  patient_id
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        // 'name' => 'required|max:255',
        'percentageofmodel' => 'required',
        'Hospital_id' => 'required',
        'patient_id' => 'required',
        // 'date' => 'required',
        'date' => 'nullable|date',
        'status' => 'nullable|in:waiting,Approved',
    ]);
    if ($validator->fails()) {
        return $this->ApiResponse(null, $validator->errors(), 400);
    }
    $validatedData = $validator->validated();// It returns an associative array of the validated input data , is important for security and data integrity.
    $hospital = Hospital::find($validatedData['Hospital_id']);
    if (!$hospital) {
        return $this->ApiResponse(null, "Hospital not found", 404);
    }
    // Set the default value of the status field if it is not present in the request data
    if (!isset($validatedData['status'])) {
        $validatedData['status'] = MedicalRecordStatusEnum::waiting;
    }
    // if (!isset($validatedData['date'])) {
    //     $validatedData['date'] = null;
    // }//
    // Create new MedicalRecord instance
    $medicalRecord = MedicalRecord::create($validatedData);

    if ($medicalRecord) {
        return $this->ApiResponse(new MedicalRecordResource($medicalRecord), "MedicalRecord created successfully", 201);
    }
    return $this->ApiResponse(null, "MedicalRecord not saved", 400);
}
/************************update by id ***********************************/
    public function update(REQUEST $request,$id){
        //validation
        $validator=Validator::make($request->all(),[
            // 'name'=>'required|max:255',
            'percentageofmodel'=>'required',
            // 'date' => 'required|date_format:Y-m-d H:i:s',
            'date' => 'nullable|date',
            // 'status'=>'required',//
            'Hospital_id'=>'required',
            'patient_id'=>'required',
        ]);
        if($validator->fails()){
            return $this->ApiResponse(null,$validator->errors(),400);
        }
    $validatedData = $validator->validated();// It returns an associative array of the validated input data , is important for security and data integrity.
    if (!isset($validatedData['status'])) {
        $validatedData['status'] = MedicalRecordStatusEnum::waiting;
    }
    if (!isset($validatedData['date'])) {
        $validatedData['date'] = null;
    }
        $MedicalRecord=MedicalRecord::find($id);
        if(!$MedicalRecord){
            return $this->ApiResponse(null,"MedicalRecord not found",400);
        }
        $hospital = Hospital::find($validatedData['Hospital_id']);
        if (!$hospital) {
            return $this->ApiResponse(null, "Hospital not found", 404);
        }
        $MedicalRecord->update($request->all());
        if($MedicalRecord){
            return $this->ApiResponse(new MedicalRecordResource($MedicalRecord),"MedicalRecord updated successfully",201);
        }
    }
/********************************************************************/
    public function destroy($id){
        $MedicalRecord=MedicalRecord::find($id);
        if(!$MedicalRecord){
            return $this->ApiResponse(null, "MedicalRecord not found",404);
        }
        $MedicalRecord->delete($id);
        if($MedicalRecord){
            return $this->ApiResponse(new MedicalRecordResource($MedicalRecord),"MedicalRecord deleted successfully",200);
        }}
/********************************************************************/
//##########################واحد بس ########################\\
    public function showMR($id){
            $query = MedicalRecord::where('id','=',$id)->findOrFail($id);
            // return new MedicalRecordResource($query);
            // $query = Patient::where('id','=',$id)->findOrFail($id)->pluck("name", "id");
            return($query);
    }
/********************************************************************/
/**************************change the status by id ************************* */
public function updateStatus_date(Request $request, $id)
{
    $medicalRecord = MedicalRecord::find($id);
    if (!$medicalRecord) {
        return response()->json(['message' => 'MedicalRecord not found'], 404);
    }
    if ($medicalRecord->status != MedicalRecordStatusEnum::waiting) {
        return $this->ApiResponse(null, "MedicalRecord is already approved", 400);
    }
    $validator = Validator::make($request->all(), [
        'date' => 'required|date',
    ]);
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }
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
}
/******************************************************** */
public function getMonthlyMedicalRecordCreations()
{
    // Retrieve all medical records
    $medicalRecords = MedicalRecord::all();

    // Group the medical records by the month of their creation
    $groupedMedicalRecords = $medicalRecords->groupBy(function ($medicalRecord) {
        return $medicalRecord->created_at->format('M');
    });
    // Initialize an empty array to hold the monthly counts
    $monthlyCounts = [];
    // Loop through each month of the year
    for ($i = 1; $i <= 12; $i++) {
        // Get the three-letter abbreviation for the month
        $monthAbbreviation = date("M", mktime(0, 0, 0, $i, 1));
        // Get the number of medical records created in this month
        $count = 0;
        if ($groupedMedicalRecords->has($monthAbbreviation)) {
            $count = $groupedMedicalRecords->get($monthAbbreviation)->count();
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
/*************************************************************************/
    private $queue;
    public function __construct() {
        $this->queue = new QueueWithPriority();
    }
//     public function getPercentageOfModelList(Request $request) {
//         // Enqueue the request with the current timestamp as priority
//         $this->queue->enqueue($request, time());

//         // Limit the number of requests that can be processed at a time
//         $maxRequests = 5;
//         if (count($this->queue) > $maxRequests) {
//             return response()->json([
//                 'data' => null,
//                 'message' => 'Too many requests in queue. Please try again later.'
//             ], 503);
//         }
//         // Process the request if it has the highest priority
//         $currentRequest = $this->queue->dequeue();
//         if ($currentRequest) {
//             $percentageOfModelList = MedicalRecord::join('patients', 'medical_records.patient_id', '=', 'patients.id')
//                 ->select('patients.name', 'medical_records.percentageofmodel')
//                 ->get()
//                 ->pluck('percentageofmodel', 'name')
//                 ->sortDesc()
//                 ->all();
//             return response()->json([
//                 'data' => $percentageOfModelList,
//                 'message' => 'Percentage of model list retrieved successfully'
//             ], 200);
//         }
//         // Return a placeholder response while waiting for the request to be processed
//         return response()->json([
//             'data' => null,
//             'message' => 'Request queued for processing. Please wait.'
//         ], 202);
// //     }
// public function getPercentageOfModelList(Request $request) {
//     // Get the percentage of model threshold from the request
//     $threshold = $request->input('threshold', 10);

//     // Calculate the priority based on the percentage of model and threshold values
//     $percentageOfModel = MedicalRecord::avg('percentageofmodel');
//     $priority = 100 - $percentageOfModel - $threshold;

//     // Enqueue the request with the calculated priority
//     $this->queue->enqueue($request, $priority);

//     // Limit the number of requests that can be processed at a time
//     $maxRequests = 5;
//     if (count($this->queue) > $maxRequests) {
//         return response()->json([
//             'data' => null,
//             'message' => 'Too many requests in queue. Please try again later.'
//         ], 503);
//     }

//     // Process the request if it has the highest priority
//     $currentRequest = $this->queue->dequeue();
//     if ($currentRequest) {
//         $percentageOfModelList = MedicalRecord::join('patients', 'medical_records.patient_id', '=', 'patients.id')
//             ->select('patients.name', 'medical_records.percentageofmodel')
//             ->get()
//             ->pluck('percentageofmodel', 'name')
//             ->sortDesc()
//             ->all();
//         return response()->json([
//             'data' => $percentageOfModelList,
//             'message' => 'Percentage of model list retrieved successfully'
//         ], 200);
//     }

//     // Return a placeholder response while waiting for the request to be processed
//     return response()->json([
//         'data' => null,
//         'message' => 'Request queued for processing. Please wait.'
//     ], 202);
// }
// use Illuminate\Support\Facades\Log;

public function getPercentageOfModelList() {
    try {
        // Retrieve all medical records from the database
        $medicalRecords = MedicalRecord::all();

        // Initialize an empty priority queue
        $queue = new SplPriorityQueue();

        // Loop through each medical record and add it to the queue with a priority based on the percentage of model value
        foreach ($medicalRecords as $record) {
            $priority = $record->percentageofmodel;
            if (isset($record->patient) && isset($record->patient->name)) {
                $data = [
                    'name' => $record->patient->name,
                    'percentageofmodel' => $record->percentageofmodel,
                    'priority' => $priority
                ];
                $queue->insert($data, $priority);
            }
        }

        // Initialize an empty array to hold the sorted results
        $result = [];

        // Loop through each item in the queue and add it to the result array
        while (!$queue->isEmpty()) {
            $item = $queue->extract();
            $result[] = $item;
        }

        // Return the sorted result array
        return $result;
    } catch (\Exception $e) {
        // Log any errors that occur during the execution of the function
        Log::error('Error in getPercentageOfModelList(): '.$e->getMessage());
        return [];
    }
}
/************************************************************* */
// public function getPercentageOfModelList() {
//     $percentageOfModelList = MedicalRecord::join('patients', 'medical_records.patient_id', '=', 'patients.id')
//         ->select('patients.name', 'medical_records.percentageofmodel')
//         ->get()
//         ->pluck('percentageofmodel', 'name')
//         ->sortDesc()
//         ->all();
//     return $percentageOfModelList;
// }
/********************************************************* */
// public function getPercentageOfModelList() {
//     ini_set('max_execution_time', 120); // Set the maximum execution time to 120 seconds
//     // Retrieve the list of patients with their corresponding model percentage from the database
//     $patients = Patient::join('medical_records', 'patients.id', '=', 'medical_records.patient_id')
//         ->select('patients.name', 'medical_records.percentageofmodel')
//         ->get();
//     $results = [];// Create a new array to store the results for each patient
//     // Apply the percentage of the model to each patient using the Round-Robin algorithm to prevent starvation
//     $timeSlice = 10; // Set the time slice to 10 milliseconds
//     $totalTime = array_sum($patients->pluck('percentageofmodel')->toArray());
//     $currentTime = 0;
//     while ($totalTime > 0) {
//         foreach ($patients as $patient) {
//             $percentage = $patient->percentageofmodel;
//             if ($percentage > 0) {
//                 if ($percentage > $timeSlice) {
//                     $percentage -= $timeSlice;
//                     $currentTime += $timeSlice;
//                 } else {
//                     $currentTime += $percentage;
//                     $percentage = 0;
//                 }
//                 $patient->percentageofmodel = $percentage;
//                 $totalTime -= $timeSlice;
//                 $result = [
//                     'name' => $patient->name,
//                     'percentageOfModel' => $patient->percentageofmodel,
//                     'result' => $percentage * 0.75,
//                     'currentTime' => $currentTime
//                 ];
//                 $results[] = $result;
//             }
//         }
//     }
//     return $results;
// }
// public function myControllerMethod()
// {
//     $results = $this->applyRR();
//     return response()->json($results);
// }
// /********************************************* */
//     public function getPatientPercentageList(){
//         $medicalRecords = MedicalRecord::all();
//         $patientPercentageList = [];

//         // Define scheduling constraints
//         $startTime = strtotime('10:00');
//         $endTime = strtotime('17:00'); // 5:00 PM
//         $interval = 1800; // 30 minutes in seconds

//         // Sort medical records by descending percentageofmodel value
//         $medicalRecords = $medicalRecords->sortByDesc('percentageofmodel');

//         // Iterate over medical records and schedule appointments for each patient
//         foreach ($medicalRecords as $record) {
//         $patient_id = $record->patient_id;
//         $percentageofmodel = $record->percentageofmodel;

//         // Initialize appointment time to null
//         $appointment_time = null;

//         // Iterate over available time slots and find the first available slot that doesn't conflict
//         for ($time = $startTime; $time <= $endTime; $time += $interval) {
//             $formattedTime = date('h:i A', $time);
//             $conflictFound = false;

//             // Check if there are any conflicting appointments at this time slot
//             foreach ($patientPercentageList as $existingAppointment) {
//                 if ($existingAppointment['time'] == $formattedTime) {
//                     $conflictFound = true;
//                     break;
//                 }
//             }
//             if (!$conflictFound) {
//                 $appointment_time = $formattedTime;
//                 break;
//             }
//         }
//         // Add appointment tuple to list if a slot was found
//         if ($appointment_time !== null) {
//             $tuple = [
//                 'patient_id' => $patient_id,
//                 'percentageofmodel' => $percentageofmodel,
//                 'time' => $appointment_time,
//             ];
//             $patientPercentageList[] = $tuple;
//         }
//     }
//     // Sort the list of tuples by descending percentageofmodel value
//     usort($patientPercentageList, function ($a, $b) {
//         return $b['percentageofmodel'] - $a['percentageofmodel'];
//     });
//     return $patientPercentageList;
// }
//##################################################\\
  // public function store(REQUEST $request){
    //     //validation
    //     $validator=Validator::make($request->all(),[
    //         'name'=>'required|max:255',
    //         'percentageofmodel'=>'required',
    //         'Hospital_id'=>'required',
    //         'patient_id'=>'required',
    //         // 'date' => 'required|date_format:F j, Y, g:i a',
    //         'date'=>'required',//
    //         'status'=>'nullable|in:Waiting ,Approved',
    //         // ['name','percentageofmodel','Hospital_id','patient_id','status','date'];
    //     ]);
    //     if($validator->fails()){
    //         return $this->ApiResponse(null,$validator->errors(),400);
    //     }
    //     $hospital = Hospital::find($validator['Hospital_id']);
    //     if (!$hospital) {
    //         return $this->ApiResponse(null, "Hospital not found", 404);
    //     }
    //       // Set the default value of the status field if it is not present in the request data
    //     if (!isset($validatedData['status'])) {
    //     $validatedData['status'] = MedicalRecordStatusEnum::Waiting;
    //     }
    //     $MedicalRecords=MedicalRecord::create($request->all());
    //     if($MedicalRecords){
    //         return $this->ApiResponse(new MedicalRecordResource($MedicalRecords),"MedicalRecord created successfully",201);
    //     }
    //     return $this->ApiResponse(null,"MedicalRecord not saved",400);
    // }
}
