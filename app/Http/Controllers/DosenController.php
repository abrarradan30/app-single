<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DosenController extends Controller
{
    public function index() {
        return Inertia::render('Dosen/Index.jsx');
    }
}
