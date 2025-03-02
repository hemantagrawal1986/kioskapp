<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Appointment extends Model
{
    use HasFactory;

    protected $table="appointment";

    protected $attributes_extra = [
        "services"=>[]
    ];

    public function service()
    {
        return $this->belongsToMany(Service::class,"appointment_service","appointment_id","service_id");
    }

    public function attendee()
    {
        return $this->belongsTo(Attendee::class,"attendee_id","id");
    }

    public function addService(Service $service,$extra)
    {
        array_push($this->attributes_extra["services"],["service"=>$service,"extra"=>$extra]);
    }

    public function syncService()
    {
        //$this->service()->sync($this->attributes_extra["services"]);
        $this->service()->detach();
        foreach($this->attributes_extra["services"] as $item)
        {
            $this->service()->save($item["service"],$item["extra"]);
        }   
    }

    public function getServices()
    {
        return $this->attributes_extra["services"];
    }
}
