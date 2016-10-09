<?php
// Routes

$app->get('/', function ($request, $response, $args) {
    $renderer = new Slim\Views\PhpRenderer();
    return $renderer->render($response, __DIR__ . '/../react/template.phtml', $args);
});

$app->get('/api/project/', '\\Api\\Controller\\ProjectController:getProjects');
$app->get('/api/google-docs/', '\\Api\\Controller\\GoogleDocController:getDocs');
