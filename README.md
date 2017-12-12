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
