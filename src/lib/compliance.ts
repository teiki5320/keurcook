/**
 * Garde-fou éditorial : détecte les termes pouvant constituer une allégation
 * thérapeutique ou de santé. Pour les denrées alimentaires, seules les
 * allégations autorisées par le règlement (CE) n° 1924/2006 sont permises :
 * on les refuse toutes par prudence.
 * Vérifié par les tests (tests/contenus.test.ts, tests/conseils.test.ts).
 * Liste non exhaustive : elle ne remplace pas une relecture humaine.
 *
 * Les mots sont repérés en entier : « \b » ne compte que les lettres sans accent, donc
 * « récurer » contenait « cure » pour JavaScript. Les bords de mot tiennent compte des
 * lettres accentuées (voir motEntier), et la « dépression » géographique (« la dépression
 * du Danakil ») n'est pas une allégation de santé.
 */
/** Exception : reçoit le texte qui suit le mot trouvé ; vrai si cet emploi n'est pas une allégation. */
type Exception = (suite: string) => boolean;

/** « dépression de l'Afar », « dépression du Danakil », « dépression géographique » : relief, pas santé. */
const depressionGeographique: Exception = (suite) =>
  /^s?\s+(?:g[ée]ographique|topographique|du\s+\p{Lu}|des\s+\p{Lu}|de\s+(?:la\s+|l['’]\s*)?\p{Lu}|d['’]\s*\p{Lu})/u.test(suite);

/** Rend une expression sensible aux lettres accentuées : « \b » devient un vrai bord de mot (Unicode). */
function motEntier(re: RegExp): RegExp {
  const source = re.source.replace(/^\\b/, "(?<![\\p{L}\\p{N}_])").replace(/\\b/g, "(?![\\p{L}\\p{N}_])");
  return new RegExp(source, "giu");
}

const FORBIDDEN_PATTERNS: Array<[RegExp, string, Exception?]> = [
  [/\bsoign\w*/i, "soigner"],
  [/\bgu[ée]ri\w*/i, "guérir"],
  [/\bth[ée]rapeuti\w*/i, "thérapeutique"],
  [/\bm[ée]dic(a|inal)\w*/i, "médical / médicament"],
  [/\btraitement\w*/i, "traitement"],
  [/\bmaladi\w*/i, "maladie"],
  [/\bdouleur\w*/i, "douleur"],
  [/\bantalgi\w*/i, "antalgique"],
  [/\banti-?inflammatoire\w*/i, "anti-inflammatoire"],
  [/\banxi\w*/i, "anxiété"],
  [/\bangoiss\w*/i, "angoisse"],
  [/\bstress\w*/i, "stress"],
  [/\bd[ée]-?stress\w*/i, "stress"],
  [/\bd[ée]press\w*/i, "dépression", depressionGeographique],
  [/\binsomni\w*/i, "insomnie"],
  [/\bsommeil\b/i, "sommeil"],
  [/\bendorm\w*/i, "endormissement"],
  [/\bapais\w*/i, "apaisant"],
  [/\brelax\w*/i, "relaxant"],
  [/\bcalmant\w*/i, "calmant"],
  [/\bs[ée]datif\w*/i, "sédatif"],
  [/[ée]pilep\w*/i, "épilepsie"],
  [/\bmigraine\w*/i, "migraine"],
  [/\bsant[ée](?![a-z])/i, "santé"],
  [/\bbienfait\w*/i, "bienfaits"],
  [/\bvertus?\b/i, "vertus"],
  [/\bcur(e|atif)\w*/i, "cure / curatif"],
  [/\bsoulag\w*/i, "soulager"],
  // Allégations nutritionnelles et « bien-être » (règlement (CE) n° 1924/2006).
  [/\bdigest\w*/i, "digestion"],
  [/\bvitamin\w*/i, "vitamines"],
  [/\bantioxyd\w*/i, "antioxydant"],
  [/\bd[ée]tox\w*/i, "détox"],
  [/\bimmun\w*/i, "immunité"],
  [/\bsuper-?aliment\w*/i, "superaliment"],
  [/\bbon(ne)?s? pour (la |le |les )?(sant|corps|peau|ligne|c[oœ]ur|forme)/i, "« bon pour »"],
  [/\bsans (gluten|sucres?( ajout[ée]s?)?|lactose|th[ée]ine|caf[ée]ine)\b/i, "« sans … » (allégation nutritionnelle)"],
  [/\bminceur\b/i, "minceur"],
];

const REGLES = FORBIDDEN_PATTERNS.map(([re, label, exception]) => ({ re: motEntier(re), label, exception }));

export function findHealthClaims(...texts: Array<string | null | undefined>): string[] {
  const content = texts.filter(Boolean).join("\n");
  return REGLES.filter(({ re, exception }) => {
    for (const m of content.matchAll(re)) {
      if (!exception || !exception(content.slice(m.index + m[0].length))) return true;
    }
    return false;
  }).map(({ label }) => label);
}
