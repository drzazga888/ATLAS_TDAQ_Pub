<?php
/**
 * Created by PhpStorm.
 * User: mario
 * Date: 28.09.16
 * Time: 19:43
 */

namespace Api\Controller;


abstract class AbstractController {

    protected $authenticator;
    protected $table;

    public function __construct($ci, $tableName) {
        $this->table = $ci->get('db')->table($tableName);
        $this->authenticator = $ci->get('authenticator');
    }

}