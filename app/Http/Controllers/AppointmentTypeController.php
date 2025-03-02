<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use App\Models\AppointmentType;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class AppointmentTypeController extends Controller
{
    //
    public function __construct()
    {}

    public function store(Request $request)
    {
        AppointmentType::create($request->validate([
            "type"=>["required","unique:appointment_type"]
        ]));      

        request()->session()->put("message","Appointment Type Created");

       return to_route("home");
    }

    public function create(Request $request)
    {
        return Inertia::render("AppointmentType/Add");
    }

    public function save(AppointmentType $appointmenttype)
    {
    
        $appointmenttype->update(request()->validate([
            "type"=>[
                "required",
                Rule::unique("appointment_type")->ignore($appointmenttype->id)
            ]
        ]));
        request()->session()->put("message","Appointment Type Saved");
       return to_route("home");
    }

    public function view()
    {
        $data=AppointmentType::orderBy("type");

        return Inertia::render("AppointmentType/View",["data"=>AppointmentType::orderBy("type")->get()]);
    }

    public function edit(AppointmentType $appointmenttype)
    {
      
        return Inertia::render("AppointmentType/Edit",["data"=>$appointmenttype]);
    }
}
