<?php
// Routes

$app->get('/', function ($request, $response, $args) {
    $renderer = new Slim\Views\PhpRenderer();
    return $renderer->render($response, __DIR__ . '/../react/template.phtml', $args);
});

$app->get('/test/googlepicker1/', function ($request, $response, $args) {
    $renderer = new Slim\Views\PhpRenderer();
    return $renderer->render($response, __DIR__ . '/../../test/googlepicicker1.html', $args);
});

$app->get('/api/project/', '\\Api\\Controller\\ProjectController:getProjects');
$app->post('/api/project/', '\\Api\\Controller\\ProjectController:createProject');