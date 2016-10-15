<?php

namespace Api\Controller;

use Api\Model\Project;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;


class ProjectController extends AbstractController {

    protected $projectTable;

    public function __construct($ci) {
        parent::__construct($ci);
        $this->projectTable = $this->ci->db->table('projects');
    }

    public function getProjects(Request $request, Response $response) {
        $fromDb = $this->projectTable->get();
        return $response->withJson($fromDb);
    }

    public function createProject(Request $request, Response $response) {
        $project = new Project();
        $args = $request->getParsedBody();
        $project->name = $args['name'];
        $project->google_doc_id = $args['google_doc_id'];
        $project->section = $args['section'];
        $project->save();
        return $response->withJson(['result' => 'ok']);
    }

}
