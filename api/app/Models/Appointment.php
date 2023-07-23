<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\AppointmentStatusEnum;//
use App\Casts\Json;
// \Carbon\Carbon::setToStringFormat('d-m-Y');
class Appointment extends Model
{
    use HasFactory;
    // protected $guarded=[]; //name gender phone patient_id  hospital_id date status
    protected $fillable = [
        'name',
        'phone',
        'gender',
        'patient_id',
        'Hospital_id',
        'date',
        'status'
    ];
    protected $enumCasts = [
        'status' => AppointmentStatusEnum::class,
    ];
    protected $attributes = [
        'status' => AppointmentStatusEnum::Scheduled,
    ];
    protected $casts = [
        'date' => 'datetime:Y-m-d H:i:s',
        // 'created_at' => 'datetime:Y-m-d H:i:s',
        // 'updated_at' => 'datetime:Y-m-d H:i:s',
        // 'date' => Json::class,
    ];

    // protected $dates = ['date'];
        public function getStatusAttribute($value)
        {
            $possibleStatuses = [
                AppointmentStatusEnum::Scheduled,
                AppointmentStatusEnum::Closed,
            ];
            if (!in_array($value, $possibleStatuses)) {
                return null;
            }
            return $value;
        }

    }
/********************************************** */

// //علاقه السجل والمريض
// public function medical_records()
// {
//     return $this->hasMany('App\Models\MedicalRecord', 'MedicalRecord_id');
// }

// //علاقه الميعاد والمريض
// public function appointments()
// {
//     return $this->hasMany('App\Models\appointments', 'appointment_id');
// }


// علاقه المستشفيات والمريض
// public function hospitals()
// {
//     return $this->hasMany('App\Models\hospitals', 'Hospital_id');
// }
// // doctors
//  //علاقه  الدكاتره والمريض
// public function doctors()
// {
//     return $this->hasMany('App\Models\doctors', 'doctor_id');
// }
    // protected $casts = [
        //     'status' => 'string'
        // ];
          // protected $casts = [
    //     'status' => AppointmentStatusEnum::class
    // ];

     // protected $dates = [
    //     'date',
    // ];
    //     protected function serializeDate(DateTimeInterface $date)
// {
//     return $date->format('Y-m-d');
// }
    // protected $dateFormat = 'U';
    // public function getFromDateAttribute($value) {
        // return \Carbon\Carbon::parse($value)->format('d-m-Y');
    // }
