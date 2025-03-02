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
        if(!Schema::hasColumn("services","amount"))
        {
            Schema::table('services', function (Blueprint $table) {
                //
                $table->float("amount");
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
        if(Schema::hasColumn("services","amount"))
        {
            Schema::table('services', function (Blueprint $table) {
                $table->dropColumn("amount");
            });
        }
        
    }
};
