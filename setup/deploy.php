<?php

namespace Deployer;

if ('cli' !== PHP_SAPI) {
    throw new \Exception('The deployer configuration must be used in cli.');
}

require __DIR__.'/src/addons/ydeploy/deploy.php';

set('repository', 'git@github.com:yakamara/project.git');

host('project')
    ->hostname('project.de')
    ->user('user')
    ->set('deploy_path', '/absolute/path/de.project')
    ->set('http_user', 'http_user')
;

set('env', ['APP_ENV' => 'prod']);

set('base_dir', 'public/');
set('cache_dir', 'var/cache');
set('data_dir', 'var/data');
set('src_dir', 'src');
set('bin/console', 'bin/console');

add('clear_paths', ['assets']);
