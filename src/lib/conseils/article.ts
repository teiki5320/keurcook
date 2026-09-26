import { isConseilTheme, type ConseilTheme } from "./themes";

/** Article de la rubrique Conseils : un fichier Markdown de content/conseils/, une question. */
export interface Conseil {
  slug: string;
  /** La question posée, qui sert de titre. */
  title: string;
  /** Description pour Google (70 à 170 caractères). */
  description: string;
  /** Date de publication (AAAA-MM-JJ) : l'article n'apparaît qu'à partir de ce jour. */
  date: string;
  theme: ConseilTheme;
  /** Réponse courte affichée en chapeau. */
  resume: string;
  /** Photo (ex. /conseils/<slug>.webp) : absente tant qu'elle n'est pas générée. */
  image: string | null;
  imageAlt: string | null;
  /** Recettes et produits du site liés à l'article (slugs). */
  recettes: string[];
  produits: string[];
  /** Corps de l'article en Markdown (parties en « ## »). */
  body: string;
}

export const DESCRIPTION_MIN = 70;
export const DESCRIPTION_MAX = 170;

/** En-tête simple « clé: valeur » entre deux lignes « --- » ; les listes sont séparées par des virgules. */
export function parseConseil(slug: string, raw: string): Conseil {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`Conseil « ${slug} » : en-tête manquant.`);
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const list = (v?: string) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);
  const theme = meta.theme ?? "";
  if (!isConseilTheme(theme)) throw new Error(`Conseil « ${slug} » : thème inconnu « ${theme} ».`);
  return {
    slug,
    title: meta.title ?? "",
    description: meta.description ?? "",
    date: meta.date ?? "",
    theme,
    resume: meta.resume ?? "",
    image: meta.image || null,
    imageAlt: meta.imageAlt || null,
    recettes: list(meta.recettes),
    produits: list(meta.produits),
    body: match[2].trim(),
  };
}

/** Date du jour à Paris (AAAA-MM-JJ) : un article daté d'un lundi paraît le lundi à 0 h, heure française. */
export function todayInParis(now = new Date()): string {
  return new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export const isPublished = (c: Pick<Conseil, "date">, today: string) => /^\d{4}-\d{2}-\d{2}$/.test(c.date) && c.date <= today;

/** Parties de l'article (titres « ## ») pour le sommaire, avec leur ancre. */
export function conseilSections(body: string): Array<{ id: string; title: string }> {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => ({ id: anchorId(m[1]), title: m[1].trim() }));
}

export function anchorId(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Liens internes du corps de l'article (« /recette/… », « /produit/… », « /conseils/… »). */
export function internalLinks(body: string): string[] {
  return [...body.matchAll(/\]\((\/[^)\s#?]*)[^)]*\)/g)].map((m) => m[1]);
}

/** « À lire aussi » : articles du même thème d'abord, puis les plus récents. */
export function relatedConseils(current: Conseil, all: Conseil[], count = 3): Conseil[] {
  const others = all.filter((c) => c.slug !== current.slug);
  const same = others.filter((c) => c.theme === current.theme);
  const rest = others.filter((c) => c.theme !== current.theme);
  return [...same, ...rest].slice(0, count);
}
