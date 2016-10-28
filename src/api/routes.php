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

    $app->group('/project', function () use ($app) {
        $app->get('/', '\\Api\\Controller\\ProjectController:getProjects');
        $app->post('/', '\\Api\\Controller\\ProjectController:createProject');
    });

    $app->group('/template', function() use ($app) {
        $app->get('/{id}/', '\\Api\\Controller\\TemplateController:getTemplate');
    });

})->add($auth_middleware); // all of the api routes must be authenticated

// for tests
$app->group('/test', function() use ($app) {

    $app->get('/', '\\Api\\Controller\\TestController:test');

});