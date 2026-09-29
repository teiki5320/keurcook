/**
 * Images de partage (WhatsApp, Facebook, LinkedIn…) : une version JPEG 1200 × 630 de
 * chaque photo de recette, de produit et d'article, dans public/og/ (non versionné).
 * Certains réseaux affichent mal le WebP. Lancé automatiquement avant chaque build.
 */
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = join(import.meta.dirname, "..", "public");
let made = 0;
for (const dir of ["recipes", "products", "conseils"]) {
  const src = join(root, dir);
  const out = join(root, "og", dir);
  mkdirSync(out, { recursive: true });
  for (const file of readdirSync(src).filter((f) => f.endsWith(".webp"))) {
    const target = join(out, file.replace(/\.webp$/, ".jpg"));
    // Déjà à jour : on ne refait pas l'image.
    if (existsSync(target) && statSync(target).mtimeMs >= statSync(join(src, file)).mtimeMs) continue;
    await sharp(join(src, file)).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 80, mozjpeg: true }).toFile(target);
    made += 1;
  }
}
console.log(`Images de partage : ${made} créée(s) dans public/og/.`);
