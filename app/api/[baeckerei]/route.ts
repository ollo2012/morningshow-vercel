import { baeckereien } from "@/lib/data/baeckereien";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ baeckerei: string }> }
) {
  const { baeckerei: slug } = await params;
  const decoded = decodeURIComponent(slug);
  const daten = baeckereien[decoded];

  if (!daten) {
    return Response.json({ error: "Bäckerei nicht gefunden" }, { status: 404 });
  }

  return Response.json(daten);
}
