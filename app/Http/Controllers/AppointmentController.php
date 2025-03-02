<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Attendee;
use Carbon\Carbon;
use App\Models\Appointment;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Appointment\AppointmentPipeline;
use App\Appointment\AppointmentProcedure;
use App\Http\Resources\AppointmentSlotResource;
use App\Models\Service;

class AppointmentController extends Controller
{
    public function __construct() {

    }

    public function reserve()
    {
        return Inertia::render("Appointment/Reserve");
    }

    public function todays()
    {
     
       //DB::enableQueryLog();
       //$attendees = Attendee::/*whereHas("appointment",function($query)
       //{
         //   return $query->where("starts_on",">=",Carbon::now()->format("Y-m-d 00:00:00"))
           //      ->where("ends_on","<=",Carbon::now()->format("Y-m-d 23:59:59"))
             //   ->whereNotIn("status",["cancel"]);
       //})
       //$attendees = Attendee::whereHas("latestAppointment")
                    //->with("latestAppointment:starts_on,appointment.attendee_id")
                    //->select(["id","firstname","lastname","title","phoneno"])

       

        $attendees=DB::table("attendee")
            ->leftJoin("appointment","appointment.attendee_id","=","attendee.id")
            ->select([
                "attendee.id as id","firstname","lastname","title","phoneno","appointment.id as appointment_id","starts_on","ends_on",
                DB::raw("CONCAT(firstname,' ',lastname,' ',phoneno,' | ',DATE_FORMAT(appointment.starts_on,'%h:%i %p')) as 'fullstring'"),
                DB::raw("DATE_FORMAT(appointment.starts_on,'%h:%i %p') as 'starts_on'")
            ])
            ->where("starts_on",">=",Carbon::now()->format("Y-m-d 00:00:00"))
           //->where("ends_on","<=",Carbon::now()->format("Y-m-d 23:59:59"))
            ->whereNotIn("appointment.status",["cancel"])
            ->orderBy("appointment.starts_on")
            //->groupBy("attendee.id")
       ->get();

       ///sleep(10);

      // dd(DB::getQueryLog());

       return response()->json($attendees,200);
       
    }

    public function services(Appointment $appointment)
    {
        return response()->json(
            $appointment->service()->withPivot(["staff_id","status"])->get(),200
        );
    }

    public function create(Attendee $attendee=NULL,Request $request)
    {
        /*$starts_on=Carbon::createFromFormat("Y-m-d H:i:s",request("date")." ".request("slot").":00");
        $ends_on=$starts_on->addMinutes(60);
        $backlog=5;
       // DB::enableQueryLog();
        $total_appointments=Appointment::where("starts_on","<=",$ends_on->format("Y-m-d H:i:s"))
                            ->where("ends_on",">=",$starts_on->format("Y-m-d H:i:s"))
                           ->whereNotIn("status",["completed","closed","cancelled"])
                           ->count();
        
       
        
        if($total_appointments>$backlog)
        {
            return redirect()->back()->withErrors(
            [
                "create"=>"This slot is blocked with ".$total_appointments." occupants" //.json_encode(DB::getQueryLog())
            ]);
        }*/

        
        $appointment=new Appointment();
        $appointment->starts_on=Carbon::createFromFormat("Y-m-d H:i:s",request("date")." ".request("slot").":00");
       
        $appointmentdata = app(AppointmentPipeline::class);

        try {
            $appointmentdata=$appointmentdata->send(new AppointmentProcedure(
                (new Attendee())
                ->fill([
                    "firstname"=>request("attendee.firstname"),
                    "lastname"=>request("attendee.lastname"),
                    "phoneno"=>request("attendee.phoneno"),
                    "id"=>optional($attendee)->id
                ]),
                $appointment,
                collect($request->input("services"))->pluck("id"),
            ))
            ->thenReturn();
        }
        catch(\App\Exceptions\SlotNotAvailableException $e)
        {
            return redirect()->back()->withErrors(
            [
                "create"=>$e->getMessage() //"This slot is blocked with ".$total_appointments." occupants" //.json_encode(DB::getQueryLog())
            ]);
        }
        catch(\App\Exceptions\AttendeeNotValidException $e)
        {
           
            return redirect()->back()->withErrors(
                [
                    "create"=>$e->getMessage() //"This slot is blocked with ".$total_appointments." occupants" //.json_encode(DB::getQueryLog())
                ]
            );
        }
        catch(\App\Exceptions\AttendeeAppointmentExistsException $e)
        {
           
            return redirect()->back()->withErrors(
                [
                    "create"=>$e->getMessage() //"This slot is blocked with ".$total_appointments." occupants" //.json_encode(DB::getQueryLog())
                ]
            );
        }
        catch(\Exception $e)
        {
            return redirect()->back()->withErrors(["create"=>$e->getMessage()]);
        }
        
      

        $starts_on=$appointmentdata->appointment->starts_on;
        $ends_on=$appointmentdata->appointment->ends_on;
        

        //appointment creation 
       // if($attendee === NULL)
      //  {
            /*request()->validate([
                "attendee.firstname"=>"required",
                "attendee.lastname"=>"required",
                "attendee.phoneno"=>["required","unique:attendee,phoneno"],
                "services"=>"required"          
            ]);*/

           // $attendee=Attendee::create([
              //  "firstname"=>request("attendee.firstname"),
              //  "lastname"=>request("attendee.lastname"),
              // "phoneno"=>request("attendee.phoneno"),
                
           // ]);
       // }
      // else
       // {
            /*request()->validate([
                "attendee.firstname"=>"required",
                "attendee.lastname"=>"required",
                "attendee.phoneno"=>["required",Rule::unique("attendee","phoneno")->ignore($attendee->id)],
                "services"=>"required"
            ]);*/

            //$attendee->update([
               // "firstname"=>request("attendee.firstname"),
              //  "lastname"=>request("attendee.lastname"),
              // "phoneno"=>request("attendee.phoneno"),
                
            //]);
       // }

        //$attendee->id
       // $starts_on=Carbon::createFromFormat("Y-m-d H:i:s",request("date")." ".request("slot").":00");

       
        //$appointment=new Appointment();
        //$appointment->starts_on=$starts_on->toDateTimeString();
        //$starts_on=$starts_on->addMinutes(60);
       // $appointment->ends_on=$ends_on->toDateTimeString();///$starts_on;
       // $appointment->attendee_id=$attendee->id;
        //$appointment->appointment_type_id=1;

        //$appointment->save();
        


        //$appointment->service()->sync(collect($request->input("services"))->pluck("id"));
        request()->session()->put("message","Appointment Saved");

        return to_route("appointment.reserve");
    }

