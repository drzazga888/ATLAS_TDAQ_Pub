<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 28.09.16
 * Time: 19:43
 */

namespace Api\Controller;


abstract class AbstractController {

    protected $ci;

    public function __construct($ci) {
        $this->ci = $ci;
    }

    protected function authorize() {
        $client = $this->ci->google_client;
        $token = $this->ci->request->getHeader('Authorization');
        return $token ? $client->verifyIdToken($token[0]) : null;
    }

}