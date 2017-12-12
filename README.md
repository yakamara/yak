# Yak

**Konsole**

Ausführen `$ setup/presetup`
REDAXO wird automatisch installiert und eine vorhandene Instanz wird überschrieben. Wenn das nicht gewünscht ist, die Zeilen im presetup entsprechend auskommentieren.

**neue REDAXO Struktur sieht wie folgt aus**

```
- /assets/
    - fonts/
    - images/
    - scripts/
    - styles/
    - svgs/
- /bin/
- /gulfile.js/
    - assets/
    - tasks/
- /public/
    - assets/
        - addons/
        - core/
        - fonts/
        - images/
        - scripts/
        - styles/
        - svgs/
    - media/
    - redaxo/
- /src/
    - addons/
    - core/
    - module/
    - templates/
- /var/
    - cache/
    - data/
```

**weitere Einstellungen und VOrraussetzungen

* developer AddOn installieren, falls nicht über das Setup bereits getan
* ydeploy AddOn installieren, falls nicht über das Setup bereits getan

**Einstellungen Developer

Lokal
* Templates synchronisieren
* Module synchronisieren
* Actions synchronisieren
* Im Frontend synchronsieren (nur wenn als Admin in Backend eingeloggt)
* Im Backend synchronsieren (nur wenn als Admin eingeloggt)
* Datei- und Ordnernamen aktuell halten
* Item-Ordner löschen nach dem Löschen eines Items über das Backend

Live

* Templates synchronisieren
* Module synchronisieren
* Actions synchronisieren


** Über folgende Einträge und Script kann man eine Kennung eintragen in welcher Umgebung man sich befindet

* Über Adminer oder Datenbanktool in die rex_config Tabelle folgenden Eintrag:
** namespace: project, key: env, value: production oder developer


folgenden Code in die Boot.php vom project AddOn und die CSS Dateien entsprechend ergänzen im project assets ordner:

```
css/ydeploy-production.css
css/ydeploy-development.css
```

```
// YDeploy
// - - - - - - - - - - - - - - - - - - - - - - - - - -
if (\rex::isBackend() && \rex_addon::get('ydeploy')->isAvailable()) {
    \rex_view::addCssFile($this->getAssetsUrl('css/ydeploy.css'));
    if (\rex_addon::get('project')->getConfig('env') == 'production') {
        \rex_view::addCssFile($this->getAssetsUrl('css/ydeploy-production.css'));
    } else {
        \rex_view::addCssFile($this->getAssetsUrl('css/ydeploy-development.css'));
    }
    rex_extension::register('OUTPUT_FILTER', function(rex_extension_point $ep) {
        $project = \rex_addon::get('project');
        $env = $project->getConfig('env') == 'production' ? 'Production' : 'Development';
        $version = isset($project->getProperty('app')['version']) ? ' - <small>Version ' . $project->getProperty('app')['version'] : '';
        $ep->setSubject(
            str_replace(
                '</body>',
                '<div class="ydeploy-badge">' . $env . $version . '</small></div></body>',
                $ep->getSubject()
            )
        );
    });
}
```


