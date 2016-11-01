<?php

namespace Api\Model;

use Illuminate\Database\Eloquent\Model;

class Project extends Model {

    protected $hidden = ['user_id'];
    protected $with = ['template'];

    public function template() {
        return $this->hasOne(Template::class);
    }

    public function recipients() {
        return $this->hasMany(ProjectRecipient::class);
    }

    public function replacements() {
        return $this->hasMany(ProjectReplacement::class);
    }

}
