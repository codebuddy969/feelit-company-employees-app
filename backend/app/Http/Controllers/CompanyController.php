<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;

use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'data' => Company::select('id', 'name', 'email')->get()
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
            'email' => 'required|email|unique:companies,email'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $company = Company::create([
                'name' =>  $request->input('name'),
                'email' =>  $request->input('email')
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Comapny could not be created'], 500);
        }

        return response()->json(['message' => 'Company created successfully', 'data' => $company]);
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
            'email' => 'required|email|unique:companies,email'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $company = Company::findOrFail($id);
            $company->update([
                'name' =>  $request->input('name'),
                'email' =>  $request->input('email')
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Comapny could not be updated'], 500);
        }
        
        return response()->json(['message' => 'Company updated successfully', 'data' => $company]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $data = json_decode($request->ids);

        Company::whereIn('id', $data)->delete();

        return response()->json(['message' => 'Companies deleted successfully']);
    }
}
