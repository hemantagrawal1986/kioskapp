<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;

class StaffController extends Controller
{
    public function __construct() {}

    public function list()
    {
        $staff=Staff::orderBy("firstname")->get();

        return response()->json($staff,200);
    }
}
