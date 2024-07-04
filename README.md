# Yak

## Inhaltsverzeichnis

- [Erste Schritte](#erste-schritte)
  - [Voraussetzungen](#voraussetzungen)
  - [Installation](#installation)
- [Nach dem Setup](#nach-dem-setup)
  - [Einstellungen Developer AddOn](#einstellungen-developer-addon)
    - [Lokal](#lokal)
    - [Staging/Prod](#stagingprod)
  - [zusätzliche Datenbank-Tabellen synchronisieren](#zusätzliche-datenbank-tabellen-synchronisieren)
  - [Erstes deployen auf Staging/Prod](#erstes-deployen-auf-stagingprod)
  - [Allgemeines Arbeiten](#allgemeines-arbeiten)
  - [Bekannte Probleme](#bekannte-probleme)
      - [Deployen in einen DomainFactory Account](#deployen-in-einen-domainfactory-account)
      - [Deployen bei All-Inkl](#deployen-bei-all-inkl)
      - [Import von sql-Dump mit date (0000-00-00) und datetime (0000-00-00 00:00:00) Werten](#import-von-sql-dump-mit-date-0000-00-00-und-datetime-0000-00-00-000000-werten)
- [Versionierung](#versionierung)
- [Lizenz](#lizenz)

## Erste Schritte

### Voraussetzungen

Für die, die ganz frisch auf einem lokalen Rechner starten, ist hier eine [Anleitung](https://getgrav.org/blog/macos-sonoma-apache-multiple-php-versions) um ein Apache Setup mit mehreren PHP-Versionen aufzusetzen, eine Umgebung mit MySQL, virtuellen Hosts, APC-Caching, YAML und Xdebug einzurichten sowie SSL für virtuelle Apache-Hosts. 
Diese Anleitung richtet sich an erfahrene Webentwickler. Wenn man Anfänger ist, ist man mit MAMP oder MAMP Pro besser bedient.

Ansonsten wird 
- eine `bash` benötigt und
- [`yarn`](https://yarnpkg.com) sollte installiert sein


### Installation

1. Auf dem lokalen Rechner einen leeren Ordner für das Projekt anlegen (Bsp. `~/Sites/project-name`)
1. Ein privates Github Repo erstellen (README mit anlegen lassen) und via Git Client in den Projektordner `project-name` klonen

1. `httpd-vhosts.conf` öffnen und ergänzen (`USER_DIR` und `project-name` anpassen)

    ```
    <VirtualHost *:443>
        DocumentRoot "/Users/USER_DIR/Sites/project-name/public"
        ServerName project-name.localhost
        SSLEngine on
        SSLCertificateFile "/opt/homebrew/etc/httpd/certs/cert.pem"
        SSLCertificateKeyFile "/opt/homebrew/etc/httpd/certs/cert-key.pem"
    </VirtualHost>
    ```

1. Zertifikat für den eingetragenen ServerName wie im [dritten Teil der Anleitung](https://getgrav.org/blog/macos-sonoma-apache-ssl) erstellen und obige Pade anpassen. Alternativ kann man auch nur ein Zertifikat für mehrere Domains erstellen. So blieben die Pfade für das SSL Zertifikat für alle Projekte gleich. Dazu erstellt man in seinem Userordner einen Ordnern `bin` und darin eine Datei `cert-update`die folgenden Inhalt enthält:  

    ```bash
    #!/bin/sh
    
    # Pfad eventuell anpassen
    cd /opt/homebrew/etc/httpd/certs

    mkcert -cert-file=cert.pem -key-file=cert-key.pem \
        localhost\
        project-a.localhost\
        project-b.localhost "*.project-b.localhost"\
        project-name.localhost\
    ```
   
    Bei jedem neuen Projekt die Datei um die neuen Domains ergänzen und dann das Skript aufrufen
    ```bash
    $ ~/bin/cert-update
    ```
   
1. Apache neu starten. Kann auch mit dem PHP Switcher Script (`$ sphp 8.3`) aus der obigen Anleitung erfolgen.

1. REDAXO wird mit Ausführung des nächsten Befehls automatisch installiert und eine vorhandene Instanz wird überschrieben.

    ```
    $ php setup/presetup.php
    ```

    **Nach dem presetup sollte die neue Redaxo Struktur wie folgt aussehen**

    ```
    - /assets/
        - fonts/
        - images/
        - scripts/
        - styles/
        - svgs/
    - /bin/
    - /public/
        - assets/
            - addons/
            - core/
        - media/
        - redaxo/
    - /src/
        - addons/
        - core/
        - module/
        - templates/
        - AppPathProvider.php
    - /var/
        - cache/
        - data/
        - log/
    - .env
    - .gitignore
    - deploy.php
    - LICENSE
    - package.json
    - postcss.config.js
    - README.md
    - webpack.config.js
    ```
   
1. Datei `.env` kopieren und als `.env.local` auf selbige Ebene speichern. Die Datei `.env.local` öffnen und wie folgt anpassen
    ```
    APP_HOST=project-name.localhost
    APP_ENV=dev
    ```
1. Im Anschluss `yarn` ausführen

1. Browser öffnen und Redaxo Setup via https://project-name.localhost/redaxo starten

## Nach dem Setup

1. `developer` AddOn installieren und [Einstellungen](#einstellungen-developer-addon) für die lokale Instanz vornehmen. Die Einstellungen für die Live-Instanz können erst nach dem ersten deployen vorgenommen werden.

2. `ydeploy` AddOn installieren

### Einstellungen Developer AddOn

#### Lokal

- [x] Templates synchronisieren
- [x] Module synchronisieren
- [x] Actions synchronisieren
- [ ] YForm: E-Mail-Templates synchronisieren
- [x] Im Frontend synchronisieren (nur wenn als Admin im Backend eingeloggt)
- [x] Im Backend synchronisieren (nur wenn als Admin eingeloggt)
- [x] Datei- und Ordnernamen aktuell halten
- [x] Ordnernamen mit ID als Suffix
- [ ] Präfix für Dateinamen (enthält ID und Name)
- [ ] Umlaute in Namen beibehalten (Deprecated; die Option wird in der nächsten Major-Version wegfallen und somit immer deaktiviert sein)
- [x] Item-Ordner löschen nach dem Löschen eines Items über das Backend


#### Staging/Prod

- [x] Templates synchronisieren
- [x] Module synchronisieren
- [x] Actions synchronisieren
- [ ] YForm: E-Mail-Templates synchronisieren
- [ ] Im Frontend synchronisieren (nur wenn als Admin im Backend eingeloggt)
- [ ] Im Backend synchronisieren (nur wenn als Admin eingeloggt)
- [ ] Datei- und Ordnernamen aktuell halten
- [ ] Ordnernamen mit ID als Suffix
- [ ] Präfix für Dateinamen (enthält ID und Name)
- [ ] Umlaute in Namen beibehalten (Deprecated; die Option wird in der nächsten Major-Version wegfallen und somit immer deaktiviert sein)
- [ ] Item-Ordner löschen nach dem Löschen eines Items über das Backend

### zusätzliche Datenbank-Tabellen synchronisieren

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

## Erstes deployen auf Staging/Prod

> @todo: Abschnitt prüfen

**alle Befehle gehen direkt vom Projektordner aus.**  
`~/Sites/localhost.project-name`

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


## Allgemeines Arbeiten

1. Vor dem Deployen, zuvor alle geänderte Dateien committen und in der Konsole `$ bin/console ydeploy:diff` aufrufen. Die geänderten bzw. neu angelegte Dateien (fixtures, migration, schema) ebenfalls committen.

1. In der Konsole dann `$ dep deploy` ausführen oder die Pipeline anstoßen.

## Bekannte Probleme

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


Es kann vorkommen, dass die .bashrc nicht beim login aufgerufen wird. Bei Plesk kann man es z.B. lösen, indem man eine `~/.profile` ergänzt und dort die `.bashrc` aufruft. Wenn die `.profile` bereits existiert, den folgenden Aufruf am Ende ergänzen `source ~/.bashrc`

oder im Deployer den bin/php Pfad direkt setzen `->set('bin/php', '/opt/plesk/php/7.3/bin/php')`


### Deployen bei All-Inkl
PHP-CLI und `writeable_mode` müssen in der **deploy.php** gesetzt werden:
```
host(NAME)
->set('writable_mode', 'chmod')
->set('bin/php', '/usr/bin/php83')
// ...
;
```


### Import von sql-Dump mit date (0000-00-00) und datetime (0000-00-00 00:00:00) Werten

1. `SHOW variables LIKE 'sql_mode';`
   Angezeigten Wert speichern
   Beispiel
   > ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

1. `SET sql_mode = '';`

1. Dump importieren

1. `SET sql_mode = 'VALUE';`
   VALUE = zuvor gespeicherter Wert


## Versionierung

Wir verwenden [SemVer](http://semver.org/) zur Versionierung. Die verfügbaren Versionen findet man in den [Tags in diesem Repository](https://github.com/yakamara/yak/tags).

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden man in der Datei [LICENSE](LICENSE).

