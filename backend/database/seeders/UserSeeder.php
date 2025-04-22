<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $superAdmin = User::create([
            'name' => 'superAdmin',
            'email' => 'superAdmin@vvip.com',
            'password'=> bcrypt('12345678')
        ]);
        $superAdmin->assignRole('superAdmin');

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@vvip.com',
            'password'=> bcrypt('12345678')
        ]);
        $admin->assignRole('admin');

        $adminPSE = User::create([
            'name' => 'adminPSE',
            'email' => 'adminPSE@vvip.com',
            'password'=> bcrypt('12345678')
        ]);
        $adminPSE->assignRole('adminPSE');

        $peserta = User::create([
            'name' => 'peserta_01',
            'email' => 'peserta01@vvip.com',
            'password'=> bcrypt('12345678')
        ]);
        $peserta->assignRole('peserta');
    }
}
