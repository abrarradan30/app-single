<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\MataKuliahController;
use App\Http\Controllers\MahasiswaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [HomeController::class, 'index']);
Route::get('/dosen', [DosenController::class, 'index']);
Route::get('/matakuliah', [MataKuliahController::class, 'index']);
Route::get('mahasiswa/add', [MahasiswaController::class, 'formAdd']);
Route::resource('mahasiswa', MahasiswaController::class);
