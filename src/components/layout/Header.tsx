import Link from "next/link";
import { Leaf } from "lucide-react";
import { getCatalog } from "@/lib/data/catalog";
import { siteConfig } from "@/lib/config";
import { HeaderActions, MobileMenu, SearchForm } from "./HeaderClient";

export async function Header() {
  const { categories } = await getCatalog();
  const cbd = categories.filter((c) => c.kind === "cbd");
  const accessories = categories.filter((c) => c.kind === "accessoire");
  const nav = [
    ...cbd.map((c) => ({ href: `/categorie/${c.slug}`, label: c.name })),
    { href: "/boutique?type=accessoire", label: "Accessoires" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-sage-200/80 bg-cream/90 backdrop-blur">
      <div className="bg-forest-800 text-cream">
        <p className="container-page py-1.5 text-center text-[11px] font-medium tracking-wide sm:text-xs">
          Interdit aux mineurs · THC ≤ 0,3 % · Certificat d&apos;analyse pour chaque produit · Livraison offerte dès 50 €
        </p>
      </div>
      <div className="container-page flex h-16 items-center gap-3">
        <MobileMenu nav={nav} accessories={accessories.map((c) => ({ href: `/categorie/${c.slug}`, label: c.name }))} />
        <Link href="/" className="flex items-center gap-2 font-display text-2xl text-forest-800">
          <Leaf className="h-6 w-6 text-forest-600" aria-hidden />
          {siteConfig.name}
        </Link>
        <div className="ml-auto hidden flex-1 justify-center px-6 md:flex">
          <SearchForm />
        </div>
        <HeaderActions />
      </div>
      <nav aria-label="Catégories" className="hidden border-t border-sage-200/80 lg:block">
        <ul className="container-page flex items-center gap-7 py-2.5 text-sm font-medium text-forest-800">
          <li>
            <Link href="/boutique" className="hover:text-terracotta">
              Toute la boutique
            </Link>
          </li>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-terracotta">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
