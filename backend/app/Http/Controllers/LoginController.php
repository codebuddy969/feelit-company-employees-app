<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if ($user->roles()->where('name', 'Admin')->exists()) {

                $expiresAt = Carbon::now()->addDays(7);

                $token = $user->createToken('Token')->plainTextToken;

                $user->tokens()->where('tokenable_id', $user->id)->latest('created_at')->first()->forceFill([
                    'last_used_at' => Carbon::now(),
                    'expires_at' => Carbon::now()->addMinutes(180),
                ])->save();

                return response()->json([
                    'id' => $user->id,
                    'token' => $token,
                    'expires_at' => $expiresAt->toDateTimeString(),
                ]);
            } else {
                return response()->json(['message' => 'User is not admin'], 401);
            }
        }

        return response()->json(['message' => 'Invalid login credentials'], 401);
    }
}
