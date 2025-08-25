<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $students = [
            [
                'name' => 'Ahmad Rizki Pratama',
                'nisn' => '0123456001',
                'birth_date' => '2015-03-15',
                'birth_place' => 'Jakarta',
                'gender' => 'male',
                'address' => 'Jl. Mawar No. 123, Jakarta Selatan',
                'parent_name' => 'Budi Pratama',
                'parent_phone' => '081234567890',
                'current_class' => 'Kelas 3A',
                'status' => 'active',
            ],
            [
                'name' => 'Siti Aisyah Putri',
                'nisn' => '0123456002',
                'birth_date' => '2016-07-22',
                'birth_place' => 'Bandung',
                'gender' => 'female',
                'address' => 'Jl. Melati No. 456, Bandung',
                'parent_name' => 'Hendra Gunawan',
                'parent_phone' => '081234567891',
                'current_class' => 'Kelas 2A',
                'status' => 'active',
            ],
            [
                'name' => 'Muhammad Fajar Sidiq',
                'nisn' => '0123456003',
                'birth_date' => '2017-11-08',
                'birth_place' => 'Surabaya',
                'gender' => 'male',
                'address' => 'Jl. Anggrek No. 789, Surabaya',
                'parent_name' => 'Indra Wijaya',
                'parent_phone' => '081234567892',
                'current_class' => 'Kelas 1A',
                'status' => 'active',
            ],
            [
                'name' => 'Dewi Sartika',
                'nisn' => '0123456004',
                'birth_date' => '2015-12-03',
                'birth_place' => 'Medan',
                'gender' => 'female',
                'address' => 'Jl. Dahlia No. 321, Medan',
                'parent_name' => 'Suharto',
                'parent_phone' => '081234567893',
                'current_class' => 'Kelas 3A',
                'status' => 'active',
            ],
            [
                'name' => 'Rendra Mahendra',
                'nisn' => '0123456005',
                'birth_date' => '2016-05-17',
                'birth_place' => 'Yogyakarta',
                'gender' => 'male',
                'address' => 'Jl. Sakura No. 654, Yogyakarta',
                'parent_name' => 'Bambang Sutrisno',
                'parent_phone' => '081234567894',
                'current_class' => 'Kelas 2A',
                'status' => 'active',
            ],
            [
                'name' => 'Nurul Fadilah',
                'nisn' => '0123456006',
                'birth_date' => '2017-09-25',
                'birth_place' => 'Makassar',
                'gender' => 'female',
                'address' => 'Jl. Kenanga No. 987, Makassar',
                'parent_name' => 'Abdullah Rahman',
                'parent_phone' => '081234567895',
                'current_class' => 'Kelas 1A',
                'status' => 'active',
            ],
        ];

        foreach ($students as $student) {
            Student::create($student);
        }
    }
}