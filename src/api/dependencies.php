<?php
// DIC configuration

use \Interop\Container\ContainerInterface;

$container = $app->getContainer();

// monolog
$container['logger'] = function (ContainerInterface $c) {
    $settings = $c->get('settings')['logger'];
    $logger = new \Monolog\Logger($settings['name']);
    $logger->pushProcessor(new \Monolog\Processor\UidProcessor());
    $logger->pushHandler(new \Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};

$container['google_client'] = function(ContainerInterface $c) {
    $settings = $c->get('settings')['google_client'];
    $client = new \Google_Client();
    $client->setAuthConfigFile($settings['client_secret']);
    $client->setScopes($settings['scopes']);
    $client->setDeveloperKey($settings['developer_key']);
    return $client;
};

// Service factory for the ORM
$container['db'] = function (ContainerInterface $c) {
    $capsule = new \Illuminate\Database\Capsule\Manager;
    $capsule->addConnection($c['settings']['db']);
    $capsule->setAsGlobal();
    $capsule->bootEloquent();
    \Illuminate\Database\Eloquent\Relations\Relation::morphMap([
        'normal' => \Api\Model\ProjectReplacementNormal::class,
        'recipient_email' => \Api\Model\ProjectReplacementRecipientEmail::class,
        'recipient_name' => \Api\Model\ProjectReplacementRecipientName::class
    ]);
    return $capsule;
};
