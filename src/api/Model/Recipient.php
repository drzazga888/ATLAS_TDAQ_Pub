<?php

namespace Api\Model;

use Illuminate\Database\Eloquent\Model;

class Recipient extends Model {

    protected $hidden = ['user_id'];

    public $timestamps = false;

}
