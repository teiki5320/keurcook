import "server-only";
import { getCatalog } from "./catalog";
import type { ProductWithCategory } from "../types";

export interface Gamme {
  key: string;
  name: string;
  href: string;
  description: string;
  products: ProductWithCategory[];
  image: string | null;
}

const imageOf = (items: ProductWithCategory[]) => items.find((p) => p.featured)?.images[0] ?? items[0]?.images[0] ?? null;

/** Gammes de la boutique : une par catégorie qui contient au moins un produit. */
export async function getGammes(): Promise<Gamme[]> {
  const { categories, products } = await getCatalog();
  return categories
    .map((c) => {
      const items = products.filter((p) => p.categoryId === c.id);
      return {
        key: c.slug,
        name: c.name,
        href: `/boutique?gamme=${c.slug}`,
        description: c.description,
        products: items,
        image: imageOf(items),
      };
    })
    .filter((g) => g.products.length > 0);
}
