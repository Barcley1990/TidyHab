# TidyHab · Putzplan

Startfähiges Grundgerüst einer TypeScript-Web-App mit eigenem Node.js-Webserver für Home Assistant OS. Die Startseite zeigt den Verbindungsstatus; die eigentliche Putzplanung wird später ergänzt.

## In Home Assistant installieren

Voraussetzung ist Home Assistant OS, beispielsweise auf einem Raspberry Pi 5. Home Assistant benötigt während der Installation Internetzugriff. Für ein privates GitHub-Repository muss der Supervisor Zugriff auf das Repository haben.

1. In Home Assistant **Einstellungen → Apps → App installieren** öffnen (in älteren Versionen **Einstellungen → Add-ons → Add-on-Store**).
2. Im Menü oben rechts **Repositories** auswählen, folgende Repository-URL eintragen und **Hinzufügen** wählen:

   ```text
   https://github.com/Barcley1990/TidyHab
   ```

3. Den Dialog schließen und unter **TidyHab** die App **TidyHab – Putzplan** öffnen. Falls sie noch nicht erscheint, den Store neu laden beziehungsweise im Menü nach Updates suchen.
4. **Installieren** auswählen. Der Supervisor lädt den Quellcode von GitHub und baut das Container-Image direkt auf dem Home-Assistant-Gerät. Der erste Build kann einige Minuten dauern.
5. Nach der Installation **Starten** und anschließend **Web-Oberfläche öffnen** auswählen.
6. **In der Seitenleiste anzeigen** aktivieren, um die App künftig über **Putzplan** zu öffnen. **Beim Booten starten** ist standardmäßig eingeschaltet.

Auf der Startseite sollte **Verbunden · Version 0.1.0** erscheinen. Es sind keine zusätzlichen Passwörter oder Portfreigaben erforderlich.

Alternativ öffnet [Repository in Home Assistant hinzufügen](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FBarcley1990%2FTidyHab) direkt den passenden Dialog in deiner Home-Assistant-Instanz.

### Updates installieren

Wenn eine neue App-Version auf GitHub verfügbar ist, im App-Store nach Updates suchen. Vor dem Update ein Backup erstellen, dann auf der App-Seite **Aktualisieren** wählen. Der Supervisor baut die neue Version; die Daten unter `/data` bleiben erhalten. Neue Veröffentlichungen müssen die Versionsnummer in `putzplan/config.yaml`, `putzplan/package.json` und dem Lockfile erhöhen.

## Entwicklung

Voraussetzung: Node.js 24 mit npm. Im Ordner `putzplan/`:

```sh
npm ci
npm test
INGRESS_ONLY=false npm run dev
```

Danach im Browser `http://127.0.0.1:8099` öffnen. Nach Änderungen an TypeScript `npm run build` erneut ausführen; der laufende Watch-Prozess lädt den Server neu. `npm run check` prüft die Typen. Entwicklungsdaten landen in `putzplan/.data/` und werden nicht eingecheckt. Direkter Entwicklungszugriff ist nur auf `127.0.0.1` und außerhalb von `NODE_ENV=production` erlaubt.

## Aufbau und Betrieb

- `repository.yaml`: Erkennung als Home-Assistant-App-Repository.
- `putzplan/config.yaml`: App mit Ingress und Seitenleisteneintrag für `aarch64` und `amd64`.
- `putzplan/Dockerfile`: Mehrstufiger Build mit `node:24-alpine`; im Laufzeit-Image gibt es keine zusätzlichen npm-Abhängigkeiten.
- `putzplan/src/server/`: HTTP-Server und lesbare Status-API `api/status`.
- `putzplan/src/client/`: Browseroberfläche in TypeScript, ohne Frontend-Framework.
- `putzplan/src/shared/`: Gemeinsame Datentypen für Browser und Server.

Der interne Server läuft im Container auf Port 8099. Die App veröffentlicht keinen Netzwerkport und nutzt kein Host-Netzwerk. Im Container akzeptiert der Server ausschließlich Verbindungen vom Supervisor (`172.30.32.2`), anhand der tatsächlichen Verbindungsadresse. Weiterleitungsheader können diese Prüfung nicht umgehen. Home Assistant übernimmt die Anmeldung.

Ingress entfernt sein URL-Präfix vor der Weiterleitung. Die HTML-Basis wird aus `X-Ingress-Path` gesetzt; Dateien und API-Aufrufe beziehen sich darauf. Es sind keine festen externen Hostnamen oder Ports erforderlich. Client-Routing und WebSockets sind noch nicht Bestandteil des Templates.

Persistente Daten liegen im Container unter `/data`. Zum Nachweis der Speicherung wird dort `state.json` mit dem Zeitpunkt der ersten Initialisierung angelegt und bei weiteren Starts wiederverwendet. Das Verzeichnis wird vom Supervisor verwaltet und bei App-Backups gesichert. Es sind keine zusätzlichen Freigaben, Datenbanken oder Zugriffsrechte auf Home Assistant Core nötig. Der Server beendet sich bei Stoppsignalen kontrolliert.

Die Umsetzung folgt [ADR-0001](docs/adr/0001-typescript-web-app.md). Node.js 24, der eingebaute HTTP-Server und Browser-TypeScript halten das Grundgerüst klein. TypeScript und Node-Typen werden ausschließlich zum Bauen benötigt; genaue Versionen sind im Lockfile festgehalten.

## Prüfstand

Automatisierte Tests prüfen die Oberfläche und API hinter wechselnden simulierten Ingress-Präfixen, die Supervisor-Zugriffskontrolle einschließlich gefälschter Header, ungültige Pfade und die Wiederverwendung persistenter Daten nach einem Serverneustart.

**Noch nicht praktisch geprüft:** Container-Build und Containerstart, Installation und Start unter Home Assistant OS, echter Ingress einschließlich Seitenleisteneintrag, App-Backup/Wiederherstellung sowie Betrieb auf Raspberry Pi 5 / ARM64. Docker und eine Home-Assistant-OS-Testinstanz stehen in der lokalen Entwicklungsumgebung nicht zur Verfügung. Das offizielle Node-Basis-Image unterstützt laut Image-Metadaten `arm64v8` und `amd64`; die Architekturangaben sind kein praktischer Laufzeittest.

Vor einer Bereitstellung auf dem Zielgerät die Installation oben durchführen, Web-Oberfläche und Verbindungsstatus prüfen, App und Home Assistant neu starten sowie ein App-Backup erstellen und wiederherstellen. `state.json` muss dabei erhalten bleiben.

Referenzen: [Home Assistant App-Konfiguration](https://contributors.home-assistant.io/apps/reference/configuration/), [Ingress](https://contributors.home-assistant.io/apps/guides/ingress/), [App-Repositories](https://contributors.home-assistant.io/apps/guides/repository/), [Node-Image-Architekturen](https://github.com/docker-library/official-images/blob/master/library/node).
