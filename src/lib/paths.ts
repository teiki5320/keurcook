/**
 * Préfixe de chemin si le site est un jour servi dans un sous-dossier
 * (vide sur keurcook.com).
 * next/link et le routeur l'ajoutent automatiquement ; il faut en revanche
 * l'ajouter à la main pour next/image, les <a> vers des fichiers et les <form>.
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export function withBasePath(path: string): string {
  if (!basePath || !path.startsWith("/") || path.startsWith("//") || path.startsWith(basePath + "/")) return path;
  return basePath + path;
}
