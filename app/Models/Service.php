<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable=[
        "name","status","amount","minute"
    ];

    public function appointment()
    {
        return $this->hasMany(Appointment::class,"appointment_service","service_id","appointment_id");
    }
}
