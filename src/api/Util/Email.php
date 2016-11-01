<?php

namespace Api\Util;


class Email {

    protected $data;

    public function __construct($template, $email = null) {
        $this->data = array_filter($template, function($key) {
            return in_array($key, ['subject', 'body', 'cc']);
        }, ARRAY_FILTER_USE_KEY);
        if ($email) {
            $this->data['email'] = $email;
        }
    }

    public function replace($search, $replace) {
        $this->data['subject'] = str_replace($search, $replace, $this->data['subject'] ?? '');
        $this->data['body'] = str_replace($search, $replace, $this->data['body'] ?? '');
        $this->data['cc'] = str_replace($search, $replace, $this->data['cc'] ?? '');
    }

    public function getData() {
        return $this->data;
    }

}
