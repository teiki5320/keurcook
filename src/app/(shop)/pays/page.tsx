import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { TLink } from "@/components/nuage/PageTransition";
import { anton } from "@/components/nuage/typography";
import { getMaintenance } from "@/lib/data/settings";
import { getCountriesWithRecipes, getRecipes } from "@/lib/data/recipes";
import { siteConfig } from "@/lib/config";
import { breadcrumbLd, itemListLd, JsonLdScript } from "@/lib/json-ld";


export const metadata: Metadata = pageMetadata({
  title: "Cuisines d'Afrique par pays",
  description:
    "Sénégal, Cameroun, Côte d'Ivoire, Nigeria, Éthiopie… Découvrez la cuisine de chaque pays et ses recettes emblématiques.",
  path: "/pays",
});

export default async function CountriesPage() {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const [countries, recipes] = await Promise.all([getCountriesWithRecipes(), getRecipes()]);
  return (
    <div className="container-page">
      <JsonLdScript
        data={[
          breadcrumbLd([{ name: "Accueil", url: siteConfig.url }, { name: "Pays", url: `${siteConfig.url}/pays` }]),
          itemListLd("Recettes par pays", countries.map((c) => ({ name: `Recettes ${c.of}`, url: `${siteConfig.url}/pays/${c.slug}` }))),
        ]}
      />
      <h1 className="uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(56px,8vw,120px)" }}>
        Par pays<span className="text-[#ff7a3d]">.</span>
      </h1>
      <p className="mt-3 max-w-2xl text-muted">Chaque cuisine a ses produits, ses gestes et ses plats de fête. Choisissez un pays pour découvrir ses recettes.</p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c) => {
          const cover = recipes.find((r) => r.countryCode === c.code && r.featured) ?? recipes.find((r) => r.countryCode === c.code);
          return (
            <li key={c.code}>
              <TLink href={`/pays/${c.slug}`} label={c.name} className="group relative block aspect-[16/11] overflow-hidden rounded-[26px] border border-[#fbeee2]/12 bg-[#281610] hover:border-[#ff7a3d]">
                {cover?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cover.image} alt={`${cover.name}, recette ${c.of}`} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                )}
                <span className="absolute inset-0 bg-gradient-to-b from-transparent via-[#140a07]/50 to-[#140a07]/95" />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block text-4xl leading-none uppercase" style={anton}>{c.name}</span>
                  <span className="mt-2 line-clamp-2 block text-sm text-[#fbeee2]/70">{c.description}</span>
                </span>
              </TLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
