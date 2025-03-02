<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ServiceController extends Controller
{
    //
    public function __construct() {}

    public function view()
    {
        
        //$services=Service::where("status","active")->orderBy("name")->get();       
        $services=Service::orderBy("name")->get();   

        return Inertia::render("Service/View",[
            "data"=>$services,
        ]);
    }

    public function store(Request $request)
    {

        Service::create($request->validate([
            "name"=>["required","unique:services"],
            "amount"=>["required"],
            "minute"=>["required","numeric","between:100"]
        ]));
        request()->session()->put("message","Service Created");
        return to_route("service.view");
    }

    public function create()
    {
        return inertia("Service/Add",[
            "data"=>[]
        ]);
    }

    public function save(Service $serv)
    {
        $serv->update(request()->validate([
            "name"=>[
                    "required",
                    Rule::unique("services")->ignore($serv->id)
                ],
            "amount"=>["required"],
            "minute"=>["required","numeric","between:5,240"]
        ]));
        request()->session()->put("message","Service Saved");

        return to_route("service.view");
    }

    public function edit(Service $serv)
    {
        return inertia("Service/Edit",[
            "data"=>$serv
        ]);
    }

    public function toggle(Service $serv,Request $request)
    {
        $serv->status=(fn()=>request()->get("suspend")?"inactive":"active")();
        $serv->update();
    }

    public function list()
    {
        $services=Service::where("status","=","active")->orderBy("name")->get();
        //sleep (20);
        return response()->json($services,200);
    }
}
