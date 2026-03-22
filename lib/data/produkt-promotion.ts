export type Allergen =
  | "gluten"
  | "milch"
  | "ei"
  | "nüsse"
  | "soja"
  | "sesam"
  | "erdnüsse"
  | "lupine";

export interface Naehrwerte {
  kalorien: string;
  kohlenhydrate: string;
  davonZucker: string;
  fett: string;
  davonGesaettigt: string;
  eiweiss: string;
  salz: string;
  portionsgroesse: string;
}

export type ProduktStatus = "neu" | "eingestellt" | "überarbeitet";

export interface Produkt {
  name: string;
  beschreibung: string;
  preis?: string;
  status?: ProduktStatus;
  allergene?: Allergen[];
  naehrwerte?: Naehrwerte;
}

export interface ProduktPromotionData {
  titel: string;
  produkte: Produkt[];
}

export const PRODUKT_BILDER = [
  "/images/produkte/ruebli.jpg",
  "/images/produkte/lemon.jpg",
  "/images/produkte/baguette.jpg",
  "/images/produkte/landbrot.svg",
  "/images/produkte/buttercroissant.svg",
  "/images/produkte/dinkel-vollkorn.svg",
  "/images/produkte/blueberry-cheesecake.svg",
  "/images/produkte/espresso-brownie.svg",
  "/images/produkte/sourdough-jazz.svg",
  "/images/produkte/zimt-kardamom.svg",
];
