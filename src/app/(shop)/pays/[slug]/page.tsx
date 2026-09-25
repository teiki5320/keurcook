import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { anton } from "@/components/nuage/typography";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { VarietyCard } from "@/components/shop/VarietyCard";
import { COUNTRIES, countryBySlug } from "@/lib/countries";
import { getCatalog } from "@/lib/data/catalog";
import { getRecipes } from "@/lib/data/recipes";
import { recipeWord } from "@/lib/gamme-words";

export const revalidate = 300;

export async function generateStaticParams() {
  return COUNTRIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/pays/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const country = countryBySlug(slug);
  if (!country) return {};
  return {
    title: `Recettes ${country.of}`,
    description: country.description,
    alternates: { canonical: `/pays/${country.slug}` },
  };
}

export default async function CountryPage({ params }: PageProps<"/pays/[slug]">) {
  const { slug } = await params;
  const country = countryBySlug(slug);
  if (!country) notFound();
  const [recipes, { products }] = await Promise.all([getRecipes(), getCatalog()]);
  const own = recipes.filter((r) => r.countryCode === country.code);
  const local = products.filter((p) => p.originCountry === country.name);

  return (
    <div className="container-page">
      <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> / <Link href="/pays" className="hover:underline">Pays</Link> /{" "}
        <span className="text-ink">{country.name}</span>
      </nav>
      <p className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">{recipeWord(own.length)}</p>
      <h1 className="mt-1 uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(56px,9vw,140px)" }}>
        {country.name}
        <span className="text-[#ff7a3d]">.</span>
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#fbeee2]/80">{country.description}</p>

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

      {local.length > 0 && (
        <section aria-labelledby="produits-pays" className="mt-16">
          <h2 id="produits-pays" className="font-display text-3xl">
            Produits rares {country.of}
            <span className="text-[#ff7a3d]">.</span>
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {local.map((p) => (
              <VarietyCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
