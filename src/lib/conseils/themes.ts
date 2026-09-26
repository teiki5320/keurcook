import { BookOpen, CookingPot, CupSoda, Flame, Package, Repeat, Wheat, type LucideIcon } from "lucide-react";

/** Thèmes de la rubrique Conseils : nom affiché et icône (utilisée aussi quand l'article n'a pas de photo). */
export const CONSEIL_THEMES = {
  epicerie: { name: "Épicerie : choisir et conserver", short: "Épicerie", icon: Package },
  cereales: { name: "Céréales et féculents", short: "Céréales", icon: Wheat },
  remplacer: { name: "Remplacer un ingrédient", short: "Remplacer", icon: Repeat },
  sauces: { name: "Sauces et techniques", short: "Techniques", icon: CookingPot },
  epices: { name: "Épices et condiments", short: "Épices", icon: Flame },
  boissons: { name: "Boissons et douceurs", short: "Boissons", icon: CupSoda },
  decouvrir: { name: "Découvrir et s'organiser", short: "Découvrir", icon: BookOpen },
} as const satisfies Record<string, { name: string; short: string; icon: LucideIcon }>;

export type ConseilTheme = keyof typeof CONSEIL_THEMES;

export const isConseilTheme = (v: string): v is ConseilTheme => v in CONSEIL_THEMES;
