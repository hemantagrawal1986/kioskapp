<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Date;
use Tests\TestCase;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Appointment;

class AppointmentTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_save()
    {
        $carbon=Date::now();
        $appointment=new \App\Models\Appointment();
        $appointment->starts_on="2023-08-23 11:10:00";
        $appointment->attendee_id=1;
        $appointment->save();

        $this->assertEquals($appointment->starts_on,$carbon);
    }

    public function test_relation()
    {
        $appointment=new Appointment;

        $relation=$appointment->attendee();
       
        //$this->assertEquals($attendee->id,$appointment->attendee->id);

        $this->assertInstanceOf(BelongsTo::class, $relation);
        $this->assertEquals("attendee_id",$relation->getForeignKeyName());
        $this->assertEquals("id",$relation->getOwnerKeyName());
        //$this->assertEquals($appointment->getQuery(),$relation->query());
    }

    public function test_service()
    {
        $appointment=new Apppointment();
        
    }
}
