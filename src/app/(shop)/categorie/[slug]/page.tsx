import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Coverflow } from "@/components/nuage/Coverflow";
import { ProductListing } from "@/components/shop/ProductListing";
import { productCards } from "@/lib/data/gammes";
import { getCatalog, getCategoryBySlug } from "@/lib/data/catalog";

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

export default async function CategoryPage({ params }: PageProps<"/categorie/[slug]">) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const { products } = await getCatalog();
  const items = products.filter((p) => p.categoryId === category.id);

  return (
    <div className="container-page pb-10">
      <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-muted">
        <Link href="/" className="hover:underline">Accueil</Link> /{" "}
        <Link href={category.kind === "cbd" ? "/boutique" : "/accessoires"} className="hover:underline">
          {category.kind === "cbd" ? "Boutique" : "Accessoires"}
        </Link>{" "}
        / <span className="text-ink">{category.name}</span>
      </nav>
      <h1 className="font-display text-4xl text-forest-900">{category.name}</h1>
      <p className="mt-2 max-w-2xl text-muted">{category.description}</p>
      <div className="-mx-4 mt-2 mb-8 sm:-mx-6 lg:-mx-8">
        <Coverflow items={productCards(items)} />
      </div>
      <h2 className="mb-6 font-display text-3xl text-forest-900">
        {category.kind === "cbd" ? "Toutes les variétés" : "Tous les articles"}
      </h2>
      <ProductListing action={`/categorie/${category.slug}`} lockedCategory={{ slug: category.slug, kind: category.kind }} />
    </div>
  );
}
