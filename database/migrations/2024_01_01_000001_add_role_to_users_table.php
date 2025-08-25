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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['school_admin', 'teacher', 'district_operator'])->default('teacher')->after('email');
            $table->string('school_name')->nullable()->after('role');
            $table->string('class_assigned')->nullable()->after('school_name');
            $table->boolean('is_active')->default(true)->after('class_assigned');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'school_name', 'class_assigned', 'is_active']);
        });
    }
};