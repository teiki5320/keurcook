"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Phase = "idle" | "in" | "out";
type Navigate = (href: string, label?: string) => void;

const TransitionContext = createContext<Navigate | null>(null);

const CLIP: Record<Phase, string> = {
  idle: "circle(0% at 50% 50%)",
  in: "circle(150% at 50% 50%)",
  out: "circle(0% at 50% 50%)",
};

const explode = (v: number) => window.dispatchEvent(new CustomEvent("nuage:explode", { detail: v }));

/** Durées (ms) : fermeture de l'iris avant navigation, puis réouverture. */
const COVER_MS = 450;
const REVEAL_MS = 550;

/** Taille du libellé selon sa longueur : les noms longs restent lisibles et centrés, même sur téléphone. */
function labelSize(label: string): string {
  const n = label.length;
  if (n <= 10) return "clamp(56px,13vw,190px)";
  if (n <= 20) return "clamp(46px,9.5vw,150px)";
  if (n <= 32) return "clamp(38px,7.5vw,120px)";
  return "clamp(32px,6vw,100px)";
}

const samePath = (a: string, b: string) => {
  const norm = (p: string) => (p.split(/[?#]/)[0].replace(/\/+$/, "") || "/");
  return norm(a) === norm(b);
};

/** Transition « iris » orange entre les pages, avec dispersion du nuage. */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const pending = useRef(false);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    if (!pending.current) return;
    pending.current = false;
    window.scrollTo(0, 0);
    explode(0);
    setPhase("out");
    timers.current.push(window.setTimeout(() => setPhase("idle"), REVEAL_MS));
  }, []);

  const navigate = useCallback<Navigate>(
    (href, lbl) => {
      if (pending.current) return;
      // Même page (ex. changement de filtre) ou mouvement réduit : navigation directe, sans rideau.
      if (samePath(href, pathname) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      pending.current = true;
      setLabel(lbl ?? "");
      setPhase("in");
      explode(1);
      timers.current.push(window.setTimeout(() => router.push(href), COVER_MS));
      timers.current.push(window.setTimeout(finish, 2600)); // filet de sécurité (même page, requête lente)
    },
    [router, finish, pathname],
  );

  useEffect(() => {
    if (pending.current) timers.current.push(window.setTimeout(finish, 60));
  }, [pathname, finish]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-[#ff7a3d]"
        style={{ clipPath: CLIP[phase], transition: phase === "idle" ? "none" : "clip-path .45s cubic-bezier(.76,0,.24,1)" }}
      >
        <span
          className="max-w-[min(92vw,1400px)] px-4 text-center leading-[1.05] text-balance break-words uppercase text-[#140a07]"
          style={{
            fontFamily: "var(--font-anton), sans-serif",
            fontSize: labelSize(label),
            transform: `scale(${phase === "in" ? 1 : phase === "out" ? 1.08 : 0.9})`,
            transition: "transform .7s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {label}
        </span>
      </div>
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(TransitionContext);
}

/** Lien interne qui déclenche la transition. Ctrl/Cmd-clic garde le comportement normal. */
export function TLink({
  href,
  label,
  onClick,
  ...rest
}: React.ComponentProps<typeof Link> & { href: string; label?: string }) {
  const navigate = usePageTransition();
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || !navigate || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href, label);
      }}
      {...rest}
    />
  );
}
