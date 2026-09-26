import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart/cart-context";
import { CartDrawer } from "./CartDrawer";
import { ContentShell } from "./ContentShell";
import { NuageBackdrop } from "./NuageBackdrop";
import { NuageHeader, type NavItem } from "./NuageHeader";
import { PageTransitionProvider } from "./PageTransition";

const nav: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/recettes", label: "Recettes" },
  { href: "/pays", label: "Pays" },
  { href: "/boutique", label: "Boutique" },
  { href: "/conseils", label: "Conseils" },
  { href: "/favoris", label: "Favoris" },
];

/** Habillage « Braise » du site (fond, menu, pied de page, mini-panier). Partagé avec la page 404. */
export function ShopShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <PageTransitionProvider>
        <div
          className={`nuage-theme relative flex min-h-dvh flex-col overflow-x-clip text-[#fbeee2]`}
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
          <NuageBackdrop />
          <NuageHeader nav={nav} />
          <main id="contenu" className="relative z-[2] flex-1">
            <ContentShell>{children}</ContentShell>
          </main>
          <div className="nuage-footer relative z-[2] border-t border-[#fbeee2]/10">
            <Footer />
          </div>
          <CartDrawer />
        </div>
      </PageTransitionProvider>
    </CartProvider>
  );
}
