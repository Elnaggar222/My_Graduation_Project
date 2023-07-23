<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Models\Appointment;
class AppointmentResource extends JsonResource
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
                'phone' => $this->phone,
                'gender' => $this->gender,
                'date' => Carbon::parse($this->date)->format('F j, Y, g:i a'),
                // 'date'=>$this->date,
                'Hospital_id' => $this->Hospital_id,
                'patient_id' => $this->patient_id,
                'status' => $this->status,
                'created_at' => Carbon::now()->addHours(3)->format('F j, Y, g:i a'),
                'updated_at' => Carbon::now()->addHours(3)->format('F j, Y, g:i a'),

            ];
        }
}