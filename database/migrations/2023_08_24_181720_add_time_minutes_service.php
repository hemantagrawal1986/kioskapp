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
        if(!Schema::hasColumn("services","minutes"))
        {
            Schema::table('services', function (Blueprint $table) {
                $table->tinyInteger("minute");
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
        if(Schema::hasColumn("services","minute"))
        {
            Schema::table('services', function (Blueprint $table) {
                $table->tinyInteger("minute");
            });
        }
    }
};
