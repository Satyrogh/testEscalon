<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
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
    public $timestamps = false;

    protected $fillable = [
        'name', 'email', 'username', 'password', 'id_school'
    ];

    public function school(){
        return $this->hasOne("App\School", "id_school", "id_school");
    }
}
