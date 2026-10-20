# TypeScript für Oberfläche und Server

Am 20. Oktober 2026 wurde festgelegt, die Browseroberfläche und den Server der Putzplan-App in TypeScript zu implementieren. Die gemeinsame Sprache erleichtert die Entwicklung und die gemeinsame Nutzung von Datentypen zwischen Oberfläche und Server. Der Zugriff erfolgt im Browser des Endgeräts beziehungsweise über Home Assistant Ingress; Web-App und eigener Webserver laufen gemeinsam als Home-Assistant-App gemäß den Projektvorgaben in `AGENTS.md`.

React ist eine mögliche Wahl für die Oberfläche, aber noch nicht verbindlich festgelegt. Die konkrete Serverlaufzeit, das Serverframework und weitere Bibliotheken werden in späteren Tasks ausgewählt.

Die Sprachwahl ist beschlossen. ARM64-Kompatibilität, Containerbetrieb als Home-Assistant-App und Zugriff über Ingress sind noch nicht praktisch geprüft.
