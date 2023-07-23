<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\MedicalRecord;
use Carbon\Carbon;
class MedicalRecordResource extends JsonResource
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
        return [
            'id'=>$this->id,
            // 'name'=>$this->name,
            'percentageofmodel'=>$this->percentageofmodel,
            'Hospital_id'=>$this->Hospital_id,
            'patient_id'=>$this->patient_id,
            'status'=>$this->status,
            'date'=>$this->date,
            // 'date' => Carbon::parse($this->date)->format('F j, Y, g:i a'),
            'created_at' => Carbon::now()->addHours(3)->format('F j, Y, g:i a'),
            // 'created_at' => Carbon::parse($this->date)->format('F j, Y, g:i a'),
            'updated_at' => Carbon::now()->addHours(3)->format('F j, Y, g:i a'),
        ];
    }
}
/************************************************* */
 // use Carbon\Carbon;
  // 'created_at' => $this->created_at,
            // 'created_at' =>datetime.datetime.now(),
            // 'created_at' => Carbon::now()->format('F j, Y, g+3:i a'),
              // 'date' => Carbon::parse($this->date)->format('F j, Y, g:i a'),
             // Format the date field
            // 'created_at' =>Carbon::parse($this->created_at)->format('F j, Y, g:i a'),
            // 'updated_at' => $this->updated_at,
            // 'updated_at' =>Carbon::parse($this->updated_at)->format('F j, Y, g:i a'),
            // 'updated_at' => Carbon::now()->format('F j, Y, g:i a'),
        // datetime.datetime.now()
/************/
  // 'date' => $this->date->format('F j, Y, g:i a'),
  // 'date'=>$this->date,
// $date->format('Y-m-d H:i:s');
// ['name','percentageofmodel','Hospital_id','patient_id','status','date'];
// 'xx'=>$this->id,
