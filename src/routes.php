<?php
// Routes

$app->get('/', function ($request, $response, $args) {
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/api/project/', function($request, $response, $args) {
    if ($this->authenticator->authorize()) {
        return $response->withJson([
            [
                'id' => 1,
                'name' => 'Nazwa projektu 1'
            ], [
                'id' => 2,
                'name' => 'Nazwa projektu 2'
            ], [
                'id' => 3,
                'name' => 'Nazwa projektu 3'
            ]
        ]);
    } else {
        return $response->withJson($this->authenticator->getError())->withStatus(401);
    }
});