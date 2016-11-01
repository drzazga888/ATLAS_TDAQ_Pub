<?php

namespace Api\Model;

use Illuminate\Database\Eloquent\Model;

class ProjectReplacement extends Model {

    protected $hidden = ['project_id', 'replacementable_id'];
    protected $with = ['replacementable'];

    public $timestamps = false;

    public function replacementable() {
        return $this->morphTo();
    }

}
