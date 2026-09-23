/**
 * Génère supabase/seed.sql à partir des données de démo (src/lib/demo/catalog.ts).
 * Usage : npm run db:seed-sql
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { demoCategories, demoProducts } from "../src/lib/demo/catalog";

const q = (v: string | null) => (v === null ? "null" : `'${v.replace(/'/g, "''")}'`);
const n = (v: number | null) => (v === null ? "null" : String(v));
const arr = (v: string[]) => (v.length ? `array[${v.map(q).join(", ")}]::text[]` : "'{}'::text[]");

const out: string[] = [
  "-- Données de démonstration générées par scripts/generate-seed-sql.ts — ne pas éditer à la main.",
  "-- Producteurs et certificats FICTIFS. Les images et PDF sont servis depuis /public.",
  "begin;",
  "",
  "insert into public.categories (id, slug, name, kind, description, position) values",
  demoCategories
    .map((c) => `  (${q(c.id)}, ${q(c.slug)}, ${q(c.name)}, ${q(c.kind)}, ${q(c.description)}, ${c.position})`)
    .join(",\n") + "\non conflict (id) do nothing;",
  "",
  "insert into public.products (id, slug, name, category_id, short_description, description, cbd_rate, thc_rate, origin_region, producer, images, coa_url, tags, is_active, featured, created_at) values",
  demoProducts
    .map(
      (p) =>
        `  (${q(p.id)}, ${q(p.slug)}, ${q(p.name)}, ${q(p.categoryId)}, ${q(p.shortDescription)}, ${q(p.description)}, ${n(p.cbdRate)}, ${n(p.thcRate)}, ${q(p.originRegion)}, ${q(p.producer)}, ${arr(p.images)}, ${q(p.coaUrl)}, ${arr(p.tags)}, ${p.isActive}, ${p.featured}, ${q(p.createdAt)})`,
    )
    .join(",\n") + "\non conflict (id) do nothing;",
  "",
  "insert into public.product_variants (id, product_id, label, price_cents, stock, sku, position) values",
  demoProducts
    .flatMap((p) => p.variants)
    .map((v) => `  (${q(v.id)}, ${q(v.productId)}, ${q(v.label)}, ${v.priceCents}, ${v.stock}, ${q(v.sku)}, ${v.position})`)
    .join(",\n") + "\non conflict (id) do nothing;",
  "",
  "commit;",
  "",
];

writeFileSync(join(__dirname, "..", "supabase", "seed.sql"), out.join("\n"));
console.log("supabase/seed.sql généré.");
