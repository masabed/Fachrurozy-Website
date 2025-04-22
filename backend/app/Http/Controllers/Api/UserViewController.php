<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserViewController extends Controller
{
    /**
     * Display a listing of all users with their roles (SuperAdmin only).
     */
    public function viewAllUser()
    {
        $authUser = auth()->user();

        if (!$authUser->hasRole('superAdmin')) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $users = User::with('roles')->get()->map(function ($user) {
            return [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'created_at' => $user->created_at,
                'roles'      => $user->roles->pluck('name'), // Extract only role names
            ];
        });

        return response()->json($users);
    }

    /**
     * Display a specific user profile (User can see their own profile, SuperAdmin can see all).
     */
    public function showUserProfile($id)
    {
        $authUser = auth()->user(); 

        // Convert $id to string to prevent comparison issues
        $id = (string) $id;

        // If the user is not a super admin and tries to access another user's data, deny access
        if (!$authUser->hasRole('superAdmin') && $authUser->id !== $id) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $user = User::with('roles')->select('id', 'name', 'email', 'created_at')->find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json([
            'id'         => $user->id,
            'name'       => $user->name,
            'email'      => $user->email,
            'created_at' => $user->created_at,
            'roles'      => $user->roles->pluck('name'), // Extract only role names
        ]);
    }
}
