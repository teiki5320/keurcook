"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { placeOrderAction, type CheckoutState } from "@/app/(shop)/commande/actions";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice } from "@/lib/format";
import { CartSummary } from "./CartSummary";

interface Props {
  paymentOptions: Array<{ id: string; label: string; description: string }>;
  flatRateCents: number;
  freeThresholdCents: number;
}

function Field({
  name,
  label,
  error,
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { name: string; label: string; error?: string }) {
  return (
    <div className={className}>
      <label htmlFor={`f-${name}`} className="label">
        {label}
      </label>
      <input
        id={`f-${name}`}
        name={name}
        className={`input ${error ? "border-terracotta" : ""}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `e-${name}` : undefined}
        {...rest}
      />
      {error && (
        <p id={`e-${name}`} className="mt-1 text-xs text-terracotta-dark">
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckoutForm({ paymentOptions, flatRateCents, freeThresholdCents }: Props) {
  const { lines, ready, subtotalCents } = useCart();
  const [state, formAction, pending] = useActionState<CheckoutState, FormData>(placeOrderAction, {});
  const fe = state.fieldErrors ?? {};
  const v = state.values ?? {};

  useEffect(() => {
    if (state.redirectUrl) window.location.href = state.redirectUrl;
  }, [state.redirectUrl]);

  if (!ready) return <div className="h-60 animate-pulse rounded-3xl bg-sage-100" />;

  if (lines.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="font-display text-2xl text-forest-900">Votre panier est vide.</p>
        <Link href="/boutique" className="btn-primary mt-6">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-8 lg:grid-cols-[1fr_380px]" noValidate>
      <input type="hidden" name="lines" value={JSON.stringify(lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity })))} />
      <input type="hidden" name="country" value="FR" />
      <div className="hidden" aria-hidden>
        <label>
          Ne pas remplir
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="space-y-8">
        <section className="card p-5 sm:p-6">
          <h2 className="mb-4 font-display text-xl text-forest-900">Coordonnées</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="firstName" defaultValue={v.firstName} label="Prénom" autoComplete="given-name" required error={fe.firstName} />
            <Field name="lastName" defaultValue={v.lastName} label="Nom" autoComplete="family-name" required error={fe.lastName} />
            <Field name="email" defaultValue={v.email} label="Email" type="email" autoComplete="email" required error={fe.email} />
            <Field name="phone" defaultValue={v.phone} label="Téléphone (facultatif)" type="tel" autoComplete="tel" error={fe.phone} />
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="mb-4 font-display text-xl text-forest-900">Adresse de livraison</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="addressLine1" defaultValue={v.addressLine1} label="Adresse" autoComplete="address-line1" required className="sm:col-span-2" error={fe.addressLine1} />
            <Field name="addressLine2" defaultValue={v.addressLine2} label="Complément (facultatif)" autoComplete="address-line2" className="sm:col-span-2" error={fe.addressLine2} />
            <Field name="postalCode" defaultValue={v.postalCode} label="Code postal" autoComplete="postal-code" inputMode="numeric" maxLength={5} required error={fe.postalCode} />
            <Field name="city" defaultValue={v.city} label="Ville" autoComplete="address-level2" required error={fe.city} />
            <p className="text-xs text-muted sm:col-span-2">Livraison en France métropolitaine uniquement.</p>
            <div className="sm:col-span-2">
              <label htmlFor="f-notes" className="label">Note pour la livraison (facultatif)</label>
              <textarea id="f-notes" name="notes" defaultValue={v.notes} rows={2} maxLength={500} className="input" />
            </div>
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="mb-4 font-display text-xl text-forest-900">Paiement</h2>
          <div className="space-y-3">
            {paymentOptions.map((p, i) => (
              <label key={p.id} className="flex cursor-pointer gap-3 rounded-2xl border border-sage-300 p-4 has-[:checked]:border-forest-700 has-[:checked]:bg-sage-50">
                <input type="radio" name="paymentProvider" value={p.id} defaultChecked={v.paymentProvider ? v.paymentProvider === p.id : i === 0} className="mt-1 accent-forest-700" />
                <span>
                  <span className="block font-semibold">{p.label}</span>
                  <span className="block text-sm text-muted">{p.description}</span>
                </span>
              </label>
            ))}
            {fe.paymentProvider && <p className="text-xs text-terracotta-dark">{fe.paymentProvider}</p>}
          </div>
        </section>
      </div>

      <div className="space-y-4 lg:sticky lg:top-36 lg:self-start">
        <div className="card p-5 text-sm">
          <p className="mb-3 font-semibold">Articles</p>
          <ul className="space-y-2">
            {lines.map((l) => (
              <li key={l.variantId} className="flex justify-between gap-3">
                <span>
                  {l.name} <span className="text-muted">({l.variantLabel}) × {l.quantity}</span>
                </span>
                <span>{formatPrice(l.priceCents * l.quantity)}</span>
              </li>
            ))}
          </ul>
        </div>

        <CartSummary subtotalCents={subtotalCents} flatRateCents={flatRateCents} freeThresholdCents={freeThresholdCents}>
          <div className="space-y-3 border-t border-sage-200 pt-3">
            <label className="flex items-start gap-2">
              <input type="checkbox" name="isAdult" required defaultChecked={v.isAdult === "on"} className="mt-0.5 h-4 w-4 accent-forest-700" />
              <span>Je certifie avoir <strong>18 ans ou plus</strong>.</span>
            </label>
            {fe.isAdult && <p className="text-xs text-terracotta-dark">{fe.isAdult}</p>}
            <label className="flex items-start gap-2">
              <input type="checkbox" name="acceptTerms" required defaultChecked={v.acceptTerms === "on"} className="mt-0.5 h-4 w-4 accent-forest-700" />
              <span>
                J&apos;ai lu et j&apos;accepte les{" "}
                <Link href="/cgv" target="_blank" className="underline">conditions générales de vente</Link> et la{" "}
                <Link href="/confidentialite" target="_blank" className="underline">politique de confidentialité</Link>.
              </span>
            </label>
            {fe.acceptTerms && <p className="text-xs text-terracotta-dark">{fe.acceptTerms}</p>}
          </div>

          {state.error && (
            <p role="alert" className="rounded-xl bg-terracotta/10 p-3 text-sm text-terracotta-dark">
              {state.error}
            </p>
          )}

          <button type="submit" disabled={pending} className="btn-primary w-full py-3">
            {pending ? "Validation…" : "Valider la commande avec obligation de paiement"}
          </button>
          <p className="text-xs text-muted">
            Le montant final (prix et stock) est vérifié par nos serveurs au moment de la validation.
          </p>
        </CartSummary>
      </div>
    </form>
  );
}
