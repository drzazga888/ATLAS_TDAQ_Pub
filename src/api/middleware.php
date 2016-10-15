<?php
// Application middleware

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$auth_middleware = function(Request $request, Response $response, $next) use ($app) {
    $client = $app->getContainer()->google_client;
    $token = $request->getHeader('Authorization');
    $authorized = $token ? $client->verifyIdToken($token[0]) : null;
    if ($authorized) {
        return $next($request, $response);
    } else {
        return $response->withStatus(401);
    }
};