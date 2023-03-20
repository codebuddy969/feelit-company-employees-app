<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'company_id' => 1,
                'name' => 'Vlad Secrier',
                'email' => 'admin@admin.com',
                'password' => Hash::make('password'),
            ],
            [
                'company_id' => 1,
                'name' => 'Vlad Secrier',
                'email' => 'vlad@mail.com',
                'password' => Hash::make('password'),
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
