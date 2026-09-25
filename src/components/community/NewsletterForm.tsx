"use client";

import Link from "next/link";
import { useActionState } from "react";
import { subscribeNewsletterAction, type CommunityState } from "@/app/(shop)/communaute-actions";

/** Inscription à la newsletter « la recette de la semaine », avec consentement explicite. */
export function NewsletterForm() {
  const [state, action, pending] = useActionState<CommunityState, FormData>(subscribeNewsletterAction, {});
  if (state.success) return <p role="status" className="text-lg text-[#ffc46b]">{state.success}</p>;
  return (
    <form action={action} className="max-w-xl space-y-3">
      <div className="hidden" aria-hidden>
        <label>
          Site web <input name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">Adresse e-mail</label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="votre@email.fr"
          className="flex-1 rounded-full border border-[#fbeee2]/20 bg-[#140a07]/80 px-5 py-3.5 text-[#fbeee2] placeholder:text-[#fbeee2]/40 focus:border-[#ff7a3d] focus:outline-none"
        />
        <button type="submit" disabled={pending} className="rounded-full bg-[#ff7a3d] px-7 py-3.5 font-bold text-[#140a07] transition hover:bg-[#ffc46b] disabled:opacity-60">
          {pending ? "Inscription…" : "Je m'inscris"}
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs text-[#fbeee2]/65">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-[#ff7a3d]" />
        <span>
          J&apos;accepte de recevoir la newsletter d&apos;Alohash (une recette par semaine, désinscription à tout moment).{" "}
          <Link href="/confidentialite" className="underline">Confidentialité</Link>
        </span>
      </label>
      {state.error && <p role="alert" className="text-sm text-[#ff7a3d]">{state.error}</p>}
    </form>
  );
}
