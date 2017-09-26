<?php

unset($REX);
$REX['REDAXO'] = true;
$REX['HTDOCS_PATH'] = '../';
$REX['BACKEND_FOLDER'] = 'redaxo';
$REX['LOAD_PAGE'] = true;

require __DIR__.'/../../src/path_provider.php';
$REX['PATH_PROVIDER'] = new app_path_provider();

require $REX['PATH_PROVIDER']->core('boot.php');
