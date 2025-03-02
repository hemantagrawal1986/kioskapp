<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class AppointmentService extends Pivot
{
    public function __construct() {}

    public function appointment()
    {
        return $this->belongsTo("appointment","id","appointment");
    }

    public function service()
    {
        return $this->belongsTo("service","id","service");
    }
}
