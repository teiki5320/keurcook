import Link from "next/link";
import { Leaf } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { CookieSettingsButton } from "../compliance/CookieBanner";

export function Footer() {
  return (
    <footer className="mt-20 bg-forest-900 text-sage-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-display text-2xl text-cream">
            <Leaf className="h-5 w-5" aria-hidden /> {siteConfig.name}
          </p>
          <p className="mt-3 text-sm text-sage-200/80">
            CBD français issu de producteurs identifiés. Chaque produit est accompagné de son certificat d&apos;analyse.
          </p>
        </div>
        <div>
          <p className="font-semibold text-cream">Boutique</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/boutique?type=cbd" className="hover:text-white">Produits CBD</Link></li>
            <li><Link href="/accessoires" className="hover:text-white">Accessoires</Link></li>
            <li><Link href="/boutique?tri=newest" className="hover:text-white">Nouveautés</Link></li>
            <li><Link href="/panier" className="hover:text-white">Panier</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-cream">Informations</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/avertissements" className="hover:text-white">Conformité &amp; avertissements</Link></li>
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
          <p className="mt-4 inline-flex rounded-full border border-terracotta/60 px-3 py-1 text-xs font-semibold text-amber-soft">
            Interdit aux mineurs — 18+
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page space-y-2 py-6 text-xs leading-relaxed text-sage-200/70">
          <p>
            Vente interdite aux mineurs. Nos produits contiennent un taux de THC inférieur ou égal à 0,3 %, conformément
            à l&apos;arrêté du 30 décembre 2021. Ils ne sont pas des médicaments, ne revendiquent aucune propriété
            thérapeutique et ne peuvent se substituer à un traitement médical. Déconseillés aux femmes enceintes ou
            allaitantes. Ne pas conduire après consommation. Fumer nuit gravement à la santé.
          </p>
          <p>© {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
