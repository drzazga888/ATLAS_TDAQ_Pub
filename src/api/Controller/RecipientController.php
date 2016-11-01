<?php

namespace Api\Controller;

use Api\Model\Recipient;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Slim\Http\Request;
use Slim\Http\Response;

class RecipientController extends AbstractController {

    public function getRecipients(Request $request, Response $response) {
        $user_id = $request->getAttribute('user_id');
        $recipients = Recipient::where('user_id', $user_id)->get();
        return $response->withJson($recipients);
    }

    public function createRecipient(Request $request, Response $response) {

        $user_id = $request->getAttribute('user_id');
        $params = $request->getParsedBody();

        $recipient = new Recipient();
        $recipient->email = $params['email'];
        $recipient->name = $params['name'];
        $recipient->user_id = $user_id;
        $recipient->save();

        return $response->withJson([
            'id' => $recipient->id
        ]);
    }

    public function deleteRecipient(Request $request, Response $response, $args) {

        $user_id = $request->getAttribute('user_id');
        $recipient_id = $args['recipient_id'];

        try {
            Recipient::where('user_id', $user_id)
                ->findOrFail($recipient_id)
                ->delete();
        } catch (ModelNotFoundException $e) {
            return $response->withStatus(404);
        }

        return $response->withStatus(204);
    }

    public function updateRecipient(Request $request, Response $response, $args) {

        $user_id = $request->getAttribute('user_id');
        $recipient_id = $args['recipient_id'];
        $params = $request->getParsedBody();

        try {
            $recipient = Recipient::where('user_id', $user_id)
                ->findOrFail($recipient_id);
        } catch (ModelNotFoundException $e) {
            return $response->withStatus(404);
        }

        if (isset($params['email'])) {
            $recipient->email = $params['email'];
        }

        if (isset($params['name'])) {
            $recipient->name = $params['name'];
        }

        $recipient->save();

        return $response->withStatus(204);
    }

}

/*
 * validations:

if (isset($params['email']) && !$params['email']) {
    return $response->withStatus(400)->withJson([
        'message' => '"email" field cannot be empty'
    ]);
}

if (isset($params['email']) && !filter_var($params['email'], FILTER_VALIDATE_EMAIL)) {
    return $response->withStatus(400)->withJson([
        'message' => 'Invalid email format'
    ]);
}

if (isset($params['name']) && !$params['name']) {
    return $response->withStatus(400)->withJson([
        'message' => '"name" field cannot be empty'
    ]);
}

if (Recipient::where('user_id', $user_id)->where('email', $params['email'])->exists()) {
    return $response->withStatus(400)->withJson([
        'message' => '"email" field must be unique for user'
    ]);
}

 */
