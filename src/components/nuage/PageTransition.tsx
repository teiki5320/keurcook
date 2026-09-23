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
    timers.current.push(window.setTimeout(() => setPhase("idle"), 900));
  }, []);

  const navigate = useCallback<Navigate>(
    (href, lbl) => {
      if (pending.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { router.push(href); return; }
      pending.current = true;
      setLabel(lbl ?? "");
      setPhase("in");
      explode(1);
      timers.current.push(window.setTimeout(() => router.push(href), 850));
      timers.current.push(window.setTimeout(finish, 2600)); // filet de sécurité (même page, requête lente)
    },
    [router, finish],
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
        style={{ clipPath: CLIP[phase], transition: phase === "idle" ? "none" : "clip-path .8s cubic-bezier(.76,0,.24,1)" }}
      >
        <span
          className="uppercase text-[#140a07]"
          style={{
            fontFamily: "var(--font-anton), sans-serif",
            fontSize: "clamp(64px,11vw,190px)",
            transform: `scale(${phase === "in" ? 1 : phase === "out" ? 1.25 : 0.8})`,
            transition: "transform 1.1s cubic-bezier(.16,1,.3,1)",
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
