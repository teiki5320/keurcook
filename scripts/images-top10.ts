/**
 * Images de partage (og:image) de la page « Top 10 » : les photos des 3 premiers produits de l'onglet et son titre, 1200 × 630.
 * Usage : npx tsx scripts/images-top10.ts   → public/top10/<slug>.jpg (à relancer quand un top change).
 */
import { mkdirSync } from "node:fs";
import sharp from "sharp";
import { demoProducts } from "../src/lib/demo/catalog";
import { demoTop10 } from "../src/lib/demo/top10";

const W = 1200;
const H = 630;
const PHOTO = 330;

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Coupe le titre en lignes d'environ `max` caractères. */
function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && (line + " " + word).length > max) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  return line ? [...lines, line] : lines;
}

/** Photo carrée aux coins arrondis, avec son numéro dans un pavé sombre en haut à droite (visible même en éventail). */
async function photo(file: string, rank: number) {
  const mask = Buffer.from(`<svg width="${PHOTO}" height="${PHOTO}"><rect width="${PHOTO}" height="${PHOTO}" rx="24" fill="#fff"/></svg>`);
  const badge = Buffer.from(`<svg width="${PHOTO}" height="${PHOTO}" xmlns="http://www.w3.org/2000/svg">
    <rect x="${PHOTO - 78}" y="14" width="64" height="64" rx="14" fill="#140a07" fill-opacity="0.88"/>
    <text x="${PHOTO - 46}" y="66" text-anchor="middle" font-family="Impact, 'Arial Black', sans-serif" font-size="46" fill="#ff7a3d">${rank}</text>
  </svg>`);
  return sharp(file)
    .resize(PHOTO, PHOTO, { fit: "cover" })
    .composite([{ input: mask, blend: "dest-in" }, { input: badge }])
    .png()
    .toBuffer();
}

async function main() {
  mkdirSync("public/top10", { recursive: true });
  for (const top of demoTop10) {
    const files = top.items.slice(0, 3).map(({ product }) => {
      const image = demoProducts.find((p) => p.slug === product)?.images[0];
      if (!image) throw new Error(`${top.slug} : pas de photo pour ${product}`);
      return `public${image}`;
    });
    // Photos en éventail, de la n° 3 (au fond) à la n° 1 (devant).
    const layers = await Promise.all(
      files.map(async (file, i) => ({ input: await photo(file, i + 1), left: 50 + i * 120, top: (H - PHOTO) / 2 + (i === 0 ? -40 : i === 1 ? 0 : 40) })),
    );
    const subject = top.title.replace(/^Top 10 des /, "");
    const lines = wrap(subject.toUpperCase(), 16).slice(0, 4);
    const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <text x="680" y="150" font-family="Impact, 'Arial Black', sans-serif" font-size="34" letter-spacing="6" fill="#ffc46b">TOP 10</text>
      ${lines.map((l, i) => `<text x="680" y="${225 + i * 66}" font-family="Impact, 'Arial Black', sans-serif" font-size="58" fill="#fbeee2">${escape(l)}</text>`).join("")}
      <rect x="680" y="${H - 112}" width="60" height="6" fill="#ff7a3d"/>
      <text x="680" y="${H - 62}" font-family="Impact, 'Arial Black', sans-serif" font-size="34" letter-spacing="2" fill="#fbeee2">KEUR COOK</text>
    </svg>`;
    await sharp({ create: { width: W, height: H, channels: 3, background: "#140a07" } })
      .composite([...[...layers].reverse(), { input: Buffer.from(svg), left: 0, top: 0 }])
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(`public/top10/${top.slug}.jpg`);
    console.log(`public/top10/${top.slug}.jpg`);
  }
}

main();
