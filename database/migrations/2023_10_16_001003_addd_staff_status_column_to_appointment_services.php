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
        Schema::table('appointment_service', function (Blueprint $table) {
            $table->unsignedBigInteger("staff_id")->nullable();
            $table->foreign("staff_id")->references("id")->on("staff")->onDelete("set null")->onUpdate("no action");
            $table->timestamp("checked_time")->nullable();
            $table->timestamp("attend_time")->nullable();
            $table->timestamp("complete_time")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       // Schema::disableForeignKeyConstraints();

        $column_set=array("staff_id","checked_time","attend_time","complete_time");
        foreach($column_set as $item)
        {
            if(Schema::hasColumn("appointment_service",$item))
            {
                Schema::table('appointment_service', function (Blueprint $table) use($item) {
                  
                    if($item == "staff_id")
                    {
                        $table->dropForeign(["staff_id"]);
                    }
                    
                    $table->dropColumn($item);
                    
                    
                });
            }
        }

        //Schema::enableForeignKeyConstraints();
        
    }
};
