<?php

namespace Deployer;

if ('cli' !== PHP_SAPI) {
    throw new \Exception('The deployer configuration must be used in cli.');
}

require __DIR__ . '/src/addons/ydeploy/deploy_yak.php';

set('repository', 'https://github.com/group-name/repo-name.git');

host('project')
    ->hostname('project.de')
    ->user('user')
    ->set('deploy_path', '/absolute/path/de.project')
    ->set('http_user', 'http_user')
//    ->set('bin/php', 'php83')
;

set('env', ['APP_ENV' => 'prod']);
add('shared_dirs', [
    'var/data/addons/project',
]);
add('clear_paths', [
    'assets'
]);

task('password_protection', function () {
    $auth = <<<'AUTH'
    SetEnvIf Request_URI ^/(api/|asset/|build/|bundles/|media/|video/|apple-app-site-association|robots.txt|.well-known) noauth=1

    AuthType Basic
    AuthName Anmelden
    AuthUserFile {{deploy_path}}/shared/.htpasswd
    Require valid-user
    Require env noauth
    Require env REDIRECT_noauth
    AUTH;

    cd('{{release_path}}');
    run('echo ' . escapeshellarg("\n" . $auth) . ' >> public/.htaccess');
})->select('staging');
after('deploy:cache:clear', 'password_protection');
