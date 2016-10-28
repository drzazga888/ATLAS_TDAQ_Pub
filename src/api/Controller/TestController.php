<?php

namespace Api\Controller;

use Api\Model\Project;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;


class TestController extends AbstractController {

    public function test(Request $request, Response $response) {

        $built = [];

        foreach (Project::all() as $project) {
            $built[] = [
                'id' => $project->id,
                'name' => $project->name,
                'created_at' => $project->created_at,
                'updated_at' => $project->updated_at,
                'template' => $project->template
            ];
        }

        return $response->withJson($built);
    }

}
