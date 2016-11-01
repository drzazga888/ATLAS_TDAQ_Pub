<?php

namespace Api\Util;


class EmailBuilder {

    protected $project;
    protected $emails = [];

    public function __construct(array $project) {
        $this->project = $project;
    }

    public function build() : EmailBuilder {

        $basic_email = new Email($this->project['template']);

        // 1. step - group replacements by type

        $grouped_repl = [
            'normal' => [],
            'recipient' => []
        ];

        foreach ($this->project['replacements'] as &$replacement) {
            if ($replacement['type'] === 'normal') {
                $grouped_repl['normal'][] = $replacement;
            } else {
                $grouped_repl['recipient'][] = $replacement;
            }
        }

        // 2. step - normal replacements

        foreach ($grouped_repl['normal'] as &$replacement) {
            $basic_email->replace($replacement['search'], $replacement['replace_to']);
        }

        // 3. step - create separate emails for recipients

        foreach ($this->project['recipients'] as &$recipient) {
            $email = new Email($basic_email->getData(), $recipient['email']);
            foreach ($grouped_repl['recipient'] as &$rec_repl) {
                $replace_to = $rec_repl['type'] === 'recipient_email' ? $recipient['email'] : $recipient['name'];
                $email->replace($rec_repl['search'], $replace_to);
            }
            $this->emails[] = $email;
        }

        return $this;
    }

    public function toArray() {
        $built = [];
        foreach ($this->emails as $email) {
            $built[] = $email->getData();
        }
        return $built;
    }

}