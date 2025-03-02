<?php
namespace App\Appointment\Pipes;
use Closure;
use \App\Appointment\AppointmentProcedure;

class SaveAppointment
{
    public function handle(AppointmentProcedure &$procedure,Closure $next)
    {
        $procedure->appointment->attendee_id=$procedure->attendee->id;
        $procedure->appointment->appointment_type_id=1;
        $procedure->appointment->save();
        $procedure->appointment->syncService();

        return $next($procedure);
    }
}
?>