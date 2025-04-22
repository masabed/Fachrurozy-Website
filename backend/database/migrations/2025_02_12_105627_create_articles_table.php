<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->uuid('id')->primary(); // ✅ UUID primary key
            $table->string('title'); // ✅ Title of the article
            $table->string('created_by_name'); // ✅ Store user name
            $table->string('category'); // ✅ Article category
            $table->string('image')->nullable(); // ✅ Optional image path
            $table->string('content_file')->nullable(); // ✅ Path to .md file instead of storing content
            $table->timestamps(); // ✅ created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('articles');
    }
};
