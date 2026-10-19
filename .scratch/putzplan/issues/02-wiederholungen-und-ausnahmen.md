# Wiederholungen und Ausnahmen von Kalendereinträgen festlegen

Type: grilling
Labels: wayfinder:grilling
Status: resolved
Parent: ../map.md

## Question

Welche Wiederholungsregeln unterstützt die erste Version, und wie werden Start, Ende, Verschieben, Auslassen, Ändern und Löschen einzelner Vorkommen gegenüber einer ganzen Serie behandelt?

Insbesondere festlegen, ob eine Wiederholung am geplanten Datum oder an der tatsächlichen Erledigung ausgerichtet wird. Beispiele: Bett frisch beziehen alle zwei Wochen; eine verspätete Erledigung; ein verschobener Montagstermin; Änderungen ab einem bestimmten Vorkommen. Tägliche, wöchentliche und monatliche Varianten gezielt auf ihren nötigen Umfang prüfen, ohne sie vorweg als zugesagt zu behandeln.

Die abgeschlossene Entscheidung [Personen und Zuständigkeiten im gemeinsamen Haushalt festlegen](01-personen-und-zustaendigkeiten.md#answer) ist insbesondere beim Löschen einer zuständigen Person und beim Fortsetzen bestehender Wiederholungen zu berücksichtigen.

## Comments

### Gesprächsrunde: Grundregeln bestätigt

Der Nutzer bestätigt Q1 bis Q4 mit „Alle ja“:

- Wiederholungen sind täglich, wöchentlich und monatlich mit frei wählbarem Abstand möglich, beispielsweise alle drei Tage oder alle zwei Wochen. Wöchentliche Regeln können mehrere Wochentage enthalten; monatliche Regeln verwenden einen festen Monatstag. Regeln wie „letzter Freitag im Monat“ und jährliche Wiederholungen gehören zunächst nicht dazu.
- Der Rhythmus richtet sich nach den geplanten Daten. Verspätetes Erledigen und das Verschieben eines einzelnen Vorkommens verändern ihn nicht.
- Jede Serie hat ein Startdatum und läuft entweder unbegrenzt oder bis zu einem einschließlich geltenden Enddatum. Ein Ende nach einer bestimmten Anzahl von Wiederholungen wird zunächst nicht angeboten.
- Beim Ändern und Löschen werden „Nur dieses Vorkommen“ und „Dieses und alle folgenden“ angeboten. Eine Änderung der ganzen Serie erfolgt ab ihrem ersten Vorkommen. Frühere Vorkommen bleiben bei einer Änderung ab einem späteren Vorkommen erhalten.

### Gesprächsrunde: Start, kurze Monate und Ausnahmen bestätigt

Der Nutzer bestätigt Q5 bis Q8 mit „Alle ja“:

- Fehlt der feste Monatstag in einem Monat, fällt das Vorkommen auf dessen letzten Tag. Der ursprünglich gewählte Monatstag bleibt für spätere Monate maßgeblich: 31. Januar → 28./29. Februar → 31. März.
- Das Startdatum ist immer das erste Vorkommen. Monatlich bestimmt es den Monatstag. Wöchentlich muss sein Wochentag ausgewählt sein; weitere Wochentage können hinzukommen. Beispiel: „alle zwei Wochen montags und donnerstags, Start Donnerstag“ beginnt an diesem Donnerstag und setzt sich mit Montag und Donnerstag der übernächsten Kalenderwoche fort.
- Einzelne Vorkommen können verschoben, geändert oder ausgelassen werden, ohne andere Vorkommen zu verändern. Ein ausgelassenes Vorkommen bleibt als Ausnahme nachvollziehbar und kann wiederhergestellt werden. Ausnahmen bleiben ihrer Serie zugeordnet.
- Bereits erledigte Vorkommen bleiben bei Serienänderungen und beim Löschen einer Serie einschließlich Datum, Angaben und Erledigung erhalten. Serienänderungen betreffen nur noch nicht erledigte Vorkommen im gewählten Bereich.

### Gesprächsrunde: Zusammenspiel der Regeln bestätigt

Der Nutzer bestätigt Q9 bis Q13 mit „Alle ja“:

- Das Löschen nur eines Vorkommens entspricht dem Auslassen. In der Bedienung genügt „Auslassen“; das Vorkommen verschwindet aus dem aktiven Plan und kann nach den dann geltenden Serienvorgaben wiederhergestellt werden.
- Für „Dieses und alle folgenden“ zählt der ursprüngliche Platz in der Serie. Ein von Montag auf Freitag verschobenes Vorkommen gehört weiterhin zum ursprünglichen Montag. Das Serienende begrenzt die regulären Termine; ein einzelnes Vorkommen darf darüber hinaus verschoben werden.
- Ein verschobenes Vorkommen darf mit einem anderen Vorkommen derselben Serie auf einen Tag fallen. Beide bleiben getrennt sichtbar und einzeln erledigbar; es gibt keine automatische Zusammenführung.
- Änderungen der Serienangaben erhalten einzelne Änderungen und Auslassungen. Ausdrücklich individuell geänderte Angaben haben Vorrang; die übrigen Angaben folgen der Serie. Die bereits beschlossene Entfernung aller Zuständigkeiten einer gelöschten Person gilt weiterhin überall.
- Änderungen an Rhythmus, Start oder Ende setzen vorhandene Ausnahmen der betroffenen, noch nicht erledigten Vorkommen zurück. Vor dem Speichern weist die App ausdrücklich darauf hin, dass Einzelverschiebungen entfallen und ausgelassene Termine wieder eingeplant werden können. Abbrechen ist möglich. Erledigte Vorkommen bleiben erhalten.

## Answer

Abschließend im Gespräch am 19. Oktober 2026 bestätigt. Der Nutzer hat die Empfehlungen Q1 bis Q13 in drei Runden jeweils mit „Alle ja“ angenommen.

### Unterstützte Wiederholungsregeln

- Einmalige Kalendereinträge und Serien werden unterstützt.
- Serien wiederholen sich täglich, wöchentlich oder monatlich mit einem frei wählbaren Abstand in der jeweiligen Einheit, beispielsweise alle drei Tage, alle zwei Wochen oder alle zwei Monate.
- Wöchentliche Serien können mehrere ausgewählte Wochentage enthalten. Monatliche Serien verwenden einen festen Monatstag.
- Jährliche Wiederholungen, Monatsregeln wie „letzter Freitag im Monat“ und ein Serienende nach einer bestimmten Anzahl von Vorkommen gehören nicht zur ersten Version.

### Beginn, Ende und Rhythmus

- Das Startdatum ist immer das erste Vorkommen. Monatlich bestimmt es den festen Monatstag. Wöchentlich muss sein Wochentag ausgewählt sein; weitere Wochentage sind möglich.
- Bei wöchentlichen Regeln zählt die Kalenderwoche des Startdatums als erste aktive Woche. Weitere aktive Wochen folgen im gewählten Wochenabstand; ausgewählte Wochentage vor dem Startdatum erzeugen keine früheren Vorkommen. „Alle zwei Wochen montags und donnerstags, Start Donnerstag“ beginnt daher an diesem Donnerstag und setzt sich mit Montag und Donnerstag der übernächsten Kalenderwoche fort.
- Eine Serie läuft unbegrenzt oder bis zu einem einschließlich geltenden Enddatum. Die Grenze bezieht sich auf die regulären Serientermine.
- Fehlt der feste Monatstag, fällt das Vorkommen auf den letzten Tag des betreffenden Monats. Der ursprüngliche Monatstag bleibt maßgeblich; es entsteht keine dauerhafte Verschiebung auf den kürzeren Monatstag.
- Der Rhythmus folgt den geplanten Daten. Verspätetes Erledigen, einzelnes Verschieben und Auslassen verändern die weiteren regulären Termine nicht.

### Einzelne Vorkommen und Ausnahmen

- Ein einzelnes Vorkommen kann verschoben, geändert oder ausgelassen werden. Diese Ausnahme bleibt ihrer Serie zugeordnet und ändert andere Vorkommen nicht.
- Das Löschen nur eines Vorkommens wird als „Auslassen“ angeboten. Das Vorkommen verschwindet aus dem aktiven Plan, bleibt als Ausnahme nachvollziehbar und kann nach den dann geltenden Serienvorgaben wiederhergestellt werden.
- Ein einzelnes Vorkommen darf auch über das Serienende hinaus verschoben werden; dadurch verlängert sich die reguläre Serie nicht.
- Zwei Vorkommen derselben Serie dürfen durch Verschieben auf denselben Tag fallen. Sie bleiben getrennte Kalendereinträge und können unabhängig voneinander erledigt werden.

### Reichweite von Änderungen und Löschen

- Es gibt die Reichweiten „Nur dieses Vorkommen“ und „Dieses und alle folgenden“. Für das einzelne Löschen lautet die Handlung „Auslassen“.
- Die ganze Serie wird ab ihrem ersten Vorkommen geändert oder gelöscht; dafür ist keine dritte Reichweite erforderlich.
- Für die Abgrenzung von „Dieses und alle folgenden“ zählt der ursprüngliche Platz des ausgewählten Vorkommens in der Serie, nicht sein gegebenenfalls verschobenes Datum. Frühere Vorkommen bleiben erhalten, auch wenn ihr aktueller Termin hinter dieser Grenze liegt.
- Bereits erledigte Vorkommen bleiben bei Serienänderungen und beim Löschen einer Serie einschließlich Datum, Angaben und Erledigung erhalten. Serienänderungen und das Löschen ab einem Vorkommen betreffen nur noch nicht erledigte Vorkommen im gewählten Bereich.

### Vorhandene Ausnahmen bei Serienänderungen

- Werden nur Serienangaben geändert, bleiben einzelne Änderungen und Auslassungen bestehen. Ausdrücklich für ein Vorkommen geänderte Angaben haben Vorrang; die übrigen Angaben folgen weiterhin der Serie.
- Werden Rhythmus, Start oder Ende geändert, werden die Ausnahmen der betroffenen, noch nicht erledigten Vorkommen im gewählten Bereich zurückgesetzt. Einzelverschiebungen entfallen; ausgelassene Vorkommen können nach der neuen Regel wieder eingeplant werden.
- Bevor diese Zeitplanänderung gespeichert wird, zeigt die App ihre Folgen für vorhandene Ausnahmen ausdrücklich an und ermöglicht das Abbrechen. Erledigte Vorkommen bleiben auch hierbei geschützt.
- Das Löschen einer Person folgt weiterhin der bereits abgeschlossenen Personenentscheidung: Ihre Zuständigkeit wird überall entfernt, auch aus individuell geänderten Vorkommen und bestehenden Serien. Die Wiederholung setzt sich unzugeordnet fort; Tätigkeiten, Termine und Erledigungen bleiben erhalten.

### Überprüfbare Beispiele

- **Fester Rhythmus:** Bett frisch beziehen ist alle zwei Wochen montags vorgesehen. Wird ein Montagstermin erst am Donnerstag erledigt, bleibt der nächste reguläre Termin am Montag zwei Wochen nach dem ursprünglichen Montag.
- **Start mitten in einer aktiven Woche:** Bei „alle zwei Wochen montags und donnerstags, Start Donnerstag“ entsteht kein Montagstermin vor dem Start. Die nächsten Vorkommen liegen am Montag und Donnerstag der übernächsten Kalenderwoche.
- **Kurzer Monat:** Eine monatliche Serie ab dem 31. Januar sieht den 28. beziehungsweise 29. Februar und danach den 31. März vor.
- **Enddatum:** Ein reguläres Vorkommen genau am Enddatum gehört noch zur Serie. Wird dieses Vorkommen einzeln auf einen späteren Tag verschoben, bleibt die Verschiebung möglich; weitere reguläre Termine jenseits des Enddatums entstehen nicht.
- **Auslassen und Wiederherstellen:** Ein ausgelassenes Vorkommen erscheint nicht mehr im aktiven Plan. Die Wiederherstellung richtet es nach den dann geltenden Serienvorgaben wieder ein, ohne den Rhythmus der anderen Vorkommen zu verschieben.
- **Gleicher Tag:** Ein Montagstermin wird auf den nächsten regulären Montag verschoben. Dort bleiben beide Vorkommen getrennt sichtbar und unabhängig erledigbar.
- **Ursprünglicher Serienplatz:** In einer täglichen Serie wird Montag auf Freitag verschoben. Eine Änderung ab dem ursprünglichen Mittwoch lässt dieses Montagvorkommen erhalten. Eine Änderung ab dem verschobenen Montagvorkommen umfasst die ursprünglichen Vorkommen ab Montag.
- **Serienangabe mit Ausnahme:** Ein Vorkommen ist ausdrücklich einer anderen Person zugeordnet. Eine Änderung der allgemeinen Zuständigkeit der Serie erhält diese individuelle Zuordnung. Wird die individuell zuständige Person gelöscht, wird auch dieses Vorkommen unzugeordnet.
- **Neuer Zeitplan:** Eine wöchentliche Serie enthält eine Einzelverschiebung und ein ausgelassenes Vorkommen. Werden die betroffenen noch nicht erledigten Vorkommen auf einen anderen Rhythmus umgestellt, weist die App vor dem Speichern auf das Zurücksetzen dieser Ausnahmen hin. Beim Abbrechen bleiben sie erhalten.
- **Schutz erledigter Vorkommen:** Wird eine Serie ab ihrem ersten Vorkommen geändert oder gelöscht, bleiben bereits erledigte Vorkommen mit ihren bisherigen Daten und Erledigungen erhalten.

### Anschluss an weitere Entscheidungen

- [Tätigkeitskatalog und Aufwand einzelner Kalendereinträge abgrenzen](03-taetigkeitskatalog-und-aufwand.md) legt fest, welche Angaben konkret bearbeitbar sind und wie sich Katalogänderungen auswirken. Die hier beschlossene Reichweite und der Vorrang einzelner Ausnahmen sind dabei zu beachten.
- [Erledigung und überfällige Kalendereinträge behandeln](04-erledigung-und-ueberfaelligkeit.md) klärt die Zustände, das Zurücknehmen einer Erledigung und überfällige Einträge. Dabei ist auch der Fall eines erhaltenen erledigten Vorkommens zu berücksichtigen, dessen Serie inzwischen geändert oder gelöscht wurde.
- [Kalenderregeln und nachvollziehbare Aufwandssummen festlegen](05-kalenderregeln-und-aufwandssummen.md) legt die Wochenabgrenzung, Haushaltszeitzone und Summen fest. Die Wochenabgrenzung muss auch die hier verwendeten Kalenderwochen eindeutig machen; verschobene und ausgelassene Vorkommen sowie getrennte Vorkommen am selben Tag sind in den Summen zu berücksichtigen.
- [Architektur, Datenmodell und dauerhafte Speicherung festlegen](07-architektur-und-datenmodell.md) klärt die technische Abbildung der ursprünglichen Serienposition, des aktuellen Datums, einzelner Ausnahmen, von Serienänderungen und der geschützten Erledigungshistorie.

Diese Anschlussfragen liegen bereits in bestehenden Entscheidungstickets. Aus dieser Auflösung entstehen keine zusätzlichen Tickets. Die App wurde in dieser Sitzung weder implementiert noch praktisch geprüft.
