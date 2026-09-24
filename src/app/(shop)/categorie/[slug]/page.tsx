import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { LegacyRedirect } from "@/components/layout/LegacyRedirect";
import { getCatalog } from "@/lib/data/catalog";
import { isStaticExport } from "@/lib/paths";

// Anciennes pages de catégorie : la boutique tient désormais sur une seule page (/boutique?gamme=…).
export const metadata: Metadata = { robots: { index: false } };

export async function generateStaticParams() {
  const { categories } = await getCatalog();
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function LegacyCategoryPage({ params }: PageProps<"/categorie/[slug]">) {
  const { slug } = await params;
  const { categories } = await getCatalog();
  const category = categories.find((c) => c.slug === slug);
  const to = `/boutique?gamme=${!category ? "tout" : category.kind === "accessoire" ? "accessoires" : category.slug}`;
  if (!isStaticExport) permanentRedirect(to);
  return <LegacyRedirect to={to} />;
}
