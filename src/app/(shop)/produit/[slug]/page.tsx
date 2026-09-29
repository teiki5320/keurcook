import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, MapPin, Package, Tractor } from "lucide-react";
import { AmazonBuyButton } from "@/components/product/AmazonBuyButton";
import { AMAZON_PRICES_CHECKED_ON } from "@/lib/amazon";
import { ProductGallery } from "@/components/product/ProductGallery";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { VarietyCard } from "@/components/shop/VarietyCard";
import { getCatalog, getProductBySlug, getRelatedProducts } from "@/lib/data/catalog";
import { getRecipesUsingProduct } from "@/lib/data/recipes";
import { siteConfig } from "@/lib/config";
import { jsonLd } from "@/lib/json-ld";
import { getMaintenance } from "@/lib/data/settings";
import { NON_FOOD_CATEGORY } from "@/lib/catalog-utils";


export async function generateStaticParams() {
  const { products } = await getCatalog();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produit/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const image = product.images[0];
  return pageMetadata({
    title: product.name,
    description: `${product.shortDescription}${product.originCountry ? ` Origine : ${product.originCountry}.` : ""}`,
    path: `/produit/${product.slug}`,
    image: image && !image.endsWith(".svg") ? image : null,
    imageAlt: product.name,
  });
}

export default async function ProductPage({ params }: PageProps<"/produit/[slug]">) {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  // Les ustensiles ne sont pas des denrées : pas d'allergènes ni de conservation à afficher.
  const isFood = product.category.slug !== NON_FOOD_CATEGORY;
  const [related, recipes] = await Promise.all([getRelatedProducts(product), getRecipesUsingProduct(product.slug)]);

  // Fil d'Ariane pour Google (une fiche « Product » sans offre ni avis serait signalée comme incomplète).
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: product.category.name, item: `${siteConfig.url}/boutique?gamme=${product.category.slug}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${siteConfig.url}/produit/${product.slug}` },
    ],
  };

  return (
    <div className="container-page py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> /{" "}
        <Link href={`/boutique?gamme=${product.category.slug}`} className="hover:underline">{product.category.name}</Link> /{" "}
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p className="text-sm font-semibold tracking-wide text-terracotta uppercase">{product.category.name}</p>
          <h1 className="mt-2 font-display text-3xl leading-tight text-forest-900 sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-muted">{product.shortDescription}</p>

          <div className="mt-6">
            {product.amazonAsin && product.variants[0] && (
              <>
                <p className="text-sm text-muted">{product.variants[0].label}</p>
                <AmazonBuyButton asin={product.amazonAsin} priceCents={product.variants[0].priceCents} name={product.name} className="btn-primary mt-3 h-12 w-full px-8 text-base sm:w-auto" />
                <p className="mt-2 text-xs text-muted">Lien partenaire Amazon. Prix indicatif relevé le {AMAZON_PRICES_CHECKED_ON} : seul le prix affiché sur Amazon au moment de l&apos;achat fait foi.</p>
              </>
            )}
          </div>

          <dl className="card mt-8 grid grid-cols-2 gap-x-4 gap-y-4 p-5 text-sm">
            <div>
              <dt className="flex items-center gap-1 text-muted"><MapPin className="h-3.5 w-3.5" aria-hidden /> Origine</dt>
              <dd className="mt-0.5 font-medium">{[product.originCountry, product.originRegion].filter(Boolean).join(" — ") || "—"}</dd>
            </div>
            {product.producer && (
              <div>
                <dt className="flex items-center gap-1 text-muted"><Tractor className="h-3.5 w-3.5" aria-hidden /> Producteur</dt>
                <dd className="mt-0.5 font-medium">{product.producer}</dd>
              </div>
            )}
            {product.composition && (
              <div className="col-span-2">
                <dt className="text-muted">Ingrédients</dt>
                <dd className="mt-0.5">{product.composition}</dd>
              </div>
            )}
            {isFood && (
              <div className="col-span-2">
                <dt className="flex items-center gap-1 text-muted"><AlertTriangle className="h-3.5 w-3.5" aria-hidden /> Allergènes</dt>
                <dd className="mt-0.5">
                  {product.allergens.length ? (
                    <strong className="font-semibold text-[#ffc46b]">{product.allergens.join(", ")}</strong>
                  ) : (
                    "Aucun allergène majeur connu pour ce type de produit. La composition varie selon la marque : vérifiez l'étiquette sur Amazon."
                  )}
                </dd>
              </div>
            )}
            {product.conservation && (
              <div className="col-span-2 border-t border-sage-200 pt-4">
                <dt className="flex items-center gap-1 text-muted"><Package className="h-3.5 w-3.5" aria-hidden /> Conservation</dt>
                <dd className="mt-0.5">{product.conservation} Date de durabilité minimale indiquée sur l&apos;emballage.</dd>
              </div>
            )}
            {product.amazonAsin && (
              <p className="col-span-2 text-xs text-muted">
                {isFood ? "Composition exacte, allergènes et vendeur" : "Dimensions, matériaux et vendeur"} : voir la fiche Amazon avant l&apos;achat.
              </p>
            )}
          </dl>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <section>
          <h2 className="font-display text-2xl text-forest-900">Description</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-ink/85">
            {product.description.split(/\n{2,}/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
        {product.usageTips && (
          <aside className="card h-fit p-5">
            <h2 className="font-display text-xl">En cuisine</h2>
            <p className="mt-2 text-sm leading-relaxed">{product.usageTips}</p>
          </aside>
        )}
      </div>

      {recipes.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl text-forest-900">Utilisé dans ces recettes</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((r) => (
              <li key={r.id}>
                <RecipeCard recipe={r} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl text-forest-900">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <VarietyCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
