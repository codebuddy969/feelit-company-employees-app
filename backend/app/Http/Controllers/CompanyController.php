<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'companies' => Company::all()
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
        $validatedData = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'unique:companies,email'],
        ]);

        $company = Company::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
        ]);

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
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
        ]);

        $company = Company::findOrFail($id);
        $company->update([
            'name' =>  $request->input('name'),
            'email' =>  $request->input('email')
        ]);

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
