<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'nisn' => 'required|string|unique:students,nisn|max:10',
            'birth_date' => 'required|date|before:today',
            'birth_place' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'address' => 'required|string|max:500',
            'parent_name' => 'required|string|max:255',
            'parent_phone' => 'required|string|max:20',
            'current_class' => 'nullable|string|max:20',
            'status' => 'in:active,transferred_out,transferred_in',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Student name is required.',
            'nisn.required' => 'NISN is required.',
            'nisn.unique' => 'This NISN is already registered.',
            'birth_date.required' => 'Birth date is required.',
            'birth_date.before' => 'Birth date must be before today.',
            'birth_place.required' => 'Birth place is required.',
            'gender.required' => 'Gender is required.',
            'address.required' => 'Address is required.',
            'parent_name.required' => 'Parent name is required.',
            'parent_phone.required' => 'Parent phone is required.',
        ];
    }
}