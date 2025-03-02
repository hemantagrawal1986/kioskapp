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
      
        Schema::create('appointment_service', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("appointment_id")->nullable();
            $table->foreign("appointment_id")->references("id")->on("appointment");
            $table->unsignedBigInteger("service_id")->nullable();
            $table->foreign("service_id")->references("id")->on("services");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("appointment_service");
        
    }
};
