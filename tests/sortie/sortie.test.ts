/**
 * Contrôle du site construit (dossier out/), tel qu'il sera publié sur keurcook.com.
 * Lancement : npm run test:sortie (construit d'abord le site avec les réglages de deploy.yml),
 * ou npm run test:sortie:controle sur un out/ déjà construit (c'est ce que fait deploy.yml avant chaque publication).
 * Modèle : Keurfoot/tests/sortie/sortie.test.ts.
 */
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { CODES_SUIVI } from "../../src/lib/amazon";

const out = join(import.meta.dirname, "..", "..", "out");
const SITE = "https://keurcook.com";

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === "_next" ? [] : htmlFiles(p);
    return f.endsWith(".html") ? [p] : [];
  });
}

const lire = (fichier: string) => readFileSync(join(out, fichier), "utf8");
const decoder = (s: string) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

describe("Site construit", () => {
  it("le dossier out/ existe", () => assert.ok(existsSync(join(out, "index.html")), "lancer npm run test:sortie"));

  // Adresses du plan du site : chacune doit être une vraie page publiable.
  const sitemap = existsSync(join(out, "sitemap.xml")) ? lire("sitemap.xml") : "";
  const adresses = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  it("le plan du site liste au moins 200 adresses, avec leurs photos", () => {
    assert.ok(adresses.length >= 200, `${adresses.length} adresses`);
    assert.ok((sitemap.match(/<image:image>/g) ?? []).length >= 100, "photos du sitemap");
    assert.ok(adresses.every((u) => u.startsWith(SITE)), "toutes les adresses sur keurcook.com");
  });

  it("chaque page du plan du site : un seul h1, une description, une adresse canonique, jamais noindex", () => {
    const erreurs: string[] = [];
    for (const url of adresses) {
      const chemin = url.slice(SITE.length).replace(/^\//, "") || "index";
      const fichier = join(out, `${chemin}.html`);
      if (!existsSync(fichier)) {
        erreurs.push(`${chemin} : page absente`);
        continue;
      }
      const html = readFileSync(fichier, "utf8");
      if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) erreurs.push(`${chemin} : pas exactement un h1`);
      if (!/<meta name="description" content="[^"]{50,}"/.test(html)) erreurs.push(`${chemin} : description absente ou trop courte`);
      if (/<meta name="robots" content="[^"]*noindex/.test(html)) erreurs.push(`${chemin} : noindex`);
      if (!html.includes(`<link rel="canonical" href="${url}"`)) erreurs.push(`${chemin} : adresse canonique différente`);
    }
    assert.deepEqual(erreurs.slice(0, 20), []);
  });

  it("chaque page a un titre de 60 caractères au plus", () => {
    const longs: string[] = [];
    for (const file of htmlFiles(out)) {
      const brut = readFileSync(file, "utf8").match(/<title>([^<]*)<\/title>/)?.[1];
      if (brut === undefined) continue;
      const titre = decoder(brut);
      if ([...titre].length > 60) longs.push(`${file.replace(out, "")} (${[...titre].length}) : ${titre}`);
    }
    assert.deepEqual(longs, []);
  });

  it("les liens Amazon s'ouvrent dans un nouvel onglet, signalés « sponsored nofollow noopener »", () => {
    let vus = 0;
    for (const file of htmlFiles(out)) {
      for (const m of readFileSync(file, "utf8").matchAll(/<a\b[^>]*href="https:\/\/(?:www\.)?(?:amazon\.[a-z.]+|amzn\.[a-z]+)[^"]*"[^>]*>/g)) {
        vus++;
        assert.match(m[0], /target="_blank"/, file.replace(out, ""));
        assert.match(m[0], /rel="[^"]*\bsponsored nofollow noopener\b[^"]*"/, file.replace(out, ""));
        // Chaque lien porte un code de suivi de la table unique (src/lib/amazon.ts).
        const tag = /[?&]tag=([^&"]+)/.exec(decoder(m[0]))?.[1];
        assert.ok(tag && Object.values(CODES_SUIVI).includes(tag), `${file.replace(out, "")} : code de suivi ${tag ?? "absent"}`);
      }
    }
    assert.ok(vus > 0, "aucun lien Amazon trouvé");
  });

  it("l'accueil et les actus n'ont aucun lien Amazon", () => {
    const fichiers = ["index.html", ...(existsSync(join(out, "actus")) ? htmlFiles(join(out, "actus")).map((f) => f.slice(out.length + 1)) : [])];
    for (const f of fichiers) assert.doesNotMatch(lire(f), /href="https:\/\/(?:www\.)?amazon\./, f);
  });

  it("l'accueil : le bloc « Nos coups de cœur » montre au moins 4 produits reliés à leur fiche", () => {
    const html = lire("index.html");
    const debut = html.indexOf('id="coups-de-coeur"');
    assert.ok(debut > 0, "bloc absent");
    const bloc = html.slice(debut, html.indexOf("</section>", debut));
    const fiches = new Set([...bloc.matchAll(/href="\/produit\/([^"/]+)\/?"/g)].map((x) => x[1]));
    assert.ok(fiches.size >= 4, `${fiches.size} fiches`);
    assert.doesNotMatch(bloc, /amazon\./i);
  });

  it("les données structurées (JSON-LD) ne contiennent jamais de « < » brut", () => {
    for (const file of htmlFiles(out)) {
      for (const m of readFileSync(file, "utf8").matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        assert.ok(!m[1].includes("<"), file.replace(out, ""));
        JSON.parse(m[1]);
      }
    }
  });

  it("l'accueil : une seule fiche Organisation, balise Pinterest, compte AdSense", () => {
    const html = lire("index.html");
    assert.equal((html.match(/"@type":"Organization"/g) ?? []).length, 1);
    assert.match(html, /<meta name="p:domain_verify" content="[0-9a-f]{32}"/);
    assert.match(html, /<meta name="google-adsense-account" content="ca-pub-\d+"/);
  });

  it("polices servies par le site : 2 fichiers préchargés, rien chez Google Fonts", () => {
    const html = lire("index.html");
    const polices = new Set(html.match(/<link rel="preload" href="\/_next\/static\/media\/[^"]+\.woff2"/g) ?? []);
    assert.equal(polices.size, 2, [...polices].join(", "));
    assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
  });

  it("le lien « Aller au contenu » mène au contenu principal", () => {
    const html = lire("index.html");
    assert.match(html, /<a href="#contenu"[^>]*>Aller au contenu<\/a>/);
    assert.match(html, /<main id="contenu"/);
  });

  it("robots.txt indique le plan du site ; IndexNow a sa clé publique", () => {
    assert.match(lire("robots.txt"), /Sitemap: https:\/\/keurcook\.com\/sitemap\.xml/);
    const cles = readdirSync(out).filter((f) => /^[0-9a-f]{32}\.txt$/.test(f));
    assert.equal(cles.length, 1, "un fichier de clé IndexNow");
    assert.equal(lire(cles[0]).trim(), cles[0].replace(".txt", ""));
  });

  it("en-têtes de sécurité et redirections servis par Cloudflare", () => {
    const headers = lire("_headers");
    for (const h of ["Content-Security-Policy", "Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy"]) {
      assert.ok(headers.includes(h), h);
    }
    assert.match(headers, /\/_next\/static\/\*\n\s+Cache-Control: public, max-age=31536000, immutable/);
    assert.match(lire("_redirects"), /^\/cgv \/conditions 301$/m);
    // ads.txt, robots.txt et la clé IndexNow restent lisibles par les robots (pas de noindex).
    for (const f of ["ads.txt", "robots.txt", ...readdirSync(out).filter((x) => /^[0-9a-f]{32}\.txt$/.test(x))]) {
      assert.match(headers, new RegExp(`^/${f.replace(".", "\\.")}\\n\\s+! X-Robots-Tag$`, "m"), f);
    }
  });
});
