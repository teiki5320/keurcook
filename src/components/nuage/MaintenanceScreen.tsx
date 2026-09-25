"use client";

import dynamic from "next/dynamic";
import { anton } from "./shared";

// Même nuage de particules que l'accueil, en forme de feuille (data-mix="0").
const NuageCloud = dynamic(() => import("./NuageCloud").then((m) => m.NuageCloud), { ssr: false });

/** Écran affiché à la place de la boutique quand le mode maintenance est actif. */
export function MaintenanceScreen({ message, contactEmail }: { message: string; contactEmail: string }) {
  return (
    <div
      className="nuage-theme relative flex min-h-dvh flex-col text-[#fbeee2]"
      style={{ fontFamily: "var(--font-manrope), sans-serif", background: "#140a07" }}
    >
      <div
        aria-hidden
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(50% 55% at 50% 40%,rgba(255,90,40,.22),transparent 70%),radial-gradient(40% 40% at 10% 90%,rgba(140,30,20,.35),transparent 70%),#140a07",
        }}
      />
      <NuageCloud />
      <main id="contenu" className="relative z-[2] flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <p className="text-2xl tracking-wide uppercase" style={anton}>
          Alohash<span className="text-[#ff7a3d]">.</span>
        </p>
        <div data-cloud="" data-mix="0" aria-hidden className="relative my-4 aspect-square w-full max-w-[min(240px,34vh)] sm:max-w-[min(420px,46vh)]">
          <div className="absolute inset-[4%] rounded-full border border-dashed border-[#ffc46b]/30 [animation:nuage-spin_60s_linear_infinite]" />
        </div>
        <h1 className="uppercase leading-[.9]" style={{ ...anton, fontSize: "clamp(48px,9vw,112px)" }}>
          Maintenance<span className="text-[#ff7a3d]">.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed whitespace-pre-line text-[#fbeee2]/75">{message}</p>
        <p className="mt-6 text-sm text-[#fbeee2]/60">
          Une question ?{" "}
          <a href={`mailto:${contactEmail}`} className="text-[#ffc46b] underline-offset-4 hover:underline">
            {contactEmail}
          </a>
        </p>
      </main>
    </div>
  );
}
