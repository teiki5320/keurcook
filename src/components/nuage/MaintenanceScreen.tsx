"use client";

import dynamic from "next/dynamic";
import { NewsletterForm } from "@/components/community/NewsletterForm";
import { anton } from "./typography";

// Même nuage de particules que l'accueil, en forme de carte de l'Afrique (data-mix="0", immobile).
const NuageCloud = dynamic(() => import("./NuageCloud").then((m) => m.NuageCloud), { ssr: false });

const DISHES = ["Ndolé", "Mafé", "Yassa", "Thiéboudienne", "Jollof", "Pondu", "Doro wat", "Bissap", "Alloco", "Pilau"];

/** Écran affiché à la place du site quand le mode maintenance est actif. */
export function MaintenanceScreen({ message, contactEmail }: { message: string; contactEmail: string }) {
  return (
    <div
      className="nuage-theme relative flex min-h-dvh flex-col overflow-hidden text-[#fbeee2]"
      style={{ fontFamily: "var(--font-manrope), sans-serif", background: "#140a07" }}
    >
      <div
        aria-hidden
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(50% 55% at 70% 45%,rgba(255,90,40,.24),transparent 70%),radial-gradient(40% 40% at 10% 90%,rgba(140,30,20,.35),transparent 70%),#140a07",
        }}
      />
      <NuageCloud />
      <header className="relative z-[2] px-[clamp(20px,4vw,56px)] py-5">
        <p className="text-[26px] tracking-[.02em]" style={anton}>
          ALOHASH<span className="text-[#ff7a3d]">.</span>
        </p>
      </header>

      <main id="contenu" className="relative z-[2] mx-auto grid w-full max-w-[1320px] flex-1 items-center gap-8 px-[clamp(20px,4vw,56px)] pb-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-bold tracking-[.16em] text-[#ffc46b] uppercase">Maintenance</p>
          <h1 className="mt-2 uppercase leading-[.9]" style={{ ...anton, fontSize: "clamp(52px,8vw,120px)" }}>
            On prépare
            <br />
            <span className="text-[#ff7a3d]">la marmite.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed whitespace-pre-line text-[#fbeee2]/75">{message}</p>
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold">Soyez prévenu de la réouverture, et recevez la recette de la semaine :</p>
            <NewsletterForm />
          </div>
          <p className="mt-6 text-sm text-[#fbeee2]/60">
            Une question ?{" "}
            <a href={`mailto:${contactEmail}`} className="text-[#ffc46b] underline-offset-4 hover:underline">
              {contactEmail}
            </a>
          </p>
        </div>
        <div data-cloud="" data-mix="0" data-still="" aria-hidden className="relative order-1 mx-auto aspect-square w-full max-w-[min(300px,36vh)] sm:max-w-[min(560px,62vh)] lg:order-2" />
      </main>

      <div aria-hidden className="relative z-[2] overflow-hidden border-t border-[#fbeee2]/8 py-4">
        <div className="flex w-max gap-10 whitespace-nowrap uppercase [animation:nuage-marq_48s_linear_infinite]" style={{ ...anton, fontSize: "clamp(28px,4vw,52px)" }}>
          {[0, 1].map((k) =>
            DISHES.map((w, i) => (
              <span key={`${k}-${w}`} className="flex gap-10 text-[#fbeee2]/70">
                <span>{w}</span>
                <span className={i % 2 ? "text-[#ffc46b]" : "text-[#ff7a3d]"}>✦</span>
              </span>
            )),
          )}
        </div>
      </div>
    </div>
  );
}
