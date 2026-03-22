export interface Ankuendigung {
  titel: string;
  inhalt: string;
  datum: string;
  wichtig: boolean;
  /** Path to an image (e.g. "/images/...svg") or a Lucide icon name (e.g. "CalendarDays") */
  bild?: string;
  icon?: string;
}

export interface AnkuendigungenData {
  ankuendigungen: Ankuendigung[];
}
