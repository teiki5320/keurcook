import { formatPrice } from "@/lib/format";

export function CartSummary({
  subtotalCents,
  flatRateCents,
  freeThresholdCents,
  children,
}: {
  subtotalCents: number;
  flatRateCents: number;
  freeThresholdCents: number;
  children?: React.ReactNode;
}) {
  const shipping = subtotalCents === 0 ? 0 : subtotalCents >= freeThresholdCents ? 0 : flatRateCents;
  const remaining = freeThresholdCents - subtotalCents;
  return (
    <div className="card space-y-3 p-5 text-sm">
      <p className="font-display text-xl text-forest-900">Récapitulatif</p>
      <div className="flex justify-between">
        <span>Sous-total</span>
        <span>{formatPrice(subtotalCents)}</span>
      </div>
      <div className="flex justify-between">
        <span>Livraison (France métropolitaine)</span>
        <span>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span>
      </div>
      {remaining > 0 && subtotalCents > 0 && (
        <p className="rounded-xl bg-sage-50 p-3 text-xs text-forest-700">
          Plus que {formatPrice(remaining)} pour profiter de la livraison offerte.
        </p>
      )}
      <div className="flex justify-between border-t border-sage-200 pt-3 text-base font-semibold">
        <span>Total TTC</span>
        <span>{formatPrice(subtotalCents + shipping)}</span>
      </div>
      {children}
    </div>
  );
}
