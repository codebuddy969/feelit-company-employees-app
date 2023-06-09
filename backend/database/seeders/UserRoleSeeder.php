<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Role;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the admin role
        $role = Role::where('name', 'admin')->firstOrFail();

        // Get all users and assign the admin role to each one
        $users = User::all();
        foreach ($users as $user) {
            $user->roles()->sync([$role->id]);
        }
    }
}
