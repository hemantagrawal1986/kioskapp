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
        if(!Schema::hasColumn("attendee","phoneno"))
        {
            Schema::table('attendee', function (Blueprint $table) {
                $table->string("phoneno",128)->nullable();
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
        if(!Schema::hasColumn("attendee","phoneno"))
        {
            Schema::table('attendee', function (Blueprint $table) {
                $table->dropColumn("phoneno");
            });
        }
    }
};
