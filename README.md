# Yak

- [Allgemeines Arbeiten](#anker-allgemeines-arbeiten)
- [Bekannte Probleme](#anker-bekannte-probleme)
    - [Deployen in einen DomainFactory Account](#anker-bekannte-probleme--deployen-domainfactory-account)
    - [Import von sql-Dump mit date (0000-00-00) und datetime (0000-00-00 00:00:00) Werten](#anker-bekannte-probleme--sql-dump)
- [Vorbereitung für ein bestehendes Projekt](#anker-bestehendes-projekt)
- [Vorbereitung für ein neues Projekt](#anker-neues-projekt)

<a name="anker-neues-projekt"></a>
## Vorbereitung für ein neues Projekt

1. Ordner für das Projekt lokal anlegen (Bsp. `~/Sites/localhost.project`)

1. Wenn nicht bereits geschehen, ein privates Github Repo erstellen (Readme mit anlegen lassen) via Git Client in Projektordner klonen

1. Yak herunterladen und in Projektordner legen

1. `hosts` Datei öffnen und ergänzen

    ```
    127.0.0.1   project.localhost
    127.0.0.1   www.project.localhost
    ```

1. `httpd-vhosts.conf` öffnen und ergänzen (`USERDIR` und ggf. `localhost.project` anpassen)
 
    ```
    <VirtualHost *:80>
        ServerName project.localhost
        ServerAlias www. project.localhost
        DocumentRoot "/Users/USERDIR/Sites/localhost.project/public"
            ErrorLog "/Users/USERDIR/Sites/Logs/localhost.project-error_log"
           CustomLog "/Users/USERDIR/Sites/Logs/localhost.project-access_log" common
    
        <Directory "/Users/USERDIR/Sites/localhost.project/public">
            Options Indexes FollowSymLinks
            AllowOverride All
            Order allow,deny
            Allow from all
            # Nur bei Apache 2.4
            # Require all granted
        </Directory>
    </VirtualHost>
    ```
1. /.env Datei öffnen und anpassen
   
   ```APP_HOST=project.localhost```


### Konsole

1. Apache neu starten

1. yarn installieren `$ npm i -g yarn`

1. Terminal öffnen

    Ausführen  `$ cd ~/Sites/localhost.project`
    
1. REDAXO wird mit Ausführung des nächsten Befehles automatisch installiert und eine vorhandene Instanz wird überschrieben. Wenn das nicht gewünscht ist, die Zeilen im `setup/presetup` entsprechend auskommentieren.

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
    - /gulpfile.js/
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

4. REDAXO Setup via Browser und Url `http://project.localhost/redaxo` starten

### weitere Einstellungen und Vorraussetzungen

* developer AddOn installieren, falls nicht über das Setup bereits getan
* ydeploy AddOn installieren, falls nicht über das Setup bereits getan



#### Deployment

_alle Befehle gehen direkt vom Projektordner aus._  `~/Sites/localhost.project`

- Datenbankdump der lokalen Instanz erstellen und auf Live via Adminer oder Datenbanktool einspielen
- `deploy.php` in der lokalen Instanz für Server anpassen
- Ausführen `$ bin/console ydeploy:diff`
- lokalen Stand auf Github pushen
- Ausführen `$ dep deploy` (hier kommt es absichtlich noch zu einem Fehler, aber die Grundstruktur ist schon mal auf dem Server)

**auf dem Live Server via FTP Client**

- `/releases/1/src/core/default.config.yml` nach `/shared/var/data/core/config.yml` kopieren
- `data/core/config.yml` öffnen und
    - `setup` auf `false`
    - Datenbankverbindung der Live-Instanz eingetragen

- Ausführen `$ dep deploy:unlock`
- Ausführen `$ dep deploy` (diesmal sollte kein Fehler mehr kommen)
- Domain der Live-Instanz auf `current/public` zeigen lassen (Der Pfad muss zumeist per Hand notiert werden, da es ein Symlink ist)

#### Development

1. `$ npm run dev`

#### Einstellungen Developer

**Lokal**

- [x] Templates synchronisieren
- [x] Module synchronisieren
- [x] Actions synchronisieren
- [x] Im Frontend synchronsieren (nur wenn als Admin in Backend eingeloggt)
- [x] Im Backend synchronsieren (nur wenn als Admin eingeloggt)
- [x] Datei- und Ordnernamen aktuell halten
- [ ] Ordnernamen mit ID als Suffix
- [ ] Präfix für Dateinamen (enthält ID und Name)
- [ ] Umlaute in Namen beibehalten (Deprecated; die Option wird in der nächsten Major-Version wegfallen und somit immer deaktiviert sein)
- [x] Item-Ordner löschen nach dem Löschen eines Items über das Backend


**Live**

- [x] Templates synchronisieren
- [x] Module synchronisieren
- [x] Actions synchronisieren
- [ ] Im Frontend synchronsieren (nur wenn als Admin in Backend eingeloggt)
- [ ] Im Backend synchronsieren (nur wenn als Admin eingeloggt)
- [ ] Datei- und Ordnernamen aktuell halten
- [ ] Ordnernamen mit ID als Suffix
- [ ] Präfix für Dateinamen (enthält ID und Name)
- [ ] Umlaute in Namen beibehalten (Deprecated; die Option wird in der nächsten Major-Version wegfallen und somit immer deaktiviert sein)
- [ ] Item-Ordner löschen nach dem Löschen eines Items über das Backend




#### Instanzen farblich kenntlich machen

Über folgende Einträge und Skripte kann man eine Kennung eintragen in welcher Umgebung man sich befindet

Über Adminer oder Datenbanktool in die `rex_config` Tabelle der **Live Instanz** folgenden Eintrag:

| Spalte | Wert |
| ------ | ---- |
| **namespace** | project |
| **key** | env |
| **value** | production |


Hat man das [Yakme AddOn](https://github.com/yakamara/yakme) installiert, kann nachfolgender Part ignoriert werden.

Folgenden Code in die `boot.php` vom `project` AddOn der lokalen Instanz und die CSS Dateien entsprechend im project assets Ordner ergänzen:

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

In der `package.yml` des project AddOns ergänzen

```
app:
    version: '1.0.0-dev1'
```

Durch das nächste Deployen, wird dann auch die Live Instanz farblich kenntlich gemacht und die Version angezeigt.


#### zusätzliche Tabellen synchronisieren lassen

Da man lokal am Anfang zumeist die Struktur wie vom Kunden gewünscht aufsetzt und ggf. auch die ersten Slices als Beispiele in der Live-Instanz bereitstellen möchte, kann man mit folgendem Skript diese Tabellen synchronisieren.

**!** Sobald jedoch an der Live-Instanz redaktionell gearbeitet wird, sollte das Skript wieder entfernt werden. Ansonsten gehen die Daten der Live-Instanz verloren.

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

Beim Befehl `$ bin/console `ydeploy`:diff` werden jetzt die obigen Tabellen mit berücksichtigt.


<a name="anker-bestehendes-projekt"></a>
## Vorbereitung für ein bestehendes Projekt

1. Via E-Mail wurde eine Einladung von Github für das Repo versendet. Dort den Link anklicken und man ist für das Repo freigeschalten. 

1. Ordner für das Projekt lokal anlegen (Bsp. `~/Sites/localhost.project`)

1. Github Repo via Git Client in Projektordner klonen

1. Datenbank lokal anlegen und die Datenbankverbindung in `/var/data/core/config.yml` eintragen 

1. Datenbankdump von der Production/Stage/Live Umgebung holen und lokal einspielen
> Falls der Dump via Backup-AddOn geholt wird, dann die rex_user Tabelle nicht vergessen

1. `hosts` Datei öffnen und ergänzen

    ```
    127.0.0.1   project.localhost
    127.0.0.1   www.project.localhost
    ```

1. `httpd-vhosts.conf` öffnen und ergänzen (`USERDIR` und ggf. `localhost.project` anpassen)
 
    ```
    <VirtualHost *:80>
        ServerName project.localhost
        ServerAlias www. project.localhost
        DocumentRoot "/Users/USERDIR/Sites/localhost.project/public"
            ErrorLog "/Users/USERDIR/Sites/Logs/localhost.project-error_log"
           CustomLog "/Users/USERDIR/Sites/Logs/localhost.project-access_log" common
    
        <Directory "/Users/USERDIR/Sites/localhost.project/public">
            Options Indexes FollowSymLinks
            AllowOverride All
            Order allow,deny
            Allow from all
            # Nur bei Apache 2.4
            # Require all granted
        </Directory>
    </VirtualHost>
    ```
    
1. `/.env` Datei öffnen und anpassen
    
    ```
    APP_HOST=project.localhost
    ```


<a name="anker-allgemeines-arbeiten"></a>
## Allgemeines Arbeiten

1. Vor dem deployen, zuvor `$ bin/console ydeploy:diff` aufrufen, und die geänderten bzw. neu angelegte Dateien (fixtures, migration, schema) committen.

1. `/src/addons/project/package.yml` öffnen und die Version anpassen (Diese Änderung sollte immer der letzte und ein separater Commit vor dem deployen sein)
    
    ```
    app:
        version: '1.0.0-dev1'
    ```
    In der Entwicklung wird dabei nur die letzte Zahl hochgesetzt

1. In der Konsole `$ dep deploy` ausführen



<a name="anker-bekannte-probleme"></a>
## Bekannte Probleme

<a name="anker-bekannte-probleme--deployen-domainfactory-account"></a>
### Deployen in einen DomainFactory Account

**Fehlermeldung in der Konsole**
```
[Deployer\Exception\RuntimeException]
The command "export APP_ENV='prod'; cd /kunden/pfad/zum/ordner/releases/1 && (command -v 'php')" failed.
Exit Code: 1 (General error)
Host name: prod
================
```

**Ursache**

Bei DomainFactory wird in der Konsole default PHP 4 genutzt

**Lösung**

Symlink auf PHP 71 setzen

**Anleitung**

1. auf Server via SSH einloggen

1. in das Userverzeichnis `/~` wechseln

1. `mkdir -p bin`

1. `ln -s /usr/local/bin/php7-71LATEST-CLI bin/php`

1. `.bashrc` in `/~` anlegen/editieren, und dort die PATH-Variable setzen: `export PATH=~/bin:$PATH`

1. per SSH neu einloggen, sonst greift es nicht.

1. prüfen mit: `php -v`


<a name="anker-bekannte-probleme--sql-dump"></a>
### Import von sql-Dump mit date (0000-00-00) und datetime (0000-00-00 00:00:00) Werten

1. `SHOW variables LIKE 'sql_mode';`
    Angezeigten Wert speichern
    Beispiel
    > ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

1. `SET sql_mode = '';`
1. Dump importieren
1. `SET sql_mode = 'VALUE';`
    VALUE = zuvor gespeicherter Wert

