<?php

namespace Api\Controller;

use Api\Model\Project;
use Api\Util\EmailBuilder;
use Api\Util\TemplateParser;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Slim\Http\Request;
use Slim\Http\Response;


class ProjectController extends AbstractController {

    public function getProjects(Request $request, Response $response) {

        $user_id = $request->getAttribute('user_id');

        $projects = Project::where('user_id', $user_id)->get()->toArray();

        $script_config = $this->ci->get('settings')['google_script'];
        $script_service = new \Google_Service_Script($this->ci->google_client);

        foreach ($projects as &$project) {

            if (isset($project['template'])) {

                $script_request = new \Google_Service_Script_ExecutionRequest();
                $script_request->setFunction('getNames');
                $script_request->setParameters([
                    $project['template']['document_id'],
                    $project['template']['bookmark_id']
                ]);
                $script_response = $script_service->scripts->run(
                    $script_config['script_id'],
                    $script_request
                );

                $project['template'] = $script_response->getResponse()['result'];

            }
        }

        return $response->withJson($projects);
    }

    public function getProject(Request $request, Response $response, $args) {

        // get basic attributes
        $user_id = $request->getAttribute('user_id');
        $project_id = $args['project_id'];

        // get serialized data from db
        try {
            $project = Project::where('user_id', $user_id)
                ->with(['recipients', 'replacements'])
                ->findOrFail($project_id)
                ->makeHidden('id')
                ->toArray();
        } catch (ModelNotFoundException $e) {
            return $response->withStatus(404);
        }

        // make google script call
        if (isset($project['template'])) {
            $script_config = $this->ci->get('settings')['google_script'];
            $script_service = new \Google_Service_Script($this->ci->google_client);

            $script_request = new \Google_Service_Script_ExecutionRequest();
            $script_request->setFunction('getTemplate');
            $script_request->setParameters([
                $project['template']['document_id'],
                $project['template']['bookmark_id']
            ]);
            $script_response = $script_service->scripts->run(
                $script_config['script_id'],
                $script_request
            );

            // post-processing of fetched data from google script
            $project['template'] = $script_response->getResponse()['result'];
            $parser = new TemplateParser($project['template']['raw']);
            unset($project['template']['raw']);
            $project['template'] = array_merge($project['template'], $parser->parse());
        }

        // post-processing of recipients and replacements

        // 1. create email-name map for recipients and replace the existing one
        $project['recipients'] = array_map(function($recipient) {
            return $recipient['recipient'];
        }, $project['recipients']);

        // 2. create key-replacementable map for replacements and replace the existing one
        $project['replacements'] = array_map(function($replacement) {
            $new_item = [
                'id' => $replacement['id'],
                'search' => $replacement['search'],
                'type' => $replacement['replacementable_type']
            ];
            return array_merge($new_item, $replacement['replacementable']);
        }, $project['replacements']);

        return $response->withJson($project);
    }

    public function deleteProject(Request $request, Response $response, $args) {

        $user_id = $request->getAttribute('user_id');
        $project_id = $args['project_id'];

        try {
            Project::where('user_id', $user_id)
                ->findOrFail($project_id)
                ->delete();
        } catch (ModelNotFoundException $e) {
            return $response->withStatus(404);
        }

        return $response->withStatus(204);
    }

    public function createProject(Request $request, Response $response) {

        $user_id = $request->getAttribute('user_id');
        $params = $request->getParsedBody();

        $project = new Project();
        $project->name = $params['name'];
        $project->user_id = $user_id;
        $project->save();

        return $response->withJson([
            'id' => $project->id
        ]);
    }

    public function updateProject(Request $request, Response $response, $args) {

        $user_id = $request->getAttribute('user_id');
        $project_id = $args['project_id'];
        $params = $request->getParsedBody();

        try {
            $project = Project::where('user_id', $user_id)
                ->findOrFail($project_id);
        } catch (ModelNotFoundException $e) {
            return $response->withStatus(404);
        }

        if (isset($params['name'])) {
            $project->name = $params['name'];
        }

        $project->save();

        return $response->withStatus(204);
    }

    public function previewProject(Request $request, Response $response, $args) {

        // fetch entire project
        $project = json_decode($this->getProject($request, new Response(), $args)->getBody(), true);

        // pass it to the builder
        $builder = new EmailBuilder($project);

        // build it!
        $built = $builder->build()->toArray();

        return $response->withJson($built);
    }

    public function sendProject(Request $request, Response $response, $args) {

        $emails = json_decode($this->previewProject($request, new Response(), $args)->getBody(), true);

        $script_config = $this->ci->get('settings')['google_script'];
        $script_service = new \Google_Service_Script($this->ci->google_client);

        $script_request = new \Google_Service_Script_ExecutionRequest();
        $script_request->setFunction('sendEmails');
        $script_request->setParameters([
            $emails
        ]);
        $script_service->scripts->run(
            $script_config['script_id'],
            $script_request
        );

        return $response->withStatus(204);
    }

}
