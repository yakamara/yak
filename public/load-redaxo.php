<?php

// info echo "REDAXO wurde bereits installiert"; exit;

error_reporting(E_ALL);
ini_set("display_errors", 1);

$current_version_path = file_get_contents("http://www.redaxo.org/de/_system/_version/5/");
$install_path = './';
$install_file = $install_path.'redaxo.zip';
$loader_file = __FILE__; //$install_path.'load_redaxo.php';

echo '<pre>Folgende aktuelle Datei wurde gefunden: ' . $current_version_path . '</pre>';

$redaxo_core = file_get_contents($current_version_path);
file_put_contents($install_file, $redaxo_core);

echo '<pre>redaxo.zip wurde erstellt und wird nun entpackt</pre>';

$zip = new ZipArchive;
$res = $zip->open($install_file);
if ($res === true) {
    $zip->extractTo($install_path);
    $zip->close();

    echo '<pre>REDAXO wurde erfolgreich entpackt</pre>';
    $loader = file_get_contents($loader_file);
    $loader = str_replace("\n".'// info', '', $loader);
    file_put_contents($loader_file, $loader);
    unlink($install_file);

} else {
    echo 'Beim Entpacken ist ein Fehler aufgetreten';

}
