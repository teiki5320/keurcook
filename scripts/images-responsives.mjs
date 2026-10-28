/**
 * Versions réduites des photos du site pour les téléphones et tablettes : chaque photo de
 * public/recipes, public/products et public/conseils est déclinée en largeurs 384, 640, 960 et 1280 px
 * dans public/img/<largeur>/<dossier>/ (non versionné). Utilisées par src/lib/image-loader.ts (srcset).
 * Lancé automatiquement avant chaque build ; une version déjà à jour n'est pas refaite.
 */
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const WIDTHS = [384, 640, 960, 1280];
const root = join(import.meta.dirname, "..", "public");
let made = 0;
for (const dir of ["recipes", "products", "conseils"]) {
  const src = join(root, dir);
  for (const w of WIDTHS) mkdirSync(join(root, "img", String(w), dir), { recursive: true });
  for (const file of readdirSync(src).filter((f) => f.endsWith(".webp"))) {
    const from = join(src, file);
    for (const w of WIDTHS) {
      const target = join(root, "img", String(w), dir, file);
      if (existsSync(target) && statSync(target).mtimeMs >= statSync(from).mtimeMs) continue;
      // Jamais agrandie : une photo plus petite que la largeur demandée garde sa taille.
      await sharp(from).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(target);
      made += 1;
    }
  }
}
console.log(`Photos réduites : ${made} créée(s) dans public/img/.`);
