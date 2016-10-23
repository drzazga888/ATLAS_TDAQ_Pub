<?php

namespace Api\Controller;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

/*
 * JSON.stringify(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse())
 * /api/template/1VlZ5lyw9RQd108de6wF9y3UchTH6xVxW7zwqj3_RHOc/
 */

class TemplateController extends AbstractController {

    // catching header and content blocks
    // https://regex101.com/r/eTvlea/1
    // https://regex101.com/delete/KtsMKdCSXNGYwTOC7yj4ACTM
    const REGEX_SECTION_SPLITTER = '/(.*?)\n((.*?)={5,}\n)?(.*)/si';

    // catching lines inside header
    const REGEX_HEADER_SPLITTER = '/(to|cc|subject): (.*)/i';

    public function getTemplate(Request $request, Response $response, $args) {

        $config = $this->ci->get('settings')['google_script']['split_to_sections'];

        $service = new \Google_Service_Script($this->ci->google_client);
        $serviceRequest = new \Google_Service_Script_ExecutionRequest();
        $serviceRequest->setFunction($config['function_name']);
        $serviceRequest->setParameters([$args['id']]);
        $serviceResponse = $service->scripts->run($config['script_id'], $serviceRequest);

        $sections = $serviceResponse->getResponse()['result'];

        foreach ($sections as &$section) {
            preg_match_all(self::REGEX_SECTION_SPLITTER, $section['text'], $matches);
            $section['name'] = $matches[1][0];
            $section['body'] = $matches[4][0];
            $header = $matches[3][0];
            unset($section['text']);
            // split header
            foreach (explode("\n", $header) as &$headerLine) {
                if (preg_match_all(self::REGEX_HEADER_SPLITTER, $headerLine, $matches)) {
                    $name = strtolower($matches[1][0]);
                    $value = $matches[2][0];
                    if (in_array($name, ['to', 'cc'])) {
                        $value = array_filter(array_map('trim', explode(',', $value)));
                    }
                    $section[$name] = $value;
                }
            }
        }

        return $response->withJson($sections);
    }

}
