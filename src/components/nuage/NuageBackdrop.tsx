"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { isImmersive } from "./immersive";

// Three.js (~600 Ko) n'est téléchargé que sur les pages qui affichent le nuage.
const NuageCloud = dynamic(() => import("./NuageCloud").then((m) => m.NuageCloud), { ssr: false });

/** Nuage de particules 3D, uniquement sur l'accueil et la boutique. */
export function NuageBackdrop() {
  return isImmersive(usePathname()) ? <NuageCloud /> : null;
}
