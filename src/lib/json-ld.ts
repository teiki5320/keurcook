/** Données structurées sérialisées pour une balise <script type="application/ld+json"> (« < » échappé). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
