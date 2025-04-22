<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Create a new user (SuperAdmin only)
     */
    public function addUser(Request $request)
    {
        $authUser = auth()->user();
        if (!$authUser->hasRole('superAdmin')) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|string|exists:roles,name', 
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::create([
            'id' => Str::uuid(),
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    /**
     * Update user information
     */
    public function editUser(Request $request, $id)
    {
        $authUser = auth()->user();
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if (!$authUser->hasRole('superAdmin') && $authUser->id !== $user->id) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user->update($request->only(['name', 'email']));

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    /**
     * Delete a user (SuperAdmin only)
     */
    public function deleteUser($id)
    {
        $authUser = auth()->user();
        if (!$authUser->hasRole('superAdmin')) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    /**
     * Change password (User can change their own, SuperAdmin can change any)
     */
    public function changePassword(Request $request, $id)
    {
        $authUser = auth()->user();
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if (!$authUser->hasRole('superAdmin') && $authUser->id !== $user->id) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Password changed successfully']);
    }
}
