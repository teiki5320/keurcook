/**
 * Installe le schéma de la base (db/schema.sql) sur la base Neon indiquée
 * par DATABASE_URL, et en option les produits de démo (db/seed.sql).
 * Rejouable sans perte de données.
 *
 * Usage : npm run db:setup            (schéma seul)
 *         npm run db:setup -- --seed  (schéma + produits de démo)
 * DATABASE_URL est lue dans l'environnement ou dans .env.local
 * (récupérable avec `npx vercel env pull .env.local`).
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Pool } from "@neondatabase/serverless";

const root = join(import.meta.dirname, "..");
if (!process.env.DATABASE_URL && existsSync(join(root, ".env.local"))) process.loadEnvFile(join(root, ".env.local"));
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL manquante (environnement ou .env.local).");
  process.exit(1);
}

const files = ["db/schema.sql", ...(process.argv.includes("--seed") ? ["db/seed.sql"] : [])];
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
try {
  for (const file of files) {
    await pool.query(readFileSync(join(root, file), "utf8"));
    console.log(`✓ ${file}`);
  }
} catch (e) {
  console.error(`Échec : ${e.message}`);
  process.exitCode = 1;
} finally {
  await pool.end();
}
