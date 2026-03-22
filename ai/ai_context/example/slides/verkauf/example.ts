import type { ProduktPromotionData } from "@/lib/data/produkt-promotion";
import type { AnkuendigungenData } from "@/lib/data/ankuendigungen";

export const produktPromotion: ProduktPromotionData = {
  titel: "Unsere Highlights diese Woche",
  produkte: [
    {
      name: "Knülle Landbrot",
      beschreibung:
        "Unser Klassiker mit extra langer Teigführung – jetzt als Saisonedition mit Walnüssen.",
      preis: "4,90 €",
      neu: true,
    },
    {
      name: 'Buttercroissant „Goldstück"',
      beschreibung:
        "72 Schichten feinste Butter – knusprig, luftig, unwiderstehlich.",
      preis: "2,20 €",
      neu: true,
    },
    {
      name: "Dinkel-Vollkorn Brötchen",
      beschreibung:
        "Knusprig und nussig – jetzt mit verbesserter Rezeptur und längerer Frischhaltung.",
      preis: "0,95 €",
      neu: false,
    },
  ],
};

export const ankuendigungen: AnkuendigungenData = {
  ankuendigungen: [
    {
      titel: "Betriebsversammlung am Freitag",
      inhalt:
        "Am 28.03. findet um 14:00 Uhr die vierteljährliche Betriebsversammlung im Pausenraum statt. Bitte alle erscheinen!",
      datum: "2026-03-28",
      wichtig: true,
    },
    {
      titel: "Neue Hygienevorschriften",
      inhalt:
        "Ab nächster Woche gelten aktualisierte Hygienevorschriften. Die Unterlagen liegen im Büro aus.",
      datum: "2026-03-24",
      wichtig: true,
    },
    {
      titel: "Sommerfest-Planung",
      inhalt:
        "Wir planen unser jährliches Sommerfest! Ideen und Vorschläge bitte bis 15.04. an Monika.",
      datum: "2026-06-20",
      wichtig: false,
    },
  ],
};
