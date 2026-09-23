/**
 * Génère les visuels SVG et les certificats d'analyse PDF de démonstration
 * dans public/demo et public/coa.  Usage : npm run demo:assets
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { demoCategories, demoProducts } from "../src/lib/demo/catalog";

const root = join(__dirname, "..", "public");
const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
mkdirSync(join(root, "demo"), { recursive: true });
mkdirSync(join(root, "coa"), { recursive: true });

// ------------------------------------------------------------------ SVG

const palettes: Record<string, [string, string, string]> = {
  fleurs: ["#dfe7d2", "#b9caa0", "#3d5e46"],
  resines: ["#efe3d0", "#d6bc97", "#6b4a2b"],
  huiles: ["#f5ead0", "#e5cf96", "#9a6a1c"],
  infusions: ["#e9efdc", "#c9d8ad", "#56733f"],
  cosmetiques: ["#f4e6e0", "#e2c2b6", "#9a6555"],
  grinders: ["#e4e8e3", "#c3ccc4", "#3f4d45"],
  vaporisateurs: ["#e3e6ea", "#c2c8d0", "#39424d"],
  feuilles: ["#f3efe4", "#ddd3bb", "#7d6d4d"],
  conservation: ["#ebe4f0", "#cdbfd9", "#5a4670"],
};

function illustration(slug: string, c: string, seed: number): string {
  switch (slug) {
    case "fleurs": {
      const buds = Array.from({ length: 18 }, (_, i) => {
        const a = (i / 18) * Math.PI * 2 + seed;
        const r = 38 + ((i * 37 + seed * 11) % 30);
        return `<circle cx="${200 + Math.cos(a) * r * 0.8}" cy="${190 + Math.sin(a) * r}" r="${20 + (i % 4) * 4}" fill="${c}" opacity="${0.55 + (i % 3) * 0.15}"/>`;
      }).join("");
      return `${buds}<circle cx="200" cy="190" r="42" fill="${c}"/><path d="M200 240 C 196 280, 204 300, 200 330" stroke="${c}" stroke-width="8" fill="none" stroke-linecap="round"/>
      <g fill="#f3c26b" opacity=".75">${Array.from({ length: 14 }, (_, i) => `<circle cx="${160 + ((i * 53 + seed * 7) % 80)}" cy="${150 + ((i * 29 + seed * 5) % 90)}" r="3"/>`).join("")}</g>`;
    }
    case "resines":
      return `<rect x="120" y="150" width="160" height="110" rx="26" fill="${c}"/><rect x="140" y="165" width="120" height="16" rx="8" fill="#fff" opacity=".18"/>
      <g fill="${c}" opacity=".6"><circle cx="110" cy="290" r="12"/><circle cx="300" cy="120" r="8"/><circle cx="290" cy="285" r="6"/></g>`;
    case "huiles":
      return `<rect x="160" y="150" width="80" height="170" rx="16" fill="${c}"/><rect x="176" y="110" width="48" height="44" rx="6" fill="#2b2b2b"/>
      <rect x="190" y="70" width="20" height="44" rx="10" fill="#2b2b2b"/><rect x="170" y="200" width="60" height="70" rx="6" fill="#fff" opacity=".85"/>
      <path d="M200 215 c -10 16 -14 24 -14 32 a14 14 0 0 0 28 0 c0 -8 -4 -16 -14 -32z" fill="${c}"/>`;
    case "infusions":
      return `<path d="M120 190 h150 v40 a75 75 0 0 1 -150 0z" fill="${c}"/><path d="M270 205 a28 28 0 0 1 0 56" stroke="${c}" stroke-width="12" fill="none"/>
      <ellipse cx="195" cy="320" rx="100" ry="12" fill="${c}" opacity=".35"/>
      <g stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".6"><path d="M165 170 c-10 -20 10 -30 0 -50"/><path d="M200 170 c-10 -20 10 -30 0 -50"/><path d="M235 170 c-10 -20 10 -30 0 -50"/></g>`;
    case "cosmetiques":
      return `<rect x="130" y="190" width="140" height="110" rx="22" fill="${c}"/><rect x="122" y="160" width="156" height="40" rx="12" fill="#3a2d28"/>
      <rect x="160" y="225" width="80" height="44" rx="8" fill="#fff" opacity=".85"/>`;
    case "grinders":
      return `<ellipse cx="200" cy="170" rx="90" ry="30" fill="${c}"/><rect x="110" y="170" width="180" height="110" fill="${c}"/><ellipse cx="200" cy="280" rx="90" ry="30" fill="${c}"/>
      <g stroke="#fff" stroke-width="3" opacity=".35"><path d="M110 205 h180"/><path d="M110 240 h180"/></g><ellipse cx="200" cy="170" rx="70" ry="20" fill="#fff" opacity=".15"/>`;
    case "vaporisateurs":
      return `<rect x="165" y="80" width="70" height="250" rx="35" fill="${c}"/><rect x="185" y="60" width="30" height="40" rx="10" fill="${c}" opacity=".8"/>
      <circle cx="200" cy="230" r="10" fill="#9fe3b0"/><g fill="#fff" opacity=".5"><circle cx="200" cy="260" r="4"/><circle cx="200" cy="275" r="4"/><circle cx="200" cy="290" r="4"/></g>`;
    case "feuilles":
      return `<g transform="rotate(-8 200 200)"><rect x="110" y="150" width="190" height="120" rx="10" fill="${c}"/><rect x="118" y="140" width="190" height="120" rx="10" fill="#fbf8f0" stroke="${c}" stroke-width="3"/>
      <text x="213" y="210" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="${c}">SLIM</text></g>`;
    default:
      return `<rect x="135" y="140" width="130" height="170" rx="24" fill="${c}" opacity=".9"/><rect x="125" y="115" width="150" height="36" rx="10" fill="#2b2b2b"/>
      <rect x="150" y="170" width="30" height="110" rx="12" fill="#fff" opacity=".18"/>`;
  }
}

demoProducts.forEach((p, index) => {
  const category = demoCategories.find((c) => c.id === p.categoryId)!;
  const [bg1, bg2, ink] = palettes[category.slug] ?? palettes.fleurs;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="${xml(p.name)}">
  <defs><radialGradient id="g" cx="35%" cy="30%" r="85%"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></radialGradient></defs>
  <rect width="400" height="400" fill="url(#g)"/>
  <g fill="${ink}" opacity=".07"><ellipse cx="330" cy="70" rx="14" ry="44" transform="rotate(25 330 70)"/><ellipse cx="60" cy="340" rx="12" ry="38" transform="rotate(-30 60 340)"/></g>
  <ellipse cx="200" cy="335" rx="110" ry="14" fill="${ink}" opacity=".12"/>
  ${illustration(category.slug, ink, index + 1)}
  <text x="200" y="382" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" letter-spacing="2" fill="${ink}" opacity=".55">VISUEL DE DÉMONSTRATION</text>
</svg>
`;
  writeFileSync(join(root, "demo", `${p.slug}.svg`), svg);
});

// ------------------------------------------------------------------ PDF

/** Construit un PDF minimal (1 page, Helvetica, encodage WinAnsi). */
function buildPdf(lines: Array<{ text: string; size: number; x?: number; bold?: boolean; gap?: number }>): Buffer {
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  let y = 790;
  let stream = "";
  for (const l of lines) {
    y -= l.gap ?? l.size + 8;
    stream += `BT /${l.bold ? "F2" : "F1"} ${l.size} Tf ${l.x ?? 56} ${y} Td (${esc(l.text)}) Tj ET\n`;
  }
  stream += `0.18 0.29 0.22 RG 2 w 56 800 m 539 800 l S\n56 60 m 539 60 l S\n`;
  const streamBuf = Buffer.from(stream, "latin1");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
    null, // flux
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  ];
  const chunks: Buffer[] = [Buffer.from("%PDF-1.4\n%\xe2\xe3\xcf\xd3\n", "latin1")];
  const offsets: number[] = [];
  let length = chunks[0].length;
  objects.forEach((obj, i) => {
    offsets.push(length);
    const body =
      obj === null
        ? Buffer.concat([Buffer.from(`${i + 1} 0 obj\n<< /Length ${streamBuf.length} >>\nstream\n`, "latin1"), streamBuf, Buffer.from("endstream\nendobj\n", "latin1")])
        : Buffer.from(`${i + 1} 0 obj\n${obj}\nendobj\n`, "latin1");
    chunks.push(body);
    length += body.length;
  });
  const xref = [
    "xref",
    `0 ${objects.length + 1}`,
    "0000000000 65535 f ",
    ...offsets.map((o) => `${o.toString().padStart(10, "0")} 00000 n `),
    "trailer",
    `<< /Size ${objects.length + 1} /Root 1 0 R >>`,
    "startxref",
    String(length),
    "%%EOF",
    "",
  ].join("\n");
  chunks.push(Buffer.from(xref, "latin1"));
  return Buffer.concat(chunks);
}

