<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasColumn("attendee","searchtext"))
        {
            Schema::table('attendee', function (Blueprint $table) {
                $table->text("searchtext")->nullable();
            });
        }
       
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if(Schema::hasColumn("attendee","searchtext"))
        {
            Schema::table('attendee', function (Blueprint $table) {
                $table->dropColumn("searchtext");
            });
        }
    }
};
