<?php

namespace Database\Seeders;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
class CreateUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $users = [

            [
                'name'=>'User',
                'email'=>'user@itsolutionstuff.com',
                'type'=>0,
                'password'=> bcrypt('123456'),
            ],

            [
                'name'=>'Admin User',
                'email'=>'admin@itsolutionstuff.com',
                'type'=>1,
                'password'=> bcrypt('123456'),
            ],

            [
                'name'=>'doctor User',
                'email'=>'doctor@itsolutionstuff.com',
                'type'=> 2,
                'password'=> bcrypt('123456'),
                ],

            [
                'name'=>'hospital',
                'email'=>'ElsalamHospital@itsolutionstuff.com',
                'type'=>4,
                'password'=> bcrypt('123456'),
            ],

            [
                'name'=>'patient',
                'email'=>'patient@itsolutionstuff.com',
                'type'=>3,
                'password'=> bcrypt('123456'),
            ],

        ];

        foreach ($users as $key => $user) {
            User::create($user);
        }
    }
}