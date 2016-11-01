<?php

namespace Api\Controller;

use Api\Util\TemplateParser;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class TemplateController extends AbstractController {

    public function getDocuments(Request $request, Response $response) {

        // make google script call
        $script_config = $this->ci->get('settings')['google_script'];
        $script_service = new \Google_Service_Script($this->ci->google_client);

        $script_request = new \Google_Service_Script_ExecutionRequest();
        $script_request->setFunction('getDocuments');
        $script_response = $script_service->scripts->run(
            $script_config['script_id'],
            $script_request
        );

        $result = $script_response->getResponse()['result'];
        return $response->withJson($result);
    }

    public function getBookmarks(Request $request, Response $response, $args) {

        $document_id = $args['document_id'];

        // make google script call
        $script_config = $this->ci->get('settings')['google_script'];
        $script_service = new \Google_Service_Script($this->ci->google_client);

        $script_request = new \Google_Service_Script_ExecutionRequest();
        $script_request->setFunction('getBookmarks');
        $script_request->setParameters([
            $document_id
        ]);
        $script_response = $script_service->scripts->run(
            $script_config['script_id'],
            $script_request
        );

        $result = $script_response->getResponse()['result'];
        if (!$result) {
            return $response->withStatus(404);
        }
        return $response->withJson($result);
    }

    public function getTemplate(Request $request, Response $response, $args) {

        $document_id = $args['document_id'];
        $bookmark_id = $args['bookmark_id'] === 'whole' ? null : $args['bookmark_id'];

        // make google script call
        $script_config = $this->ci->get('settings')['google_script'];
        $script_service = new \Google_Service_Script($this->ci->google_client);

        $script_request = new \Google_Service_Script_ExecutionRequest();
        $script_request->setFunction('getTemplate');
        $script_request->setParameters([
            $document_id,
            $bookmark_id
        ]);
        $script_response = $script_service->scripts->run(
            $script_config['script_id'],
            $script_request
        );

        $template = $script_response->getResponse()['result'];
        if (!$template) {
            return $response->withStatus(404);
        }

        $parser = new TemplateParser($template['raw']);
        unset($template['raw']);
        $template['template'] = $parser->parse();

        return $response->withJson($template);
    }

}
