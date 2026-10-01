"use client";

import { Printer } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";

const pill = "inline-flex items-center gap-2 rounded-full border border-[#fbeee2]/25 px-4 py-2.5 text-sm font-semibold text-[#fbeee2] transition hover:border-[#ff7a3d]";

/** Favori, impression et partage (WhatsApp, Pinterest) d'une recette. */
export function RecipeActions({ slug, name, url, image }: { slug: string; name: string; url: string; image?: string | null }) {
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${name} : la recette ${url}`)}`;
  // Épingle Pinterest : la photo du plat, le lien vers la recette et son nom.
  const pinterest = `https://www.pinterest.fr/pin/create/button/?${new URLSearchParams({
    url,
    ...(image ? { media: image } : {}),
    description: `${name} — recette africaine sur Keur Cook`,
  })}`;
  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <FavoriteButton slug={slug} name={name} variant="pill" />
      <button type="button" onClick={() => window.print()} className={pill}>
        <Printer className="h-4 w-4" aria-hidden /> Imprimer
      </button>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={pill}>
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" />
        </svg>
        Partager sur WhatsApp
      </a>
      <a href={pinterest} target="_blank" rel="noopener noreferrer" className={pill}>
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.5 2.1-4.5 4.4 0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.4.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8A10 10 0 1 0 12 2Z" />
        </svg>
        Épingler sur Pinterest
      </a>
    </div>
  );
}
