<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\MedicalRecordStatusEnum;
// use App\Casts\Json;
class MedicalRecord extends Model
{
    use HasFactory;
    protected $fillable=['percentageofmodel','Hospital_id','patient_id','status','date'];
    /*******************************************************/
    protected $enumCasts = [
        'status' => MedicalRecordStatusEnum::class,
    ];
    protected $attributes = [
        'status' => MedicalRecordStatusEnum::waiting,
    ];
    // protected $dates = ['date'];
    protected $casts = [
        'date' => 'datetime:Y-m-d H:i:s',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];
        public function getStatusAttribute($value)
        {
            $possibleStatuses = [
                MedicalRecordStatusEnum::waiting,
                MedicalRecordStatusEnum::Approved,
            ];
            if (!in_array($value, $possibleStatuses)) {
                return null;
            }
            return $value;
        }
/************************************************************* */
    //علاقه   المستشفيات والداكتره
    public function hospitals()
    {
        return $this->hasMany('App\Models\hospitals', 'Hospital_id');
    }

    public function patients()
    {
        return $this->hasMany('App\Models\patients', 'patient_id');
    }
}
/************************************************** */

// // علاقه دكتور و ميعاد
// public function appointments()
// {
//     return $this->hasMany('App\Models\appointments', 'appointment_id');
// }
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
 // const Waiting = 'waiting';
    // const Approved = 'approved';
    // protected $casts = [
    //     'date' => 'datetime:Y-m-d H:i:s',
    //     'created_at' => 'datetime:Y-m-d',
    //     // 'date' => Json::class,
    // ];
