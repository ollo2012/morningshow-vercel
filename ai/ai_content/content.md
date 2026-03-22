
# Schema zur dynamischen Eingabe von Informationen (Bäckerei Knülle)

## Produkt-Promotion
- titel: Neue Produkte
- produkte: Liste von Produkten, jedes mit:
	- name: Rübli Kuchen
	- beschreibung: Leckerer Karottenkuchen mit frosting
	- zusatzinfos: passt gut zum Sonntagskaffee oder Picknick
	- preis: 4,90€/StÜck
	- status: neu
	- allergene: gluten, ei, milch, nüsse"
    - naehrwerte:
        portionsgroesse: "100 g"
        kalorien: "342 kcal"
        kohlenhydrate: "48 g"
        davonZucker: "28 g"
        fett: "14 g"
        davonGesaettigt: "5 g"
        eiweiss: "5 g"
        salz: "0,4 g"
      
- produkte:
	- name: Lemon Tarte
	- beschreibung: Lemon tarte wird nicht mehr angeboten, kommt wieder im Sommer
	- preis: 4,90€/StÜck
	- status: eingestellt


- produkte:
	- name: Crossaint
	- beschreibung: Das crossaint wird jetzt mit 165°C gebacken
	- preis: 4,90€/StÜck
	- status: Überarbeitet

## Ankündigungen
- ankuendigungen: Liste von Ankündigungen, jede mit:
	- titel: Nächste Woche ist Ostern
	- inhalt: Denke daran die Kunden darauf hinzuweisen
	- datum: 2026-04-8
	- wichtig: nein
- ankuendigungen:
	- titel: Brezeln nicht lieferbar
	- inhalt: leider verbrannt
	- datum: 2026-04-8
	- wichtig: ja
- ankeundigungen:
	- titel: Mitarbeiterin Laura Weber krank
	- inhalt: krank, bis ende der Woche
	- datum 2026-04-8
	- wichtig ja