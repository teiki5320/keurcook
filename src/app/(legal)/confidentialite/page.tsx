import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CookieSettingsButton } from "@/components/compliance/CookieBanner";
import { LegalPage } from "@/components/layout/LegalPage";
import { legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Données personnelles et cookies sur Keur Cook : ce qui est collecté, pourquoi, et vos droits.",
  path: "/confidentialite",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité" path="/confidentialite" updated="12 octobre 2026">
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
      <p>
        Le site ne comporte ni compte, ni formulaire, ni outil de mesure d&apos;audience. Des données sont traitées
        dans les cas suivants.
      </p>
      <ul>
        <li>
          <strong>Messages envoyés à l&apos;adresse de contact</strong> : votre adresse e-mail et le contenu de votre
          message, pour vous répondre. Base légale : intérêt légitime (répondre à votre demande).
        </li>
        <li>
          <strong>Journaux techniques de l&apos;hébergeur</strong> : comme tout site, l&apos;hébergeur ({legalConfig.hostName})
          traite l&apos;adresse IP et les informations techniques de connexion pour délivrer les pages et protéger le site
          contre les attaques. Base légale : intérêt légitime (sécurité du site).
        </li>
        <li>
          <strong>Publicité (Google AdSense)</strong> : le site affiche des annonces fournies par Google. Pour les
          afficher, en mesurer l&apos;efficacité et lutter contre la fraude, Google et ses partenaires publicitaires
          utilisent des cookies et des identifiants (adresse IP, informations sur le navigateur et l&apos;appareil, pages
          vues). Les annonces personnalisées, et les cookies publicitaires qui ne sont pas strictement nécessaires, ne
          sont utilisés qu&apos;avec votre accord, donné ou refusé dans le message de consentement de Google affiché à
          votre première visite. Si vous refusez, des annonces non personnalisées peuvent s&apos;afficher. Base légale :
          votre consentement. Pour en savoir plus :{" "}
          <a href="https://policies.google.com/technologies/partner-sites?hl=fr" target="_blank" rel="noopener noreferrer">
            comment Google utilise les données des sites partenaires
          </a>.
        </li>
      </ul>
      <p>Nous ne collectons aucune donnée de santé et ne revendons jamais vos données.</p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>Messages de contact : le temps de traiter la demande, puis 3 ans au plus.</li>
        <li>Journaux techniques : selon la politique de l&apos;hébergeur, quelques jours en général.</li>
        <li>Votre choix dans le message de consentement de Google : 13 mois au plus, puis la question vous est reposée.</li>
        <li>Cookies publicitaires de Google : 13 mois au plus.</li>
        <li>Favoris : dans votre navigateur uniquement, jusqu&apos;à ce que vous les retiriez ou effaciez les données du site.</li>
      </ul>

      <h2>Destinataires et sous-traitants</h2>
      <p>
        Vos données sont destinées à nos services internes et à nos sous-traitants techniques : hébergement du site et
        acheminement des e-mails de contact ({legalConfig.hostName}), messagerie (IONOS). Pour la publicité, Google
        Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irlande) et, avec votre accord, ses partenaires
        publicitaires, dont la liste figure dans le message de consentement. Lorsque des données sont transférées hors
        de l&apos;Union européenne (Cloudflare et Google, États-Unis), ce transfert est encadré par le cadre de
        protection des données UE–États-Unis (Data Privacy Framework) et par des clauses contractuelles types de la
        Commission européenne.
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
        <li><strong>keurcook-favoris-v1</strong> (stockage local, nécessaire) — vos favoris : les recettes que vous avez mises de côté, uniquement sur votre appareil, jusqu&apos;à ce que vous les retiriez ou effaciez les données du site.</li>
        <li>
          <strong>Message de consentement de Google</strong> (nécessaire) — mémorise votre choix (accepter, refuser ou
          personnaliser), 13 mois au plus.
        </li>
        <li>
          <strong>Cookies publicitaires de Google et de ses partenaires</strong> (soumis à votre accord) — affichage
          d&apos;annonces, personnalisées ou non, mesure de leur efficacité et lutte contre la fraude, 13 mois au plus.
        </li>
      </ul>
      <p>
        Le site ne dépose aucun cookie de mesure d&apos;audience. Amazon.fr, une fois ouvert, dépose ses propres cookies.
      </p>
      <p>
        <strong>Retirer ou modifier votre accord</strong> : à tout moment, aussi simplement que vous l&apos;avez donné,
        avec le lien « Cookies » en bas de chaque page ou ici :{" "}
        <CookieSettingsButton className="font-semibold text-forest-700 underline" />. Vous pouvez aussi régler la
        personnalisation des annonces Google sur{" "}
        <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Mon Centre publicités</a>{" "}
        ou supprimer les cookies dans les réglages de votre navigateur.
      </p>
    </LegalPage>
  );
}
