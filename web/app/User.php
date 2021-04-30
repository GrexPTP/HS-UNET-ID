<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'password',
        'name',
        'phone',
        'email',
        'gender',
        'birth_date',
        'role_id',
        'profile_image',
        'city_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    public function city()
    {
        return $this->belongsTo('App\City');
    }

    public function role()
    {
        return $this->belongsTo('App\Role');
    }

    public function isRole($slug)
    {
        $role = Role::whereSlug($slug)->first();
        if ($role && $this->role_id == $role->id) {
            return true;
        }
        return false;
    }
}
