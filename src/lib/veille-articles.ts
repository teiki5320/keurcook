/**
 * Articles complets des actus : rédigés par la tâche de veille (dépôt public teiki5320/veille)
 * dans articles/keurcook/<id>.json (schéma https://teiki5320.github.io/veille/schema/article-schema-v1.json).
 *
 * - Au build, scripts/articles-veille.ts les télécharge : chaque article devient une page /actus/<slug>.
 * - Une actu publiée après le build s'ouvre sur la page de secours /actus/article?id=<id>, lue dans le navigateur.
 * - Une actu sans article (pas encore rédigé) renvoie vers sa source, comme avant.
 *
 * Fichier sans dépendance au serveur : utilisé par les pages, la page de secours, le script de build et les tests.
 */
import { actuValide, type Actu, type ImageActu } from "./veille";

/** Dossier des articles de Keur Cook dans la veille. */
export const BASE_ARTICLES = "https://teiki5320.github.io/veille/articles/keurcook/";

/** Adresse de la page de secours (articles publiés après le dernier build). */
export const PAGE_SECOURS = "/actus/article";

const ID = /^[0-9a-f]{40}$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export interface BlocArticle {
  intertitre: string | null;
  paragraphes: string[];
}

/** Un article complet (schéma article v1). */
export interface ArticleActu {
  id: string;
  slug: string;
  titre: string;
  chapo: string;
  blocs: BlocArticle[];
  mots: number;
  lecture_min: number;
  theme?: string;
  pays?: string[];
  tags?: string[];
  source_nom: string;
  source_url: string;
  autres_sources?: string[];
  publie_le: string;
  redige_le: string;
  image: ImageActu;
}

const estHttp = (u: unknown): u is string => typeof u === "string" && /^https?:\/\//.test(u);
const texte = (t: unknown): t is string => typeof t === "string" && t.trim().length > 0;

export const idValide = (id: unknown): id is string => typeof id === "string" && ID.test(id);
export const slugValide = (s: unknown): s is string => typeof s === "string" && s.length <= 80 && SLUG.test(s);

/**
 * Nettoie un article reçu de la veille : null s'il est incomplet ou peu sûr
 * (source non http ou Amazon, image servie ailleurs que par la veille…).
 * Les autres sources non http sont écartées.
 */
export function nettoyerArticle(brut: unknown): ArticleActu | null {
  if (!brut || typeof brut !== "object") return null;
  const a = brut as Partial<ArticleActu>;
  if (!idValide(a.id) || !slugValide(a.slug) || !texte(a.titre) || !texte(a.chapo)) return null;
  if (!texte(a.redige_le) || Number.isNaN(Date.parse(a.redige_le))) return null;
  // Mêmes garde-fous que pour une actu : source http(s) non Amazon, image de la veille avec crédit.
  if (!actuValide({ id: a.id, titre: a.titre, resume: a.chapo, source_nom: a.source_nom, source_url: a.source_url, publie_le: a.publie_le, image: a.image })) return null;
  if (!Array.isArray(a.blocs) || a.blocs.length === 0) return null;
  const blocs: BlocArticle[] = [];
  for (const b of a.blocs) {
    if (!b || typeof b !== "object" || !Array.isArray(b.paragraphes)) return null;
    const paragraphes = b.paragraphes.filter(texte).map((p) => p.trim());
    if (paragraphes.length === 0) continue;
    blocs.push({ intertitre: texte(b.intertitre) ? b.intertitre.trim() : null, paragraphes });
  }
  if (blocs.length === 0) return null;
  const mots = blocs.flatMap((b) => b.paragraphes).join(" ").split(/\s+/).filter(Boolean).length;
  return {
    id: a.id,
    slug: a.slug,
    titre: a.titre.trim(),
    chapo: a.chapo.trim(),
    blocs,
    mots: Number.isInteger(a.mots) ? Number(a.mots) : mots,
    lecture_min: Number.isInteger(a.lecture_min) && Number(a.lecture_min) > 0 ? Number(a.lecture_min) : Math.max(1, Math.round(mots / 200)),
    ...(texte(a.theme) ? { theme: a.theme } : {}),
    ...(Array.isArray(a.pays) ? { pays: a.pays.filter((p): p is string => typeof p === "string" && /^[A-Z]{2}$/.test(p)) } : {}),
    ...(Array.isArray(a.tags) ? { tags: a.tags.filter((t): t is string => typeof t === "string") } : {}),
    source_nom: a.source_nom!,
    source_url: a.source_url!,
    autres_sources: Array.isArray(a.autres_sources) ? a.autres_sources.filter(estHttp) : [],
    publie_le: a.publie_le!,
    redige_le: a.redige_le,
    image: a.image!,
  };
}

