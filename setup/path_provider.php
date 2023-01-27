<?php

require_once __DIR__ . '/core/lib/util/path_default_provider.php';

class app_path_provider extends rex_path_default_provider
{
    public function __construct()
    {
        parent::__construct(dirname(__DIR__), 'redaxo', true);
    }

    public function frontend($file)
    {
        return $this->base('public/'.$file);
    }

    public function bin($file)
    {
        return $this->base('bin/' . $file);
    }

    public function data($file)
    {
        return $this->base('var/data/' . $file);
    }

    public function log(string $file): string
    {
        return $this->base('var/log/' . $file);
    }

    public function cache($file)
    {
        return $this->base('var/cache/' . $file);
    }

    public function src($file)
    {
        return $this->base('src/' . $file);
    }
}
