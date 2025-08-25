<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TransferRequestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public welcome page showcasing the system
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard - main overview
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Student management routes
    Route::resource('students', StudentController::class);
    
    // Transfer request routes
    Route::resource('transfers', TransferRequestController::class);
    

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';