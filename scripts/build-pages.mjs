/**
 * Build de la vitrine statique pour GitHub Pages → dossier out/.
 *
 * Les parties qui exigent un serveur (admin, API, proxy, page de
 * confirmation de commande) sont mises de côté le temps du build puis
 * restaurées, même en cas d'échec.
 *
 * Usage : npm run build:pages   (NEXT_PUBLIC_BASE_PATH=/alohash par défaut)
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = join(import.meta.dirname, "..");
const stash = join(root, ".static-export-stash");
const serverOnly = [
  "src/proxy.ts",
  "src/app/admin",
  "src/app/api",
  "src/app/(shop)/commande/confirmation",
  "src/components/admin",
];

if (existsSync(stash)) {
  console.error(`Le dossier ${stash} existe déjà : un build précédent a été interrompu. Restaurez son contenu puis supprimez-le.`);
  process.exit(1);
}

const moved = [];
function restore() {
  for (const rel of moved.reverse()) renameSync(join(stash, rel), join(root, rel));
  rmSync(stash, { recursive: true, force: true });
}

let status = 1;
try {
  for (const rel of serverOnly) {
    if (!existsSync(join(root, rel))) continue;
    mkdirSync(dirname(join(stash, rel)), { recursive: true });
    renameSync(join(root, rel), join(stash, rel));
    moved.push(rel);
  }
  rmSync(join(root, ".next"), { recursive: true, force: true });
  const env = {
    ...process.env,
    STATIC_EXPORT: "1",
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? "/alohash",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://teiki5320.github.io/alohash",
    // La vitrine utilise toujours les données de démo, jamais Supabase.
    NEXT_PUBLIC_SUPABASE_URL: "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
  };
  const result = spawnSync("npx", ["next", "build"], { cwd: root, env, stdio: "inherit" });
  status = result.status ?? 1;
  if (status === 0) {
    // GitHub Pages ne doit pas passer le site dans Jekyll (dossier _next).
    writeFileSync(join(root, "out", ".nojekyll"), "");
  }
} finally {
  restore();
  // Le cache .next du mode statique ne doit pas servir au build serveur suivant.
  rmSync(join(root, ".next"), { recursive: true, force: true });
}
process.exit(status);
