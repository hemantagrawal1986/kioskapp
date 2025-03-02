<?php
namespace App\Appointment\Pipes;


use App\Appointment\AppointmentProcedure;
use App\Models\Service;
use Closure;
use Carbon;

class CheckServiceValidity 
{
    public function handle(AppointmentProcedure &$procedure,Closure $next)
    {
        $procedure->appointment->ends_on=clone $procedure->appointment->starts_on;

        
        foreach($procedure->services as $service_id)
        {
            $modelservice=Service::findOrFail($service_id);

            $service_starts_on=clone $procedure->appointment->ends_on;
            $service_ends_on=clone $procedure->appointment->ends_on->addMinutes($modelservice->minute);

            
           // $procedure->appointment->ends_on->addMinutes($modelservice->minute);
            $procedure->appointment->addService($modelservice,["starts_on"=>$service_starts_on,"ends_on"=>$service_ends_on]);
            
        }

        //var_dump($procedure->appointment->starts_on);
       // echo "<br/>";
       // var_dump($procedure->appointment->ends_on);
        
        return $next($procedure);
    }
}
?>