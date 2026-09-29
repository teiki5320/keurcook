/** Pages « immersives » : nuage 3D en fond, espacement géré par la page elle-même. */
export const IMMERSIVE_PATHS = ["/", "/boutique", "/recettes"];

/** Normalise le chemin (retire une éventuelle barre oblique finale). */
export function normalizePath(raw: string | null) {
  const p = raw || "/";
  return p.length > 1 ? p.replace(/\/+$/, "") : p;
}

export const isImmersive = (raw: string | null) => IMMERSIVE_PATHS.includes(normalizePath(raw));
