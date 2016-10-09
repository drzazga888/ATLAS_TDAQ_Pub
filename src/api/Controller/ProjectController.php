<?php

namespace Api\Controller;


class ProjectController extends AbstractController {

    public function getProjects($request, $response) {
        if ($this->authorize()) {
            $fromDb = $this->ci->db->table('projects')->get();
            return $response->withJson($fromDb);
        } else {
            return $response->withStatus(401);
        }
    }

}