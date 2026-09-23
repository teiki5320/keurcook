export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="container-page py-10">
      <h1 className="font-display text-4xl text-forest-900">{title}</h1>
      <p className="mt-2 text-sm text-muted">Dernière mise à jour : {updated}</p>
      <p className="mt-4 max-w-3xl rounded-xl bg-amber-soft/50 p-3 text-xs text-ink/80">
        Modèle fourni à titre indicatif : les éléments entre crochets sont à compléter via les variables
        d&apos;environnement et le texte doit être validé par un professionnel du droit avant la mise en ligne.
      </p>
      <div className="prose-legal mt-8">{children}</div>
    </div>
  );
}
