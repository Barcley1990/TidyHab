# Projektvorgaben

## Verbindliche Technologieentscheidung

- Bei Implementierung und Technologieauswahl die Entscheidung in [ADR-0001](docs/adr/0001-typescript-web-app.md) anwenden.

## Zielplattform und Architektur

- Alle in diesem Projekt entwickelten Anwendungen müssen als Web-App mit einem eigenen Webserver umgesetzt werden.
- Web-App und Webserver müssen gemeinsam als Home-Assistant-App (früher „Add-on“) auf der vorhandenen Home-Assistant-OS-Installation laufen können. Der Supervisor verwaltet diese App als eigenen Container parallel zu Home Assistant Core.
- Die Zielhardware ist ein Raspberry Pi 5 mit ARM64-Architektur (`aarch64`). Abhängigkeiten und Container-Images müssen diese Architektur unterstützen.
- Ein zusätzlicher Rechner, ein externer Hosting-Dienst oder ein Wechsel des Betriebssystems darf für den regulären Betrieb nicht erforderlich sein.
- Die Bedienung erfolgt im Browser des Endgeräts. Ein lokal auf dem Raspberry Pi laufender Browser ist keine Voraussetzung.

## Einbindung über Home Assistant Ingress

- Die Architektur muss von Beginn an die spätere Anzeige und Bedienung der vollständigen Web-App über Home Assistant Ingress unterstützen, einschließlich eines eigenen Eintrags in der Home-Assistant-Seitenleiste.
- Frontend, API-Aufrufe, statische Dateien, Weiterleitungen und gegebenenfalls WebSocket-Verbindungen müssen unter dem von Ingress vergebenen, variablen URL-Präfix funktionieren. Keine festen Hostnamen, Ports oder vom Domain-Stamm ausgehenden Anwendungspfade voraussetzen.
- Die Anmeldung für den Zugriff über Ingress erfolgt über Home Assistant. Der interne Webserver muss so konfiguriert werden, dass dieser Zugriff ausschließlich über den Supervisor erfolgt; eine direkte Freigabe seines Ports im Netzwerk ist für den regulären Betrieb nicht erforderlich.
- Für die Installation als Home-Assistant-App die erforderliche Container- und App-Konfiguration bereitstellen und Ingress aktivieren. Entwicklungsbetrieb außerhalb von Home Assistant darf zusätzlich möglich sein.
- Dauerhafte Anwendungsdaten im persistenten Datenverzeichnis der Home-Assistant-App speichern, damit sie Neustarts und Updates überstehen und in deren Backups aufgenommen werden können.

## Umsetzung und Prüfung

- Architekturentscheidungen und neue Abhängigkeiten an diesen Betriebsanforderungen ausrichten.
- Vor der Bereitstellung die ARM64-Kompatibilität, den Betrieb als Home-Assistant-App und den Zugriff über Ingress prüfen. Noch nicht praktisch geprüfte Eigenschaften ausdrücklich als ungeprüft kennzeichnen.

## Agent skills

### Issue tracker

Issues and specs live as local Markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Use the single-context layout with a root `GLOSSARY.md` and `docs/adr/`. See `docs/agents/domain.md`.
