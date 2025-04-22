<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        // Modify model_id in model_has_roles
        Schema::table('model_has_roles', function (Blueprint $table) {
            $table->uuid('model_id')->change();
        });

        // Modify model_id in model_has_permissions
        Schema::table('model_has_permissions', function (Blueprint $table) {
            $table->uuid('model_id')->change();
        });
    }

    public function down()
    {
        // Revert model_id to BIGINT if needed
        Schema::table('model_has_roles', function (Blueprint $table) {
            $table->bigInteger('model_id')->unsigned()->change();
        });

        Schema::table('model_has_permissions', function (Blueprint $table) {
            $table->bigInteger('model_id')->unsigned()->change();
        });
    }
};