/** L'actu a-t-elle un article complet (slug valide et fichier de la veille) ? */
export function aUnArticle(actu: Actu): boolean {
  return slugValide(actu.slug) && typeof actu.article_url === "string" && actu.article_url === `${BASE_ARTICLES}${actu.id}.json`;
}

export interface LienCarte {
  href: string;
  /** true : page du site (même onglet) ; false : source, dans un nouvel onglet. */
  interne: boolean;
}

/**
 * Lien ouvert par toute la carte d'une actu :
 * 1. la page construite /actus/<slug> si elle existe ;
 * 2. sinon la page de secours si l'actu a un article ;
 * 3. sinon (pas encore d'article) la source.
 */
export function lienActu(actu: Actu, construits: ReadonlySet<string> | readonly string[]): LienCarte {
  const liste: ReadonlySet<string> = construits instanceof Set ? construits : new Set(construits as readonly string[]);
  if (slugValide(actu.slug) && liste.has(actu.slug)) return { href: `/actus/${actu.slug}`, interne: true };
  if (aUnArticle(actu)) return { href: `${PAGE_SECOURS}?id=${actu.id}`, interne: true };
  return { href: actu.source_url, interne: false };
}

/** « 27 octobre 2026 », heure de Paris ; "" si la date est illisible. */
export function dateLongue(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  return new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });
}

/** Nom lisible d'un média à partir de son adresse (« www.rfi.fr » → « rfi.fr »). */
export function nomDuSite(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Fiche du site liée à une actu : adresse et texte du lien. */
export interface FicheLiee {
  href: string;
  label: string;
}

/**
 * Article lu dans le navigateur (page de secours) : null si l'id est invalide, le fichier absent,
 * illisible ou d'une autre actu, ou si la veille ne répond pas en 8 s. Ne lève jamais d'erreur.
 */
export async function chargerArticle(id: unknown, lire: typeof fetch = fetch): Promise<ArticleActu | null> {
  if (!idValide(id)) return null;
  const ctrl = new AbortController();
  const minuteur = setTimeout(() => ctrl.abort(), 8000);
  try {
    const rep = await lire(`${BASE_ARTICLES}${id}.json`, { signal: ctrl.signal, cache: "no-cache" });
    if (!rep.ok) return null;
    const article = nettoyerArticle(await rep.json());
    return article && article.id === id ? article : null;
  } catch {
    return null;
  } finally {
    clearTimeout(minuteur);
  }
}

/** Index de tous les articles jamais publiés (articles/keurcook/index.json) : ils ne sont jamais supprimés. */
export const URL_INDEX_ARTICLES = `${BASE_ARTICLES}index.json`;

export interface EntreeArticle {
  id: string;
  slug: string;
}

/** Entrées valides de l'index (id, adresse et fichier de la veille de Keur Cook) ; [] si l'index est illisible. */
export function entreesIndex(brut: unknown): EntreeArticle[] {
  const liste = brut && typeof brut === "object" ? (brut as { articles?: unknown }).articles : null;
  if (!Array.isArray(liste)) return [];
  return liste
    .filter((e): e is { id: string; slug: string; url?: unknown } => !!e && typeof e === "object" && idValide(e.id) && slugValide(e.slug))
    .filter((e) => e.url === undefined || e.url === `${BASE_ARTICLES}${e.id}.json`)
    .map((e) => ({ id: e.id, slug: e.slug }));
}

/**
 * Articles à construire en page : tous ceux de l'index, plus ceux des actus récentes qui n'y seraient pas encore
 * (index en retard ou injoignable). Une même actu n'apparaît qu'une fois (id) ; une adresse aussi (slug).
 */
export function articlesAConstruire(index: EntreeArticle[], actus: Actu[]): EntreeArticle[] {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const liste: EntreeArticle[] = [];
  for (const e of [...index, ...actus.filter(aUnArticle).map((a) => ({ id: a.id, slug: a.slug! }))]) {
    if (ids.has(e.id) || slugs.has(e.slug)) continue;
    ids.add(e.id);
    slugs.add(e.slug);
    liste.push(e);
  }
  return liste;
}
