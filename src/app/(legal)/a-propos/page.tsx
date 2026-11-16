import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";
import { legalConfig, siteConfig } from "@/lib/config";

export const metadata: Metadata = pageMetadata({
  title: "À propos de Keur Cook",
  description: "Qui édite Keur Cook, ce que l'on y trouve, comment les recettes et les produits sont choisis, et comment le site est financé : liens Amazon et publicité.",
  path: "/a-propos",
});

export default function AboutPage() {
  const l = legalConfig;
  return (
    <LegalPage title="À propos de Keur Cook" path="/a-propos" updated="16 novembre 2026">
      <p>
        {siteConfig.name} est un site de cuisine africaine : des recettes expliquées pas à pas, des présentations de
        pays et de produits, des conseils et une sélection de produits rares pour réussir les plats chez soi.
      </p>

      <h2>Qui édite le site</h2>
      <p>
        {siteConfig.name} est édité par {l.companyName}, {l.legalForm}, qui exerce sous le nom commercial {l.tradeName}.
        Le directeur de la publication est {l.director}. Toutes les informations légales figurent dans les{" "}
        <Link href="/mentions-legales">mentions légales</Link>.
      </p>

      <h2>Ce que vous trouverez ici</h2>
      <ul>
        <li>Des <Link href="/recettes">recettes</Link> de toute l&apos;Afrique, avec leurs ingrédients et leurs étapes.</li>
        <li>Des cuisines présentées <Link href="/pays">pays par pays</Link>.</li>
        <li>Des <Link href="/conseils">conseils</Link> de cuisine et des <Link href="/top-10">classements</Link> de produits.</li>
        <li>Des <Link href="/actus">actus</Link> de la cuisine africaine, en articles complets, avec un lien vers leurs sources.</li>
        <li>Une <Link href="/boutique">boutique</Link> de produits rares, sélectionnés sur Amazon.</li>
      </ul>

      <h2>Comment le contenu est fait</h2>
      <p>
        Les textes du site (recettes, histoires des plats, présentations des pays et des produits, articles) sont
        rédigés par l&apos;éditeur. Les photos des recettes, des produits et des conseils sont générées par intelligence
        artificielle : elles illustrent le propos et ne montrent pas les produits exacts vendus sur Amazon. Les
        recettes et les conseils sont donnés à titre indicatif, sans aucune allégation de santé.
      </p>

      <h2>Comment les produits sont choisis</h2>
      <p>
        Les produits de la boutique sont des ingrédients et des ustensiles utiles aux recettes du site. Le site ne vend
        rien lui-même et n&apos;affiche aucun prix : la vente, la livraison et le service client relèvent d&apos;Amazon ou du
        vendeur tiers, et seules font foi les informations affichées sur Amazon au moment de l&apos;achat. Un produit
        devenu indisponible est retiré ou remplacé.
      </p>

      <h2>Liens affiliés et publicité</h2>
      <p>
        Les boutons « Voir sur Amazon » sont des liens d&apos;affiliation du programme Partenaires d&apos;Amazon.fr : si vous
        achetez après un clic, l&apos;éditeur peut percevoir une commission, sans surcoût pour vous. Le site affiche aussi
        des annonces fournies par Google AdSense, toujours signalées par la mention « Publicité » et distinctes des
        liens Amazon. Ces revenus financent le site. Le détail figure dans les{" "}
        <Link href="/mentions-legales">mentions légales</Link> et la{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>

      <h2>Nous écrire</h2>
      <p>
        Une erreur dans une recette, un produit indisponible, une proposition de partenariat ? Rendez-vous sur la page{" "}
        <Link href="/contact">Contact</Link>.
      </p>
    </LegalPage>
  );
}
