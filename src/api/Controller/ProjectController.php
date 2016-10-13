<?php

namespace Api\Controller;

use Api\Model\Project;


class ProjectController extends AbstractController {

    public function getProjects($request, $response) {
        if ($this->authorize()) {
            $fromDb = $this->ci->db->table('projects')->get();
            return $response->withJson($fromDb);
        } else {
            return $response->withStatus(401);
        }
    }

    public function createProject($request, $response) {
        if ($this->authorize()) {
            $project = new Project();
            $project->name = $request->getAttribute('name');
            $project->google_doc = $request->getAttribute('google_doc');
            $project->section = $request->getAttribute('section');
            $id = $project->save();
            return $response->withJson(['id' => $id]);
        } else {
            return $response->withStatus(401);
        }
    }

}