/** Données structurées sérialisées pour une balise <script type="application/ld+json"> (« < » échappé). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Fil d'Ariane pour Google (BreadcrumbList) à partir de couples nom / adresse complète. */
export function breadcrumbLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}

/** Liste d'éléments d'une page d'entrée (ItemList) : dit à Google ce que la page présente, dans l'ordre. */
export function itemListLd(name: string, items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: it.url })),
  };
}

/** Balise <script type="application/ld+json"> prête à poser dans une page (un ou plusieurs blocs). */
export function JsonLdScript({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}
