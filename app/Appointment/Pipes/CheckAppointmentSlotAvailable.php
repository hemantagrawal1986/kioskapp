<?php
namespace App\Appointment\Pipes;

use Closure;
use App\Appointment\AppointmentProcedure;
use App\Exceptions\SlotNotAvailableException;
use App\Models\Appointment;
use Exception;
use App\Models\AppointmentService;
use App\Exceptions\AttendeeAppointmentExistsException;

class CheckAppointmentSlotAvailable 
{
    public function handle(AppointmentProcedure &$procedure,Closure $next)
    {
        $backlog=5; //default app setup

        foreach($procedure->appointment->getServices() as $appt_service)
        {
            $total_appointments=AppointmentService::where("starts_on","<=",$appt_service["extra"]["ends_on"]->format("Y-m-d H:i:s"))
                            ->where("ends_on",">=",$appt_service["extra"]["starts_on"]->format("Y-m-d H:i:s"))
                            //->where("service_id","=",$appt_service["service"]->id)
                            ->when($procedure->appointment->id,function($query)
                            {
                                $query->where("appointment_id","<>",$procedure->appointment->id);
                            })
                            ->whereNotIn("status",["completed","closed","cancelled"])
                            ->count();

            if($total_appointments > $backlog)
            {
                
                throw New SlotNotAvailableException(<<<ERRORSTRING
                    Service {$appt_service["service"]->name} cannot be booked as {$total_appointments} attendees are active from {$appt_service["extra"]["starts_on"]->format("H:i")} to {$appt_service["extra"]["ends_on"]->format("H:i")}
                    ERRORSTRING
                );
            }
        }

        //check if appointment can be booked, return exception if attendee has an active appointment for the day
        if(isset($procedure->attendee->id))
        {
            $attendee_has_appt=Appointment::where("starts_on",">=",$procedure->appointment->starts_on->format("Y-m-d 00:00:00"))
                                ->where("ends_on","<=",$procedure->appointment->ends_on->format("Y-m-d 23:59:59"))
                                ->whereRelation("attendee","id",$procedure->attendee->id)
                                ->when($procedure->appointment->id,function($query)
                                {
                                    $query->where("id","<>",$procedure->appointment->id);
                                })
                                ->whereNotIn("status",["completed","closed","cancelled"])
                                ->get();
            
            if(count($attendee_has_appt) > 0)
            {
                
                throw New AttendeeAppointmentExistsException($procedure->attendee->firstname." ".$procedure->attendee->lastname . " Already Has Active Appointment At ".date("M d Y H:i",strtotime($attendee_has_appt->first()->starts_on)));
            }
        }

        return $next($procedure);
    }
}
?>