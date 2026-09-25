/**
 * Génère db/seed.sql à partir des données de démo (src/lib/demo/catalog.ts et recipes.ts).
 * Usage : npm run db:seed-sql
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { demoCategories, demoProducts } from "../src/lib/demo/catalog";
import { demoRecipes } from "../src/lib/demo/recipes";

const q = (v: string | null) => (v === null ? "null" : `'${v.replace(/'/g, "''")}'`);
const arr = (v: string[]) => (v.length ? `array[${v.map(q).join(", ")}]::text[]` : "'{}'::text[]");

const out: string[] = [
  "-- Données de démonstration générées par scripts/generate-seed-sql.ts — ne pas éditer à la main.",
  "-- Producteurs FICTIFS. Les images sont servies depuis /public.",
  "begin;",
  "",
  "insert into public.categories (id, slug, name, description, position) values",
  demoCategories
    .map((c) => `  (${q(c.id)}, ${q(c.slug)}, ${q(c.name)}, ${q(c.description)}, ${c.position})`)
    .join(",\n") + "\non conflict (id) do nothing;",
  "",
  "insert into public.products (id, slug, name, category_id, short_description, description, origin_country, origin_region, producer, images, composition, allergens, usage_tips, conservation, tags, is_active, featured, created_at) values",
  demoProducts
    .map(
      (p) =>
        `  (${q(p.id)}, ${q(p.slug)}, ${q(p.name)}, ${q(p.categoryId)}, ${q(p.shortDescription)}, ${q(p.description)}, ${q(p.originCountry)}, ${q(p.originRegion)}, ${q(p.producer)}, ${arr(p.images)}, ${q(p.composition)}, ${arr(p.allergens)}, ${q(p.usageTips)}, ${q(p.conservation)}, ${arr(p.tags)}, ${p.isActive}, ${p.featured}, ${q(p.createdAt)})`,
    )
    .join(",\n") + "\non conflict (id) do nothing;",
  "",
  "insert into public.product_variants (id, product_id, label, price_cents, stock, sku, position) values",
  demoProducts
    .flatMap((p) => p.variants)
    .map((v) => `  (${q(v.id)}, ${q(v.productId)}, ${q(v.label)}, ${v.priceCents}, ${v.stock}, ${q(v.sku)}, ${v.position})`)
    .join(",\n") + "\non conflict (id) do nothing;",
  "",
  "insert into public.recipes (id, slug, name, country_code, region, course, short_description, story, image, prep_minutes, cook_minutes, servings, difficulty, ingredients, steps, tips, tags, featured, is_published, created_at) values",
  demoRecipes
    .map(
      (r) =>
        `  (${q(r.id)}, ${q(r.slug)}, ${q(r.name)}, ${q(r.countryCode)}, ${q(r.region)}, ${q(r.course)}, ${q(r.shortDescription)}, ${q(r.story)}, ${q(r.image)}, ${r.prepMinutes}, ${r.cookMinutes}, ${r.servings}, ${r.difficulty}, ${q(JSON.stringify(r.ingredients))}::jsonb, ${q(JSON.stringify(r.steps))}::jsonb, ${arr(r.tips)}, ${arr(r.tags)}, ${r.featured}, ${r.isPublished}, ${q(r.createdAt)})`,
    )
    .join(",\n") + "\non conflict (id) do nothing;",
  "",
  "commit;",
  "",
];

writeFileSync(join(__dirname, "..", "db", "seed.sql"), out.join("\n"));
console.log("db/seed.sql généré.");
