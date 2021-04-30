<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    public $timestamps = FALSE;
    protected $table = 'cities';
    protected $fillable = ['name', 'type'];
}
