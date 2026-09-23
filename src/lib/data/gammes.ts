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
  /** Silhouette du nuage 3D de l'accueil pour cette gamme. */
  cloudMix: number;
}

const CLOUD_MIX: Record<string, number> = { fleurs: 0, resines: 1, huiles: 2, infusions: 0, cosmetiques: 2 };

const imageOf = (items: ProductWithCategory[]) => items.find((p) => p.featured)?.images[0] ?? items[0]?.images[0] ?? null;

/** Gammes présentées sur l'accueil : chaque catégorie CBD + une gamme « Accessoires ». */
export async function getGammes(): Promise<Gamme[]> {
  const { categories, products } = await getCatalog();
  const cbd = categories
    .filter((c) => c.kind === "cbd")
    .map((c) => {
      const items = products.filter((p) => p.categoryId === c.id);
      return {
        key: c.slug,
        name: c.name,
        href: `/categorie/${c.slug}`,
        description: c.description,
        products: items,
        image: imageOf(items),
        cloudMix: CLOUD_MIX[c.slug] ?? 3,
      };
    });
  const accessories = products.filter((p) => p.category.kind === "accessoire");
  return [
    ...cbd,
    {
      key: "accessoires",
      name: "Accessoires",
      href: "/accessoires",
      description: "Grinders, vaporisateurs, feuilles et boîtes de conservation, sélectionnés pour leur qualité et leur durabilité.",
      products: accessories,
      image: imageOf(accessories),
      cloudMix: 3,
    },
  ].filter((g) => g.products.length > 0);
}
