<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'data' => Role::select('id', 'name')->get()
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
            'name' => 'required|string'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $role = Role::create([
                'name' => $request->input('name')
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Role could not be created'], 500);
        }

        return response()->json(['message' => 'Role created successfully', 'data' => $role]);
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
            'name' => 'required|string'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $role = Role::findOrFail($id);
            $role->update([
                'name' =>  $request->input('name')
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Role could not be created'], 500);
        }

        return response()->json(['message' => 'Role updated successfully', 'data' => $role]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $data = json_decode($request->ids);

        Role::whereIn('id', $data)->delete();

        return response()->json(['message' => 'Roles deleted successfully']);
    }
}
