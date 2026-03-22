import { notFound } from "next/navigation";
import { baeckereien, firmenLogo } from "@/lib/data/baeckereien";
import { PRODUKT_BILDER } from "@/lib/data/produkt-promotion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProduktStatusBadge } from "@/components/produkt-status-badge";
import Slide from "@/components/slide";
import { AllergenBadges } from "@/components/allergen-badge";
import Image from "next/image";

export function generateStaticParams() {
  return Object.keys(baeckereien).flatMap((baeckerei) => {
    const daten = baeckereien[baeckerei];
    return daten.produktPromotion.produkte.map((_, i) => ({
      baeckerei,
      index: String(i),
    }));
  });
}

export default async function ProduktDetailPage({
  params,
}: {
  params: Promise<{ baeckerei: string; index: string }>;
}) {
  const { baeckerei: baeckereiSlug, index } = await params;
  const decoded = decodeURIComponent(baeckereiSlug);
  const daten = baeckereien[decoded];

  if (!daten) notFound();

  const produkt = daten.produktPromotion.produkte[Number(index)];
  if (!produkt) notFound();

  return (
    <div className="bakery-theme h-screen" style={daten.theme as React.CSSProperties}>
      <Slide
        titel={produkt.name}
        untertitel={daten.produktPromotion.titel}
        backHref={`/${baeckereiSlug}#uebersicht`}
        firmenLogo={firmenLogo}
        baeckereiLogo={daten.logo}
        baeckereiName={daten.name}

        className="flex-1"
      >
        <div className="flex items-center gap-2 py-6">
          {produkt.status && <ProduktStatusBadge status={produkt.status} />}
          {produkt.preis && <span className="text-3xl font-bold">{produkt.preis}</span>}
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Beschreibung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{produkt.beschreibung}</p>
              </CardContent>
            </Card>

            {produkt.allergene && produkt.allergene.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Allergene</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <AllergenBadges allergene={produkt.allergene} />
                </CardContent>
              </Card>
            )}

            {produkt.naehrwerte && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Nährwerte pro {produkt.naehrwerte.portionsgroesse}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <tbody className="divide-y">
                      {[
                        { label: "Kalorien", value: produkt.naehrwerte.kalorien },
                        { label: "Kohlenhydrate", value: produkt.naehrwerte.kohlenhydrate },
                        { label: "davon Zucker", value: produkt.naehrwerte.davonZucker, indent: true },
                        { label: "Fett", value: produkt.naehrwerte.fett },
                        { label: "davon gesättigt", value: produkt.naehrwerte.davonGesaettigt, indent: true },
                        { label: "Eiweiß", value: produkt.naehrwerte.eiweiss },
                        { label: "Salz", value: produkt.naehrwerte.salz },
                      ].map(({ label, value, indent }) => (
                        <tr key={label}>
                          <td className={`py-1.5 text-muted-foreground ${indent ? "pl-4" : ""}`}>{label}</td>
                          <td className="py-1.5 text-right font-medium">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column */}
          <div>
            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
              <Image
                src={PRODUKT_BILDER[Number(index) % PRODUKT_BILDER.length]}
                alt={produkt.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
}
