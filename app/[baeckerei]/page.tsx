import { notFound } from "next/navigation";
import { baeckereien, firmenLogo } from "@/lib/data/baeckereien";
import Slideshow from "@/components/slideshow";
import ProduktPromotionSlide from "@/components/slides/produkt-promotion-slide";
import AnkuendigungenSlide from "@/components/slides/ankuendigungen-slide";
import UebersichtSlide from "@/components/slides/uebersicht-slide";

export function generateStaticParams() {
  return Object.keys(baeckereien).map((slug) => ({ baeckerei: slug }));
}

export default async function BaeckereiPage({
  params,
}: {
  params: Promise<{ baeckerei: string }>;
}) {
  const { baeckerei: slug } = await params;
  const decoded = decodeURIComponent(slug);
  const daten = baeckereien[decoded];

  if (!daten) {
    notFound();
  }

  const logos = {
    firmenLogo,
    baeckereiLogo: daten.logo,
    baeckereiName: daten.name,
  };

  return (
    <div className="bakery-theme" style={daten.theme as React.CSSProperties}>
      <Slideshow richtung="horizontal">
        <ProduktPromotionSlide data={daten.produktPromotion} {...logos} />
        <AnkuendigungenSlide data={daten.ankuendigungen} {...logos} />
        <UebersichtSlide
          baeckereiSlug={slug}
          produktPromotion={daten.produktPromotion}
          ankuendigungen={daten.ankuendigungen}
          {...logos}
        />
      </Slideshow>
    </div>
  );
}
