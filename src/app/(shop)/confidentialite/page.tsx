import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/compliance/CookieBanner";
import { LegalPage } from "@/components/layout/LegalPage";
import { legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité" updated="24 septembre 2026">
      <p>
        {legalConfig.companyName} (« nous ») attache une grande importance à la protection de vos données personnelles,
        traitées conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et
        Libertés.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        {legalConfig.companyName}, {legalConfig.address}. Contact : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>

      <h2>Données collectées et finalités</h2>
      <ul>
        <li>
          <strong>Gestion des commandes</strong> : nom, prénom, email, téléphone, adresse de livraison, contenu de la
          commande. Base légale : exécution du contrat.
        </li>
        <li>
          <strong>Obligations comptables et fiscales</strong> : factures et données de commande. Base légale : obligation
          légale.
        </li>
        <li>
          <strong>Vérification de l&apos;âge</strong> : simple déclaration (cookie « ah_age ») et attestation lors de la
          commande. Base légale : obligation légale (interdiction de vente aux mineurs).
        </li>
        <li>
          <strong>Sécurité de l&apos;espace d&apos;administration</strong> : identifiants de connexion des
          administrateurs. Base légale : intérêt légitime.
        </li>
      </ul>
      <p>Nous ne collectons aucune donnée de santé et ne revendons jamais vos données.</p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>Données de commande : 3 ans à compter de la dernière commande à des fins de relation client.</li>
        <li>Pièces comptables : 10 ans (article L. 123-22 du code de commerce).</li>
        <li>Cookie de vérification d&apos;âge : 30 jours. Choix en matière de cookies : 6 mois.</li>
      </ul>

      <h2>Destinataires et sous-traitants</h2>
      <p>
        Vos données sont destinées à nos services internes et à nos sous-traitants techniques : hébergement du site
        ({legalConfig.hostName}), base de données (Neon), stockage des images (Vercel Blob), envoi d&apos;emails (prestataire SMTP), transporteur. Lorsque des
        données sont transférées hors de l&apos;Union européenne, ce transfert est encadré par des clauses contractuelles
        types de la Commission européenne.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition
        et de portabilité de vos données, ainsi que du droit de définir des directives relatives à leur sort après votre
        décès. Pour les exercer : <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Vous
        pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr).
      </p>

      <h2 id="cookies">Cookies</h2>
      <p>Le site utilise les cookies et stockages locaux suivants :</p>
      <ul>
        <li><strong>ah_age</strong> (nécessaire) — mémorise la confirmation de majorité, 30 jours.</li>
        <li><strong>ah_consent</strong> (nécessaire) — mémorise vos choix en matière de cookies, 6 mois.</li>
        <li><strong>Panier</strong> (stockage local, nécessaire) — conserve le contenu de votre panier.</li>
        <li><strong>sb-*</strong> (nécessaire) — session de l&apos;espace d&apos;administration uniquement.</li>
      </ul>
      <p>
        Aucun cookie de mesure d&apos;audience ou publicitaire n&apos;est déposé sans votre consentement. Vous pouvez
        modifier vos choix à tout moment : <CookieSettingsButton className="font-semibold text-forest-700 underline" />.
      </p>
    </LegalPage>
  );
}
