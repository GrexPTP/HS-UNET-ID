<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $table = 'news';
    protected $fillable = [
        'title',
        'description',
        'content',
        'description_image',
        'creatorId'
    ];
    public function creator() {
        return $this->belongsTo('App\User', 'creatorId','id');
    }
}
