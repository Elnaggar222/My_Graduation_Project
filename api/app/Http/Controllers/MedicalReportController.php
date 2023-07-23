<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Resources\MedicalReportResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\MedicalReport;
class MedicalReportController extends Controller
{
    use ApiResponseTrait;
//##################################كل################\\
    public function index(){
        $MedicalReports=MedicalReportResource::collection(MedicalReport::get());
        return $this->ApiResponse($MedicalReports,"all done",200);
    }
//##################################واحد بس################\\
    public function show($id){
        $MedicalReport= MedicalReport::find($id);
        if($MedicalReport){
            return $this->ApiResponse(new MedicalReportResource($MedicalReport),"all done",200);
        }
        return $this->ApiResponse(null,"MedicalReport not found",404);
    }
//##################################################\\
    public function store(Request $request)
{
    // Check if the token is provided in the request headers
    if ($request->hasHeader('Authorization')) {
        // Extract the token from the Authorization header
        $token = str_replace('Bearer ', '', $request->header('Authorization'));

        // Verify the token and get the authenticated hospital
        $hospital = auth()->guard('hospital_api')->user();

        // Add the hospital ID to the request data
        $request->merge(['Hospital_id' => $hospital->id]);
    }
    // Validate the request data
    $validator = Validator::make($request->all(), [
        'Obstructive_HCM' => 'required',
        'Gender' => 'required',
        'Syncope' => 'required',
        'Dyspnea' => 'required',
        'Fatigue' => 'required',
        'Presyncope' => 'required',
        'NYHA_Class' => 'required',
        'Atrial_Fibrillation' => 'required',
        'Hypertension' => 'required',
        'Beta_blocker' => 'required',
        'Ca_Channel_Blockers' => 'required',
        'ACEI_ARB' => 'required',
        'Coumadin' => 'required',
        'Max_Wall_Thick' => 'required',
        'Septal_Anterior_Motion' => 'required',
        'Ejection_Fraction' => 'required',
        'Hospital_id' => 'required',
        'patient_id' => 'required',
    ]);
    // If the validation fails, return an error response
    if ($validator->fails()) {
        return $this->ApiResponse(null, $validator->errors(), 400);
    }
    // Create a new MedicalReport using the validated data
    $medicalReport = MedicalReport::create($request->all());
    // Return a JSON response with the new MedicalReport data
    if ($medicalReport) {
        return $this->ApiResponse(new MedicalReportResource($medicalReport), "MedicalReport created successfully", 201);
    }
    return $this->ApiResponse(null, "MedicalReport not saved", 400);
}
////////////////////////////////////////////////////////////////////////
    public function update(REQUEST $request,$id){
        //validation
        $validator=Validator::make($request->all(),[
            'Obstructive_HCM'=>'required',//
            'Gender'=>'required',
            'Syncope'=>'required',
            'Dyspnea'=>'required',
            'Fatigue'=>'required',
            'Presyncope'=>'required',
            'NYHA_Class'=>'required',
            'Atrial_Fibrillation'=>'required',
            'Hypertension'=>'required',
            'Beta_blocker'=>'required',
            'Ca_Channel_Blockers'=>'required',
            'ACEI_ARB'=>'required',
            'Coumadin'=>'required',
            'Max_Wall_Thick'=>'required',
            'Septal_Anterior_Motion'=>'required',
            'Ejection_Fraction'=>'required',
            'Hospital_id'=>'required'
        ]);
        if($validator->fails()){
            return $this->ApiResponse(null,$validator->errors(),400);
        }
        $MedicalReport=MedicalReport::find($id);
        if(!$MedicalReport){
            return $this->ApiResponse(null,"MedicalReport not found",400);
        }
        $MedicalReport->update($request->all());
        if($MedicalReport){
            return $this->ApiResponse(new MedicalReportResource($MedicalReport),"MedicalReport updated successfully",201);
        }
    }
//##################################################\\
    public function destroy($id){
        $MedicalReport=MedicalReport::find($id);
        if(!$MedicalReport){
            return $this->ApiResponse(null, "MedicalReport not found",404);
        }
        $MedicalReport->delete($id);
        if($MedicalReport){
            return $this->ApiResponse(new MedicalReportResource($MedicalReport),"MedicalReport deleted successfully",200);
        }
    }
//##################################################\\
}
//##################################################\\
//id name  percentageofmodel Hospital_id  patient_id