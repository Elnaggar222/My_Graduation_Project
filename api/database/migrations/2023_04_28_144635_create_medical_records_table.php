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
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            // $table->string('name');
            $table->double('percentageofmodel');
            $table->bigInteger('Hospital_id')->unsigned();
            $table->foreign('Hospital_id')->references('id')->on('hospitals')->onDelete('cascade');
            $table->bigInteger('patient_id')->unsigned();
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->string('status')->default('waiting');
            // $table->dateTime('date')->default(null);
            $table->dateTime('date')->nullable()->default(null);
            $table->timestamps();
        });
    }

    //id name  percentageofmodel  percentageofdoctor  Hospital_id  patient_id
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medical_records');
    }
};

//appointment report
