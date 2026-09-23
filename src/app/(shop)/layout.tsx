import { Anton, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { ContentShell } from "@/components/nuage/ContentShell";
import { NuageCloud } from "@/components/nuage/NuageCloud";
import { NuageHeader } from "@/components/nuage/NuageHeader";
import { PageTransitionProvider } from "@/components/nuage/PageTransition";
import { CartProvider } from "@/lib/cart/cart-context";
import { isStaticExport } from "@/lib/paths";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import "../nuage.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const notice = isStaticExport
    ? "Site de démonstration : produits fictifs, commande en ligne désactivée."
    : !isSupabaseConfigured
      ? "Mode démo : Supabase n'est pas configuré, le catalogue et les commandes sont stockés en mémoire."
      : null;

  return (
    <CartProvider>
      <PageTransitionProvider>
        <div
          className={`${anton.variable} ${manrope.variable} nuage-theme relative flex min-h-dvh flex-col text-[#fbeee2]`}
          style={{ fontFamily: "var(--font-manrope), sans-serif", background: "#140a07" }}
        >
          <div
            aria-hidden
            className="fixed inset-0 z-0"
            style={{
              background:
                "radial-gradient(50% 55% at 72% 45%,rgba(255,90,40,.22),transparent 70%),radial-gradient(40% 40% at 10% 90%,rgba(140,30,20,.35),transparent 70%),#140a07",
            }}
          />
          <NuageCloud />
          <NuageHeader notice={notice} />
          <main id="contenu" className="relative z-[2] flex-1">
            <ContentShell>{children}</ContentShell>
          </main>
          <div className="nuage-footer relative z-[2] border-t border-[#fbeee2]/10">
            <Footer />
          </div>
        </div>
      </PageTransitionProvider>
    </CartProvider>
  );
}
