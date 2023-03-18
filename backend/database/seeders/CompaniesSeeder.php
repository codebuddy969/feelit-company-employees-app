<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Company;
use Faker\Factory as Faker;

class CompaniesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Create 20 companies
        for ($i = 1; $i <= 20; $i++) {
            Company::create([
                'name' => $faker->company(),
                'email' => $faker->email()
            ]);
        }
    }
}
