<?php

namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class HospitalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
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
        // return parent::toArray($request);
        return [
            // 'xx'=>$this->id,
            'id'=>$this->id,
            'name'=>$this->name,
            'email'=>$this->email,
            'password'=>$this->password,
            'contactno'=>$this->contactno,
            'is_hospital' =>$this->is_hospital,
            'created_at' => Carbon::now()->addHours(3)->format('F j, Y, g:i a'),
            'updated_at' => Carbon::now()->addHours(3)->format('F j, Y, g:i a'),
        ];
         //is_admin,is_doctor,is_patient,is_hospital
    }
}
