import type { MotivationData } from "@/lib/data/motivation";
import type { ProduktPromotionData } from "@/lib/data/produkt-promotion";
import type { AnkuendigungenData } from "@/lib/data/ankuendigungen";

export const motivation: MotivationData = {
  spruch: "Jeder Tag ist eine neue Chance, unsere Kunden mit echtem Handwerk zu begeistern!",
  autor: "Dein Team der Bäckerei Knülle",
  // Tonalität: Regionaler Dialekt für interne Nähe gemäß interner Strategie
  tagesTipp: "Hektik am Morgen? Erstmal tief durchatmen! Dä Kaffee he is echt lecker – jönnt euch mal ne kurze Pause, dann läuft der Rest wie von selvs!",
};

export const produktPromotion: ProduktPromotionData = {
  titel: "Unsere aktuellen Highlights",
  produkte: [
    {
      name: "Rübli Kuchen",
      // Tonalität: Knapp und einladendes "Du" gemäß externer Strategie
      beschreibung: "Probier mal unseren leckeren Karottenkuchen mit feinem Frosting. Handwerk, das du schmeckst! Passt perfekt zum Sonntagskaffee.",
      preis: "4,90 € / Stück",
      status: true,
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
      name: "Croissant",
      beschreibung: "Jetzt noch besser: Unsere Croissants werden ab sofort bei 165°C gebacken für die perfekte Goldkruste.",
      preis: "4,90 € / Stück",
      neu: false, // Status: Überarbeitet
    },
  ],
};

export const ankuendigungen: AnkuendigungenData = {
  ankuendigungen: [
    {
      titel: "WICHTIG: Brezeln nicht lieferbar",
      inhalt: "Kurzfristige Info für den Verkauf: Die Brezeln sind heute leider verbrannt und können nicht geliefert werden. Bitte bietet den Kunden Alternativen an!",
      datum: "2026-04-08",
      wichtig: true,
    },
    {
      titel: "Personal-Update: Laura Weber",
      inhalt: "Unsere Kollegin Laura Weber ist leider bis zum Ende der Woche krank. Wir wünschen gute Besserung!",
      datum: "2026-04-08",
      wichtig: true,
    },
    {
      titel: "Nächste Woche ist Ostern",
      inhalt: "Denkt bitte daran, unsere Kunden aktiv auf das bevorstehende Osterfest und unsere speziellen Angebote hinzuweisen.",
      datum: "2026-04-08",
      wichtig: false,
    },
  ],
};