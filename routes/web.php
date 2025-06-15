<?php

use App\Http\Controllers\NoteBackupController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\Socialite\GoogleAuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('my-notes', NoteController::class);
});

Route::get('/google/redirect', [GoogleAuthController::class, 'index'])->name('auth.google');
Route::get('/google/callback', [GoogleAuthController::class, 'verify'])->name('auth.google.verify');

Route::get('/notes/export-text-raw', [NoteBackupController::class, 'exportTextRaw'])->name('notes.export-text-raw');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
