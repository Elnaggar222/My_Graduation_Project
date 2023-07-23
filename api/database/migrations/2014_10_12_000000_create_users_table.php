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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('role_id')->default(1);//
            // $table->boolean('is_admin')->default(0);
            // $table->tinyInteger('type')->default(0);
            /* Users: 0=>User, 1=>Doctor, 2=>Patient ,3=>Hospital*/
            // $table->array('roles_name');// instead in casts in user model
            // $table->text('roles_name');
            // $table->string('Status', 10);
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};