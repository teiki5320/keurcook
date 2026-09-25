/** « 1 produit », « 3 produits ». */
export const unitWord = (count: number) => `${count} produit${count > 1 ? "s" : ""}`;

/** « 1 recette », « 3 recettes ». */
export const recipeWord = (count: number) => `${count} recette${count > 1 ? "s" : ""}`;
