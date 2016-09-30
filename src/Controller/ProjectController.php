<?php

namespace Api\Controller;


class ProjectController extends AbstractController {

    public function __construct($ci) {
        parent::__construct($ci, 'projects');
    }

    public function getProjects($request, $response) {
        if ($this->authenticator->authorize()) {
            return $response->withJson($this->table->get());
        } else {
            return $response->withStatus(401);
        }
    }

}