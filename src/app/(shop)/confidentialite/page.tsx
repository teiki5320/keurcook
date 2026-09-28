import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/compliance/CookieBanner";
import { LegalPage } from "@/components/layout/LegalPage";
import { legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité" updated="28 septembre 2026">
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
          <strong>Newsletter</strong> : adresse e-mail et date de consentement, pour l&apos;envoi de la « recette de la
          semaine ». Base légale : consentement, retirable à tout moment en écrivant à l&apos;adresse de contact ou via le
          lien de désinscription de chaque e-mail.
        </li>
        <li>
          <strong>Sécurité du site</strong> : pour limiter les envois abusifs (newsletter, connexion à
          l&apos;administration), une empreinte non réversible de l&apos;adresse IP est conservée un jour au plus. Base
          légale : intérêt légitime.
        </li>
      </ul>
      <p>Nous ne collectons aucune donnée de santé et ne revendons jamais vos données.</p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>Empreintes d&apos;adresse IP (limitation des envois) : un jour au plus.</li>
        <li>Newsletter : jusqu&apos;à la désinscription, puis 3 ans sans ouverture ni clic.</li>
        <li>Choix en matière de cookies : 6 mois.</li>
      </ul>

      <h2>Destinataires et sous-traitants</h2>
      <p>
        Vos données sont destinées à nos services internes et à nos sous-traitants techniques : hébergement du site
        ({legalConfig.hostName}) et base de données (Neon). Lorsque des
        données sont transférées hors de l&apos;Union européenne, ce transfert est encadré par des clauses contractuelles
        types de la Commission européenne.
      </p>

      <h2>Liens vers Amazon</h2>
      <p>
        Les boutons « Acheter » ouvrent Amazon.fr avec notre identifiant de partenaire, qui permet à Amazon de nous
        rémunérer sur les achats. Nous ne recevons aucune donnée personnelle de votre part à cette occasion. Sur Amazon,
        vos données et les cookies déposés relèvent de la politique de confidentialité d&apos;Amazon.
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
        <li><strong>Favoris</strong> (stockage local, nécessaire) — conserve les recettes que vous avez mises de côté.</li>
        <li><strong>ah_consent</strong> (nécessaire) — mémorise vos choix en matière de cookies, 6 mois.</li>
        <li><strong>alohash_admin</strong> (nécessaire) — session de l&apos;espace d&apos;administration, réservé à l&apos;éditeur, 7 jours.</li>
      </ul>
      <p>
        Le site ne dépose aucun cookie de mesure d&apos;audience ni publicitaire. Amazon.fr, une fois ouvert, dépose ses
        propres cookies. Vous pouvez
        modifier vos choix à tout moment : <CookieSettingsButton className="font-semibold text-forest-700 underline" />.
      </p>
    </LegalPage>
  );
}
