<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Attendee extends Model
{
    use HasFactory;

    protected $table="attendee";

    protected $fillable=["firstname","lastname","phoneno","title","id"];


    public function appointment()
    {
        return $this->hasMany(Appointment::class,"attendee_id","id");
    }

    public function latestAppointment()
    {
        return $this->hasOne(Appointment::class)->ofMany([],function($query)
        {
            $query->where("starts_on",">=",Carbon::now()->format("Y-m-d 00:00:00"))
                 ->where("ends_on","<=",Carbon::now()->format("Y-m-d 23:59:59"))
                ->whereNotIn("status",["cancel"]);
        });
    }
}
