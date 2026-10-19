# Technischen Betriebsrahmen für Home Assistant, Ingress und ARM64 verifizieren

Type: research
Labels: wayfinder:research
Status: resolved
Assignee: codex/ha_betriebsrecherche
Parent: ../map.md

## Question

Welche aktuellen, offiziell dokumentierten Anforderungen bestimmen den sicheren Betrieb dieser eigenen Web-App samt Server als Home-Assistant-App auf Home Assistant OS und Raspberry Pi 5 mit ARM64?

Anhand von Primärquellen klären: Container-/App-Paketierung und unterstützte Basisimages für aarch64; Ingress-Konfiguration samt Seitenleisteneintrag; variables URL-Präfix für Frontend, API, statische Dateien und Weiterleitungen; Supervisor-Zugriff und Vertrauensgrenzen von Benutzer-/Proxy-Headern; persistente Daten und Backup; sinnvolle lokale sowie spätere praktische Prüfungen. WebSockets nur berücksichtigen, falls die Architektur sie benötigt.

Fakten und mögliche Architekturfolgen trennen. Keine Abhängigkeit oder Betriebsfähigkeit allein durch Dokumentationslektüre als praktisch geprüft ausgeben. Das Ergebnis soll die anschließende Architekturentscheidung ermöglichen, ohne diese vorwegzunehmen.

## Answer

Aufgelöst am 19. Oktober 2026 durch Primärquellen-Recherche. Der offiziell dokumentierte Rahmen unterstützt eine eigene App als Supervisor-Container auf Home Assistant OS/Raspberry Pi 5 (aarch64), Ingress samt optionalem Seitenleisteneintrag sowie persistentes `/data` mit App-Backup. Präfixfähiges Routing, Beschränkung auf die tatsächliche Supervisor-Peer-IP und der Umgang mit optionalen Benutzerheadern sind verbindliche Architektur- und Prüfpunkte. Die Recherche wählt keinen Technik-Stack.

Die [Recherche zum Home-Assistant-Betrieb](../research/home-assistant-betrieb.md) enthält direkte offizielle Quellen, aktuelle Build-/Basisimage-Konventionen, Vertrauensgrenzen, Schlussfolgerungen und einen vorgeschlagenen Prüfplan. Sämtliche Eigenschaften der konkreten App einschließlich ARM64-Build, realer Installation, Ingress und Backup-Wiederherstellung bleiben **praktisch ungeprüft**; die Zielinstallation wurde nicht verändert.

Lokale Sicherung ausschließlich der Ergebnisdatei auf `research/home-assistant-betrieb`, Commit `427686e` (`docs: research Home Assistant app deployment constraints`). Der Haupt-Checkout blieb auf `master`; seine uncommitteten Planungsdateien wurden erhalten. **Push nicht ausgeführt: Es ist kein Git-Remote eingerichtet.** Kein Pull Request eröffnet.
