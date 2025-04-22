<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // List of permissions
        $permissions = [
            'addUser', 'editUser', 'deleteUser', 'viewAllUser',
            'addArtikel', 'editArtikel', 'deleteArtikel', 'viewArtikel',
            'editDataDiri', 'showUserProfile', 'changePassword'
        ];

        // Step 1: Ensure all permissions are created
        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name'       => $permission,
                'guard_name' => 'api',
            ]);
        }

        // Step 2: Ensure roles exist
        $roleSuperAdmin = Role::firstOrCreate(['name' => 'superAdmin', 'guard_name' => 'api']);
        $roleUser = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);

        // Step 3: Assign permissions to roles
        $roleSuperAdmin->syncPermissions($permissions);

        $roleUser->syncPermissions([
            'addArtikel', 'editArtikel', 'deleteArtikel', 'viewArtikel',
            'editDataDiri', 'showUserProfile', 'changePassword'
        ]);
    }
}
