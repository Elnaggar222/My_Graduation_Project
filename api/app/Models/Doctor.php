<?php

namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Doctor extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'gender',
        'description',
        'is_doctor'
    ];
//is_admin,is_doctor,is_patient,is_hospital
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_doctor' => 'boolean', // add this line
    ];

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    ////////////////////////////////////////////////////////////////////////////////////

    //علاقه السجل والمريض
public function medical_records()
{
    return $this->hasMany('App\Models\MedicalRecord', 'MedicalRecord_id');
}

//علاقه الميعاد والمريض
public function appointments()
{
    return $this->hasMany('App\Models\Appointment', 'appointment_id');
}


// علاقه المستشفيات والمريض
public function hospitals()
{
    return $this->hasMany('App\Models\Hospital', 'Hospital_id');
}
// doctors
 //علاقه  الدكاتره والمريض
public function doctors()
{
    return $this->hasMany('App\Models\Doctor', 'doctor_id');
}


}