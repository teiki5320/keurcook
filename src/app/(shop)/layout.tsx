import { Footer } from "@/components/layout/Footer";
import { ContentShell } from "@/components/nuage/ContentShell";
import { CartToast } from "@/components/nuage/CartToast";
import { NuageBackdrop } from "@/components/nuage/NuageBackdrop";
import { NuageHeader, type NavItem } from "@/components/nuage/NuageHeader";
import { PageTransitionProvider } from "@/components/nuage/PageTransition";
import { CartProvider } from "@/lib/cart/cart-context";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const nav: NavItem[] = [
    { href: "/", label: "Accueil" },
    { href: "/boutique", label: "Boutique" },
  ];

  return (
    <CartProvider>
      <PageTransitionProvider>
        <div
          className={`nuage-theme relative flex min-h-dvh flex-col text-[#fbeee2]`}
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
          <CartToast />
        </div>
      </PageTransitionProvider>
    </CartProvider>
  );
}
