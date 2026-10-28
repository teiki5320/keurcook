import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlocActus } from "@/components/actus/BlocActus";
import { getSlugsConstruits } from "@/lib/data/articles";
import { AdSlot } from "@/components/ads/AdSlot";
import { anton } from "@/components/nuage/typography";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { VarietyCard } from "@/components/shop/VarietyCard";
import { ProduitEncart } from "@/components/product/ProduitEncart";
import { COUNTRIES, countryBySlug } from "@/lib/countries";
import { COUNTRY_CUISINE } from "@/lib/country-cuisine";
import { getCatalog } from "@/lib/data/catalog";
import { getRecipes } from "@/lib/data/recipes";
import { AD_SLOTS } from "@/lib/ads";
import { siteConfig } from "@/lib/config";
import { getMaintenance } from "@/lib/data/settings";
import { breadcrumbLd, itemListLd, jsonLd } from "@/lib/json-ld";


export async function generateStaticParams() {
  return COUNTRIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/pays/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const country = countryBySlug(slug);
  if (!country) return {};
  const own = (await getRecipes()).filter((r) => r.countryCode === country.code);
  return pageMetadata({
    title: country.seoTitle ?? `Recettes ${country.of}`,
    description: country.seoDescription ?? country.description,
    path: `/pays/${country.slug}`,
    image: own.find((r) => r.image)?.image,
    imageAlt: `Cuisine ${country.of}`,
    // Pays sans recette publiée : page d'attente, à ne pas référencer.
    noindex: own.length === 0,
  });
}

export default async function CountryPage({ params }: PageProps<"/pays/[slug]">) {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const { slug } = await params;
  const country = countryBySlug(slug);
  if (!country) notFound();
  const [recipes, { products }] = await Promise.all([getRecipes(), getCatalog()]);
  const own = recipes.filter((r) => r.countryCode === country.code);
  const local = products.filter((p) => p.originCountry === country.name);
  // Encadré du haut : 3 produits au plus, seulement s'il y a des recettes pour le séparer de l'annonce.
  const haut = own.length > 0 ? local.slice(0, 3) : [];
  const autres = local.slice(haut.length);

  return (
    <div className="container-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            breadcrumbLd([
              { name: "Accueil", url: siteConfig.url },
              { name: "Pays", url: `${siteConfig.url}/pays` },
              { name: country.name, url: `${siteConfig.url}/pays/${country.slug}` },
            ]),
            // Recettes du pays, dans l'ordre de la page.
            ...(own.length > 0 ? [itemListLd(`Recettes ${country.of}`, own.map((r) => ({ name: r.name, url: `${siteConfig.url}/recette/${r.slug}` })))] : []),
          ]),
        }}
      />
      <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> / <Link href="/pays" className="hover:underline">Pays</Link> /{" "}
        <span className="text-ink">{country.name}</span>
      </nav>
      <h1 className="uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(56px,9vw,140px)" }}>
        {country.name}
        <span className="text-[#ff7a3d]">.</span>
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#fbeee2]/80">{country.description}</p>

      {/* Trois produits du pays dès le haut de la page (loin de l'annonce, placée après les recettes). */}
      <ProduitEncart id="produits-pays-haut" titre={`Produits rares ${country.of}`} produits={haut} emplacement="rubrique" className="mt-6 max-w-3xl" />

      {own.length > 0 ? (
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {own.map((r, i) => (
            <li key={r.id}>
              <RecipeCard recipe={r} priority={i < 4} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="card mt-10 p-8 text-center text-muted">Les premières recettes de ce pays arrivent bientôt.</p>
      )}

      <AdSlot slot={AD_SLOTS.pays} />

      {COUNTRY_CUISINE[country.code] && (
        <section aria-labelledby="cuisine-pays" className="mt-16 max-w-3xl">
          <h2 id="cuisine-pays" className="font-display text-3xl">
            La cuisine {country.of}
            <span className="text-[#ff7a3d]">.</span>
          </h2>
          <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-[#fbeee2]/85">
            {COUNTRY_CUISINE[country.code].split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
      )}

      {/* Actus du pays (veille), après le texte sur la cuisine : un bloc d'écart avec l'annonce. Absent s'il n'y en a pas. */}
      <BlocActus construits={getSlugsConstruits()} titre={`L'actu de la cuisine ${country.of}`} tailleTitre="moyen" limite={3} pays={country.code} className="mt-16" />

      {autres.length > 0 && (
        <section aria-labelledby="produits-pays" className="mt-16">
          <h2 id="produits-pays" className="font-display text-3xl">
            {haut.length > 0 ? "Autres produits rares" : "Produits rares"} {country.of}
            <span className="text-[#ff7a3d]">.</span>
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {autres.map((p) => (
              <VarietyCard key={p.id} product={p} emplacement="rubrique" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
