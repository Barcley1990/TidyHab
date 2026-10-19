# Personen und Zuständigkeiten im gemeinsamen Haushalt festlegen

Type: grilling
Labels: wayfinder:grilling
Status: resolved
Parent: ../map.md

## Question

Wie werden Personen und ihre Zuständigkeiten geführt: Kann ein Kalendereintrag unzugeordnet bleiben, genau einer oder mehreren Personen zugeordnet sein, wer darf Zuordnungen ändern und was geschieht beim Umbenennen oder Entfernen einer Person mit vorhandenen Einträgen?

Der bestätigte Rahmen umfasst einen gemeinsamen Haushalt mit frei benannten Personen. Abzugrenzen sind die fachliche Person im Haushalt und der über Home Assistant angemeldete Zugriff; daraus folgt noch keine persönliche Berechtigungsprüfung. An konkreten Beispielen klären, ob Zuordnungen der gemeinsamen Planung dienen oder individuelle Bearbeitungsrechte auslösen sollen.

## Comments

### Gesprächsrunde: Grundmodell bestätigt

Der Nutzer bestätigt die vier Empfehlungen mit „Alle ja“:

- Ein Kalendereintrag kann unzugeordnet sein oder genau eine zuständige Person haben. Bei gemeinsamer Durchführung wird eine Person als hauptverantwortlich geführt.
- Jeder mit Zugriff auf die App darf alle Zuordnungen ändern und die Personen verwalten. Die fachliche Person ist unabhängig vom angemeldeten Home-Assistant-Zugriff; für die erste Version gibt es keine persönlichen Bearbeitungsrechte.
- Eine Namensänderung wird bei allen vorhandenen Einträgen sichtbar, einschließlich vergangener Einträge; die Zuordnungen bleiben erhalten.
- Zunächst bestätigt, später ausdrücklich ersetzt (siehe folgende Gesprächsrunde): Personen können archiviert werden. Bestehende Zuordnungen bleiben erhalten; archivierte Personen stehen für neue Zuordnungen nicht mehr zur Auswahl.

Der damalige Klärungsbedarf betraf offene Einträge und bestehende Wiederholungen, eine mögliche Reaktivierung sowie die Unterscheidbarkeit von Personennamen. Die folgende Korrektur ersetzt die Archivierungsannahme.

### Gesprächsrunde: Löschen statt Archivieren

Der Nutzer stellt klar: „Eine Archivierung soll es nicht geben. Wird eine Person gelöscht, ist sie einfach gelöscht. Q7 Namen sollen eindeutig sein. Q8 ja“.

- Personen werden gelöscht; es gibt keine Archivierung und keine Reaktivierung. Die frühere Zustimmung zur Archivierung ist damit aufgehoben. Die darauf aufbauenden Fragen zu archivierten Personen und bestehenden Wiederholungen sind nicht als entschieden zu behandeln.
- Personennamen müssen im Haushalt eindeutig sein.
- Die App bleibt auch ohne Personen nutzbar. Neue Einträge können unzugeordnet bleiben.

Als letzte Frage blieb zu klären, ob beim Löschen einer Person alle Kalendereinträge einschließlich vergangener und erledigter Einträge erhalten bleiben und nur ihre Zuständigkeit verlieren, sowie ob bestehende Wiederholungen künftig unzugeordnete Einträge vorsehen.

### Gesprächsrunde: Folgen des Löschens bestätigt

Der Nutzer bestätigt mit „Q9 ja“: Beim Löschen einer Person bleiben alle zugeordneten Kalendereinträge erhalten und werden unzugeordnet, auch vergangene und bereits erledigte Einträge. Bestehende Wiederholungen verlieren ebenfalls ihre Zuständigkeit und erzeugen künftig unzugeordnete Einträge. Tätigkeiten, Termine und Erledigungen bleiben erhalten.

## Answer

Abschließend im Gespräch bestätigt am 19. Oktober 2026. Diese Auflösung gilt anstelle der zwischenzeitlichen Archivierungsannahme.

### Personen und Zuständigkeit

- Die App führt einen gemeinsamen Haushalt mit frei wählbaren, im Haushalt eindeutigen Personennamen.
- Jeder Kalendereintrag hat entweder keine oder genau eine zuständige Person. Bei gemeinsamer Durchführung steht diese Person für die Hauptverantwortung; eine Zuordnung zu mehreren Personen ist nicht vorgesehen.
- Die App bleibt ohne Personen nutzbar. Neue Kalendereinträge können unzugeordnet angelegt werden.

### Gemeinsame Bearbeitung

- Jeder mit Zugriff auf die App darf alle Zuordnungen ändern und die Personen verwalten, einschließlich Anlegen, Umbenennen und Löschen.
- Eine fachliche Person ist unabhängig vom über Home Assistant angemeldeten Zugriff. Die Zuordnung dient der gemeinsamen Planung und löst keine persönlichen Bearbeitungsrechte aus.

### Umbenennen und Löschen

- Umbenennen aktualisiert den angezeigten Namen überall, einschließlich vergangener Kalendereinträge. Die Zuordnungen bleiben erhalten; auch der neue Name muss im Haushalt eindeutig sein.
- Eine gelöschte Person wird entfernt. Es gibt keine Archivierung und keine Reaktivierung.
- Alle ihr zugeordneten Kalendereinträge bleiben erhalten und werden unzugeordnet, unabhängig davon, ob sie vergangen, aktuell, künftig, offen oder bereits erledigt sind.
- Auch die Zuständigkeit bestehender Wiederholungen wird entfernt. Diese erzeugen künftig unzugeordnete Einträge.
- Das Löschen der Person entfernt keine Putztätigkeiten, Kalendereinträge oder Erledigungen und verteilt keine Zuständigkeiten auf andere Personen um.

### Überprüfbare Beispiele

- Ein neuer Haushalt ohne Personen erlaubt einen unzugeordneten Kalendereintrag.
- Ein zunächst unzugeordneter Eintrag kann einer Person zugeordnet, einer anderen Person zugeordnet oder wieder unzugeordnet werden. Eine zweite gleichzeitige Zuständigkeit ist nicht möglich.
- Wird „Tobi“ in „Tobias“ umbenannt, zeigen auch vergangene zugeordnete Einträge „Tobias“. Eine weitere Person mit einem bereits vergebenen Namen kann weder angelegt noch durch Umbenennen erzeugt werden.
- Wird „Tobias“ gelöscht, werden sein vergangener erledigter Eintrag, sein überfälliger offener Eintrag und sein künftiger Eintrag unzugeordnet. Ihre Termine und Erledigungszustände bleiben erhalten; bestehende Wiederholungen setzen sich unzugeordnet fort.
- Auch nach dem Löschen der letzten Person bleibt der Putzplan nutzbar. Ein anderer Zugriff auf die gemeinsame App hat dieselben Rechte zur Personenverwaltung und Änderung der Zuordnungen.

### Anschluss an weitere Entscheidungen

Die genauen Wiederholungsregeln, Erledigungszustände, Aufwandssummen und technischen Speicherregeln werden in den dafür bestehenden Tickets geklärt. Dabei sind die hier entschiedenen Auswirkungen des Umbenennens und Löschens zu berücksichtigen. Für diese Personenentscheidung sind keine weiteren offenen Fragen oder zusätzlichen Tickets entstanden.
