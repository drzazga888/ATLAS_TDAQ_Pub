<?php

namespace Api\Model;

use Illuminate\Database\Eloquent\Model;

class ProjectReplacementRecipientEmail extends Model {

    protected $hidden = ['id'];

    public $timestamps = false;

    public function replacements() {
        return $this->morphOne(ProjectReplacement::class, 'replacementable');
    }

}
