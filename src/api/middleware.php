<?php
// Application middleware

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$auth_middleware = function(Request $request, Response $response, $next) use ($app) {
    $ci = $app->getContainer();
    $client = $ci->google_client;
    $accessToken = $request->getHeader('Authorization');
    $authorized = null;

    if ($accessToken) {
        $client->setAccessToken($accessToken[0]);
        $parsedToken = json_decode($accessToken[0]);
        $authorized = $client->verifyIdToken($parsedToken->id_token);
        $ci->logger->debug($parsedToken->id_token);
    }

    if ($authorized) {
        return $next($request, $response);
    } else {
        return $response->withStatus(401);
    }
};