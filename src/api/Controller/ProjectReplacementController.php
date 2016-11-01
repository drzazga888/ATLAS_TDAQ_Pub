<?php

namespace Api\Controller;

use Api\Model\ProjectReplacement;
use Api\Model\ProjectReplacementNormal;
use Api\Model\ProjectReplacementRecipientEmail;
use Api\Model\ProjectReplacementRecipientName;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Slim\Http\Request;
use Slim\Http\Response;

class ProjectReplacementController extends AbstractController {

    public function createReplacement(Request $request, Response $response, $args) {

        $project_id = $args['project_id'];
        $params = $request->getParsedBody();

        $replacement = new ProjectReplacement();
        $replacement->project_id = $project_id;
        $replacement->search = $params['search'];

        $type = $params['type'];
        $specific = null;

        switch ($type) {
            case 'normal':
                $specific = new ProjectReplacementNormal();
                $specific->replace_to = $params['replace_to'];
                break;
            case 'recipient_email':
                $specific = new ProjectReplacementRecipientEmail();
                break;
            case 'recipient_name':
                $specific = new ProjectReplacementRecipientName();
                break;
        }

        $specific->save();
        $specific->replacements()->save($replacement);

        return $response->withJson([
            'id' => $replacement->id
        ]);
    }

    public function deleteReplacement(Request $request, Response $response, $args) {

        $replacement_id = $args['replacement_id'];

        try {
            ProjectReplacement::findOrFail($replacement_id)->delete();
        } catch (ModelNotFoundException $e) {
            return $response->withStatus(404);
        }

        return $response->withStatus(204);
    }

    public function updateReplacement(Request $request, Response $response, $args) {

        $replacement_id = $args['replacement_id'];
        $params = $request->getParsedBody();

        try {

            $replacement = ProjectReplacement::findOrFail($replacement_id);

            switch ($replacement->replacementable_type) {
                case 'normal':
                    $specific = ProjectReplacementNormal::find($replacement->replacementable_id);
                    if (isset($params['replace_to'])) {
                        $specific->replace_to = $params['replace_to'];
                    }
                    $specific->save();
                    break;
            }

            if (isset($params['search'])) {
                $replacement->search = $params['search'];
            }

            $replacement->save();

        } catch (ModelNotFoundException $e) {
            return $response->withStatus(404);
        }

        return $response->withStatus(204);
    }

}
