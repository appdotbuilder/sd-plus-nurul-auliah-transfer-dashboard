<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransferRequestRequest extends FormRequest
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
            'student_id' => 'required|exists:students,id',
            'transfer_type' => 'required|in:incoming,outgoing',
            'origin_school' => 'required|string|max:255',
            'destination_school' => 'required|string|max:255',
            'transfer_reason' => 'required|string|max:1000',
            'transfer_date' => 'required|date|after_or_equal:today',
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
            'student_id.required' => 'Please select a student.',
            'student_id.exists' => 'Selected student does not exist.',
            'transfer_type.required' => 'Transfer type is required.',
            'origin_school.required' => 'Origin school is required.',
            'destination_school.required' => 'Destination school is required.',
            'transfer_reason.required' => 'Transfer reason is required.',
            'transfer_date.required' => 'Transfer date is required.',
            'transfer_date.after_or_equal' => 'Transfer date must be today or in the future.',
        ];
    }
}