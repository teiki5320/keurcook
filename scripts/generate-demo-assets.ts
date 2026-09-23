/**
 * Génère les certificats d'analyse PDF de démonstration dans public/coa.
 * Usage : npm run demo:assets
 * (Les photos produit, elles, sont des fichiers WebP dans public/products.)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { demoProducts } from "../src/lib/demo/catalog";

const root = join(__dirname, "..", "public");
mkdirSync(join(root, "coa"), { recursive: true });

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

console.log(`Certificats : ${demoProducts.filter((p) => p.coaUrl).length} PDF`);
