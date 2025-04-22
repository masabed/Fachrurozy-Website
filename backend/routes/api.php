<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserViewController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ArticleController;

// Authentication routes
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::get('/profile', [AuthController::class, 'profile'])->name('profile');
});

// User management routes with Spatie Permissions
Route::middleware('auth:api')->prefix('users')->group(function () {
    Route::get('/', [UserViewController::class, 'viewAllUser'])->middleware('permission:viewAllUser')->name('users.viewAllUser');
    Route::get('/{id}', [UserViewController::class, 'showUserProfile'])->middleware('permission:showUserProfile')->name('users.showUserProfile');
    Route::post('/addUser', [UserController::class, 'addUser'])->middleware('permission:addUser')->name('users.addUser');
    Route::put('/{id}', [UserController::class, 'updateUser'])->middleware('permission:editUser')->name('users.updateUser');
    Route::delete('/{id}/deleteUser', [UserController::class, 'deleteUser'])->middleware('permission:deleteUser')->name('users.deleteUser');
    Route::post('/{id}/change-password', [UserController::class, 'changePassword'])->middleware('permission:changePassword')->name('users.changePassword');
});


//Blogs 

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{id}', [ArticleController::class, 'show']);
//Article Management

Route::middleware(['auth:api'])->group(function () {
    Route::post('/articles', [ArticleController::class, 'store'])->middleware('permission:addArtikel');
    Route::put('/articles/{id}', [ArticleController::class, 'update'])->middleware('permission:editArtikel');
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy'])->middleware('permission:deleteArtikel');
});
