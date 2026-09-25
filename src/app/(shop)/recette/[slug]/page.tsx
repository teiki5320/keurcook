import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChefHat, Clock, Flame, Lightbulb, MapPin, Star, Users } from "lucide-react";
import { ReviewForm } from "@/components/community/ReviewForm";
import { ProductImage } from "@/components/product/ProductImage";
import { RecipeActions } from "@/components/recipe/RecipeActions";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { RecipeIngredients, type LinkedProduct } from "@/components/recipe/RecipeIngredients";
import { VarietyCard } from "@/components/shop/VarietyCard";
import { minPriceCents } from "@/lib/catalog-utils";
import { siteConfig } from "@/lib/config";
import { formatDate, formatPrice } from "@/lib/format";
import { countryByCode } from "@/lib/countries";
import { getCatalog } from "@/lib/data/catalog";
import { getRecipeBySlug, getRecipeReviews, getRecipes, getRelatedRecipes } from "@/lib/data/recipes";
import { courseName, DIFFICULTY_LABELS, formatDuration, ingredientLine, isoDuration } from "@/lib/recipe-utils";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getRecipes()).map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/recette/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) return {};
  const country = countryByCode(recipe.countryCode);
  return {
    title: `${recipe.name} — recette ${country?.of ?? "africaine"}`,
    description: recipe.shortDescription,
    alternates: { canonical: `/recette/${recipe.slug}` },
    openGraph: { title: recipe.name, description: recipe.shortDescription, images: recipe.image ? [{ url: recipe.image }] : undefined },
  };
}

const anton = { fontFamily: "var(--font-anton), sans-serif", fontWeight: 400 } as const;

