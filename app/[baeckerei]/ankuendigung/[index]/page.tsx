import { notFound } from "next/navigation";
import { baeckereien, firmenLogo } from "@/lib/data/baeckereien";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnkuendigungIcon, AnkuendigungImage } from "@/components/ankuendigung-visual";
import Slide from "@/components/slide";

export function generateStaticParams() {
  return Object.keys(baeckereien).flatMap((baeckerei) => {
    const daten = baeckereien[baeckerei];
    return daten.ankuendigungen.ankuendigungen.map((_, i) => ({
      baeckerei,
      index: String(i),
    }));
  });
}

export default async function AnkuendigungDetailPage({
  params,
}: {
  params: Promise<{ baeckerei: string; index: string }>;
}) {
  const { baeckerei: baeckereiSlug, index } = await params;
  const decoded = decodeURIComponent(baeckereiSlug);
  const daten = baeckereien[decoded];

  if (!daten) notFound();

  const item = daten.ankuendigungen.ankuendigungen[Number(index)];
  if (!item) notFound();

  const datum = new Date(item.datum).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bakery-theme h-screen" style={daten.theme as React.CSSProperties}>
      <Slide
        titel={item.titel}
        untertitel="Ankündigung"
        backHref={`/${baeckereiSlug}#uebersicht`}
        firmenLogo={firmenLogo}
        baeckereiLogo={daten.logo}
        baeckereiName={daten.name}
      >
        <div className="grid grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            {item.wichtig && (
              <div>
                <Badge variant="destructive">WICHTIG</Badge>
              </div>
            )}

            <Card className={item.wichtig ? "border-destructive/40 bg-destructive/5" : ""}>
              <CardHeader>
                <CardTitle className="text-base text-muted-foreground">Inhalt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{item.inhalt}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base text-muted-foreground">Datum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{datum}</p>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div>
            {item.bild ? (
              <AnkuendigungImage
                bild={item.bild}
                alt={item.titel}
                className="w-full rounded-xl aspect-square object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-muted">
                {item.icon ? (
                  <AnkuendigungIcon icon={item.icon} className="h-24 w-24 text-muted-foreground" />
                ) : (
                  <span className="text-8xl">📢</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Slide>
    </div>
  );
}
