<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header
        'determineRouteBeforeAppMiddleware' => false,

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],

        'db' => [
            'driver' => 'mysql',
            'host' => 'localhost',
            'database' => 'cern_pub',
            'username' => 'root',
            'password' => '12345',
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
        ],

        'google_client' => [
            'client_secret' => __DIR__ . '/client_secret.json',
            'scopes' => 'profile https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive',
            'developer_key' => 'AIzaSyC0Y7UDbqI2urerN7tKQ5-5rUnbYniDS-o'
        ],

        'google_script' => [
            'split_to_sections' => [
                'script_id' => 'M7OzFiTA4OzkP1yvfOmOWIFGFM_sLa-iq',
                'function_name' => 'splitToSections'
            ]
        ]
    ],
];
