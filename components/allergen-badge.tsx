import {
  Wheat,
  Milk,
  Egg,
  TreePine,
  Bean,
  Circle,
  Nut,
  Flower2,
} from "lucide-react";
import type { Allergen } from "@/lib/data/produkt-promotion";

const allergenConfig: Record<
  Allergen,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  gluten: { label: "Gluten", icon: Wheat },
  milch: { label: "Milch", icon: Milk },
  ei: { label: "Ei", icon: Egg },
  nüsse: { label: "Nüsse", icon: TreePine },
  soja: { label: "Soja", icon: Bean },
  sesam: { label: "Sesam", icon: Circle },
  erdnüsse: { label: "Erdnüsse", icon: Nut },
  lupine: { label: "Lupine", icon: Flower2 },
};

export function AllergenBadges({ allergene }: { allergene: Allergen[] }) {
  if (allergene.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {allergene.map((allergen) => {
        const config = allergenConfig[allergen];
        const Icon = config.icon;
        return (
          <span
            key={allergen}
            title={config.label}
            className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-muted-foreground font-bold"
          >
            <Icon className="h-3 w-3" />
            {config.label}
          </span>
        );
      })}
    </div>
  );
}
