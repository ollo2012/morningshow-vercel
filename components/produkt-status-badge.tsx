import { Badge } from "@/components/ui/badge";
import type { ProduktStatus } from "@/lib/data/produkt-promotion";

const config: Record<ProduktStatus, { label: string; variant: "default" | "destructive" | "secondary" }> = {
  neu:          { label: "NEU",          variant: "default" },
  eingestellt:  { label: "EINGESTELLT", variant: "destructive" },
  überarbeitet: { label: "ÜBERARBEITET", variant: "secondary" },
};

export function ProduktStatusBadge({ status }: { status: ProduktStatus }) {
  const { label, variant } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}
