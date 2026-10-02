import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ConseilCard } from "@/components/conseils/ConseilCard";
import { anton } from "@/components/nuage/typography";
import { getMaintenance } from "@/lib/data/settings";
import { getConseils } from "@/lib/data/conseils";
import { siteConfig } from "@/lib/config";
import { breadcrumbLd, itemListLd, JsonLdScript } from "@/lib/json-ld";

// Relu toutes les heures : un article programmé paraît le jour de sa date sans redéploiement.

export const metadata: Metadata = pageMetadata({
  title: "Conseils de cuisine africaine",
  description:
    "Conserver, cuire, remplacer un ingrédient, réussir une sauce : les réponses aux questions courantes sur la cuisine africaine et ses produits.",
  path: "/conseils",
});

export default function ConseilsPage() {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const conseils = getConseils();
  return (
    <div className="container-page">
      <JsonLdScript
        data={[
          breadcrumbLd([{ name: "Accueil", url: siteConfig.url }, { name: "Conseils", url: `${siteConfig.url}/conseils` }]),
          itemListLd("Conseils de cuisine africaine", conseils.map((c) => ({ name: c.title, url: `${siteConfig.url}/conseils/${c.slug}` }))),
        ]}
      />
      <h1 className="uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(56px,8vw,120px)" }}>
        Conseils<span className="text-[#ff7a3d]">.</span>
      </h1>
      <p className="mt-3 max-w-2xl text-muted">Une question, une réponse : conserver les produits, cuire les céréales, remplacer un ingrédient, réussir les sauces.</p>
      {conseils.length ? (
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {conseils.map((c) => (
            <li key={c.slug}>
              <ConseilCard conseil={c} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-muted">Les premiers articles arrivent bientôt.</p>
      )}
    </div>
  );
}