export default async function RecipePage({ params }: PageProps<"/recette/[slug]">) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) notFound();
  const [{ products }, related, { reviews, rating }] = await Promise.all([getCatalog(), getRelatedRecipes(recipe), getRecipeReviews(recipe.id)]);
  const country = countryByCode(recipe.countryCode);

  // Produits de la boutique utilisés par la recette (format le moins cher encore en stock).
  const used = products.filter((p) => recipe.ingredients.some((i) => i.productSlug === p.slug));
  const linked: Record<string, LinkedProduct> = {};
  for (const p of used) {
    const v = [...p.variants].sort((a, b) => a.priceCents - b.priceCents).find((x) => x.stock > 0) ?? p.variants[0];
    linked[p.slug] = { productId: p.id, slug: p.slug, name: p.name, image: p.images[0] ?? null, variantId: v.id, variantLabel: v.label, priceCents: v.priceCents, stock: v.stock };
  }

  const url = `${siteConfig.url}/recette/${recipe.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.name,
    description: recipe.shortDescription,
    image: recipe.image ? [recipe.image.startsWith("http") ? recipe.image : `${siteConfig.url}${recipe.image}`] : undefined,
    author: { "@type": "Organization", name: siteConfig.name },
    datePublished: recipe.createdAt.slice(0, 10),
    prepTime: isoDuration(recipe.prepMinutes),
    cookTime: isoDuration(recipe.cookMinutes),
    totalTime: isoDuration(recipe.prepMinutes + recipe.cookMinutes),
    recipeYield: `${recipe.servings} personnes`,
    recipeCategory: courseName(recipe.course),
    recipeCuisine: country?.name,
    keywords: recipe.tags.join(", "),
    recipeIngredient: recipe.ingredients.map((i) => {
      const l = ingredientLine(i);
      return `${l.quantity} ${l.label}`.trim();
    }),
    recipeInstructions: recipe.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s.text })),
    aggregateRating: rating ? { "@type": "AggregateRating", ratingValue: rating.average, ratingCount: rating.count, bestRating: 5 } : undefined,
  };

  const facts = [
    { icon: Clock, label: "Préparation", value: formatDuration(recipe.prepMinutes) },
    { icon: Flame, label: "Cuisson", value: formatDuration(recipe.cookMinutes) },
    { icon: Users, label: "Personnes", value: String(recipe.servings) },
    { icon: ChefHat, label: "Difficulté", value: DIFFICULTY_LABELS[recipe.difficulty] },
  ];

  return (
    <article className="container-page pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-muted print:hidden">
        <Link href="/" className="hover:underline">Accueil</Link> /{" "}
        <Link href={`/recettes?type=${recipe.course}`} className="hover:underline">{courseName(recipe.course)}</Link> /{" "}
        <span className="text-ink">{recipe.name}</span>
      </nav>

      {/* En-tête : grande photo, titre et informations clés. */}
      <header className="relative overflow-hidden rounded-[32px] border border-[#fbeee2]/10 bg-[#281610] print:rounded-none print:border-0">
        <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] print:aspect-[21/9]">
          <ProductImage src={recipe.image} alt={recipe.name} sizes="(min-width: 1320px) 1320px, 100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#140a07]/10 via-[#140a07]/35 to-[#140a07]/95 print:hidden" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-10 print:hidden">
            <p className="flex items-center gap-1.5 text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {country ? <Link href={`/pays/${country.slug}`} className="hover:underline">{country.name}</Link> : recipe.countryCode}
              {recipe.region && <span className="text-[#fbeee2]/60">· {recipe.region}</span>}
            </p>
            <h1 className="mt-2 max-w-4xl uppercase leading-[.9]" style={{ ...anton, fontSize: "clamp(48px,8vw,120px)" }}>
              {recipe.name}
              <span className="text-[#ff7a3d]">.</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base text-[#fbeee2]/80 sm:text-lg">{recipe.shortDescription}</p>
          </div>
        </div>
      </header>
      <div className="mt-6 hidden print:block">
        <h1 className="text-4xl font-bold">{recipe.name}</h1>
        <p className="mt-1">{country?.name}{recipe.region ? ` · ${recipe.region}` : ""} — {recipe.shortDescription}</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <dl className="flex flex-wrap gap-2">
          {facts.map((f) => (
            <div key={f.label} className="flex items-center gap-2.5 rounded-2xl border border-[#fbeee2]/12 bg-[#211209] px-4 py-2.5">
              <f.icon className="h-4 w-4 text-[#ff7a3d]" aria-hidden />
              <div>
                <dt className="text-[10px] font-bold tracking-[.14em] text-[#fbeee2]/55 uppercase">{f.label}</dt>
                <dd className="text-sm font-semibold">{f.value}</dd>
              </div>
            </div>
          ))}
        </dl>
        <RecipeActions slug={recipe.slug} name={recipe.name} url={url} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <RecipeIngredients ingredients={recipe.ingredients} servings={recipe.servings} products={linked} />
        </aside>

        <div>
          <section aria-labelledby="histoire">
            <h2 id="histoire" className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">L&apos;histoire du plat</h2>
            <div className="mt-3 space-y-4 text-[17px] leading-relaxed text-[#fbeee2]/85">
              {recipe.story.split(/\n{2,}/).map((para, i) => (
                <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:leading-[.8] first-letter:text-[#ff7a3d] first-letter:[font-family:var(--font-anton)]" : ""}>
                  {para}
                </p>
              ))}
            </div>
          </section>

          <section aria-labelledby="etapes" className="mt-12">
            <h2 id="etapes" className="font-display text-4xl">
              Préparation<span className="text-[#ff7a3d]">.</span>
            </h2>
            <ol className="mt-6 space-y-6">
              {recipe.steps.map((s, i) => (
                <li key={i} className="grid grid-cols-[3.5rem_1fr] gap-4">
                  <span className="text-5xl leading-none text-[#ff7a3d]" style={anton} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="border-t border-[#fbeee2]/12 pt-3">
                    <p className="sr-only">Étape {i + 1}</p>
                    <p className="text-[16px] leading-relaxed">{s.text}</p>
                    {s.image && (
                      <div className="relative mt-3 aspect-[16/10] overflow-hidden rounded-2xl">
                        <ProductImage src={s.image} alt={`Étape ${i + 1}`} sizes="(min-width: 1024px) 50vw, 100vw" />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {recipe.tips.length > 0 && (
            <section aria-labelledby="astuces" className="mt-12 rounded-3xl border border-[#ffc46b]/30 bg-[#ffc46b]/6 p-6">
              <h2 id="astuces" className="flex items-center gap-2 font-display text-2xl text-[#ffc46b]">
                <Lightbulb className="h-5 w-5" aria-hidden /> Astuces & variantes
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed">
                {recipe.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <section aria-labelledby="avis" className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] print:hidden">
        <div>
          <h2 id="avis" className="font-display text-3xl">
            Vos avis<span className="text-[#ff7a3d]">.</span>
          </h2>
          {rating && (
            <p className="mt-1 flex items-center gap-1.5 text-sm">
              <Star className="h-4 w-4 fill-[#ffc46b] text-[#ffc46b]" aria-hidden />
              <strong>{rating.average.toLocaleString("fr-FR")}</strong> / 5 · {rating.count} avis
            </p>
          )}
          {reviews.length ? (
            <ul className="mt-5 space-y-4">
              {reviews.map((r) => (
                <li key={r.id} className="card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{r.authorName}</p>
                    <p className="flex items-center gap-0.5" aria-label={`${r.rating} sur 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className={`h-4 w-4 ${n <= r.rating ? "fill-[#ffc46b] text-[#ffc46b]" : "text-[#fbeee2]/25"}`} aria-hidden />
                      ))}
                    </p>
                  </div>
                  {r.comment && <p className="mt-2 text-[15px] leading-relaxed text-[#fbeee2]/85">{r.comment}</p>}
                  <p className="mt-2 text-xs text-muted">{formatDate(r.createdAt)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-muted">Aucun avis pour l&apos;instant. Vous avez cuisiné cette recette ? Soyez le premier à donner le vôtre.</p>
          )}
        </div>
        <div>
          <h3 className="mb-3 text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">Donner mon avis</h3>
          <ReviewForm recipeId={recipe.id} />
        </div>
      </section>

      {used.length > 0 && (
        <section aria-labelledby="produits-recette" className="mt-16 print:hidden">
          <h2 id="produits-recette" className="font-display text-3xl">
            Les produits rares de cette recette<span className="text-[#ff7a3d]">.</span>
          </h2>
          <p className="mt-1 text-sm text-muted">
            À partir de {formatPrice(Math.min(...used.map(minPriceCents)))}, expédiés sous 48 h.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {used.map((p) => (
              <VarietyCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="proches" className="mt-16 print:hidden">
          <h2 id="proches" className="font-display text-3xl">
            Recettes proches<span className="text-[#ff7a3d]">.</span>
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.id}>
                <RecipeCard recipe={r} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
