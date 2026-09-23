import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileDown, FlaskConical, MapPin, Tractor } from "lucide-react";
import { UsageWarnings } from "@/components/compliance/Warnings";
import { AddToCart } from "@/components/product/AddToCart";
import { ProductGrid } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { RateBadges } from "@/components/product/RateBadges";
import { minPriceCents, totalStock } from "@/lib/catalog-utils";
import { getCatalog, getProductBySlug, getRelatedProducts } from "@/lib/data/catalog";
import { withBasePath } from "@/lib/paths";
import { siteConfig } from "@/lib/config";
import { formatRate } from "@/lib/format";

export const revalidate = 300;

export async function generateStaticParams() {
  const { products } = await getCatalog();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produit/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const image = product.images[0];
  return {
    title: product.name,
    description: `${product.shortDescription}${product.category.kind === "cbd" ? ` CBD ${formatRate(product.cbdRate)}, THC ${formatRate(product.thcRate)}.` : ""}`,
    alternates: { canonical: `/produit/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: image && !image.endsWith(".svg") ? [{ url: image }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/produit/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product);
  const isCbd = product.category.kind === "cbd";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((i) => (i.startsWith("http") ? i : `${siteConfig.url}${i}`)),
    category: product.category.name,
    brand: product.producer ?? siteConfig.name,
    sku: product.variants[0]?.sku ?? undefined,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: (minPriceCents(product) / 100).toFixed(2),
      highPrice: (Math.max(...product.variants.map((v) => v.priceCents)) / 100).toFixed(2),
      offerCount: product.variants.length,
      availability: totalStock(product) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="container-page py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> /{" "}
        <Link href={`/boutique?gamme=${product.category.kind === "accessoire" ? "accessoires" : product.category.slug}`} className="hover:underline">{product.category.name}</Link> /{" "}
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p className="text-sm font-semibold tracking-wide text-terracotta uppercase">{product.category.name}</p>
          <h1 className="mt-2 font-display text-3xl leading-tight text-forest-900 sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-muted">{product.shortDescription}</p>
          <div className="mt-4">
            <RateBadges product={product} size="md" />
          </div>

          <div className="mt-6">
            <AddToCart
              product={{ id: product.id, slug: product.slug, name: product.name, image: product.images[0] ?? null }}
              variants={product.variants}
            />
          </div>

          {isCbd && (
            <dl className="card mt-8 grid grid-cols-2 gap-x-4 gap-y-4 p-5 text-sm">
              <div>
                <dt className="text-muted">Taux de CBD</dt>
                <dd className="mt-0.5 text-lg font-semibold text-forest-900">{formatRate(product.cbdRate)}</dd>
              </div>
              <div>
                <dt className="text-muted">Taux de THC</dt>
                <dd className="mt-0.5 text-lg font-semibold text-forest-900">
                  {formatRate(product.thcRate)} <span className="text-xs font-normal text-muted">(limite légale 0,3 %)</span>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1 text-muted"><MapPin className="h-3.5 w-3.5" aria-hidden /> Origine</dt>
                <dd className="mt-0.5 font-medium">France{product.originRegion ? ` — ${product.originRegion}` : ""}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1 text-muted"><Tractor className="h-3.5 w-3.5" aria-hidden /> Producteur</dt>
                <dd className="mt-0.5 font-medium">{product.producer ?? "—"}</dd>
              </div>
              <div className="col-span-2 border-t border-sage-200 pt-4">
                {product.coaUrl ? (
                  <a href={withBasePath(product.coaUrl)} target="_blank" rel="noopener" download className="btn-secondary w-full sm:w-auto">
                    <FileDown className="h-4 w-4" aria-hidden /> Télécharger le certificat d&apos;analyse (PDF)
                  </a>
                ) : (
                  <p className="flex items-center gap-2 text-muted">
                    <FlaskConical className="h-4 w-4" aria-hidden /> Certificat d&apos;analyse disponible sur demande.
                  </p>
                )}
              </div>
            </dl>
          )}

          {!isCbd && product.originRegion && (
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4" aria-hidden /> Fabriqué en France — {product.originRegion}
              {product.producer ? ` (${product.producer})` : ""}
            </p>
          )}
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
        {isCbd && <UsageWarnings />}
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl text-forest-900">Vous aimerez aussi</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
