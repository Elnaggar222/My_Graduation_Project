<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
class DoctorResource extends JsonResource
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
                'id' => $this->id,
                'name' => $this->name,
                'email'=> $this->email,
                'password' => $this->password,
                'gender' => $this->gender,
                'phone' => $this->phone,
                'description' => $this->description,
                'is_doctor' => $this->is_doctor,
                'created_at' => Carbon::now()->addHours(3)->format('F j, Y, g:i a'),'updated_at' => Carbon::now()->addHours(3)->format('F j, Y, g:i a'),
            ];
        }
}