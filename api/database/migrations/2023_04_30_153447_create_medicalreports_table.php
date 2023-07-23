<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medical_reports', function (Blueprint $table) {
            $table->id();
            $table->double('Obstructive_HCM');
            $table->double('Gender');
            $table->double('Syncope');
            $table->double('Dyspnea');
            $table->double('Fatigue');
            $table->double('Presyncope');
            $table->double('NYHA_Class');
            $table->double('Atrial_Fibrillation');
            $table->double('Hypertension');
            $table->double('Beta_blocker');
            $table->double('Ca_Channel_Blockers');
            $table->double('ACEI_ARB');
            $table->double('Coumadin');
            $table->double('Max_Wall_Thick');
            $table->double('Septal_Anterior_Motion');
            $table->double('Mitral_Regurgitation');
            $table->double('Ejection_Fraction');
            $table->bigInteger('Hospital_id')->unsigned();
            $table->foreign('Hospital_id')->references('id')->on('hospitals')->onDelete('cascade');
            $table->bigInteger('patient_id')->unsigned();
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medicalreports');
    }
};
