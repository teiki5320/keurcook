"use client";

import { useEffect, useState } from "react";
import { TLink } from "@/components/nuage/PageTransition";
import { anton } from "@/components/nuage/typography";
import { chargerFichier, filtrerParPays, type FichierActus } from "@/lib/veille";
import { ActuBandeau } from "./ActuBandeau";
import { ActuVignette } from "./ActuVignette";

interface Props {
  /** Titre du bloc (« Actus de la cuisine africaine ») ; absent sur la page /actus, qui a déjà le sien. */
  titre?: string;
  /** Taille du titre : « grand » comme les sections de l'accueil, « moyen » comme les sections d'une page pays. */
  tailleTitre?: "grand" | "moyen";
  limite: number;
  /** Seulement les actus d'un pays (code ISO2, ex. « SN »). */
  pays?: string;
  /** Lien « Toutes les actus → ». */
  lien?: { href: string; label: string };
  /** Bandeau chargé tout de suite (accueil) ; sinon images en chargement différé. */
  prioritaire?: boolean;
  /** Affiche la date de mise à jour du fichier (page /actus). */
  avecMiseAJour?: boolean;
  /** Texte affiché quand il n'y a aucune actu (sinon le bloc n'apparaît pas). */
  siVide?: string;
  className?: string;
}

/** « 27 octobre à 12 h 05 », heure de Paris. */
function dateHeure(d: Date): string {
  const jour = d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", timeZone: "Europe/Paris" });
  const [h, m] = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }).split(":");
  return `${jour} à ${Number(h)} h ${m}`;
}

/** Squelette discret pendant le chargement (aucun titre : il disparaît s'il n'y a pas d'actu). */
function Squelette({ className }: { className: string }) {
  return (
    <div aria-hidden className={`grid animate-pulse gap-4 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] ${className}`}>
      <div className="aspect-video rounded-[26px] bg-[#fbeee2]/5" />
      <div className="hidden gap-4 lg:grid">
        <div className="rounded-[22px] bg-[#fbeee2]/5" />
        <div className="rounded-[22px] bg-[#fbeee2]/5" />
      </div>
    </div>
  );
}

/**
 * Bloc d'actus lu en direct depuis la veille : la 1re en bandeau, les suivantes en vignettes.
 * Aucune actu, ou fichier injoignable : rien n'est affiché (ou le texte « siVide »).
 * Jamais de lien Amazon, de bouton d'achat ni de produit de la boutique ici.
 */
export function BlocActus({ titre, tailleTitre = "grand", limite, pays, lien, prioritaire = false, avecMiseAJour = false, siVide, className = "" }: Props) {
  const [fichier, setFichier] = useState<FichierActus | null | undefined>(undefined);

  useEffect(() => {
    let actif = true;
    chargerFichier().then((f) => actif && setFichier(f));
    return () => {
      actif = false;
    };
  }, []);

  if (fichier === undefined) return <Squelette className={className} />;
  const actus = filtrerParPays(fichier?.actus ?? [], pays).slice(0, limite);
  if (actus.length === 0) return siVide ? <p className={`text-[15px] text-[#fbeee2]/65 ${className}`}>{siVide}</p> : null;

  const [une, ...suite] = actus;
  // Peu d'actus (accueil, page pays) : le bandeau à gauche, les vignettes en colonne à droite.
  // Beaucoup (page /actus) : le bandeau sur toute la largeur, puis les vignettes sur deux colonnes ;
  // un nombre impair laisse la dernière seule : elle prend toute la ligne (jamais de case vide).
  const large = limite > 4;
  const Titre = titre ? "h3" : "h2";
  const miseAJour = fichier?.genere_le ? new Date(fichier.genere_le) : null;

  return (
    <section className={className} aria-label={titre ?? "Actus"}>
      {titre && (
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          {tailleTitre === "grand" ? (
            <h2 className="uppercase" style={{ ...anton, fontSize: "clamp(36px,4.5vw,64px)" }}>
              {titre}
              <span className="text-[#ff7a3d]">.</span>
            </h2>
          ) : (
            <h2 className="font-display text-3xl">
              {titre}
              <span className="text-[#ff7a3d]">.</span>
            </h2>
          )}
          {lien && (
            <TLink href={lien.href} label={lien.label} className="text-sm font-bold text-[#ff7a3d] hover:text-[#ffc46b]">
              {lien.label} →
            </TLink>
          )}
        </div>
      )}
      {avecMiseAJour && miseAJour && !Number.isNaN(miseAJour.getTime()) && (
        <p className="mb-5 text-[13px] text-[#fbeee2]/55">
          Mis à jour le <time dateTime={fichier!.genere_le}>{dateHeure(miseAJour)}</time>
        </p>
      )}
      {!large && suite.length === 1 ? (
        // Deux actus seulement : sur grand écran, deux bandeaux côte à côte de même hauteur
        // (une vignette seule, étirée à la hauteur du bandeau, aurait l'air vide).
        <div className="grid gap-4 lg:grid-cols-2">
          <ActuBandeau actu={une} prioritaire={prioritaire} Titre={Titre} />
          <div className="min-w-0 lg:hidden">
            <ActuVignette actu={suite[0]} Titre={Titre} />
          </div>
          <div className="hidden min-w-0 lg:block">
            <ActuBandeau actu={suite[0]} Titre={Titre} />
          </div>
        </div>
      ) : (
        // À côté des vignettes (55 % / 45 %), les deux colonnes finissent à la même hauteur :
        // l'image du bandeau prend la hauteur restante, les vignettes se partagent la colonne à parts égales.
        <div className={large ? "space-y-4" : `grid gap-4 ${suite.length ? "lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]" : ""}`}>
          <ActuBandeau actu={une} prioritaire={prioritaire} Titre={Titre} colonne={!large && suite.length > 0} horizontal={large || suite.length === 0} />
          {suite.length > 0 && (
            <ul className={large ? "grid gap-4 md:grid-cols-2 md:[&>:last-child:nth-child(odd)]:col-span-2" : "grid gap-4 lg:auto-rows-fr"}>
              {suite.map((a) => (
                <li key={a.id} className="flex min-w-0">
                  <ActuVignette actu={a} Titre={Titre} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
