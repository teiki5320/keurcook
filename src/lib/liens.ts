/**
 * Très grosses pages de liste (environ 130 à 210 Ko de données de navigation chacune) :
 * leurs liens ne sont pas préchargés d'avance (prefetch), sinon un téléphone télécharge
 * ces pages dès qu'un lien apparaît à l'écran, même si le visiteur n'y va jamais.
 * Le clic les charge normalement.
 */
export const estListeLourde = (href: string) => /^\/(recettes|boutique|favoris|conseils)(\?|$)/.test(href);
