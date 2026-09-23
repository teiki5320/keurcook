import type { Metadata } from "next";
import Link from "next/link";
import { GammeBrowser } from "@/components/nuage/GammeBrowser";
import { getGammes } from "@/lib/data/gammes";

export const metadata: Metadata = {
  title: "Accessoires",
  description: "Grinders, vaporisateurs, feuilles et boîtes de conservation.",
  alternates: { canonical: "/accessoires" },
};

export default async function AccessoriesPage() {
  const gamme = (await getGammes()).find((g) => g.key === "accessoires");
  const items = gamme?.products ?? [];

  return (
    <div className="container-page pb-10">
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> / <span className="text-ink">Accessoires</span>
      </nav>
      <h1 className="font-display text-4xl text-forest-900">Accessoires</h1>
      <p className="mt-2 max-w-2xl text-muted">{gamme?.description}</p>
      <GammeBrowser products={items} noun="référence" />
    </div>
  );
}
