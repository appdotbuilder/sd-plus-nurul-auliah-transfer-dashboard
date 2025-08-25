<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create School Admin
        User::create([
            'name' => 'Admin Sekolah',
            'email' => 'admin@sdnurulaulia.sch.id',
            'password' => Hash::make('password'),
            'role' => 'school_admin',
            'school_name' => 'SD PLUS NURUL AULIA',
            'is_active' => true,
        ]);

        // Create Teachers
        $teachers = [
            [
                'name' => 'Ibu Siti Nurhaliza',
                'email' => 'siti@sdnurulaulia.sch.id',
                'class_assigned' => 'Kelas 1A',
            ],
            [
                'name' => 'Bapak Ahmad Fauzi',
                'email' => 'ahmad@sdnurulaulia.sch.id',
                'class_assigned' => 'Kelas 2A',
            ],
            [
                'name' => 'Ibu Rina Kartika',
                'email' => 'rina@sdnurulaulia.sch.id',
                'class_assigned' => 'Kelas 3A',
            ],
        ];

        foreach ($teachers as $teacher) {
            User::create([
                'name' => $teacher['name'],
                'email' => $teacher['email'],
                'password' => Hash::make('password'),
                'role' => 'teacher',
                'school_name' => 'SD PLUS NURUL AULIA',
                'class_assigned' => $teacher['class_assigned'],
                'is_active' => true,
            ]);
        }

        // Create District Operator
        User::create([
            'name' => 'Operator Dinas Pendidikan',
            'email' => 'operator@dinas.go.id',
            'password' => Hash::make('password'),
            'role' => 'district_operator',
            'school_name' => null,
            'is_active' => true,
        ]);
    }
}