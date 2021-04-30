<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Examination extends Model
{
    protected $table = 'examinations';
    protected $fillable = [
        'image',
        'customer_description',
        'doctor_feedback',
        'status',
        'patient_id',
        'doctor_id',
        'result_image',
        'disease_id'
    ];

    public function patient() {
        return $this->belongsTo('App\User', 'patient_id','id');
    }

    public function doctor() {
        return $this->belongsTo('App\User', 'doctor_id','id');
    }

    public function disease() {
        return $this->belongsTo('App\Disease', 'disease_id','id');
    }

    public function examination_details() {
        return $this->hasMany('App\ExaminationDetail', 'examination_id','id')->with('disease')->orderByDesc('percentage');
    }
}
