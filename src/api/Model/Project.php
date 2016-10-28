<?php

namespace Api\Model;

use Illuminate\Database\Eloquent\Model;

class Project extends Model {

    public function template() {
        return $this->hasOne(Template::class);
    }

}
