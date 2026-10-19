# Home-Assistant-Betrieb der Putzplan-App

Recherchestand: **19. Oktober 2026**. Zugehöriges Entscheidungsticket: [Technischen Betriebsrahmen für Home Assistant, Ingress und ARM64 verifizieren](../issues/06-home-assistant-betriebsrahmen.md).

## Ergebnis und Aussagegrenze

Die gewünschte Betriebsform ist offiziell vorgesehen: Eine eigene Web-App kann als vom Supervisor verwalteter Container neben Home Assistant Core auf Home Assistant OS laufen. Der Raspberry Pi 5 ist ein unterstütztes 64-Bit-Ziel. Das bestätigt den technischen Rahmen; es belegt noch nicht, dass eine konkrete Putzplan-Implementierung funktioniert. [Wie Apps funktionieren](https://contributors.home-assistant.io/apps/how-apps-work/), [Unterstützte Boards](https://contributors.home-assistant.io/os/operating-system/boards/).

Diese Recherche wählt weder Sprache, Framework, Datenbank noch Frontend-Architektur. Sie liefert Anforderungen und Prüfpunkte für die spätere Architekturentscheidung. Maßgeblich bleiben die [Projektvorgaben](../../../AGENTS.md).

Es wurden ausschließlich offizielle Home-Assistant-Dokumentation und Quellcode des Projekts gelesen. Die früheren Entwickler-URLs leiteten beim Abruf auf `contributors.home-assistant.io` weiter; die aktuellen Konfigurations- und Build-Anleitungen tragen den Stand 12. Oktober 2026. Die untersuchten Quellcodezweige `dev` beziehungsweise `main` sind veränderlich. Ihre Beobachtungen sind kein Nachweis für die unbekannte Version auf der vorhandenen Installation. [Konfigurationsreferenz](https://contributors.home-assistant.io/apps/reference/configuration/), [Build-Anleitung](https://contributors.home-assistant.io/apps/guides/dockerfile/).

## Dokumentierte Fakten: Paketierung und ARM64

Eine App besitzt einen eigenen Ordner mit `config.yaml` und entweder einem `Dockerfile` für lokale Builds oder einer `image`-Referenz. Für ein installierbares Git-App-Repository kommt `repository.yaml` im Wurzelverzeichnis hinzu. README, Dokumentation und Changelog sind eigene, vom Supervisor erkannte Dateien. Der lokale App-Ordner eignet sich für Entwicklung ohne Veröffentlichung eines Repositorys. [App-Dateien](https://contributors.home-assistant.io/apps/reference/files/), [Wie Apps funktionieren](https://contributors.home-assistant.io/apps/how-apps-work/).

Die Pflichtangaben sind `name`, `version`, `slug`, `description` und `arch`. Für diese Zielplattform muss `arch` den Wert `aarch64` enthalten. Eine optionale `machine`-Beschränkung muss `raspberrypi5-64` zulassen. `ports` veröffentlicht Containerports am Host; `host_network` ist standardmäßig deaktiviert. [Konfigurationsreferenz](https://contributors.home-assistant.io/apps/reference/configuration/).

Die offiziellen Basisimages unterstützen ARM64 und AMD64. Seit der Basisimage-Veröffentlichung 2026.03.1 stehen Multiarch-Images bereit; die früheren Architekturen im Imagenamen werden noch angeboten. Zum Recherchezeitpunkt nennt das offizielle Repository diese Familien:

| Image | Basis und dokumentierte aktuelle Tags |
| --- | --- |
| `ghcr.io/home-assistant/base` | Alpine: `3.22`, `3.23`, `3.24` |
| `ghcr.io/home-assistant/base-python` | Python `3.12`–`3.14`, jeweils mit den angebotenen Alpine-Versionen |
| `ghcr.io/home-assistant/base-debian` | Debian: `bookworm`, `trixie` |
| `ghcr.io/home-assistant/base-ubuntu` | Ubuntu: `22.04`, `24.04`, `26.04` |

Das sind verfügbare Optionen, keine Auswahl für dieses Projekt. Die Images enthalten unter anderem S6 overlay, Bashio und Tempio. [Offizielles Basisimage-Repository](https://github.com/home-assistant/docker-base).

Andere Basisimages sind erlaubt, sofern sie die deklarierten Architekturen unterstützen. Bei den Home-Assistant-Basisimages erfordert S6 overlay `init: false`; ohne eigenes Init-System bleibt der Docker-Init-Standard relevant. Versionierte Basisimage-Tags werden gegenüber `latest` empfohlen. Home Assistant nennt ARM64 `aarch64`, Docker BuildKit dagegen `arm64`. `BUILD_FROM` wird seit Supervisor 2026.04.0 nicht mehr automatisch gesetzt; ein entsprechendes `ARG` braucht einen Standardwert oder eine feste `FROM`-Zeile. Eine zusätzliche `build.yaml` ist inzwischen veraltet. [Build-Anleitung](https://contributors.home-assistant.io/apps/guides/dockerfile/).

Die Dokumentation beschreibt zwei Lieferwege: lokales Bauen auf dem Zielgerät oder vorgefertigte Images. Für veröffentlichte Apps empfiehlt sie vorgefertigte Images; bei Multiarch-Publikation wird die generische Manifest-Referenz bevorzugt. Diese Veröffentlichungsentscheidung ist für den späteren regulären Betrieb getrennt von einem externen Hosting der laufenden App zu betrachten. [Veröffentlichung](https://contributors.home-assistant.io/apps/guides/publishing/).

## Dokumentierte Fakten: Ingress und Seitenleiste

`ingress: true` aktiviert die Einbettung. Der interne Standardport ist `8099`; ein anderer Port wird mit `ingress_port` angegeben. Home Assistant übernimmt die Anmeldung. Eine Host-Portfreigabe ist dafür nicht nötig. Der Webserver muss ausschließlich Verbindungen vom Supervisor unter `172.30.32.2` annehmen und alle anderen ablehnen. Ingress unterstützt HTTP/1.x, Streaming-Antworten und WebSockets. [Ingress-Anleitung](https://contributors.home-assistant.io/apps/guides/ingress/).

Der Nutzer aktiviert den eigenen Eintrag über „Show in sidebar“. `panel_title` und `panel_icon` bestimmen Titel und Symbol. `panel_admin` steht standardmäßig auf `true`; mit `false` ist die Seitenleiste auch für Nichtadministratoren vorgesehen. Das Festlegen dieser Felder allein aktiviert den Eintrag noch nicht beim Nutzer. [Ingress-Anleitung](https://contributors.home-assistant.io/apps/guides/ingress/), [Konfigurationsreferenz](https://contributors.home-assistant.io/apps/reference/configuration/).

## Quellcodebeobachtungen: Pfade und Vertrauensgrenzen

Core setzt `X-Ingress-Path` auf `/api/hassio_ingress/{token}`. Der untersuchte Code liefert dabei **keinen abschließenden Slash**. Dagegen übernimmt er vorhandene Werte für `X-Forwarded-Host` und `X-Forwarded-Proto`, statt diese stets neu zu setzen. [Core: Headeraufbereitung](https://github.com/home-assistant/core/blob/dev/homeassistant/components/hassio/ingress.py#L245).

Der Supervisor hängt den inneren Requestpfad an die interne App-Adresse an. Das äußere Ingress-Präfix ist daher nicht Teil des bei der App ankommenden Requestpfads. Er filtert eingehende `X-Remote-User-Id`, `X-Remote-User-Name` und `X-Remote-User-Display-Name` und setzt eigene Werte, wenn Sitzungsdaten vorliegen. Die Benutzer-ID kann fehlen; Name und Anzeigename werden nur gesetzt, wenn vorhanden. `X-Forwarded-For` wird übernommen und ergänzt. [Supervisor: Ingress-Handler und Headeraufbereitung](https://github.com/home-assistant/supervisor/blob/main/supervisor/api/ingress.py#L132).

Die offizielle Anleitung verlangt für fehlende Benutzerheader eine ausdrückliche Behandlung als unbekannter Nutzer. Sie erklärt deren Vertrauen unter der Voraussetzung, dass ausschließlich Supervisor-Verbindungen zugelassen werden. [Ingress-Anleitung](https://contributors.home-assistant.io/apps/guides/ingress/#know-who-is-there).

## Dokumentierte Fakten: Persistenz, Zeitzone und Backup

`/data` ist der private, dauerhaft beschreibbare App-Speicher und wird in Backups aufgenommen. `/data/options.json` gehört dem Supervisor und wird vor jedem Start neu geschrieben. `TZ` enthält die Systemzeitzone. Im normalen Containernetz können auch andere Apps miteinander kommunizieren; allein der Verzicht auf veröffentlichte Hostports ersetzt deshalb die Ingress-Zugriffsbeschränkung nicht. [Laufzeitumgebung](https://contributors.home-assistant.io/apps/reference/environment/).

`backup: hot` ist Standard und sichert die laufende App; `backup: cold` hält sie für das Backup an. Für Hot-Backups existieren `backup_pre` und `backup_post`; `backup_exclude` kann Dateien ausschließen. Diese Optionen beschreiben den Ablauf, garantieren aber keine Konsistenz einer später gewählten Datenbank. [Konfigurationsreferenz: Backups](https://contributors.home-assistant.io/apps/reference/configuration/#backups).

Im untersuchten Supervisor-Code wird das private Datenverzeichnis als `data` archiviert. Beim kalten Backup wird eine laufende App vorher gestoppt und danach wieder gestartet. Dies bestätigt den dokumentierten Mechanismus, ersetzt aber keinen Wiederherstellungstest. [Supervisor: Backupablauf](https://github.com/home-assistant/supervisor/blob/main/supervisor/apps/app.py#L1338).

## Schlussfolgerungen für die Architekturentscheidung

Die folgenden Punkte sind aus den Quellen und den Projektvorgaben abgeleitete Anforderungen, keine bereits implementierten Eigenschaften:

1. **Präfixfähiges Routing als Abnahmekriterium:** HTML, API, Skripte, Styles, Bilder, Formularziele und Weiterleitungen müssen denselben variablen Basispfad beachten. Root-Pfade wie `/api/...` und feste Hostnamen funktionieren dafür nicht. Relative URLs brauchen eine klar definierte Basis, auch bei tieferen Ansichten und beim Neuladen. Falls absolute Pfade nötig sind, ist das vertrauenswürdig empfangene Ingress-Präfix korrekt mit dem inneren Pfad zu verbinden. [Ingress-Anleitung](https://contributors.home-assistant.io/apps/guides/ingress/#work-with-relative-urls).
2. **Prüfung des tatsächlichen Verbindungspartners:** Die IP-Freigabe muss auf der Socket-Peer-Adresse beruhen. `X-Forwarded-For` und eine davon bereits ersetzte Framework-Client-IP taugen nicht als Ersatz. Ein vorgeschalteter interner Proxy muss diese Grenze durchsetzen; ein weiterer Backend-Listener darf sie nicht umgehen. Der Pfadheader selbst ist kein Anmeldenachweis. Grundlage: die oben dokumentierte Headerverarbeitung.
3. **Benutzer und Haushaltspersonen getrennt entscheiden:** Frei benannte Haushaltspersonen sind noch keine Home-Assistant-Konten. Eine automatische Zuordnung oder Berechtigungsentscheidung ist nicht bestätigt. Sollte sie später nötig werden, muss der Fall fehlender Benutzerheader zum vorgesehenen Verhalten gehören.
4. **Betriebsdaten explizit verorten:** Plan, Katalog, Personen und künftige Datenmigrationen müssen im persistenten App-Speicher arbeiten, außerhalb von `options.json`. Ein wiederholter Containerstart darf diese Daten nicht neu initialisieren. Das Backupverfahren muss zur gewählten Speichertechnik passen; kaltes Backup und konsistente Live-Sicherung bleiben mögliche Optionen.
5. **Runtime und Abhängigkeiten auf ARM64 bewerten:** Ein ARM64-Basisimage allein genügt nicht. Native Erweiterungen, Paketdownloads und gegebenenfalls Build-Werkzeuge müssen ebenfalls für `linux/arm64` sowie die gewählte libc verfügbar sein. Die App muss für den regulären Betrieb sämtliche nötigen Ressourcen lokal bereitstellen, damit kein zusätzlicher Host oder externer Dienst vorausgesetzt wird.
6. **Minimale notwendige Rechte:** Für eine reine Kalender-Web-App ergibt sich aus dem bestätigten Umfang noch kein Bedarf an Hostnetz, Docker-Socket, Hardwarezugriff oder umfassenden Supervisor-Rechten. Ob zusätzliche API-Rechte nötig werden, muss mit einer konkreten Funktion begründet werden; die Recherche schaltet keine Rechte frei.

WebSockets sind derzeit nicht durch eine Anforderung nötig. Falls die spätere Architektur sie verwendet, gelten derselbe Basispfad und dieselbe Zugriffsgrenze; ihr realer Ingress-Betrieb wird dann Teil der Prüfung.

## Vorgeschlagene Prüfungen vor einer Bereitstellung

Dies ist ein abgeleiteter Prüfplan; **keiner dieser App-Tests wurde in der Recherche ausgeführt**. Die offizielle Testanleitung unterscheidet einen einfachen Docker-Build, eine Entwicklungsumgebung mit Supervisor und Home Assistant sowie Tests auf einem realen Gerät. Sie nennt für ARM64 `docker buildx build --platform linux/arm64`; ein Cross-Build kann QEMU benötigen. [Testanleitung](https://contributors.home-assistant.io/apps/guides/testing/).

| Ebene | Später zu prüfender Nachweis |
| --- | --- |
| Lokaler Build | Gepinntes Image und alle Abhängigkeiten für `linux/arm64` bauen; resultierende Plattform und Startprotokoll erfassen. Ein gegebenenfalls nur emulierter Lauf wird als solcher angegeben. |
| Lokales Routing | Mit mehreren wechselnden Präfixen prüfen: Start, Tages-/Wochenansicht, API-Schreibzugriffe, statische Dateien, tiefe Navigation, Reload und Weiterleitungen. Präfixe mit und ohne abschließenden Slash abdecken. |
| Zugriffsgrenze | Reale Peer-IP außerhalb der Allowlist wird auch bei gefälschtem `X-Forwarded-For` und gefälschten Benutzer-/Ingress-Headern abgewiesen. Zulässige Supervisor-Verbindung funktioniert. Bei internem Proxy auch das Backend auf Umgehbarkeit prüfen. |
| Supervisor | App-Konfiguration validieren, installieren, starten, stoppen, neu starten und aktualisieren. Keine für den Regelbetrieb veröffentlichte Host-Portzuordnung; keine unnötigen Sonderrechte. |
| Reales Ingress | Auf der vorhandenen Home-Assistant-OS-Installation über „Open Web UI“ und Seitenleiste aufrufen. Anmeldung, Neuöffnung einer Sitzung, alle Ansichten und Datenänderungen sowie gegebenenfalls WebSockets prüfen. |
| Zielhardware | Native Ausführung auf Raspberry Pi 5/aarch64, ausreichende Ressourcen, Start nach Host-Neustart und Speicherung ohne Dateirechtefehler nachweisen. |
| Daten und Backup | Testdaten erzeugen; App-/Host-Neustart und Update überstehen lassen. Ein Backup mit enthaltener App erstellen, in einer geeigneten Testumgebung wiederherstellen und Inhalt sowie Schreibbarkeit prüfen. Bei Hot-Backup auch Schreiblast und Konsistenz berücksichtigen. |
| Browser und Alltag | Smartphone-Bedienung und Browser-Neuladen im HA-Rahmen prüfen. Runtime ohne externen Dienst testen. Kalendertage an Zeitzonen-/Sommerzeitgrenzen verifizieren, sobald das Datenmodell feststeht. |

Jeder spätere Nachweis sollte Datum, App-Version beziehungsweise Commit, Image-Digest, CPU-Plattform sowie Home-Assistant-Core-, Supervisor- und OS-Version nennen. So bleibt sichtbar, wofür eine Aussage tatsächlich geprüft wurde.

## Weiterhin praktisch ungeprüft

- Der aktuelle Versionsstand und die konkreten Einstellungen der vorhandenen Home-Assistant-Installation wurden nicht abgefragt.
- Es existiert durch diese Recherche noch keine App-Implementierung, kein ARM64-Build und kein ausgeführter Container.
- Installation als Home-Assistant-App, Ingress, Seitenleistenzugriff, Peer-IP-Abweisung, persistente Daten, Update und Backup-Wiederherstellung wurden auf der Zielinstallation nicht getestet.
- Daher ist die Betriebsfähigkeit der konkreten App ausdrücklich **ungeprüft**. Die dokumentierten Mechanismen machen sie planbar, nicht bereits nachgewiesen.

## Rechercheablage und Sicherung

Ein Hintergrundagent hat ergänzend die offiziellen Ingress- und Backup-Quellen gelesen; die Ergebnisse sind in dieser einen Datei zusammengeführt. Es wurde kein App-Code erstellt und keine Produktionsinstallation verändert.

Für die vom Wayfinder-Skill verlangte lokale Sicherung wurde der isolierte Wegwerfbranch `research/home-assistant-betrieb` auf Basis von `3806fee` angelegt. Der Haupt-Checkout bleibt auf `master`; vorhandene uncommittete Planungsdateien werden nicht in den Recherchecommit aufgenommen. Ein Git-Remote ist nicht eingerichtet. **Push: nicht ausgeführt, weil kein Remote vorhanden ist.** Es wurde kein Remote erfunden und kein Pull Request geöffnet. Der konkrete lokale Sicherungscommit wird im zugehörigen Ticket festgehalten.
