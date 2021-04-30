<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table = "schedules";
    protected $primaryKey = "id";
    protected $fillable = ['start_date', 'start_time', 'end_time', 'doctorId', 'status'];

    public function doctor() {
        return $this->belongsTo('App\User', 'doctorId');
    }
}
