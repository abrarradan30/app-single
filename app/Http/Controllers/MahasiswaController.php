<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mahasiswa = Mahasiswa::all();
        return Inertia::render('Mahasiswa/Index', ['mahasiswa' => $mahasiswa]);
    }

    public function formAdd()
    {
        return Inertia::render('Mahasiswa/FormTambah');
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
        $validateData = $request->validate([
            'tnim'  =>  'required|unique:mahasiswa,nim|max:7',
            'tnama' =>  'required',
            'tjenkel'   =>  'required',
            'talamat'   =>  'required'
        ], [], [
            'tnim'  =>  'NIM',
            'tnama' =>  'Nama Lengkap',
            'tjenkel'   =>  'Jenis Kelamin',
            'talamat'   =>  'Alamat'
        ]);

        $mahasiswa = new Mahasiswa();

        $mahasiswa->nim = $validateData['tnim'];
        $mahasiswa->nama_lengkap = $validateData['tnama'];
        $mahasiswa->jenkel = $validateData['tjenkel'];
        $mahasiswa->alamat = $validateData['talamat'];
        $mahasiswa->save();

        return redirect()->route('mahasiswa.index')->with('message', 'Data mahasiswa baru berhasil disimpan');
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
