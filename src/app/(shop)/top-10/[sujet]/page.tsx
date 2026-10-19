import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Top10View } from "@/components/top10/Top10View";
import { getMaintenance } from "@/lib/data/settings";
import { getTop10BySlug, getTop10s, resolveTop10 } from "@/lib/data/top10";
import { top10Metadata } from "../metadata";

/** Une page construite par onglet : chaque top 10 a son adresse, son titre et son contenu. */
export function generateStaticParams() {
  return getTop10s().map((t) => ({ sujet: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/top-10/[sujet]">): Promise<Metadata> {
  const { sujet } = await params;
  const top = getTop10BySlug(sujet);
  return top ? top10Metadata(top) : {};
}

export default async function Top10SujetPage({ params }: PageProps<"/top-10/[sujet]">) {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const { sujet } = await params;
  const top = getTop10BySlug(sujet);
  if (!top) notFound();
  return <Top10View tops={getTop10s()} active={top} items={await resolveTop10(top.slug)} />;
}
