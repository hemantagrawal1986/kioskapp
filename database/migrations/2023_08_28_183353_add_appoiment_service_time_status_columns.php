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
            $table->timestamp("starts_on")->nullable();
            $table->timestamp("ends_on")->nullable();
            $table->string("status",10)->default("pending")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('appointment_service', function (Blueprint $table) {
            $table->dropColumn("starts_on");
            $table->dropColumn("ends_on");
            $table->dropColumn("status");

        });
    }
};
