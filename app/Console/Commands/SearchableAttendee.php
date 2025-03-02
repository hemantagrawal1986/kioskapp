<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Attendee;

class SearchableAttendee extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:searchable {object}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make Attendee Searchable';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        ($this->argument("object") == "attendee")

        && 
        (
            Attendee::lazyById()
            ->each(function($attendee)
            {
                $attendee->searchtext=$attendee->firstname." ".$attendee->lastname." ".$attendee->phoneno;
                $attendee->save();
            })
            
        );

        return Command::SUCCESS;
    }
}
