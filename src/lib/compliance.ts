/**
 * Garde-fou éditorial : détecte les termes pouvant constituer une allégation
 * thérapeutique ou de santé. Pour les denrées alimentaires, seules les
 * allégations autorisées par le règlement (CE) n° 1924/2006 sont permises :
 * on les refuse toutes par prudence.
 * Utilisé à l'enregistrement d'un produit dans l'admin.
 * Liste non exhaustive : elle ne remplace pas une relecture humaine.
 */
const FORBIDDEN_PATTERNS: Array<[RegExp, string]> = [
  [/\bsoign\w*/i, "soigner"],
  [/\bgu[ée]ri\w*/i, "guérir"],
  [/\bth[ée]rapeuti\w*/i, "thérapeutique"],
  [/\bm[ée]dica\w*/i, "médical / médicament"],
  [/\btraitement\w*/i, "traitement"],
  [/\bmaladi\w*/i, "maladie"],
  [/\bdouleur\w*/i, "douleur"],
  [/\bantalgi\w*/i, "antalgique"],
  [/\banti-?inflammatoire\w*/i, "anti-inflammatoire"],
  [/\banxi\w*/i, "anxiété"],
  [/\bangoiss\w*/i, "angoisse"],
  [/\bstress\w*/i, "stress"],
  [/\bd[ée]press\w*/i, "dépression"],
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
];

export function findHealthClaims(...texts: Array<string | null | undefined>): string[] {
  const content = texts.filter(Boolean).join("\n");
  return FORBIDDEN_PATTERNS.filter(([re]) => re.test(content)).map(([, label]) => label);
}
