<?php

use App\Http\Controllers\Socialite\GoogleAuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/google/redirect', [GoogleAuthController::class, 'index'])->name('auth.google');
Route::get('/google/callback', [GoogleAuthController::class, 'verify'])->name('auth.google.verify');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
