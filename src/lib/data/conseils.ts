import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import { marked } from "marked";
import { anchorId, isPublished, parseConseil, relatedConseils, todayInParis, type Conseil } from "@/lib/conseils/article";
import { withBasePath } from "@/lib/paths";

const DIR = join(process.cwd(), "content", "conseils");

/** Tous les articles, publiés ou programmés, du plus récent au plus ancien. */
export const getAllConseils = cache((): Conseil[] =>
  readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseConseil(f.replace(/\.md$/, ""), readFileSync(join(DIR, f), "utf8")))
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "fr")),
);

/** Articles publiés à la date du jour (heure de Paris). */
export function getConseils(today = todayInParis()): Conseil[] {
  return getAllConseils().filter((c) => isPublished(c, today));
}

export function getConseilBySlug(slug: string, today = todayInParis()): Conseil | null {
  return getConseils(today).find((c) => c.slug === slug) ?? null;
}

export function getRelatedConseils(conseil: Conseil, today = todayInParis()): Conseil[] {
  return relatedConseils(conseil, getConseils(today));
}

/** Corps de l'article en HTML : ancres sur les parties, liens internes adaptés au préfixe du site. */
export function renderConseil(body: string): string {
  const renderer = new marked.Renderer();
  renderer.heading = function ({ tokens, depth, text }) {
    const inner = this.parser.parseInline(tokens);
    return depth === 2 ? `<h2 id="${anchorId(text)}">${inner}</h2>\n` : `<h${depth}>${inner}</h${depth}>\n`;
  };
  renderer.link = function ({ href, title, tokens }) {
    const inner = this.parser.parseInline(tokens);
    const external = /^https?:/.test(href);
    const attrs = external ? ' target="_blank" rel="noopener"' : "";
    return `<a href="${external ? href : withBasePath(href)}"${title ? ` title="${title}"` : ""}${attrs}>${inner}</a>`;
  };
  return marked.parse(body, { renderer, async: false });
}
