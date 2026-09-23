import { formatRate } from "@/lib/format";
import type { ProductWithCategory } from "@/lib/types";

/** Version sérialisable et compacte d'un produit, pour les composants client. */
export interface MiniProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  region: string;
  cbd: string;
  thc: string;
  image: string | null;
  fromPrice: boolean;
  variant: { id: string; label: string; priceCents: number; stock: number };
}

export function toMini(p: ProductWithCategory): MiniProduct {
  const v = [...p.variants].sort((a, b) => a.priceCents - b.priceCents)[0];
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category.name,
    categorySlug: p.category.slug,
    region: p.originRegion ?? p.category.name,
    cbd: formatRate(p.cbdRate),
    thc: formatRate(p.thcRate),
    image: p.images[0] ?? null,
    fromPrice: p.variants.length > 1,
    variant: { id: v.id, label: v.label, priceCents: v.priceCents, stock: v.stock },
  };
}
