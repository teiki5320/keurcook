import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import { legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site Keur Cook : éditeur, directeur de la publication, hébergeur et liens d'affiliation Amazon.",
  path: "/mentions-legales",
});

export default function LegalNoticePage() {
  const l = legalConfig;
  const contact = <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>;
  return (
    <LegalPage title="Mentions légales" updated="1er octobre 2026">
      <p>
        Informations sur l&apos;éditeur et l&apos;hébergeur du site, l&apos;usage de vos données et les limites des
        informations publiées (loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique).
      </p>

      <h2>Éditeur du site</h2>
      <ul>
        <li>
          Éditeur : <strong>{l.companyName}</strong>, {l.legalForm}, exerçant sous le nom commercial{" "}
          <strong>{l.tradeName}</strong>, qui publie le site <strong>{siteConfig.name}</strong>.
        </li>
        <li>Siège social : {l.address}.</li>
        <li>Immatriculation : {l.rcs} (SIRET {l.siret}).</li>
        <li>N° de TVA intracommunautaire : {l.vat}.</li>
        <li>Directeur de la publication : {l.director}.</li>
        {l.phone && <li>Téléphone : {l.phone}.</li>}
        <li>Contact : {contact}.</li>
      </ul>

      <h2>Hébergeur</h2>
      <p>{l.host}.</p>

      <h2>Données personnelles et cookies</h2>
      <ul>
        <li>Aucun compte n&apos;est nécessaire et le site ne comporte aucun formulaire.</li>
        <li>
          Vos recettes favorites sont mémorisées dans le stockage local de votre navigateur (clé{" "}
          <code>keurcook-favoris-v1</code>), uniquement sur votre appareil, pour les retrouver à votre prochaine visite.
          Elles ne sont transmises à personne. Vous pouvez les effacer en les retirant de vos favoris ou en vidant les
          données du site dans votre navigateur.
        </li>
        <li>
          Un seul cookie est déposé : <code>ah_consent</code>, qui mémorise pendant 6 mois que vous avez vu le message
          sur les cookies.
        </li>
        <li>
          Aucune mesure d&apos;audience ni publicité : les polices, les images et le code du site sont servis par le site
          lui-même, sans service tiers.
        </li>
        <li>
          L&apos;hébergeur peut enregistrer des journaux techniques (adresse IP, date, page demandée) pour la sécurité du
          service.
        </li>
        <li>
          Conformément au RGPD, vous pouvez exercer vos droits d&apos;accès, de rectification et d&apos;effacement
          auprès de l&apos;éditeur, à l&apos;adresse de contact ci-dessus. Le détail figure dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </li>
      </ul>

      <h2>Liens sponsorisés (Amazon)</h2>
      <p>
        Les boutons « Acheter » des recettes, des fiches produits et des conseils sont des liens d&apos;affiliation du
        programme Partenaires d&apos;Amazon.fr. {AMAZON_DISCLOSURE} Le prix payé est le même pour l&apos;acheteur.
      </p>
      <p>
        Le site ne vend aucun produit : la vente, la livraison et le service client relèvent d&apos;Amazon ou du vendeur
        tiers. Les prix affichés sont indicatifs : seul le prix indiqué sur Amazon au moment de l&apos;achat fait foi.
        L&apos;étiquetage qui fait foi (ingrédients, allergènes, conservation) est celui du vendeur et de
        l&apos;emballage.
      </p>
      <p>
        Un clic sur ces liens vous fait quitter le site : Amazon applique alors sa propre politique de confidentialité et
        de cookies.
      </p>

      <h2>Propriété intellectuelle et images</h2>
      <p>
        Les textes du site (recettes, histoires des plats, présentations des pays et des produits, articles) sont rédigés
        par l&apos;éditeur, ainsi que le logo de {siteConfig.name} : ils sont la propriété de l&apos;éditeur, sauf mention
        contraire. Toute reproduction sans autorisation est interdite, hormis le partage d&apos;un lien vers une page du
        site.
      </p>
      <p>
        Les photos des recettes, des produits et des conseils sont générées par intelligence artificielle pour{" "}
        {siteConfig.name}. Elles illustrent le propos et ne montrent pas les produits exacts vendus sur Amazon.
      </p>
      <p>Pour toute demande de retrait ou de correction, écrivez à {contact}.</p>

      <h2>Limites de responsabilité</h2>
      <p>
        Les recettes et conseils sont donnés à titre indicatif, sans aucune allégation de santé. Les informations sur
        les produits (composition, formats, prix) sont vérifiées avec soin mais peuvent évoluer : seules font foi les
        informations affichées sur Amazon au moment de l&apos;achat. N&apos;hésitez pas à nous signaler une erreur à{" "}
        {contact}.
      </p>
    </LegalPage>
  );
}
