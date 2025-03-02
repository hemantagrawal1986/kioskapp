<?php
namespace App\Appointment\Pipes;

use \App\Appointment\AppointmentProcedure;
use \App\Models\Attendee;
use Closure;
use \Illuminate\Support\Facades\Validator;
use \App\Exceptions\AttendeeNotValidException;
use \Illuminate\Validation\Rule;

class CheckAttendeeIsValid 
{
    public function handle(AppointmentProcedure &$procedure,Closure $next)
    {
        $validator=Validator::make($procedure->attendee->toArray(),[
            "firstname"=>"required|bail",
            "lastname"=>"required|bail",
            "phoneno"=>["bail","required",Rule::unique("attendee","phoneno")
                                        ->ignore($procedure->attendee->id)
                                        ->where( function($query) {
                                            $query->where("firstname",request()->firstname)
                                                ->where("lastname",request()->lastname);
                                        })
        ],    
        ]);

        
        if($validator->fails())
        {
           
            throw new AttendeeNotValidException($validator->errors()->first());
        }

        return $next($procedure);
    }
}
?>