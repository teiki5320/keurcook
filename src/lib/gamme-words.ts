/** Mot adapté à la gamme : « variété » (fleurs, résines), « article » (accessoires), « produit » (le reste). */
export function unitWord(gammeKey: string | null | undefined, count: number) {
  const word = gammeKey === "fleurs" || gammeKey === "resines" ? "variété" : gammeKey === "accessoires" ? "article" : "produit";
  return `${count} ${word}${count > 1 ? "s" : ""}`;
}
