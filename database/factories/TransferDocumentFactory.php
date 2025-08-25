<?php

namespace Database\Factories;

use App\Models\TransferRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TransferDocument>
 */
class TransferDocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $documentTypes = ['birth_certificate', 'report_card', 'photo', 'family_card', 'medical_record'];
        $documentType = $this->faker->randomElement($documentTypes);
        
        $fileTypes = ['pdf', 'jpg', 'png'];
        $fileType = $this->faker->randomElement($fileTypes);
        
        return [
            'transfer_request_id' => TransferRequest::factory(),
            'document_name' => $this->getDocumentName($documentType),
            'document_type' => $documentType,
            'file_path' => 'documents/' . $this->faker->uuid() . '.' . $fileType,
            'file_type' => $fileType,
            'file_size' => $this->faker->numberBetween(100000, 5000000), // 100KB to 5MB
            'uploaded_by' => User::inRandomOrder()->first()->id ?? User::factory(),
        ];
    }

    /**
     * Get a readable document name based on type.
     */
    protected function getDocumentName(string $type): string
    {
        $names = [
            'birth_certificate' => 'Akta Kelahiran',
            'report_card' => 'Rapor Semester Terakhir',
            'photo' => 'Pas Foto 3x4',
            'family_card' => 'Kartu Keluarga',
            'medical_record' => 'Surat Keterangan Sehat',
        ];

        return $names[$type] ?? 'Dokumen Pendukung';
    }
}