    //do not touch this
    public function update(Attendee $attendee)
    {
        //appointment creation 

        $attendee=$attendee->update([
            "firstname"=>request("attendee.firstname"),
            "lastname"=>request("attendee.lastname"),
            "phoneno"=>request("attendee.phoneno")
        ]);

        request()->session()->put("message","Appointment Saved");
        return to_route(route("appointment.reserve"));
    }

    public function serve(Appointment $appointment,Service $service,$status) 
    {
       
        $response_code = 200;
        $response = [];
        $response["message"]=NULL;

        //check if appointment is in pending status

        if( ($appointment->status == "completed") || ($appointment->status == "cancel") ) 
        {
            $response_code=409;
            $response["message"]="Appointment Status Is Invalid";
        }

       
        $appointment_service=$appointment->service()
        ->where("service_id",$service->id)->first();

        
        
        $appointment_service->pivot->status=$status;
        $appointment_service->pivot->save();

        $response["message"]="ok";

        return response()->json($response,$response_code);
        
    }

    public function slots($datestr=NULL)
    {
    
        $interval=[];
        $interval["starts_on"]=date("Y-m-d 00:00:00",strtotime($datestr));
        $interval["ends_on"]= date("Y-m-d 23:59:59",strtotime($datestr));
        //DB::enableQueryLog();
        $appointments_for_date = Appointment::select(DB::raw("starts_on,count(starts_on) as 'count'"))
                    ->where("starts_on",">=",$interval["starts_on"]) 
                    ->where("ends_on","<=",$interval["ends_on"])
                    ->where("status","<>","cancelled")
                    ->groupBy("starts_on")
                    ->get();
                    
       // return redirect()->back()->withErrors(
       // [
       // //    "create"=>"This slot is blocked with occupants ".json_encode(DB::getQueryLog())
       // ]);

       // return response()->json(
        //     [
        //            "create"=>"This slot is blocked with occupants ".json_encode(DB::getQueryLog())
        //     ]
        //,500);

        //$transformedset=[];

        //foreach($appointments_for_date as $appt)
        //{
        //    $transformedset[date("G:i",strtotime($appt->starts_on))]=$appt->count;
       // }

        //return response()->json($transformedset);

         //   var_dump($appointments_for_date);

        //    echo "<hr/>";
       
        return response()->json(AppointmentSlotResource::collection($appointments_for_date));


    }
}
