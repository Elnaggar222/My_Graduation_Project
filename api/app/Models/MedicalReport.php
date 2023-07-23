<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalReport extends Model
{
    use HasFactory;
    // protected $fillable=['Obstructive_HCM','Gender','Syncope','Dyspnea','Fatigue','Presyncope','NYHA_Class',
    // 'Atrial_Fibrillation','Hypertension','Beta_blocker','Ca_Channel_Blockers','ACEI_ARB','Coumadin',
    // 'Max_Wall_Thick','Septal_Anterior_Motion','Mitral_Regurgitation','Ejection_Fraction','Hospital_id','patient_id'];
    protected $guarded=[];
    // 'Ejection_Fraction'
    protected $casts = [
        // 'date' => 'datetime:Y-m-d H:i:s',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];
    //علاقه   المستشفيات والتقارير
    public function hospitals()
    {
        return $this->hasMany('App\Models\hospitals', 'Hospital_id');
    }

    public function patient()
    {
        return $this->belongsTo('App\Models\patients', 'patient_id');
    }
}

//hospoital   reports
//            hospita_id
//hasMany            belongsto


// $table->double('Obstructive_HCM');
// $table->double('Gender');
// $table->double('Syncope');
// $table->double('Dyspnea');
// $table->double('Fatigue');
// $table->double('Presyncope');
// $table->double('NYHA_Class');
// $table->double('Atrial_Fibrillation');
// $table->double('Hypertension');
// $table->double('Beta_blocker');
// $table->double('Ca_Channel_Blockers');
// $table->double('ACEI_ARB');
// $table->double('Coumadin');
// $table->double('Max_Wall_Thick');
// $table->double('Septal_Anterior_Motion');
// $table->double('Mitral_Regurgitation');
// $table->double('Ejection_Fraction');
// $table->bigInteger('Hospital_id')->unsigned();
// $table->foreign('Hospital_id')->references('id')->on('hospitals')->onDelete('cascade');
// $table->bigInteger('patient_id')->unsigned();
// $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
// $table->timestamps();
