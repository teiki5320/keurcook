// Images verticales (1000×1500) pour les épingles Pinterest : photo du plat en haut, titre en bas.
// Usage : node scripts/pin-images.mjs recettes.json [slug…]  (sans slug : toutes les recettes)
// recettes.json : [{ slug, name, shortDescription, country }] (country = « du Sénégal », « de Côte d’Ivoire »…)
import sharp from "sharp";
import { mkdirSync, readFileSync } from "node:fs";

const recipes = JSON.parse(readFileSync(process.argv[2], "utf8"));
const only = process.argv.slice(3);
mkdirSync("public/pins", { recursive: true });

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** Coupe un texte en lignes d'au plus `max` caractères. */
function wrap(text, max) {
  const lines = [];
  let line = "";
  for (const w of text.split(" ")) {
    if ((line + " " + w).trim().length > max) { lines.push(line); line = w; } else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}

const emblem = await sharp("public/brand/keurcook-avatar-noir.png").resize(110, 110).composite([{
  input: Buffer.from('<svg width="110" height="110"><circle cx="55" cy="55" r="55"/></svg>'), blend: "dest-in",
}]).png().toBuffer();

for (const r of recipes) {
  if (only.length && !only.includes(r.slug)) continue;
  const photo = await sharp(`public/recipes/${r.slug}.webp`).resize(1000, 900, { fit: "cover" }).toBuffer();
  const title = wrap(r.name, 16);
  const tSize = title.length === 1 ? 92 : title.length === 2 ? 80 : 68;
  let y = 1050;
  const titleSvg = title.map((l, i) => `<text x="500" y="${y + i * (tSize + 6)}" font-size="${tSize}" font-family="Georgia, serif" font-weight="bold" fill="#fbeee2" text-anchor="middle">${esc(l)}</text>`).join("");
  y += (title.length - 1) * (tSize + 6) + 62;
  // Description : autant de lignes que la place laissée au-dessus du logo (qui commence à y = 1300).
  const all = wrap(r.shortDescription, 40);
  const max = Math.min(3, Math.floor((1280 - y) / 46) + 1);
  const desc = all.slice(0, max);
  if (all.length > max) desc[max - 1] = desc[max - 1].replace(/[\s,;:.]*$/, "…");
  const descSvg = desc.map((l, i) => `<text x="500" y="${y + i * 46}" font-size="34" font-family="Helvetica Neue, Arial, sans-serif" fill="#e8cfb8" text-anchor="middle">${esc(l)}</text>`).join("");
  const svg = `<svg width="1000" height="1500" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="900" width="1000" height="600" fill="#140a07"/>
    <rect x="0" y="900" width="1000" height="8" fill="#ff7a3d"/>
    <text x="500" y="965" font-size="30" font-family="Helvetica Neue, Arial, sans-serif" font-weight="bold" letter-spacing="6" fill="#ff7a3d" text-anchor="middle">RECETTE ${esc(r.country.toUpperCase())}</text>
    ${titleSvg}${descSvg}
    <text x="500" y="1455" font-size="34" font-family="Helvetica Neue, Arial, sans-serif" font-weight="bold" fill="#fbeee2" text-anchor="middle">Recette pas à pas sur keurcook.com</text>
  </svg>`;
  await sharp({ create: { width: 1000, height: 1500, channels: 3, background: "#140a07" } })
    .composite([{ input: photo, left: 0, top: 0 }, { input: Buffer.from(svg), left: 0, top: 0 }, { input: emblem, left: 445, top: 1300 }])
    .jpeg({ quality: 84, mozjpeg: true }).toFile(`public/pins/${r.slug}.jpg`);
  console.log(r.slug);
}
