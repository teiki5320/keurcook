import type { Metadata } from "next";
import Link from "next/link";
import { BlocActus } from "@/components/actus/BlocActus";
import { anton } from "@/components/nuage/typography";
import { siteConfig } from "@/lib/config";
import { getMaintenance } from "@/lib/data/settings";
import { breadcrumbLd, JsonLdScript } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Actus de la cuisine africaine",
  description:
    "Plats, chefs, produits du continent, fêtes et festivals : l'actualité de la cuisine africaine, résumée deux fois par jour avec un lien vers chaque source.",
  path: "/actus",
});

/** Page « Actus » : les 20 dernières actus de la cuisine africaine, lues en direct depuis la veille. */
export default function ActusPage() {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  return (
    <div className="container-page">
      <JsonLdScript
        data={[breadcrumbLd([{ name: "Accueil", url: siteConfig.url }, { name: "Actus", url: `${siteConfig.url}/actus` }])]}
      />
      <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> / <span className="text-ink">Actus</span>
      </nav>
      <h1 className="uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(48px,8vw,120px)" }}>
        Actus de la cuisine africaine<span className="text-[#ff7a3d]">.</span>
      </h1>
      <p className="mt-4 mb-8 max-w-3xl text-lg leading-relaxed text-[#fbeee2]/80">
        Plats et traditions, chefs et restaurants, produits du continent, fêtes, festivals et livres de cuisine : l&apos;actualité de la cuisine
        africaine et de sa diaspora. Chaque actu est résumée par nos soins, avec un lien vers l&apos;article d&apos;origine. Mise à jour deux fois
        par jour.
      </p>
      <BlocActus limite={20} avecMiseAJour siVide="Les actus arrivent bientôt : revenez dans quelques heures." />
    </div>
  );
}
