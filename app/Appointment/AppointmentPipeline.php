<?php
namespace App\Appointment;
use Illuminate\Pipeline\Pipeline;


class AppointmentPipeline extends Pipeline
{
    protected $pipes = [
        Pipes\CheckServiceValidity::class,
        Pipes\CheckAttendeeIsValid::class,
        Pipes\CheckAppointmentSlotAvailable::class,
        Pipes\SaveAttendee::class,
        Pipes\SaveAppointment::class,
    ];
}
?>