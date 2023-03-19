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

    Route::delete('companies', 'destroy')->name('companies.destroy');

    Route::get('companies/{company}/edit', 'edit')->name('companies.edit');

});

Route::middleware('auth:sanctum')->controller(RoleController::class)->group(function(){

    Route::get('roles', 'index')->name('roles.index');

    Route::post('roles', 'store')->name('roles.store');

    Route::get('roles/create', 'create')->name('roles.create');

    Route::get('roles/{role}', 'show')->name('roles.show');

    Route::put('roles/{role}', 'update')->name('roles.update');

    Route::delete('roles', 'destroy')->name('roles.destroy');

    Route::get('roles/{role}/edit', 'edit')->name('roles.edit');
});

Route::middleware('auth:sanctum')->controller(UserController::class)->group(function(){

    Route::get('employees', 'index')->name('employees.index');

    Route::post('employees', 'store')->name('employees.store');

    Route::get('employees/create', 'create')->name('employees.create');

    Route::get('employees/{employee}', 'show')->name('employees.show');

    Route::put('employees/{employee}', 'update')->name('employees.update');

    Route::delete('employees', 'destroy')->name('employees.destroy');

    Route::get('employees/{employee}/edit', 'edit')->name('employees.edit');
});