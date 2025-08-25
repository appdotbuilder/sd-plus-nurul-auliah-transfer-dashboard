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
        Schema::create('transfer_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->foreignId('initiated_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('verified_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->enum('transfer_type', ['incoming', 'outgoing']);
            $table->string('origin_school');
            $table->string('destination_school');
            $table->text('transfer_reason');
            $table->date('transfer_date');
            $table->enum('status', ['submitted', 'verified', 'approved', 'rejected'])->default('submitted');
            $table->text('verification_notes')->nullable();
            $table->text('approval_notes')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('student_id');
            $table->index('status');
            $table->index('transfer_type');
            $table->index(['status', 'created_at']);
            $table->index(['transfer_type', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfer_requests');
    }
};