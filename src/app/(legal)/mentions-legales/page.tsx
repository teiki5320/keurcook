import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import { legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description: "Éditeur, hébergeur et informations légales du site Keur Cook.",
  path: "/mentions-legales",
});

export default function LegalNoticePage() {
  const l = legalConfig;
  return (
    <LegalPage title="Mentions légales" updated="29 septembre 2026">
      <p>
        Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
        numérique (LCEN), les informations suivantes sont portées à la connaissance des utilisateurs du site{" "}
        {siteConfig.url}.
      </p>

      <h2>Éditeur du site</h2>
      <ul>
        <li>Nom du site : {siteConfig.name}</li>
        <li>Raison sociale : {l.companyName}</li>
        <li>Forme juridique : {l.legalForm}</li>
        <li>Siège social : {l.address}</li>
        <li>SIRET : {l.siret} — {l.rcs}</li>
        <li>TVA intracommunautaire : {l.vat}</li>
        {l.phone && <li>Téléphone : {l.phone}</li>}
        <li>Email : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></li>
        {l.director && <li>Directeur de la publication : {l.director}</li>}
      </ul>

      <h2>Hébergement</h2>
      <p>{l.host}</p>

      <h2>Activité</h2>
      <p>
        Le site publie des recettes de cuisine et des conseils. Il ne vend aucun produit : les boutons « Acheter »
        renvoient vers Amazon.fr. L&apos;étiquetage qui fait foi (ingrédients, allergènes, conservation) est celui du
        vendeur sur Amazon et de l&apos;emballage. Aucune allégation de santé n&apos;est formulée.
      </p>

      <h2>Liens d&apos;affiliation Amazon</h2>
      <p>
        Les boutons « Acheter » mènent à des produits vendus sur Amazon.fr par des vendeurs tiers ou par Amazon ; la vente,
        la livraison et le service client relèvent de ce vendeur. Les prix affichés sur le site sont indicatifs : seul le prix
        indiqué sur Amazon au moment de l&apos;achat fait foi. {AMAZON_DISCLOSURE}
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus du site (textes, photographies, logos, graphismes) est la propriété de l&apos;éditeur
        ou de ses partenaires et est protégé par le droit de la propriété intellectuelle. Toute reproduction sans
        autorisation préalable est interdite.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement des données personnelles est décrit dans notre <Link href="/confidentialite">politique de
        confidentialité</Link>.
      </p>

    </LegalPage>
  );
}
