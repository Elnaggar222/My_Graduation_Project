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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone');
            $table->string('gender');
            $table->bigInteger('Hospital_id')->unsigned()->defualt(1);
            $table->foreign('Hospital_id')->references('id')->on('hospitals')->onDelete('cascade');
            $table->bigInteger('patient_id')->unsigned();
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->datetime('date');//
            // $table->enum('status', ['Scheduled', 'Closed'])->default('Scheduled');//
            $table->string('status')->default('Scheduled');//
            $table->timestamps();
        });
        //name gender phone patient_id doctor_id  hospital_id date status
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appointments');
    }
};
