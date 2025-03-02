<?php
namespace App\Appointment;
use App\Models\Attendee;
use App\Models\Appointment;

class AppointmentProcedure 
{
    public function __construct(
        public Attendee $attendee,
        public Appointment $appointment,
        public $services,
    ) 
    {
       
    }
}
?>