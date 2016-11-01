<?php

namespace Api\Model;

use Illuminate\Database\Eloquent\Model;

class ProjectReplacementRecipientName extends Model {

    protected $hidden = ['id'];

    public $timestamps = false;

    public function replacements() {
        return $this->morphOne(ProjectReplacement::class, 'replacementable');
    }

}
