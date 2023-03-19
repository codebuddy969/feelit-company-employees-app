<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [LoginController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->controller(CompanyController::class)->group(function(){

    Route::get('companies', 'index')->name('companies.index');

    Route::post('companies', 'store')->name('companies.store');

    Route::get('companies/create', 'create')->name('companies.create');

    Route::get('companies/{company}', 'show')->name('companies.show');

    Route::put('companies/{company}', 'update')->name('companies.update');

    Route::delete('companies/{company}', 'destroy')->name('companies.destroy');

    Route::get('companies/{company}/edit', 'edit')->name('companies.edit');

});