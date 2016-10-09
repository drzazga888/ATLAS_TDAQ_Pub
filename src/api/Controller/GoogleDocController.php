<?php

namespace Api\Controller;


use Google_Service_Drive;

class GoogleDocController extends AbstractController {

    public function getDocs($request, $response) {
        if ($this->authorize()) {
            $fromDrive = [];
            $driveService = new Google_Service_Drive($this->ci->google_client);
            return $response->withJson($fromDrive);
        } else {
            return $response->withStatus(401);
        }
    }

}