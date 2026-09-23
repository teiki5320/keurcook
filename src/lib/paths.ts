/**
 * Préfixe de chemin quand le site est servi dans un sous-dossier
 * (ex. GitHub Pages : https://teiki5320.github.io/alohash/ → "/alohash").
 * next/link et le routeur l'ajoutent automatiquement ; il faut en revanche
 * l'ajouter à la main pour next/image, les <a> vers des fichiers et les <form>.
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Vrai pour la version statique (GitHub Pages) : pas de serveur, pas de commande en ligne. */
export const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

export function withBasePath(path: string): string {
  if (!basePath || !path.startsWith("/") || path.startsWith("//") || path.startsWith(basePath + "/")) return path;
  return basePath + path;
}
