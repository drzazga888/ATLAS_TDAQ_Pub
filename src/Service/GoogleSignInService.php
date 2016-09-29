<?php

namespace Api\Service;

class GoogleSignInService {

    const ERROR_KEY = 'error_description';

    protected $request;
    protected $result = null;

    public function __construct($request) {
        $this->request = $request;
    }

    public function authorize() {

        if (empty($this->request->getHeader('Authorization'))) {
            $this->result = ["error_description" => 'no_token_provided'];
            return false;
        }

        $token = $this->request->getHeader('Authorization')[0];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=$token");
        curl_setopt($ch, CURLOPT_HEADER, 0);            // No header in the result
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return, do not echo result

        // Fetch and return content, save it.
        $raw_data = curl_exec($ch);
        curl_close($ch);

        // If the API is JSON, use json_decode.
        $this->result = json_decode($raw_data, true);

        return !array_key_exists(self::ERROR_KEY, $this->result);
    }

    public function getError() {
        return $this->result[self::ERROR_KEY];
    }

    public function getResult() {
        return $this->result;
    }

}