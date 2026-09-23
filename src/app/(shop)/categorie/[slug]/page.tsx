import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { flattenParams, ProductListing } from "@/components/shop/ProductListing";
import { getCatalog, getCategoryBySlug, parseFilters } from "@/lib/data/catalog";

export async function generateStaticParams() {
  const { categories } = await getCatalog();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/categorie/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.kind === "cbd" ? `${category.name} CBD — origine France` : category.name,
    description: `${category.description} ${category.kind === "cbd" ? "THC ≤ 0,3 %, certificat d'analyse disponible." : ""}`.trim(),
    alternates: { canonical: `/categorie/${category.slug}` },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps<"/categorie/[slug]">) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const sp = await searchParams;
  const filters = { ...parseFilters(sp), category: category.slug, kind: category.kind };

  return (
    <div className="container-page py-10">
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> /{" "}
        <Link href={`/boutique?type=${category.kind}`} className="hover:underline">
          {category.kind === "cbd" ? "CBD" : "Accessoires"}
        </Link>{" "}
        / <span className="text-ink">{category.name}</span>
      </nav>
      <h1 className="font-display text-4xl text-forest-900">{category.name}</h1>
      <p className="mt-2 mb-8 max-w-2xl text-muted">{category.description}</p>
      <ProductListing action={`/categorie/${category.slug}`} filters={filters} rawParams={flattenParams(sp)} lockedCategory />
    </div>
  );
}
