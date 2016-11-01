<?php

namespace Api\Model;

use Illuminate\Database\Eloquent\Model;

class ProjectRecipient extends Model {

    protected $hidden = ['id', 'document_id', 'project_id', 'recipient_id'];
    protected $with = ['recipient'];

    public $timestamps = false;

    public function recipient() {
        return $this->belongsTo(Recipient::class);
    }

}
