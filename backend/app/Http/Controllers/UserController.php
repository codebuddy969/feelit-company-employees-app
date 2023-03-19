<?php

namespace App\Http\Controllers;

use SendGrid\Mail\Mail;
use SendGrid;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;

use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'data' => User::select('id', 'name', 'email')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'roles' => 'required|array',
            'roles.*' => 'integer',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $user = User::create([
                'name' =>  $request->input('name'),
                'email' =>  $request->input('email'),
                'password' => Hash::make($request->input('password'))
            ]);
            $user->roles()->sync($request->input('roles'));
        } catch (\Exception $e) {
            return response()->json(['error' => 'User could not be created'], 500);
        }

        $email = new Mail();
        $email->setFrom(env('MAIL_FROM_ADDRESS'), "Vlad Secrier");
        $email->setSubject("User Created");
        $email->addTo("mymailboxmd@gmail.com", "Recipient");
        $email->addContent("text/plain", "Hello, this is a test email from the app!");
    
        $sendgrid = new SendGrid(env('MAIL_USERNAME'));
    
        $sendgrid->send($email);

        return response()->json(['message' => 'User created successfully', 'data' => $user]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'roles' => 'required|array',
            'roles.*' => 'integer',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $user = User::findOrFail($id);
            $user->update([
                'name' =>  $request->input('name'),
                'email' =>  $request->input('email'),
                'password' => Hash::make($request->input('password'))
            ]);
            $user->roles()->sync($request->input('roles'));
        } catch (\Exception $e) {
            return response()->json(['error' => 'User could not be updated'], 500);
        }

        return response()->json(['message' => 'User updated successfully', 'data' => $user]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $ids = json_decode($request->ids);

        $users = User::whereIn('id', $ids)->get();

        $users->each(function ($user) {
            $user->roles()->detach();
        });

        User::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
