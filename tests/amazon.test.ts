/**
 * Liens Amazon : chaque emplacement a un code de suivi pris dans la table unique de src/lib/amazon.ts,
 * et chaque lien construit porte ce code.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { AMAZON_TAG, amazonUrl, CODES_SUIVI, type EmplacementAmazon } from "../src/lib/amazon";

const emplacements = Object.keys(CODES_SUIVI) as EmplacementAmazon[];

function fichiers(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? fichiers(p) : /\.tsx?$/.test(f) ? [p] : [];
  });
}

describe("Liens Amazon", () => {
  it("chaque code de suivi a la forme <code>-21 (au plus 12 caractères avant -21)", () => {
    for (const code of Object.values(CODES_SUIVI)) assert.match(code, /^[a-z0-9]{1,12}-21$/);
  });

  it("chaque lien a un code de suivi, qui fait partie de la table", () => {
    for (const e of emplacements) {
      const url = new URL(amazonUrl("B000PBXHBS", e));
      assert.equal(url.hostname, "www.amazon.fr");
      const tag = url.searchParams.get("tag");
      assert.ok(tag, e);
      assert.equal(tag, CODES_SUIVI[e]);
      assert.ok(Object.values(CODES_SUIVI).includes(tag));
    }
  });

  it("pour l'instant, tous les emplacements gardent le code actuel du site (rien ne change en ligne)", () => {
    for (const e of emplacements) assert.equal(CODES_SUIVI[e], AMAZON_TAG);
  });

  it("aucun lien Amazon écrit à la main dans le code : tout passe par amazonUrl", () => {
    const trouves = fichiers("src").filter((f) => f !== join("src", "lib", "amazon.ts") && /amazon\.fr\/(dp|s\?|gp)/.test(readFileSync(f, "utf8")));
    assert.deepEqual(trouves, []);
  });
});
