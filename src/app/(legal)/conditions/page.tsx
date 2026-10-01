import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import { legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Conditions générales d'utilisation",
  description:
    "Conditions d'utilisation du site Keur Cook : recettes, conseils et liens d'achat vers Amazon.",
  path: "/conditions",
});

export default function TermsPage() {
  const l = legalConfig;
  return (
    <LegalPage title="Conditions générales d'utilisation" updated="1er octobre 2026">
      <h2>Article 1 — Objet</h2>
      <p>
        Les présentes conditions générales d&apos;utilisation (CGU) encadrent l&apos;accès au site {siteConfig.url}, édité
        par {l.companyName}, {l.legalForm}, exerçant sous le nom commercial {l.tradeName}, dont le siège est situé {l.address} (ci-après « l&apos;Éditeur »). Le site
        publie des recettes de cuisine africaine, des conseils et une sélection de produits disponibles sur Amazon.fr.
        Utiliser le site vaut acceptation des présentes CGU.
      </p>

      <h2>Article 2 — Accès au site</h2>
      <p>
        Le site est accessible gratuitement, sans inscription. L&apos;Éditeur peut suspendre l&apos;accès, notamment pour
        maintenance, sans que sa responsabilité puisse être engagée.
      </p>

      <h2>Article 3 — Le site ne vend aucun produit</h2>
      <p>
        L&apos;Éditeur ne vend, n&apos;expédie ni ne facture aucun produit. Les boutons « Acheter » renvoient vers des fiches
        Amazon.fr : la vente est conclue entre l&apos;acheteur et Amazon ou le vendeur tiers indiqué sur Amazon, selon leurs
        propres conditions. La livraison, le droit de rétractation, les garanties, le service client et l&apos;étiquetage
        des produits relèvent de ce vendeur.
      </p>
      <p>
        Les descriptions des produits sur le site sont données à titre d&apos;information générale ; seules les
        informations de la fiche Amazon et de l&apos;emballage (composition, allergènes, conservation) font foi. Les prix
        affichés sur le site sont indicatifs et relevés à une date donnée : seul le prix indiqué sur Amazon au moment de
        l&apos;achat fait foi.
      </p>
      <p>{AMAZON_DISCLOSURE}</p>

      <h2>Article 4 — Recettes et conseils</h2>
      <p>
        Les recettes et conseils sont fournis à titre indicatif. Chacun reste responsable de l&apos;hygiène, des cuissons,
        de la conservation des aliments et de la prise en compte de ses allergies ou de celles de ses invités.
      </p>

      <h2>Article 5 — Propriété intellectuelle</h2>
      <p>
        Les textes, photographies et éléments graphiques du site sont protégés par le droit de la propriété
        intellectuelle. Toute reproduction sans autorisation préalable est interdite, hormis le partage d&apos;un lien vers
        une page du site.
      </p>

      <h2>Article 6 — Responsabilité</h2>
      <p>
        L&apos;Éditeur s&apos;efforce de fournir des informations exactes mais ne peut garantir l&apos;absence
        d&apos;erreur. Il n&apos;est pas responsable du contenu des sites vers lesquels renvoient les liens, notamment
        Amazon.fr.
      </p>

      <h2>Article 7 — Droit applicable</h2>
      <p>
        Les présentes CGU sont soumises au droit français. Pour toute question :{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
