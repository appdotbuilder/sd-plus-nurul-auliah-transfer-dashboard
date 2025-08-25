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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nisn')->unique();
            $table->date('birth_date');
            $table->string('birth_place');
            $table->enum('gender', ['male', 'female']);
            $table->string('address');
            $table->string('parent_name');
            $table->string('parent_phone');
            $table->string('current_class')->nullable();
            $table->enum('status', ['active', 'transferred_out', 'transferred_in'])->default('active');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('nisn');
            $table->index('name');
            $table->index('status');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};