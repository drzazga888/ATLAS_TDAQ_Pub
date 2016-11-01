<?php

namespace Api\Util;

class TemplateParser {

    // catching header and content blocks
    const REGEX_SECTION_SPLITTER = '/^((.*?)={5,}\n)?(.*?)(\n-{5,}\n(.*))?$/si';

    // catching lines inside header
    const REGEX_HEADER_SPLITTER = '/(to|cc|subject): (.*)/i';

    protected $text;

    public function __construct(string $text) {
        $this->text = $text;
    }
    public function parse() : array {

        $parsed = [];

        preg_match_all(self::REGEX_SECTION_SPLITTER, $this->text, $matches);
        $parsed['body'] = $matches[3][0];
        if ($matches[5][0]) {
            $parsed['meta'] = $matches[5][0];
        }
        $header = $matches[2][0];
        unset($parsed['text']);
        // split header
        foreach (explode("\n", $header) as &$headerLine) {
            if (preg_match_all(self::REGEX_HEADER_SPLITTER, $headerLine, $matches)) {
                $name = strtolower($matches[1][0]);
                $value = $matches[2][0];
                if (in_array($name, ['to', 'cc'])) {
                    $value = array_filter(array_map('trim', explode(',', $value)));
                }
                $parsed[$name] = $value;
            }
        }

        return $parsed;

    }

}