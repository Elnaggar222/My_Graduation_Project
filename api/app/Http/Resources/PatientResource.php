<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
class PatientResource extends JsonResource
{
    public function toArray($request)
        {
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
                //name email password phone gender is_patient
                'id' => $this->id,
                'name' => $this->name,
                'email'=> $this->email,
                'phone' => $this->phone,
                'gender' => $this->gender,
                'is_patient' => $this->is_patient,
                'created_at' => Carbon::now()->addHours(3)->format('F j, Y, g:i a'),

            'updated_at' => Carbon::now()->addHours(3)->format('F j, Y, g:i a'),
            ];
        }
}