const fr = (n: number | null) => (n === null ? "-" : `${n.toLocaleString("fr-FR", { maximumFractionDigits: 3 })} %`);

demoProducts
  .filter((p) => p.coaUrl)
  .forEach((p, i) => {
    const lot = `LOT-2026-${(i + 1).toString().padStart(3, "0")}`;
    const pdf = buildPdf([
      { text: "CERTIFICAT D'ANALYSE", size: 20, bold: true, gap: 40 },
      { text: "DOCUMENT DE DÉMONSTRATION - DONNÉES FICTIVES", size: 10, bold: true, gap: 20 },
      { text: "Laboratoire : Laboratoire d'Analyses Végétales (fictif) - 00000 Exemple", size: 10, gap: 30 },
      { text: `Produit : ${p.name}`, size: 12, bold: true, gap: 34 },
      { text: `Lot : ${lot}`, size: 11 },
      { text: `Producteur : ${p.producer ?? "-"}`, size: 11 },
      { text: `Origine : France - ${p.originRegion ?? "-"}`, size: 11 },
      { text: "Date d'analyse : 15/01/2026", size: 11 },
      { text: "Méthode : chromatographie liquide haute performance (HPLC)", size: 11 },
      { text: "Résultats - cannabinoïdes", size: 13, bold: true, gap: 36 },
      { text: `CBD (cannabidiol) total ................................ ${fr(p.cbdRate)}`, size: 11, gap: 22 },
      { text: `Delta-9-THC total ...................................... ${fr(p.thcRate)}`, size: 11 },
      { text: "Limite réglementaire THC (arrêté du 30/12/2021) .......... 0,3 %", size: 11 },
      { text: "Conclusion : CONFORME - teneur en THC inférieure ou égale à 0,3 %", size: 12, bold: true, gap: 34 },
      { text: "Ce document est fourni uniquement pour tester le site. Il doit être remplacé par le", size: 9, gap: 60 },
      { text: "certificat d'analyse réel du lot, délivré par un laboratoire indépendant.", size: 9, gap: 13 },
    ]);
    writeFileSync(join(root, "coa", `${p.slug}.pdf`), pdf);
  });

console.log(`Visuels : ${demoProducts.length} SVG — Certificats : ${demoProducts.filter((p) => p.coaUrl).length} PDF`);
