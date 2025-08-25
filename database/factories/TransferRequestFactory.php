<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TransferRequest>
 */
class TransferRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $transferType = $this->faker->randomElement(['incoming', 'outgoing']);
        
        return [
            'student_id' => Student::factory(),
            'initiated_by' => User::where('role', '!=', 'district_operator')->inRandomOrder()->first()->id ?? User::factory(),
            'transfer_type' => $transferType,
            'origin_school' => $transferType === 'outgoing' ? 'SD PLUS NURUL AULIA' : $this->faker->company() . ' Elementary School',
            'destination_school' => $transferType === 'incoming' ? 'SD PLUS NURUL AULIA' : $this->faker->company() . ' Elementary School',
            'transfer_reason' => $this->faker->paragraph(3),
            'transfer_date' => $this->faker->dateTimeBetween('now', '+3 months'),
            'status' => $this->faker->randomElement(['submitted', 'verified', 'approved', 'rejected']),
        ];
    }

    /**
     * Set the transfer request as submitted.
     */
    public function submitted()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'submitted',
                'verified_by' => null,
                'approved_by' => null,
                'verified_at' => null,
                'approved_at' => null,
                'verification_notes' => null,
                'approval_notes' => null,
            ];
        });
    }

    /**
     * Set the transfer request as verified.
     */
    public function verified()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'verified',
                'verified_by' => User::where('role', 'school_admin')->inRandomOrder()->first()->id ?? null,
                'verified_at' => $this->faker->dateTimeBetween('-1 week', 'now'),
                'verification_notes' => $this->faker->sentence(),
                'approved_by' => null,
                'approved_at' => null,
                'approval_notes' => null,
            ];
        });
    }

    /**
     * Set the transfer request as approved.
     */
    public function approved()
    {
        return $this->state(function (array $attributes) {
            $verifiedAt = $this->faker->dateTimeBetween('-2 weeks', '-1 week');
            
            return [
                'status' => 'approved',
                'verified_by' => User::where('role', 'school_admin')->inRandomOrder()->first()->id ?? null,
                'verified_at' => $verifiedAt,
                'verification_notes' => $this->faker->sentence(),
                'approved_by' => User::whereIn('role', ['school_admin', 'district_operator'])->inRandomOrder()->first()->id ?? null,
                'approved_at' => $this->faker->dateTimeBetween($verifiedAt, 'now'),
                'approval_notes' => $this->faker->sentence(),
            ];
        });
    }
}