<?php
// Routes

function auth($token) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=$token");
	curl_setopt($ch, CURLOPT_HEADER, 0);            // No header in the result 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return, do not echo result   

	// Fetch and return content, save it.
	$raw_data = curl_exec($ch);
	curl_close($ch);

	// If the API is JSON, use json_decode.
	return json_decode($raw_data);
}

$app->get('/', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/api/project/', function($request, $response, $args) {
	$result = auth($request->getHeader('Authorization')[0]);
	$this->logger->info(json_encode($result));
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
});