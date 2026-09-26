import Link from "next/link";
import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { legalConfig, shippingConfig, siteConfig } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { getPaymentProviders } from "@/lib/payments/registry";

export const metadata: Metadata = { title: "Conditions générales de vente", alternates: { canonical: "/cgv" } };

export default function TermsPage() {
  const l = legalConfig;
  const providers = getPaymentProviders().map((p) => p.id);
  const transfer = providers.includes("bank_transfer");
  return (
    <LegalPage title="Conditions générales de vente" updated="25 septembre 2026">
      <h2>Article 1 — Objet et champ d&apos;application</h2>
      <p>
        Les présentes conditions générales de vente (CGV) régissent les ventes conclues à distance sur le site{" "}
        {siteConfig.url} entre {l.companyName}, {l.legalForm}, dont le siège est situé {l.address}, immatriculée sous le
        numéro {l.siret} (ci-après « le Vendeur ») et toute personne physique agissant en qualité de
        consommateur (ci-après « le Client »). Toute commande implique l&apos;acceptation sans réserve des présentes CGV.
      </p>

      <h2>Article 2 — Capacité</h2>
      <p>
        Le Client déclare avoir la pleine capacité juridique pour passer commande. Les recettes publiées sur le site sont
        consultables librement et gratuitement ; seules les commandes de produits sont régies par les présentes CGV.
      </p>

      <h2>Article 3 — Produits</h2>
      <p>
        Les produits commercialisés sont des denrées alimentaires. Leur dénomination, la liste des ingrédients, les
        allergènes, l&apos;origine et les conditions de conservation figurent sur chaque fiche produit et sur
        l&apos;emballage ; la date de durabilité minimale (DDM) est indiquée sur l&apos;emballage de chaque lot. Les
        photographies sont non contractuelles. Le Client est invité à lire l&apos;étiquetage avant consommation.
      </p>
      <p>Les livraisons sont limitées à la France métropolitaine.
      </p>

      <h2>Article 4 — Prix</h2>
      <p>
        Les prix sont indiqués en euros toutes taxes comprises (TTC), hors frais de livraison. Les frais de livraison
        s&apos;élèvent à {formatPrice(shippingConfig.flatRateCents)} et sont offerts à partir de{" "}
        {formatPrice(shippingConfig.freeThresholdCents)} d&apos;achat. Le prix applicable est celui en vigueur au moment
        de la validation de la commande.
      </p>

      <h2>Article 5 — Commande</h2>
      <p>
        Le Client sélectionne les produits, vérifie le contenu de son panier, renseigne ses coordonnées, choisit son moyen
        de paiement, accepte les présentes CGV, puis valide sa commande avec obligation de
        paiement. Un email de confirmation récapitulant la commande lui est adressé. Le Vendeur se réserve le droit de
        refuser toute commande anormale ou passée de mauvaise foi.
      </p>

      <h2>Article 6 — Paiement</h2>
      {transfer && (
        <p>
          Le paiement s&apos;effectue par virement bancaire.{" "}
          Les coordonnées bancaires et la référence à indiquer sont communiquées à la validation de la commande et par
          email. La commande est préparée à réception du paiement. À défaut de paiement dans un délai de 7 jours, la
          commande est annulée.
        </p>
      )}

      <h2>Article 7 — Livraison</h2>
      <p>
        Les produits sont expédiés dans un emballage neutre et discret, en principe sous 48 heures ouvrées après
        réception du paiement, à l&apos;adresse indiquée par le Client. En cas de retard de livraison de plus de 30 jours,
        le Client peut résoudre le contrat dans les conditions des articles L. 216-2 et suivants du code de la
        consommation. Le Client est invité à vérifier l&apos;état du colis à réception.
      </p>

      <h2>Article 8 — Droit de rétractation</h2>
      <p>
        Conformément à l&apos;article L. 221-18 du code de la consommation, le Client dispose d&apos;un délai de 14 jours
        à compter de la réception des produits pour exercer son droit de rétractation, sans avoir à justifier de motifs,
        en adressant une déclaration dénuée d&apos;ambiguïté à {siteConfig.contactEmail}. Les produits doivent être
        retournés dans leur emballage d&apos;origine, <strong>non ouverts</strong>, dans les 14 jours suivant la
        communication de sa décision ; les frais de retour sont à la charge du Client. Le remboursement intervient dans
        les 14 jours suivant la réception de la décision de rétractation, le Vendeur pouvant différer le remboursement
        jusqu&apos;à réception des produits.
      </p>
      <p>
        Conformément à l&apos;article L. 221-28 du code de la consommation, le droit de rétractation ne peut être exercé
        pour les biens descellés par le Client après la livraison et qui ne peuvent être renvoyés pour des raisons
        d&apos;hygiène ou de protection de la santé (produits dont l&apos;emballage scellé a été ouvert).
      </p>

      <h2>Article 9 — Garanties légales</h2>
      <p>
        Le Client bénéficie de la garantie légale de conformité (articles L. 217-3 et suivants du code de la
        consommation) et de la garantie des vices cachés (articles 1641 et suivants du code civil). Le Client dispose
        d&apos;un délai de deux ans à compter de la délivrance du bien pour agir au titre de la garantie de conformité.
      </p>

      <h2>Article 10 — Responsabilité</h2>
      <p>
        Le Vendeur ne saurait être tenu responsable d&apos;un usage des produits non conforme à leur destination, à leur
        étiquetage ou à la réglementation, notamment en cas de conduite d&apos;un véhicule après consommation.
      </p>

      <h2>Article 11 — Données personnelles</h2>
      <p>
        Les données collectées lors de la commande sont traitées conformément à notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>

      <h2>Article 12 — Litiges et médiation</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige, le Client peut contacter le service client
        à {siteConfig.contactEmail}. À défaut d&apos;accord amiable, il peut recourir gratuitement au médiateur de la
        consommation : {l.mediator}.
      </p>
    </LegalPage>
  );
}
