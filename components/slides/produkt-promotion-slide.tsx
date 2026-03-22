import Image from "next/image";
import Slide from "@/components/slide";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProduktStatusBadge } from "@/components/produkt-status-badge";
import { AllergenBadges } from "@/components/allergen-badge";
import { PRODUKT_BILDER } from "@/lib/data/produkt-promotion";
import type { ProduktPromotionData } from "@/lib/data/produkt-promotion";
import type { SlideLogos } from "@/components/slides/types";

interface ProduktPromotionSlideProps extends SlideLogos {
  data: ProduktPromotionData;
}

export default function ProduktPromotionSlide({
  data,
  firmenLogo,
  baeckereiLogo,
  baeckereiName,
}: ProduktPromotionSlideProps) {
  return (
    <Slide
      titel="Produkt Ankündigungen"
      untertitel={data.titel}
      firmenLogo={firmenLogo}
      baeckereiLogo={baeckereiLogo}
      baeckereiName={baeckereiName}
    >
      <div className="space-y-4">
        {data.produkte.map((produkt, i) => (
          <Card key={produkt.name} className="overflow-hidden">
            <div className="flex">
              <div className="relative h-auto w-48 shrink-0">
                <Image
                  src={PRODUKT_BILDER[i % PRODUKT_BILDER.length]}
                  alt={produkt.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 py-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {produkt.name}
                    {produkt.status && <ProduktStatusBadge status={produkt.status} />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base text-muted-foreground pt-4 pb-2 sm:text-xl w-4/6">
                      {produkt.beschreibung}
                    </p>
                     {<span className="shrink-0 font-semibold text-3xl flex items-center">{produkt.preis}</span>}
                  </div>
                  {produkt.allergene && produkt.allergene.length > 0 && (
                    <AllergenBadges allergene={produkt.allergene} />
                  )}
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Slide>
  );
}