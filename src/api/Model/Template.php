<?php

namespace Api\Model;

use Illuminate\Database\Eloquent\Model;

class Template extends Model {

    protected $hidden = ['project_id'];

    public $timestamps = false;
    public $incrementing = false;
    public $primaryKey = 'project_id';

}
