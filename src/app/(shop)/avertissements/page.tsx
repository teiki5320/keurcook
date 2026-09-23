import type { Metadata } from "next";
import { USAGE_WARNINGS } from "@/components/compliance/Warnings";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Conformité et avertissements",
  description: "Cadre réglementaire, taux de THC, certificats d'analyse et avertissements d'usage.",
  alternates: { canonical: "/avertissements" },
};

export default function WarningsPage() {
  return (
    <LegalPage title="Conformité et avertissements" updated="23 septembre 2026">
      <h2>Un cadre réglementaire strict</h2>
      <p>
        Tous nos produits à base de chanvre sont issus de variétés de Cannabis sativa L. inscrites au catalogue commun
        des variétés des espèces de plantes agricoles. Leur teneur en THC est <strong>inférieure ou égale à 0,3 %</strong>,
        conformément à l&apos;arrêté du 30 décembre 2021.
      </p>

      <h2>Un certificat d&apos;analyse pour chaque produit</h2>
      <p>
        Chaque produit CBD fait l&apos;objet d&apos;une analyse réalisée par un laboratoire indépendant. Le certificat
        d&apos;analyse, indiquant notamment les taux de CBD et de THC mesurés, est téléchargeable au format PDF depuis la
        fiche du produit.
      </p>

      <h2>Origine française</h2>
      <p>
        Nous ne travaillons qu&apos;avec des producteurs français. La région de culture et le producteur sont indiqués sur
        chaque fiche produit.
      </p>

      <h2>Aucune allégation de santé</h2>
      <p>
        Nos produits ne sont pas des médicaments. Nous ne formulons aucune allégation thérapeutique, médicale ou de
        santé et ne pouvons répondre à aucune question relative à un usage médical. Pour toute question de santé,
        rapprochez-vous d&apos;un professionnel de santé.
      </p>

      <h2>Avertissements d&apos;usage</h2>
      <ul>
        {USAGE_WARNINGS.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>

      <h2>Interdit aux mineurs</h2>
      <p>
        L&apos;accès au site et la vente sont réservés aux personnes majeures. Une vérification de l&apos;âge est
        demandée à l&apos;entrée du site et une attestation de majorité est requise pour chaque commande.
      </p>
    </LegalPage>
  );
}
