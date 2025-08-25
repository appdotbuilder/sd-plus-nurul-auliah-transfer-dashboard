<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\TransferRequest;
use App\Models\User;
use Illuminate\Database\Seeder;

class TransferRequestSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $students = Student::all();
        $teachers = User::where('role', 'teacher')->get();
        $admin = User::where('role', 'school_admin')->first();

        if ($students->count() > 0 && $teachers->count() > 0) {
            // Create some sample transfer requests
            $transfers = [
                [
                    'student_id' => $students->first()->id,
                    'initiated_by' => $teachers->first()->id,
                    'transfer_type' => 'outgoing',
                    'origin_school' => 'SD PLUS NURUL AULIA',
                    'destination_school' => 'SD Negeri 01 Jakarta',
                    'transfer_reason' => 'Orang tua pindah tugas ke Jakarta',
                    'transfer_date' => now()->addDays(30),
                    'status' => 'submitted',
                ],
                [
                    'student_id' => $students->skip(1)->first()->id,
                    'initiated_by' => $teachers->skip(1)->first()->id,
                    'transfer_type' => 'incoming',
                    'origin_school' => 'SD Negeri 05 Bandung',
                    'destination_school' => 'SD PLUS NURUL AULIA',
                    'transfer_reason' => 'Keluarga pindah domisili ke sekitar sekolah',
                    'transfer_date' => now()->addDays(15),
                    'status' => 'verified',
                    'verified_by' => $admin->id,
                    'verified_at' => now()->subDays(2),
                    'verification_notes' => 'Dokumen lengkap dan sesuai persyaratan',
                ],
                [
                    'student_id' => $students->skip(2)->first()->id,
                    'initiated_by' => $admin->id,
                    'transfer_type' => 'outgoing',
                    'origin_school' => 'SD PLUS NURUL AULIA',
                    'destination_school' => 'SD Islam Al-Azhar Surabaya',
                    'transfer_reason' => 'Permintaan orang tua untuk sekolah Islam',
                    'transfer_date' => now()->addDays(45),
                    'status' => 'approved',
                    'verified_by' => $admin->id,
                    'verified_at' => now()->subDays(5),
                    'verification_notes' => 'Semua persyaratan terpenuhi',
                    'approved_by' => $admin->id,
                    'approved_at' => now()->subDays(1),
                    'approval_notes' => 'Mutasi disetujui, selamat menempuh pendidikan di sekolah baru',
                ],
            ];

            foreach ($transfers as $transfer) {
                TransferRequest::create($transfer);
            }
        }
    }
}