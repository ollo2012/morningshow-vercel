import type { MotivationData } from "@/lib/data/motivation";
import type { ProduktPromotionData } from "@/lib/data/produkt-promotion";
import type { AnkuendigungenData } from "@/lib/data/ankuendigungen";

export const motivation: MotivationData = {
  spruch: "Heute ist ein toller Tag",
  autor: "Der Chef",
  // Tonalität: Regionaler Dialekt für interne Nähe gemäß interner Strategie
  tagesTipp: "Dä Kaffee he is echt lecker – jönnt euch mal ne kurze Pause!",
};

export const produktPromotion: ProduktPromotionData = {
  titel: "Unsere Highlights diese Woche",
  produkte: [
    {
      name: "Rübli Kuchen",
      // Tonalität: Einladend und handwerklich fokussiert
      beschreibung: "Probier mal unseren leckeren Karottenkuchen mit feinem Frosting. Handwerk, das du schmeckst! Passt perfekt zum Sonntagskaffee oder Picknick.",
      preis: "4,90 € / Stück",
      status: "neu" as const,
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
      // Status 'eingestellt' wird über die Beschreibung kommuniziert
      beschreibung: "Kurze Info für euch: Die Lemon Tarte macht Pause und kommt im Sommer wieder in die Theke.",
      preis: "4,90 € / Stück",
      status: "eingestellt" as const,
    },
    {
      name: "Croissant",
      beschreibung: "Unsere Croissants backen wir jetzt bei 165°C – für die perfekte Goldkruste, die unsere Kunden so lieben.",
      preis: "4,90 € / Stück",
      status: "überarbeitet" as const,
    },
  ],
};

export const ankuendigungen: AnkuendigungenData = {
  ankuendigungen: [
    {
      titel: "Nächste Woche ist Ostern",
      // Fokus auf Mitarbeitende: Motivation zur aktiven Kundenansprache
      inhalt: "Liebes Team, denkt bitte daran, unsere Kunden aktiv auf das Osterfest hinzuweisen. Lasst uns gemeinsam für volle Körbchen sorgen!",
      datum: "2026-04-08",
      wichtig: false,
      bild: "/images/ankuendigungen/ostern.svg",
    },
    {
      titel: "Brezeln nicht lieferbar",
      inhalt: "Wichtige Info für den Verkauf: Die Brezeln sind heute leider verbrannt. Bitte entschuldigt das charmant bei der Kundschaft!",
      datum: "2026-03-21",
      wichtig: true,
      icon: "TriangleAlert",
    },
    {
      titel: "Gute Besserung, Laura!",
      inhalt: "Unsere Kollegin Laura Weber ist leider bis Ende der Woche krank. Wir wünschen gute Besserung und rücken im Team zusammen!",
      datum: "2026-04-08",
      wichtig: true,
    },
  ],
};