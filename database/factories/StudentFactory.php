<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'nisn' => $this->faker->unique()->numerify('##########'),
            'birth_date' => $this->faker->dateTimeBetween('-12 years', '-6 years')->format('Y-m-d'),
            'birth_place' => $this->faker->city(),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'address' => $this->faker->address(),
            'parent_name' => $this->faker->name(),
            'parent_phone' => $this->faker->phoneNumber(),
            'current_class' => $this->faker->randomElement(['Kelas 1A', 'Kelas 1B', 'Kelas 2A', 'Kelas 2B', 'Kelas 3A', 'Kelas 3B']),
            'status' => 'active',
        ];
    }
}