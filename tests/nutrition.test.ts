/** Valeurs nutritionnelles : chaque ingrédient chiffré doit être reconnu, et les résultats rester plausibles. */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { demoRecipes } from "../src/lib/demo/recipes";
import { findFood, ingredientGrams, recipeNutrition } from "../src/lib/nutrition";

describe("Valeurs nutritionnelles des recettes", () => {
  for (const r of demoRecipes) {
    it(r.slug, () => {
      for (const i of r.ingredients) {
        if (i.quantity === null || /facultatif/i.test(i.name)) continue;
        const food = findFood(i.name);
        assert.ok(food, `ingrédient inconnu de src/lib/nutrition.ts : « ${i.name} »`);
        const grams = ingredientGrams(i, food);
        assert.ok(grams !== null && (grams > 0 || food.per100[0] === 0), `poids introuvable : ${i.quantity} ${i.unit ?? ""} ${i.name}`);
      }
      const n = recipeNutrition(r);
      assert.ok(n.calories >= 20 && n.calories <= 1500, `${n.calories} kcal par personne`);
    });
  }
});
