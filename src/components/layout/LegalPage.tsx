import { siteConfig } from "@/lib/config";
import { breadcrumbLd, JsonLdScript } from "@/lib/json-ld";

/** Gabarit des pages légales ; `path` sert au fil d'Ariane pour Google (BreadcrumbList). */
export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="container-page py-10">
      <JsonLdScript
        data={breadcrumbLd([
          { name: "Accueil", url: siteConfig.url },
          { name: title, url: `${siteConfig.url}${path}` },
        ])}
      />
      <h1 className="font-display text-4xl text-forest-900">{title}</h1>
      <p className="mt-2 text-sm text-muted">Dernière mise à jour : {updated}</p>
      <div className="prose-legal mt-8">{children}</div>
    </div>
  );
}
