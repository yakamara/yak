# Yak



## Vorbereitung

1. Ordner für das Projekt lokal anlegen (Bsp. `~/Sites/yak.project`)

1. privates Github Repo erstellen und via Git in Projektordner klonen

1. Yak holen und in Projektordner legen

1. `hosts` Datei öffnen und ergänzen

    ```
    127.0.0.1   project.yak
    127.0.0.1   www.project.yak
    ```

1. `httpd-vhosts.conf` öffnen und ergänzen (`USERDIR` und ggf. `yak.project` anpassen)
 
    ```
    <VirtualHost *:80>
        ServerName project.yak
        ServerAlias www. project.yak
        DocumentRoot "/Users/USERDIR/Sites/yak.project/public"
            ErrorLog "/Users/USERDIR/Sites/Logs/yak.project-error_log"
           CustomLog "/Users/USERDIR/Sites/Logs/yak.project-access_log" common
    
        <Directory "/Users/USERDIR/Sites/yak.project/public">
            Options Indexes FollowSymLinks
            AllowOverride All
            Order allow,deny
            Allow from all
            # Nur bei Apache 2.4
            # Require all granted
        </Directory>
    </VirtualHost>
    ```


## Konsole

1. Apache neu starten

1. Terminal öffnen

    Ausführen  `$ cd ~/Sites/yak.project`


3. REDAXO wird mit Ausführung des nächsten Befeheles automatisch installiert und eine vorhandene Instanz wird überschrieben. Wenn das nicht gewünscht ist, die Zeilen im presetup entsprechend auskommentieren.

    Ausführen `$ setup/presetup`


    **Nach dem presetup sollte die neue REDAXO Struktur wie folgt aussehen**
    
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

4. REDAXO Setup via Browser und Url `project.yak/redaxo` starten

## weitere Einstellungen und Vorraussetzungen

* developer AddOn installieren, falls nicht über das Setup bereits getan
* ydeploy AddOn installieren, falls nicht über das Setup bereits getan



### Deployment

_alle Befehle gehen direkt vom Projektordner aus._  `~/Sites/yak.project`

- Datenbankdump der lokalen Instanz erstellen und auf Live via Adminer oder Datenbanktool einspielen
- `deploy.php` in der lokalen Instanz für Server angepassen
- Ausführen `$ bin/console ydeploy:diff`
- lokalen Stand auf Github pullen
- Ausführen `$ dep deploy` (hier kommt es absichtlich noch zu einem Fehler, aber die Grundstruktur ist schon mal auf dem Server)

**auf dem Live Server via FTP Client**

- `src/core/default.config.yml` nach `data/core/config.yml` kopieren
- `data/core/config.yml` öffnen und
    - `setup` auf `false`
    - Datenbankverbindung der Live-Instanz eingetragen

- Ausführen `$ dep deploy:unlock`
- Ausführen `$ dep deploy` (diesmal sollte kein Fehler mehr kommen)
- Arbeitsdomain auf `current/public` zeigen lassen (Der Pfad muss zumeist per Hand notiert werden, da es ein Symlink ist)

Wenn man Lokal Datenbankänderungen vorgenommen hat, zuvor `$ bin/console ydeploy:diff` aufrufen, und die geänderten bzw. neu angelegte Dateien mit committen.




### Einstellungen Developer

**Lokal**

- [x] Templates synchronisieren
- [x] Module synchronisieren
- [x] Actions synchronisieren
- [x] Im Frontend synchronsieren (nur wenn als Admin in Backend eingeloggt)
- [x] Im Backend synchronsieren (nur wenn als Admin eingeloggt)
- [x] Datei- und Ordnernamen aktuell halten
- [_] Ordnernamen mit ID als Suffix
- [_] Präfix für Dateinamen (enthält ID und Name)
- [_] Umlaute in Namen beibehalten (Deprecated; die Option wird in der nächsten Major-Version wegfallen und somit immer deaktiviert sein)
- [x] Item-Ordner löschen nach dem Löschen eines Items über das Backend


**Live**

- [x] Templates synchronisieren
- [x] Module synchronisieren
- [x] Actions synchronisieren
- [_] Im Frontend synchronsieren (nur wenn als Admin in Backend eingeloggt)
- [_] Im Backend synchronsieren (nur wenn als Admin eingeloggt)
- [_] Datei- und Ordnernamen aktuell halten
- [_] Ordnernamen mit ID als Suffix
- [_] Präfix für Dateinamen (enthält ID und Name)
- [_] Umlaute in Namen beibehalten (Deprecated; die Option wird in der nächsten Major-Version wegfallen und somit immer deaktiviert sein)
- [_] Item-Ordner löschen nach dem Löschen eines Items über das Backend




### Instanzen farblich kenntlich machen

Über folgende Einträge und Skripte kann man eine Kennung eintragen in welcher Umgebung man sich befindet

Über Adminer oder Datenbanktool in die `rex_config` Tabelle der **Live Instanz** folgenden Eintrag:

| Spalte | Wert |
| ------ | ---- |
| **namespace** | project |
| **key** | env |
| **value** | production |


Hat man das [Yakme AddOn](https://github.com/yakamara/yakme) installiert, kann nachfolgender Part ignoriert werden.

Folgenden Code in die `boot.php` vom `project` AddOn und die CSS Dateien entsprechend im project assets Ordner ergänzen:

```
css/ydeploy-development.css
css/ydeploy-production.css
css/ydeploy.css
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



### zusätzliche Tabellen synchronisieren lassen

Da man lokal am Anfang zumeist die Struktur wie vom Kunden gewünscht aufsetzt und ggf. auch die ersten Slices als Beispiele in der Live-Instanz bereitstellen möchte, kann man mit folgendem Skript diese Tabellen synchronisieren.

Sobald an der Live-Instanz redaktionell gearbeitet wird, sollte das Skript wieder entfernt werden. Ansonsten gehen die Daten der Live-Instanz verloren.

Das Skript in die `boot.php`des `project` AddOns der **lokalen Instanz** einfügen

```php
// YDeploy
// - - - - - - - - - - - - - - - - - - - - - - - - - -
if (\rex::isBackend() && \rex_addon::get('ydeploy')->isAvailable()) {

    rex_extension::register('PACKAGES_INCLUDED', function () {
        $config = \rex_addon::get('ydeploy')->getProperty('config');

        // zusätzliche Tabellen synchronisieren
        // nie action, module, module_action, template definieren
        // werden über developer AddOn synchronisiert
        $config['fixtures']['tables'] = array_merge(
            [
                'article' => null,
                'article_slice' => null,
                'clang' => null,
                'media' => null,
                'media_category' => null,
                'sprog_wildcard' => null,
            ],
            $config['fixtures']['tables']
        );

        \rex_addon::get('ydeploy')->setProperty('config', $config);
    });
}
```

Beim Befehl `$ bin/console ydeploy:diff` werden jetzt die obigen Tabellen mit berücksichtigt.