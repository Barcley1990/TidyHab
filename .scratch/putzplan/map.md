# Putzplan-App: Weg zur umsetzungsreifen ersten Version

Labels: wayfinder:map
Status: open

## Destination

Eine umsetzungsreife Spezifikation für die erste alltagstaugliche Putzplan-App mit eindeutigem Funktionsumfang, Bedienabläufen, Datenmodell, technischen Rahmenbedingungen und überprüfbaren Abnahmekriterien.

## Notes

- Der im Auftakt bestätigte Ausgangsrahmen steht ausschließlich im [Bestätigten Ausgangsrahmen der Putzplan-App](brief.md). Er ist die Grundlage der folgenden Entscheidungen.
- Die verbindlichen Betriebsanforderungen stehen in [AGENTS.md](../../AGENTS.md); Begriffe in [GLOSSARY.md](../../GLOSSARY.md).
- Planungsmodus: Entscheidungen klären, keine produktive App implementieren oder bereitstellen. Ein Bedienprototyp dient ausschließlich der gemeinsamen Entscheidung.
- Für Gesprächsentscheidungen die Skills `mattpocock-skills:grilling` und `mattpocock-skills:domain-modeling` anwenden; bei Recherche `mattpocock-skills:research`, beim Bedienprototyp `mattpocock-skills:prototype`.
- Tickets liegen als einzelne Dateien unter `issues/`. `Parent: ../map.md` bezeichnet diese Map. Es werden ausschließlich `wayfinder:`-Labels verwendet, keine Triage-Labels. Bei noch nicht bearbeiteten Tickets bedeutet `Status: open`: offen und unbeansprucht. Claims, Antworten und Abhängigkeiten folgen [Issue tracker: Local Markdown](../../docs/agents/issue-tracker.md).
- Die nächste Entscheidung wird über offene, unbeanspruchte Tickets ohne offene Blocker ermittelt, aufsteigend nach Nummer. Offene Tickets werden nicht in dieser Map dupliziert.
- Pro Sitzung höchstens ein Entscheidungsticket auflösen, ausgenommen Recherche. Die Kartierung löst keine Gesprächsentscheidungstickets auf.
- Recherche klärt dokumentierte Voraussetzungen. ARM64-Betrieb, Home-Assistant-App und Ingress auf der Zielinstallation bleiben ohne Praxistest ausdrücklich ungeprüft.
- Sobald der Weg geklärt ist, werden die verlinkten Antworten zur Spezifikation in `spec.md` zusammengeführt. Ungeprüfte technische Eigenschaften und verbleibende Grenzen müssen darin sichtbar bleiben.

## Decisions so far

- [Technischen Betriebsrahmen für Home Assistant, Ingress und ARM64 verifizieren](issues/06-home-assistant-betriebsrahmen.md): Offiziellen Container-, Ingress-, ARM64- und Datenrahmen belegt; konkrete Betriebsfähigkeit bleibt praktisch ungeprüft.
- [Personen und Zuständigkeiten im gemeinsamen Haushalt festlegen](issues/01-personen-und-zustaendigkeiten.md#answer): Gemeinsame Bearbeitung mit keiner oder einer zuständigen Person je Eintrag; beim Löschen einer Person bleiben ihre Einträge unzugeordnet erhalten.
- [Wiederholungen und Ausnahmen von Kalendereinträgen festlegen](issues/02-wiederholungen-und-ausnahmen.md#answer): Fester täglicher, wöchentlicher oder monatlicher Rhythmus mit einzelnen Ausnahmen; Serienänderungen schützen erledigte Vorkommen und behandeln Ausnahmen abhängig von der Art der Änderung.

## Not yet specified

- Zusätzliche Bedienprobleme und Folgeentscheidungen, die erst durch die gemeinsame Rückmeldung zum Bedienprototyp konkret werden.
- Konkrete Einschränkungen der vorhandenen Home-Assistant-Installation, die eine Entscheidung über Anpassungen des späteren Prüf- oder Installationswegs erforderlich machen könnten. Solche Folgefragen erst nach der technischen Recherche und dem Architekturentwurf präzisieren.

## Out of scope

- Push-Erinnerungen, automatische Aufgabenverteilung und Punktewettbewerbe: vom Nutzer für die erste Version zurückgestellt.
- Vollständige Implementierung, produktive Installation und Betrieb der App: folgen auf die hier zu klärende Spezifikation. Die Definition der nötigen Prüfungen gehört zur Planung.
- Zusätzliche Rechner, externe Hosting-Dienste, ein Betriebssystemwechsel und native Mobil-Apps als Voraussetzung für den regulären Betrieb: durch die Projektvorgaben ausgeschlossen.
