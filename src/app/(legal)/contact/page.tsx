import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Écrire à l'équipe de Keur Cook : erreur dans une recette, produit indisponible, partenariat ou demande sur vos données.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <LegalPage title="Contact" path="/contact" updated="16 novembre 2026">
      <p>
        Pour nous joindre, écrivez-nous à{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Le site ne comporte pas de
        formulaire : votre message arrive directement dans notre boîte e-mail.
      </p>

      <h2>Pour quoi nous écrire</h2>
      <ul>
        <li>Signaler une erreur dans une recette, un conseil ou une actu (précisez la page concernée).</li>
        <li>Signaler un produit indisponible ou un lien Amazon qui ne fonctionne plus.</li>
        <li>Proposer un partenariat.</li>
        <li>Demander la correction ou le retrait d&apos;un contenu, ou exercer vos droits sur vos données personnelles.</li>
      </ul>

      <p>
        Pour en savoir plus sur le site et son éditeur, consultez la page <Link href="/a-propos">À propos</Link> et les{" "}
        <Link href="/mentions-legales">mentions légales</Link>.
      </p>
    </LegalPage>
  );
}
