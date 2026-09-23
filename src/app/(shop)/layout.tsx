import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartProvider } from "@/lib/cart/cart-context";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {!isSupabaseConfigured && (
        <div className="bg-amber-soft px-4 py-1.5 text-center text-xs text-ink">
          Mode démo : Supabase n&apos;est pas configuré, le catalogue et les commandes sont stockés en mémoire.
        </div>
      )}
      <Header />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}
