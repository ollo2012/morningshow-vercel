import type { ProduktPromotionData } from "@/lib/data/produkt-promotion";
import type { AnkuendigungenData } from "@/lib/data/ankuendigungen";

export const produktPromotion: ProduktPromotionData = {
  titel: "Fresh Vibes in der Theke",
  produkte: [
    {
      name: "Rübli Kuchen",
      beschreibung:
        "Unser neuer Star am Backhimmel! Saftiger Karottenkuchen mit fluffigem Frosting – der perfekte Begleiter für den entspannten Sonntagskaffee oder das Picknick im Park.",
      preis: "4,90 € / Stück",
      neu: true,
      allergene: ["gluten", "ei", "milch", "nüsse"],
      naehrwerte: {
        portionsgroesse: "100 g",
        kalorien: "342 kcal",
        kohlenhydrate: "48 g",
        davonZucker: "28 g",
        fett: "14 g",
        davonGesaettigt: "5 g",
        eiweiss: "5 g",
        salz: "0,4 g",
      },
    },
    {
      name: "Lemon Tarte",
      beschreibung:
        "Kurze Pause für unsere Lemon Tarte. Sie verabschiedet sich in den Winterschlaf, ist aber pünktlich zum Sommer-Release wieder für euch am Start!",
      preis: "4,90 € / Stück",
      // Status 'eingestellt' wird über die Beschreibung kommuniziert
      neu: false,
    },
    {
      name: "Buttercroissant",
      beschreibung:
        "Kleines Upgrade in der Performance: Wir backen unsere Croissants jetzt bei 165°C für den extra knusprigen Gold-Vibe. Handwerk, das man schmeckt!",
      preis: "4,90 € / Stück",
      neu: false,
    },
  ],
};

export const ankuendigungen: AnkuendigungenData = {
  ankuendigungen: [
    {
      titel: "Oster-Countdown läuft! 🐰",
      inhalt:
        "Hey Team, nächste Woche ist schon Ostern! Schnappt euch eure gute Laune und weist unsere Kund:innen aktiv darauf hin, damit niemand ohne Feiertags-Leckereien dasteht.",
      datum: "2026-04-08",
      wichtig: false,
    },
    {
      titel: "Brezel-Ausfall heute 🥨",
      inhalt:
        "Wichtige Info für die Backstage: Die Brezeln sind leider etwas zu heiß geworden (verbrannt) und heute nicht lieferbar. Bitte entschuldigt das charmant bei der Kundschaft!",
      datum: "2026-04-08",
      wichtig: true,
    },
    {
      titel: "Gute Besserung, Laura! 💐",
      inhalt:
        "Unsere Kollegin Laura Weber hat es leider erwischt. Sie fällt bis Ende der Woche aus. Lasst uns im Team zusammenrücken und ihr eine schnelle Genesung wünschen!",
      datum: "2026-04-08",
      wichtig: true,
    },
  ],
};