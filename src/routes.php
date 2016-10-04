<?php
// Routes

$app->get('/', function ($request, $response, $args) {
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/api/project/', '\\Api\\Controller\\ProjectController:getProjects');
$app->get('/api/google-docs/', '\\Api\\Controller\\GoogleDocController:getDocs');
