import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import { siteConfig } from "@/lib/config";
import { CookieSettingsButton } from "../compliance/CookieBanner";

export function Footer() {
  return (
    <footer className="mt-20 bg-forest-900 text-sage-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-display text-2xl text-cream">
            <UtensilsCrossed className="h-5 w-5" aria-hidden /> {siteConfig.name}
          </p>
          <p className="mt-3 text-sm text-sage-200/80">
            Les recettes de toute l&apos;Afrique, expliquées pas à pas, et les produits rares pour les réussir chez vous.
          </p>
        </div>
        <div>
          <p className="font-semibold text-cream">Explorer</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/recettes" className="hover:text-white">Toutes les recettes</Link></li>
            <li><Link href="/pays" className="hover:text-white">Cuisines par pays</Link></li>
            <li><Link href="/boutique" className="hover:text-white">Produits rares</Link></li>
            <li><Link href="/conseils" className="hover:text-white">Conseils</Link></li>
            <li><Link href="/favoris" className="hover:text-white">Mes favoris</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-cream">Informations</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/cgv" className="hover:text-white">Conditions générales de vente</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-white">Politique de confidentialité</Link></li>
            <li><CookieSettingsButton className="hover:text-white" /></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-cream">Contact</p>
          <p className="mt-3 text-sm">
            <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white">{siteConfig.contactEmail}</a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page space-y-2 py-6 text-xs leading-relaxed text-sage-200/70">
          <p>{AMAZON_DISCLOSURE}</p>
          <p>© {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
