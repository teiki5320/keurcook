import type { Metadata } from "next";
import { Top10View } from "@/components/top10/Top10View";
import { getMaintenance } from "@/lib/data/settings";
import { getTop10s, resolveTop10 } from "@/lib/data/top10";
import { top10Metadata } from "./metadata";

// /top-10 ouvre le premier onglet ; son adresse de référence pour Google est celle de cet onglet.
export async function generateMetadata(): Promise<Metadata> {
  return top10Metadata(getTop10s()[0]);
}

export default async function Top10Page() {
  // Maintenance : l'écran d'attente remplace la page, rien n'est produit.
  if (getMaintenance().enabled) return null;
  const [first] = getTop10s();
  return <Top10View tops={getTop10s()} active={first} items={await resolveTop10(first.slug)} />;
}
