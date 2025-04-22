<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class Article extends Model
{
    use HasFactory;

    protected $table = 'articles';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['id', 'title', 'category', 'created_by_name', 'image', 'content_file'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = Str::uuid()->toString(); // ✅ Generate UUID
            }

            // ✅ Automatically store the logged-in user's name
            $model->created_by_name = Auth::check() ? Auth::user()->name : 'Anonymous';
        });
    }

    /**
     * ✅ Get the full URL of the image.
     */
    public function getImageUrlAttribute()
    {
        return $this->image ? asset("storage/{$this->image}") : null;
    }

    /**
     * ✅ Get the Markdown content.
     */
    public function getContentAttribute()
    {
        if ($this->content_file && Storage::disk('public')->exists($this->content_file)) {
            return Storage::disk('public')->get($this->content_file);
        }
        return null;
    }
}
