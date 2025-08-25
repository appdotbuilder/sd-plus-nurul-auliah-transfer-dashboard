<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transfer_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transfer_request_id')->constrained('transfer_requests')->onDelete('cascade');
            $table->string('document_name');
            $table->string('document_type'); // e.g., 'birth_certificate', 'report_card', 'photo'
            $table->string('file_path');
            $table->string('file_type'); // e.g., 'pdf', 'jpg', 'png'
            $table->integer('file_size');
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('transfer_request_id');
            $table->index('document_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfer_documents');
    }
};