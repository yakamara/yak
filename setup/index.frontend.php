<?php

unset($REX);
$REX['REDAXO'] = false;
$REX['HTDOCS_PATH'] = './';
$REX['BACKEND_FOLDER'] = 'redaxo';
$REX['LOAD_PAGE'] = true;

require __DIR__.'/../src/AppPathProvider.php';
$REX['PATH_PROVIDER'] = new AppPathProvider();

require $REX['PATH_PROVIDER']->core('boot.php');
