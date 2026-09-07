<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\EventController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Routes (Bisa diakses tanpa login)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Public Event Routes (Melihat list & detail event)
Route::apiResource('events', EventController::class)->only(['index', 'show']);

// Protected Routes (Wajib menyertakan Bearer Token)
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth & Profile Routes
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Route Kelola Event Admin (Create, Update, Delete)
    Route::apiResource('events', EventController::class)->except(['index', 'show']);

    // Route Booking Tiket (Untuk User / Customer)
    Route::get('/bookings', [BookingController::class, 'index']);          // Get riwayat user login
    Route::post('/bookings', [BookingController::class, 'store']);        // Buat pesanan baru
    Route::get('/bookings/{booking}', [BookingController::class, 'show']); // Detail pesanan

    // Route Rekap Transaksi Admin (Untuk Menampilkan Seluruh Transaksi)
    Route::get('/admin/bookings', [BookingController::class, 'allBookings']);
});