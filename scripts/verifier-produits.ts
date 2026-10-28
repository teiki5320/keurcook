/**
 * Vérification des produits Amazon (à lancer sur le Mac, pas sur GitHub : Amazon bloque souvent les serveurs).
 * Pour chaque offre du catalogue (src/lib/demo/catalog*.ts), la fiche amazon.fr/dp/<ASIN> est ouverte dans Chrome :
 * - bouton « Ajouter au panier » présent : l'offre est notée « disponible » avec la date du jour ;
 * - absent : l'offre est notée « indisponible » (le produit n'est plus affiché, son ASIN est conservé)
 *   et revient d'elle-même quand une vérification suivante la retrouve disponible.
 * Rien n'est inventé : seul l'état lu sur la fiche est enregistré, dans src/lib/demo/verifications-amazon.json.
 *
 * Usage : npm run verifier-produits                       (rapport seul)
 *         npm run verifier-produits -- --ecrire           (met à jour verifications-amazon.json)
 *         npm run verifier-produits -- --ecrire --lot 30  (les 30 offres vérifiées il y a le plus longtemps,
 *           jamais vérifiées d'abord, avec des pauses plus longues : Amazon tolère mieux un passage quotidien
 *           par petits lots qu'une rafale de 130 fiches)
 * Chrome : CHROMIUM_PATH=/chemin/vers/chrome (par défaut, Google Chrome sur macOS).
 *
 * Un produit d'un Top 10 trouvé indisponible bloque la publication (un Top 10 compte toujours dix produits) :
 * il faut le remplacer par un équivalent vérifié avant de publier. Le script le signale.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright-core";
import { offresAVerifier, type VerificationAmazon } from "../src/lib/demo/catalog";
import { demoTop10 } from "../src/lib/demo/top10";

const FICHIER = resolve(import.meta.dirname, "../src/lib/demo/verifications-amazon.json");
const ecrire = process.argv.includes("--ecrire");
const iLot = process.argv.indexOf("--lot");
const lot = iLot > -1 ? Number(process.argv[iLot + 1]) || 30 : 0;
const aujourdhui = new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris" }).format(new Date());
const chrome = process.env.CHROMIUM_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const etats = JSON.parse(readFileSync(FICHIER, "utf8")) as Record<string, VerificationAmazon>;
// Date de la dernière vérification de l'offre actuelle ("" si jamais vérifiée, ou vérifiée avec un autre ASIN).
const derniere = (o: { slug: string; asin: string }) => (etats[o.slug]?.asin === o.asin ? etats[o.slug].verifieLe : "");
const toutes = offresAVerifier();
const aVerifier = lot ? [...toutes].sort((a, b) => derniere(a).localeCompare(derniere(b))).slice(0, lot) : toutes;

async function main(): Promise<number> {
  const navigateur = await chromium.launch({ executablePath: chrome, headless: true });
  const page = await (await navigateur.newContext({ locale: "fr-FR" })).newPage();
  const disponibles: typeof toutes = [];
  const indisponibles: typeof toutes = [];
  let bloque = false;

  for (const o of aVerifier) {
    let etat: { captcha: boolean; achat: boolean; titre: string };
    try {
      const reponse = await page.goto(`https://www.amazon.fr/dp/${o.asin}`, { waitUntil: "commit", timeout: 60000 });
      await page.waitForSelector("#productTitle, form[action*='validateCaptcha'], #g", { timeout: 30000 }).catch(() => {});
      etat = await page.evaluate(() => ({
        captcha: !!document.querySelector('form[action*="validateCaptcha"]'),
        achat: !!document.querySelector("#add-to-cart-button"),
        titre: (document.querySelector("#productTitle")?.textContent || "").trim(),
      }));
      // Page vide ou inattendue (ni titre ni captcha) : on ne conclut rien.
      if (!etat.captcha && !etat.titre && (reponse?.status() ?? 0) !== 404) {
        console.log(`? ${o.slug} (${o.asin}) : page incomplète, non modifié`);
        continue;
      }
    } catch (e) {
      console.log(`? ${o.slug} (${o.asin}) : erreur de chargement, non modifié (${String((e as Error).message).split("\n")[0]})`);
      continue;
    }
    if (etat.captcha) {
      bloque = true;
      console.log(`Amazon demande une vérification (captcha) : arrêt, rien n'est enregistré après ${o.slug}.`);
      break;
    }
    if (etat.achat) disponibles.push(o);
    else {
      indisponibles.push(o);
      console.log(`✗ ${o.slug} (${o.asin}) : plus achetable${etat.titre ? ` · ${etat.titre.slice(0, 60)}` : ""}`);
    }
    // Rythme humain, pour ne pas surcharger Amazon.
    await page.waitForTimeout(lot ? 4000 + Math.random() * 4000 : 1500 + Math.random() * 1500);
  }
  await navigateur.close();

  const nonVerifiees = aVerifier.length - disponibles.length - indisponibles.length;
  console.log(`\n${disponibles.length} offre(s) disponible(s), ${indisponibles.length} indisponible(s), ${nonVerifiees} non vérifiée(s).`);
  if (lot) console.log(`Lot du jour : ${aVerifier.length} sur ${toutes.length} offres.`);
  if (ecrire) {
    for (const o of disponibles) etats[o.slug] = { asin: o.asin, verifieLe: aujourdhui, statut: "disponible" };
    for (const o of indisponibles) etats[o.slug] = { asin: o.asin, verifieLe: aujourdhui, statut: "indisponible" };
    const trie = Object.fromEntries(Object.entries(etats).sort(([a], [b]) => a.localeCompare(b)));
    writeFileSync(FICHIER, JSON.stringify(trie, null, 2) + "\n");
    console.log(`src/lib/demo/verifications-amazon.json mis à jour (${aujourdhui}).`);
  }
  if (indisponibles.length) {
    console.log("À remplacer par un équivalent vérifié (ou laisser masqué) : " + indisponibles.map((o) => o.slug).join(", "));
    const dansUnTop = demoTop10.flatMap((t) => t.items.filter((it) => indisponibles.some((o) => o.slug === it.product)).map((it) => `${it.product} (Top 10 « ${t.tab} »)`));
    if (dansUnTop.length) console.log(`Attention, à remplacer avant de publier (le Top 10 n'aurait plus dix produits) : ${dansUnTop.join(", ")}`);
  }
  return bloque ? 2 : 0;
}

main().then((code) => process.exit(code));
