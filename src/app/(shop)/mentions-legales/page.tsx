import Link from "next/link";
import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } };

export default function LegalNoticePage() {
  const l = legalConfig;
  return (
    <LegalPage title="Mentions légales" updated="24 septembre 2026">
      <p>
        Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
        numérique (LCEN), les informations suivantes sont portées à la connaissance des utilisateurs du site{" "}
        {siteConfig.url}.
      </p>

      <h2>Éditeur du site</h2>
      <ul>
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
      <p>
        Base de données : Neon (neon.com), service fourni via Vercel. Stockage des fichiers (photos, certificats) :
        Vercel Blob, Vercel Inc. Les données sont hébergées dans l&apos;Union européenne (région de Francfort).
      </p>

      <h2>Activité réglementée</h2>
      <p>
        Le site commercialise des produits issus de variétés de chanvre (Cannabis sativa L.) inscrites au catalogue
        commun des variétés des espèces de plantes agricoles, dont la teneur en delta-9-tétrahydrocannabinol (THC)
        n&apos;est pas supérieure à 0,3 %, conformément à l&apos;arrêté du 30 décembre 2021 portant application de
        l&apos;article R. 5132-86 du code de la santé publique.
      </p>
      <p>
        La vente est <strong>strictement interdite aux mineurs</strong>. Les produits proposés ne sont pas des
        médicaments ; aucune allégation thérapeutique n&apos;est formulée.
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

      <h2>Médiation de la consommation</h2>
      <p>
        Conformément à l&apos;article L. 612-1 du code de la consommation, le consommateur peut recourir gratuitement au
        médiateur de la consommation suivant : {l.mediator}.
      </p>
    </LegalPage>
  );
}
