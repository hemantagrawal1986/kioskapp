<?php
namespace App\Appointment\Pipes;

use \App\Appointment\AppointmentProcedure;
use Closure;
use \App\Models\Attendee;

class SaveAttendee
{
    public function handle(AppointmentProcedure &$procedure,Closure $next)
    {
        if(isset($procedure->attendee->id))
        {
            $attendee=Attendee::findOrFail($procedure->attendee->id);   
            $attendee->update($procedure->attendee->toArray());
        }
        else
        {
            $procedure->attendee->save();
        }

        return $next($procedure);
    }
}
?>