import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { baeckereien, firmenLogo } from "@/lib/data/baeckereien";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProduktStatusBadge } from "@/components/produkt-status-badge";
import { AllergenBadges } from "@/components/allergen-badge";

export function generateStaticParams() {
  const slugs = ["produkt-promotion", "ankuendigungen"];
  return Object.keys(baeckereien).flatMap((baeckerei) =>
    slugs.map((slide) => ({ baeckerei, slide }))
  );
}

export default async function SlidePage({
  params,
}: {
  params: Promise<{ baeckerei: string; slide: string }>;
}) {
  const { baeckerei: baeckereiSlug, slide } = await params;
  const decoded = decodeURIComponent(baeckereiSlug);
  const daten = baeckereien[decoded];

  if (!daten) {
    notFound();
  }

  let titel = "";
  let content: React.ReactNode = null;

  if (slide === "produkt-promotion") {
    titel = "Produkt Promotion";
    const { titel: promotionTitel, produkte } = daten.produktPromotion;
    content = (
      <div className="space-y-6">
        <p className="text-xl font-semibold text-muted-foreground">{promotionTitel}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {produkte.map((produkt) => (
            <Card key={produkt.name} className="flex flex-col overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-2">
                  <span>{produkt.name}</span>
                  {produkt.status && <ProduktStatusBadge status={produkt.status} />}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {produkt.beschreibung}
                </p>
                {produkt.allergene && produkt.allergene.length > 0 && (
                  <AllergenBadges allergene={produkt.allergene} />
                )}
                {produkt.preis && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Preis</span>
                    <span className="text-xl font-bold">{produkt.preis}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  } else if (slide === "ankuendigungen") {
    titel = "Ankündigungen";
    const { ankuendigungen } = daten.ankuendigungen;
    const wichtige = ankuendigungen.filter((a) => a.wichtig);
    const normale = ankuendigungen.filter((a) => !a.wichtig);
    content = (
      <div className="space-y-8">
        {wichtige.length > 0 && (
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-destructive">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
              Wichtige Ankündigungen
            </h3>
            <div className="space-y-3">
              {wichtige.map((item) => (
                <Card
                  key={item.titel}
                  className="border-destructive/40 bg-destructive/5"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {item.titel}
                      <Badge variant="destructive">WICHTIG</Badge>
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.datum).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.inhalt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {normale.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Weitere Informationen
            </h3>
            <div className="space-y-3">
              {normale.map((item) => (
                <Card key={item.titel}>
                  <CardHeader>
                    <CardTitle>{item.titel}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.datum).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.inhalt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  } else {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href={`/${baeckereiSlug}#uebersicht`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Übersicht
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              {daten.name}
            </span>
            <Image
              src={daten.logo}
              alt={`${daten.name} Logo`}
              width={128}
              height={128}
              className="h-8 w-auto object-contain"
              quality={100}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex items-center gap-4">
          <Image
            src={firmenLogo}
            alt="Firmenlogo"
            width={128}
            height={128}
            className="h-10 w-auto object-contain"
            quality={100}
          />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{titel}</h1>
        </div>
        {content}
      </main>
    </div>
  );
}
