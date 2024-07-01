<?php
function _mkdir($dir): void
{
    if (!file_exists($dir)) {
        mkdir($dir);
    }
}

function _rmdir($dir): void
{
    if (!file_exists($dir)) {
        return;
    }

    $iterator = new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS);
    $files = new RecursiveIteratorIterator($iterator, RecursiveIteratorIterator::CHILD_FIRST);
    foreach($files as $file) {
        if ($file->isDir()){
            rmdir($file->getRealPath());
        } else {
            unlink($file->getRealPath());
        }
    }
    rmdir($dir);
}

function _mv($source, $target): void
{
    _rmdir($target);
    rename($source, $target);
}

echo "
- - - - - - - - - - - -
Yak REDAXO Pre Setup
- - - - - - - - - - - -
";

$ini = parse_ini_file(__DIR__ . DIRECTORY_SEPARATOR . 'setup.ini', true);

echo "
Reading config file
- - - - - - - - - - - -
    REDAXO install version: {$ini['REDAXO_VERSION']}
    REDAXO shasum: {$ini['REDAXO_SHA']}
";

# make tmp folders
_mkdir('./tmp');
_mkdir('./tmp/redaxo');

# load redaxo
echo "
Load REDAXO zip file
- - - - - - - - - - - -
";

$file = "./tmp/redaxo/redaxo_{$ini['REDAXO_VERSION']}.zip";
file_put_contents($file, file_get_contents("https://github.com/redaxo/redaxo/releases/download/{$ini['REDAXO_VERSION']}/redaxo_{$ini['REDAXO_VERSION']}.zip"));

if (sha1_file($file) !== $ini['REDAXO_SHA']) {
    echo 'ERROR: SHA-Hash is incorrect.';
    exit;
}

$zip = new ZipArchive;
$res = $zip->open($file);
if ($res === true) {
    $zip->extractTo('./public');
    $zip->close();
    echo "Redaxo {$ini['REDAXO_VERSION']} was successful loaded and unzipped into the public folder.
";
} else {
    echo 'ERROR: Redaxo could not be unzipped.';
    exit;
}

# create Yakamara file structure
echo "
Create Yakamara file structure
- - - - - - - - - - - -
";
_mkdir('./var');
_mkdir('./src');

_mv('./public/redaxo/bin/', './bin');
_mv('./public/redaxo/cache', './var/cache');
_mv('./public/redaxo/data', './var/data');
_mv('./public/redaxo/src/addons', './src/addons');
_mv('./public/redaxo/src/core', './src/core');

rename('./public/LICENSE.md', 'LICENSE.md');
unlink('./public/README.md');
unlink('./public/README.de.md');

copy('./setup/addon.project.boot.php', './src/addons/project/boot.php');
copy('./setup/console', './bin/console');
copy('./setup/index.backend.php', './public/redaxo/index.php');
copy('./setup/index.frontend.php', './public/index.php');
copy('./setup/AppPathProvider.php', './src/AppPathProvider.php');

echo "File structure was successful created.
";

# load addons
echo "
Load REDAXO AddOns
- - - - - - - - - - - -
";

$context = stream_context_create([
    'http' => [
            'method' => 'GET',
            'header' => [
                    'User-Agent: PHP'
            ]
    ]
]);
foreach ($ini as $url => $addons)
{
    if (!preg_match('~^https://~ism', $url)) {
        continue;
    }

    foreach ($addons['ADDONS'] as $addonName => $addon) {
        if (is_numeric($addonName)) {
            $addonName = $addon;
        }

        $addonData = json_decode(file_get_contents($url . $addon . '/releases/latest', false, $context), true);
        file_put_contents($file = "./tmp/$addon.zip", file_get_contents($addonData['zipball_url'], false, $context));

        $zip = new ZipArchive;
        $res = $zip->open($file);
        if ($res === true) {
            $zip->extractTo('./tmp');
            $zip->close();
            _mv(glob("./tmp/*-$addon-*")[0], "./src/addons/$addonName");
            echo "$addonName was successful loaded and unzipped into the addon folder.
            ";
        } else {
            echo "ERROR: $addon could not be unzipped.
            ";
        }
    }
}

# remove
_rmdir('./public/redaxo/bin');
_rmdir('./public/redaxo/src');
_rmdir('./setup');
_rmdir('./tmp');

echo "
For Windows:
- - - - - - - - - - - -
Install Node and Yarn as described here: https://geekflare.com/how-to-install-yarn-on-windows/
- - - - - - - - - - - -

For all systems:
Execute \"yarn\" in the terminal in this folder \"".__DIR__."\".
";