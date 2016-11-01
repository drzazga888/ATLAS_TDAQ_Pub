<?php
// Routes

use \Slim\Http\Request as Request;
use \Slim\Http\Response as Response;

// main route to home page
$app->get('/', function (Request $request, Response $response, $args) {
    $renderer = new \Slim\Views\PhpRenderer();
    return $renderer->render($response, __DIR__ . '/../react/template.phtml', $args);
});

// api routes
$app->group('/api', function() use ($app) {

    $app->group('/projects', function () use ($app) {
        $app->get('/', \Api\Controller\ProjectController::class . ':getProjects');
        $app->get('/{project_id}/', \Api\Controller\ProjectController::class . ':getProject');
        $app->delete('/{project_id}/', \Api\Controller\ProjectController::class . ':deleteProject');
        $app->post('/', \Api\Controller\ProjectController::class . ':createProject');
        $app->put('/{project_id}/', \Api\Controller\ProjectController::class . ':updateProject');
        $app->get('/{project_id}/send/', \Api\Controller\ProjectController::class . ':sendProject');
        $app->get('/{project_id}/preview/', \Api\Controller\ProjectController::class . ':previewProject');
        $app->group('/{project_id}/template', function() use ($app) {
            $app->post('/', \Api\Controller\ProjectTemplateController::class . ':createProjectTemplate');
            $app->delete('/', \Api\Controller\ProjectTemplateController::class . ':deleteProjectTemplate');
            $app->put('/', \Api\Controller\ProjectTemplateController::class . ':updateProjectTemplate');
        });
        $app->group('/{project_id}/replacements', function() use ($app) {
            $app->post('/', \Api\Controller\ProjectReplacementController::class . ':createReplacement');
            $app->delete('/{replacement_id}/', \Api\Controller\ProjectReplacementController::class . ':deleteReplacement');
            $app->put('/{replacement_id}/', \Api\Controller\ProjectReplacementController::class . ':updateReplacement');
        });
        $app->group('/{project_id}/recipients', function() use ($app) {
            $app->post('/', \Api\Controller\ProjectRecipientController::class . ':createRecipient');
            $app->delete('/{recipient_id}/', \Api\Controller\ProjectRecipientController::class . ':deleteRecipient');
        });
    });

    $app->group('/templates', function() use ($app) {
        $app->get('/', \Api\Controller\TemplateController::class . ':getDocuments');
        $app->get('/{document_id}/', \Api\Controller\TemplateController::class . ':getBookmarks');
        $app->get('/{document_id}/{bookmark_id}/', \Api\Controller\TemplateController::class . ':getTemplate');
    });

    $app->group('/recipients', function () use ($app) {
        $app->get('/', \Api\Controller\RecipientController::class . ':getRecipients');
        $app->post('/', \Api\Controller\RecipientController::class . ':createRecipient');
        $app->delete('/{recipient_id}/', \Api\Controller\RecipientController::class . ':deleteRecipient');
        $app->put('/{recipient_id}/', \Api\Controller\RecipientController::class . ':updateRecipient');
    });

})->add($auth_middleware); // all of the api routes must be authenticated
