<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendee;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AttendeeController extends Controller
{
    public function __construct() {}

    public function search(String $searchkey)
    {
        //DB::enableQueryLog();
        $dbselectappointment=DB::raw(
            "select COALESCE(date_format(min(starts_on),' | %a %b %d %h:%i %p'),' | Book Now') 
            from appointment where 
            attendee_id=attendee.id and starts_on>='".Carbon::now()."'"
        );
        return response()->json(
            Attendee::where("searchtext","like","%".$searchkey."%")
            ->select([
                "id",
                "title",
                "firstname",
                "lastname",
                "phoneno",
                DB::raw("CONCAT(firstname,' ',lastname,' ',phoneno,(".$dbselectappointment.")) as 'fullstring'"),
            ])->orderBy("firstname")->get(),200);

       // dd(DB::getQueryLog());
    }
}
