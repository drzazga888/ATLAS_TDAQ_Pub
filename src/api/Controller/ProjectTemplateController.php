<?php

namespace Api\Controller;

use Api\Model\Template;
use Api\Util\TemplateParser;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Slim\Http\Request;
use Slim\Http\Response;


class ProjectTemplateController extends AbstractController {

    public function createProjectTemplate(Request $request, Response $response, $args) {

        $project_id = $args['project_id'];
        $params = $request->getParsedBody();

        if (!isset($params['document_id'])) {
            $params['document_id'] = null;
        }

        if (!isset($params['bookmark_id'])) {
            $params['bookmark_id'] = null;
        }

        // check if template exists in google docs

        $script_config = $this->ci->get('settings')['google_script'];
        $script_service = new \Google_Service_Script($this->ci->google_client);

        $script_request = new \Google_Service_Script_ExecutionRequest();
        $script_request->setFunction('checkIfExists');
        $script_request->setParameters([
            $params['document_id'],
            $params['bookmark_id']
        ]);
        $script_response = $script_service->scripts->run(
            $script_config['script_id'],
            $script_request
        );

        if (!$script_response->getResponse()['result']) {
            return $response->withStatus(404)->withJson([
                'message' => 'specified document or bookmark does not exists'
            ]);
        }

        $template = new Template();
        $template->project_id = $project_id;
        $template->document_id = $params['document_id'];
        $template->bookmark_id = $params['bookmark_id'];
        $template->save();

        return $response->withStatus(204);
    }

    public function deleteProjectTemplate(Request $request, Response $response, $args) {
        $project_id = $args['project_id'];
        Template::where('project_id', $project_id)->delete();
        return $response->withStatus(204);
    }

    public function updateProjectTemplate(Request $request, Response $response, $args) {
        $project_id = $args['project_id'];
        $params = $request->getParsedBody();

        try {
            $template = Template::findOrFail($project_id);
        } catch (ModelNotFoundException $e) {
            return $response->withStatus(404);
        }

        if (isset($params['document_id'])) {
            $template->document_id = $params['document_id'];
        }

        if (isset($params['bookmark_id'])) {
            $template->bookmark_id = $params['bookmark_id'];
        }

        $template->save();

        return $response->withStatus(204);
    }

}
