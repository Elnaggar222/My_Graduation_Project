<?php

namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class MedicalReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
    //id name  percentageofmodel  percentageofdoctor  Hospital_id  patient_id
    $carbonDate = Carbon::create(
        $this->year,
        $this->month,
        $this->day,
        $this->hour,
        $this->minute,
        $this->second,
        $this->timezone
    );

        return [
            // 'xx'=>$this->id,
            'id'=>$this->id,
            'Obstructive HCM'=>$this->Obstructive_HCM,
            'Gender'=>$this->Gender,
            'Syncope'=>$this->Syncope,
            'Dyspnea'=>$this->Dyspnea,
            'Fatigue'=>$this->Fatigue,
            'Presyncope'=>$this->Presyncope,
            'NYHA_Class'=>$this->NYHA_Class,
            'Atrial_Fibrillation'=>$this->Atrial_Fibrillation,
            'Hypertension'=>$this->Hypertension,
            'Beta_blocker'=>$this->Beta_blocker,
            'Ca_Channel_Blockers'=>$this->Ca_Channel_Blockers,
            'ACEI_ARB'=>$this->ACEI_ARB,
            'Coumadin'=>$this->Coumadin,
            //  'ACEI_ARB'=>$this->ACEI_ARB,
            'Max_Wall_Thick'=>$this->Max_Wall_Thick,
            'Septal_Anterior_Motion'=>$this->Septal_Anterior_Motion,
            'Mitral_Regurgitation'=>$this->Mitral_Regurgitation,
            'Ejection_Fraction'=>$this->Ejection_Fraction,
            'Hospital_id'=>$this->Hospital_id,
            'patient_id'=>$this->patient_id,
            'created_at' => Carbon::now()->addHours(3)->format('F j, Y, g:i a'),
            'updated_at' => Carbon::now()->addHours(3)->format('F j, Y, g:i a'),

        ];
    }
}