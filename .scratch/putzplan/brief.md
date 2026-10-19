# Bestätigter Ausgangsrahmen der Putzplan-App

Bestätigt im Gespräch am 19. Oktober 2026: das Planungsziel mit „Q1 ja“, die Empfehlungen zu Haushalt, Terminen, Wiederholungen, Katalog, Aufwand, Erledigung, Darstellung und Umfang mit „Alle ja“.

## Ziel

Eine umsetzungsreife Spezifikation für die erste alltagstaugliche Version der Putzplan-App mit Funktionsumfang, Bedienabläufen, Datenmodell und technischen Rahmenbedingungen.

## Bestätigte Anforderungen

- Ein gemeinsamer Haushalt unterstützt mehrere Personen mit frei wählbaren Namen. Putztätigkeiten können Personen zugeordnet werden.
- Der Putzplan funktioniert wie ein Kalender. Pro Tag sind mehrere Putztätigkeiten möglich.
- Kalendereinträge beziehen sich auf einen Tag und haben keine feste Uhrzeit.
- Einmalige und wiederkehrende Termine werden unterstützt, beispielsweise jeden Montag oder alle zwei Wochen. Die genauen Wiederholungsregeln sind noch offen.
- Ein Tätigkeitskatalog enthält vordefinierte Putztätigkeiten, darunter Fenster putzen, Bett frisch beziehen und Wäsche waschen.
- Die Namen und der voreingestellte Aufwand der Putztätigkeiten können bearbeitet werden. Eigene Putztätigkeiten können ergänzt werden.
- Der Aufwand ist eine ganze Zahl von 1 (sehr gering) bis 5 (sehr hoch).
- Tages- und Wochensummen des Aufwands sollen die Arbeitsbelastung beim Planen erkennbar machen. Die genaue Berechnung bei verschobenen, erledigten oder überfälligen Einträgen ist noch offen.
- Kalendereinträge können als erledigt abgehakt werden. Vergangene offene Termine bleiben erkennbar.
- Die App wird für die Bedienung auf dem Smartphone ausgelegt. Sie startet mit einer Wochenübersicht und bietet zusätzlich eine Tagesansicht.

## Betriebsanforderungen

Verbindliche Quelle ist [AGENTS.md](../../AGENTS.md): eigene Web-App mit Webserver als Home-Assistant-App auf Home Assistant OS, Raspberry Pi 5 mit ARM64, vollständige Ingress-Unterstützung und Speicherung im persistenten App-Datenverzeichnis. Der reguläre Betrieb erfordert keinen zusätzlichen Rechner und keinen externen Hosting-Dienst.

## Abgrenzung

Push-Erinnerungen, automatische Aufgabenverteilung und Punktewettbewerbe gehören nicht zur ersten Version. Die Wayfinder-Phase klärt die Entscheidungen für die Spezifikation; die vollständige App-Implementierung und Bereitstellung folgen danach.
