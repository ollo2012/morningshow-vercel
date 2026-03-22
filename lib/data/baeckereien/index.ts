import type { ProduktPromotionData } from "@/lib/data/produkt-promotion";
import type { AnkuendigungenData } from "@/lib/data/ankuendigungen";

import produktPromotionKnulle from "@/data/baeckereien/knuelle/produktPromotion.json";
import ankuendigungenKnulle from "@/data/baeckereien/knuelle/ankuendigungen.json";
import produktPromotionJazzback from "@/data/baeckereien/jazzback/produktPromotion.json";
import ankuendigungenJazzback from "@/data/baeckereien/jazzback/ankuendigungen.json";

export interface BaeckereiDaten {
  name: string;
  logo: string;
  theme?: Record<string, string>;
  produktPromotion: ProduktPromotionData;
  ankuendigungen: AnkuendigungenData;
}

// Company logo shared across all bakeries
// Replace .svg with .png when adding real logos
export const firmenLogo = "/logos/BAEKO-Logo.png";

export const baeckereien: Record<string, BaeckereiDaten> = {
  knülle: {
    name: "Bäckerei Knülle",
    logo: "/logos/knuelle.png",
    theme: {
      "--primary": "oklch(0.48 0.12 45)",
      "--primary-foreground": "oklch(1.0 0 0)",
      "--secondary": "oklch(0.91 0.07 72)",
      "--secondary-foreground": "oklch(0.33 0.08 44)",
      "--muted": "oklch(0.95 0.020 78)",
      "--muted-foreground": "oklch(0.47 0.030 60)",
      "--accent": "oklch(0.93 0.035 78)",
      "--border": "oklch(0.87 0.028 72)",
      "--ring": "oklch(0.48 0.12 45)",
      "--gradient-direction": "to right",
      "--gradient-from": "oklch(0.924 0.120 85)",
      "--gradient-mid": "oklch(0.957 0.073 90)",
      "--gradient-to": "oklch(0.990 0.025 95)",
    },
    produktPromotion: produktPromotionKnulle as ProduktPromotionData,
    ankuendigungen: { ankuendigungen: ankuendigungenKnulle } as AnkuendigungenData,
  },
  jazzback: {
    name: "Jazzback",
    logo: "/logos/jazzback.png",
    theme: {
      "--primary": "oklch(0.46 0.20 265)",
      "--primary-foreground": "oklch(1.0 0 0)",
      "--secondary": "oklch(0.89 0.07 265)",
      "--secondary-foreground": "oklch(0.28 0.14 265)",
      "--muted": "oklch(0.94 0.020 265)",
      "--muted-foreground": "oklch(0.48 0.040 265)",
      "--accent": "oklch(0.93 0.040 265)",
      "--border": "oklch(0.88 0.030 265)",
      "--ring": "oklch(0.46 0.20 265)",
      "--gradient-direction": "to right",
      "--gradient-from": "oklch(0.715 0.149 211)",
      "--gradient-mid": "oklch(0.670 0.182 235)",
      "--gradient-to": "oklch(0.623 0.214 259)",
      "--font-heading": "var(--font-jazz-heading)",
    },
    produktPromotion: produktPromotionJazzback as ProduktPromotionData,
    ankuendigungen: { ankuendigungen: ankuendigungenJazzback } as AnkuendigungenData,
  },
};
