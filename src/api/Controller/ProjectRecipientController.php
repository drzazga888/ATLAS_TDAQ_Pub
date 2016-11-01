<?php

namespace Api\Controller;

use Api\Model\ProjectRecipient;
use Api\Model\Recipient;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Slim\Http\Request;
use Slim\Http\Response;

class ProjectRecipientController extends AbstractController {

    public function createRecipient(Request $request, Response $response, $args) {

        $project_id = $args['project_id'];
        $params = $request->getParsedBody();

        $recipient = new ProjectRecipient();
        $recipient->project_id = $project_id;
        $recipient->recipient_id = $params['recipient_id'];
        $recipient->save();

        return $response->withStatus(204);
    }

    public function deleteRecipient(Request $request, Response $response, $args) {

        $recipient_id = $args['recipient_id'];

        $recipient = ProjectRecipient::where('recipient_id', $recipient_id);
        if (!$recipient->exists()) {
            return $response->withStatus(404);
        }
        $recipient->delete();

        return $response->withStatus(204);
    }

}

