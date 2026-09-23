"use client";

export default function ShopError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl text-forest-900">Une erreur est survenue</h1>
      <p className="mt-2 text-muted">Merci de réessayer dans quelques instants.</p>
      <button type="button" onClick={reset} className="btn-primary mt-6">Réessayer</button>
    </div>
  );
}
