<?php
// Routes

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// main route to home page
$app->get('/', function (Request $request, Response $response, $args) {
    $renderer = new \Slim\Views\PhpRenderer();
    return $renderer->render($response, __DIR__ . '/../react/template.phtml', $args);
});

// api routes
$app->group('/api', function() use ($app) {

    // routes related to projects
    $app->group('/project', function () use ($app) {

        // get all projects
        $app->get('/', '\\Api\\Controller\\ProjectController:getProjects');

        // add new project
        $app->post('/', '\\Api\\Controller\\ProjectController:createProject');

    });

})->add($auth_middleware); // all of the api routes must be authenticated

