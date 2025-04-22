<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Register a new user with role assignment.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|string|exists:roles,name,guard_name,api' // Validate role existence
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Create new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign role
        $user->assignRole($request->role);

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
            'roles' => $user->getRoleNames()
        ], 201);
    }

    /**
     * User Login
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials.'], 401);
        }

        return response()->json([
            'message' => 'Login successful.',
            'token' => $token,
            'user' => auth()->user(),
            'role' => auth()->user()->getRoleNames()->first() // Returns only one role name
        ]);
    }
    /**
     * Get Authenticated User Profile
     */
    public function profile()
    {
        return response()->json([
            'user'  => auth()->user(),
            'roles' => auth()->user()->getRoleNames(),
        ]);
    }

    /**
     * Refresh JWT Token
     */
    public function refresh()
    {
        return response()->json([
            'token' => auth()->refresh(),
        ]);
    }

    /**
     * User Logout
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out.']);
    }
}
