# Installation und Betrieb

Nach der Installation **Starten** und anschließend **Web-Oberfläche öffnen** auswählen. Für einen festen Eintrag **In der Seitenleiste anzeigen** aktivieren. Die Startseite sollte **Verbunden · Version 0.1.0** anzeigen.

Es sind keine Einstellungen, eigenen Passwörter oder Portfreigaben nötig. Die Anmeldung erfolgt über Home Assistant. Die App muss über Ingress geöffnet werden.

## Daten und Updates

Anwendungsdaten werden unter `/data` gespeichert und überleben Neustarts und Updates. Aktuell enthält `state.json` den Zeitpunkt der ersten Initialisierung. App-Backups schließen diesen Speicher ein. Vor Updates ein Backup mit dieser App erstellen. Eine Deinstallation kann die gespeicherten Daten löschen.

Bei eigenen Änderungen die Version in `config.yaml` und `package.json` erhöhen und das Lockfile aktualisieren. Danach die App im Store aktualisieren beziehungsweise bei lokaler Installation neu bauen.

## Fehlerbehebung

- **Installation scheitert:** Im Supervisor-Protokoll prüfen, ob das Node-Basis-Image und npm-Pakete geladen werden können. Beim ersten Build wird Internet benötigt.
- **App startet nicht:** Das App-Protokoll auf Startfehler oder Probleme beim Lesen/Schreiben des Datenverzeichnisses prüfen. Eine beschädigte `state.json` wird absichtlich nicht automatisch überschrieben; zunächst ein Backup sichern.
- **Oberfläche lädt nicht:** Über **Web-Oberfläche öffnen** auf der App-Seite neu öffnen und den Browser neu laden. Port 8099 ist absichtlich nicht direkt erreichbar.
- **Kein Seitenleisteneintrag:** Auf der App-Seite **In der Seitenleiste anzeigen** aktivieren.

## Aktueller Prüfstand

Das Template ist für `aarch64` (Raspberry Pi 5) und `amd64` konfiguriert. Lokale Tests prüfen HTTP-Server, simulierten Ingress, Zugriffsschutz und persistente Daten. Container-Build/-Start, ARM64-Laufzeit, echte Home-Assistant-Installation, Ingress und Backup-Wiederherstellung sind noch nicht praktisch geprüft.
