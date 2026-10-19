# Architektur, Datenmodell und dauerhafte Speicherung festlegen

Type: grilling
Labels: wayfinder:grilling
Status: open
Parent: ../map.md
Blocked by: 01, 02, 03, 04, 05, 06

## Question

Welche möglichst einfache Architektur mit eigenem Webserver, Frontend, Datenmodell und Speicher erfüllt die beschlossenen Fachregeln und die recherchierten Betriebsanforderungen?

Eine begründete Empfehlung einschließlich Alternativen zur gemeinsamen Entscheidung vorlegen. Zu betrachten sind ARM64-taugliche Laufzeit und Abhängigkeiten, App-Paketierung, vollständiger Ingress-Pfad, Schutz des internen Servers, persistenter Datenpfad, Datumswerte und Zeitzone, Wiederholungen und Ausnahmen sowie Katalog- und Erledigungshistorie. Auch gleichzeitige Änderungen mehrerer Browser und das Sichern/Wiederherstellen sowie Ändern des Datenformats abdecken. Unnötige Dienste und Abhängigkeiten vermeiden. Ein ADR nur bei den im Domain-Modeling-Skill genannten echten Trade-offs anlegen.

Die abgeschlossene Entscheidung [Wiederholungen und Ausnahmen von Kalendereinträgen festlegen](02-wiederholungen-und-ausnahmen.md#answer) ist dabei abzubilden, insbesondere die vom aktuellen Datum unabhängige ursprüngliche Serienposition, einzelne Ausnahmen und ihre Behandlung bei Serienänderungen sowie der Erhalt bereits erledigter Vorkommen nach dem Ändern oder Löschen einer Serie.
