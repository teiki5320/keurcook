import type { Metadata } from "next";
import { ShopShell } from "@/components/nuage/ShopShell";
import { TLink } from "@/components/nuage/PageTransition";

export const metadata: Metadata = { title: "Page introuvable" };

export default function NotFound() {
  return (
    <ShopShell>
      <section className="flex min-h-[60dvh] items-center justify-center px-4 py-16 text-center">
        <div>
          <p className="font-display text-[#ff7a3d]" style={{ fontSize: "clamp(72px,14vw,160px)", lineHeight: 0.9 }}>
            404
          </p>
          <h1 className="font-display mt-4" style={{ fontSize: "clamp(32px,5vw,56px)" }}>
            Page introuvable<span className="text-[#ff7a3d]">.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[#fbeee2]/75">
            Cette page n&apos;existe pas ou n&apos;est plus disponible.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <TLink href="/boutique" label="La boutique" className="inline-flex rounded-full bg-[#ff7a3d] px-7 py-3.5 font-bold text-[#140a07] transition hover:bg-[#ffc46b]">
              Voir la boutique →
            </TLink>
            <TLink href="/" label="Accueil" className="inline-flex rounded-full border border-[#fbeee2]/30 px-7 py-3.5 font-bold transition hover:border-[#ff7a3d] hover:text-[#ff7a3d]">
              Retour à l&apos;accueil
            </TLink>
          </div>
        </div>
      </section>
    </ShopShell>
  );
}
