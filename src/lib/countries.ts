/**
 * Pays présentés sur le site (carte de l'accueil, pages /pays/…).
 * Coordonnées approximatives (centre du pays) utilisées pour placer les points sur la carte.
 */
import type { Country } from "./types";

export const COUNTRIES: Country[] = [
  {
    code: "SN",
    slug: "senegal",
    name: "Sénégal",
    of: "du Sénégal",
    lon: -14.8,
    lat: 14.6,
    description:
      "Riz cassé, poisson, oignons confits et citron vert : la cuisine sénégalaise est généreuse et parfumée, portée par des produits de caractère comme le guedj (poisson séché) ou le nététou.",
  },
  {
    code: "ML",
    slug: "mali",
    name: "Mali",
    of: "du Mali",
    lon: -3.5,
    lat: 16.5,
    description:
      "Céréales anciennes (mil, fonio, sorgho), arachide et soumbala : la cuisine malienne est celle du fleuve Niger et du Sahel, simple et nourrissante.",
  },
  {
    code: "BF",
    slug: "burkina-faso",
    name: "Burkina Faso",
    of: "du Burkina Faso",
    lon: -1.6,
    lat: 12.3,
    description:
      "Terre du fonio et du soumbala, le Burkina Faso cuisine les céréales du Sahel en plats rustiques relevés de sauces aux feuilles et aux graines.",
  },
  {
    code: "CI",
    slug: "cote-d-ivoire",
    name: "Côte d'Ivoire",
    of: "de Côte d'Ivoire",
    lon: -5.5,
    lat: 7.5,
    description:
      "Attiéké, alloco, poisson braisé et sauces à la graine : la cuisine ivoirienne se vit dans les maquis, autour du grill et entre amis.",
  },
  {
    code: "GH",
    slug: "ghana",
    name: "Ghana",
    of: "du Ghana",
    lon: -1.2,
    lat: 7.9,
    description:
      "Gingembre, piment et plantain : la cuisine ghanéenne est vive et épicée, des étals de rue d'Accra aux grandes marmites familiales.",
  },
  {
    code: "NG",
    slug: "nigeria",
    name: "Nigeria",
    of: "du Nigeria",
    lon: 8.0,
    lat: 9.6,
    description:
      "Suya grillé au charbon, soupes épaisses à l'egusi, épices yaji : la cuisine nigériane est l'une des plus riches et des plus relevées du continent.",
  },
  {
    code: "CM",
    slug: "cameroun",
    name: "Cameroun",
    of: "du Cameroun",
    lon: 12.5,
    lat: 5.5,
    description:
      "Surnommé « l'Afrique en miniature », le Cameroun cuisine le ndolé, le poivre de Penja et les produits de la forêt comme de la côte.",
  },
  {
    code: "GA",
    slug: "gabon",
    name: "Gabon",
    of: "du Gabon",
    lon: 11.6,
    lat: -0.8,
    description:
      "Noix de palme, chocolat indigène (odika) et poissons de rivière : la cuisine gabonaise puise dans la forêt équatoriale.",
  },
  {
    code: "CD",
    slug: "rd-congo",
    name: "RD Congo",
    of: "de RD Congo",
    lon: 23.6,
    lat: -2.9,
    description:
      "Pondu, poisson fumé, huile de palme rouge et chikwangue : la cuisine congolaise est celle du grand fleuve, lente et savoureuse.",
  },
  {
    code: "ET",
    slug: "ethiopie",
    name: "Éthiopie",
    of: "d'Éthiopie",
    lon: 39.5,
    lat: 8.6,
    description:
      "Injera au teff, berbéré et beurre clarifié épicé : l'Éthiopie possède une cuisine unique, partagée à la main autour d'un grand plateau.",
  },
  {
    code: "CG",
    slug: "congo",
    name: "Congo",
    of: "du Congo",
    lon: 15.3,
    lat: -2.2,
    description:
      "Poissons du fleuve, feuilles de manioc et cuissons en papillote de feuilles : la cuisine congolaise de Brazzaville marie la forêt et le fleuve.",
  },
  {
    code: "UG",
    slug: "ouganda",
    name: "Ouganda",
    of: "d'Ouganda",
    lon: 32.4,
    lat: 1.4,
    description:
      "Plantain matoke, sauces à l'arachide et cuissons en feuilles de bananier : la cuisine ougandaise est celle des collines verdoyantes du lac Victoria.",
  },
  {
    code: "KE",
    slug: "kenya",
    name: "Kenya",
    of: "du Kenya",
    lon: 37.9,
    lat: 0.2,
    description:
      "Ugali, sukuma wiki et nyama choma : la cuisine kényane est simple, conviviale et se partage autour du feu.",
  },
  {
    code: "TZ",
    slug: "tanzanie",
    name: "Tanzanie",
    of: "de Tanzanie",
    lon: 35.0,
    lat: -6.4,
    description:
      "De Zanzibar, l'île aux épices, viennent le clou de girofle, la cardamome et le pilau parfumé qui ont marqué toute la côte swahilie.",
  },
  {
    code: "MG",
    slug: "madagascar",
    name: "Madagascar",
    of: "de Madagascar",
    lon: 46.9,
    lat: -19.0,
    description:
      "Riz à chaque repas, brèdes, zébu et vanille : la cuisine malgache, à la croisée de l'Afrique et de l'Asie, est douce et parfumée.",
  },
  {
    code: "ZA",
    slug: "afrique-du-sud",
    name: "Afrique du Sud",
    of: "d'Afrique du Sud",
    lon: 24.7,
    lat: -29.5,
    description:
      "Braai, bobotie, chakalaka : la « nation arc-en-ciel » mêle les cuisines zouloue, xhosa, malaise du Cap et afrikaner.",
  },
];

export const countryByCode = (code: string) => COUNTRIES.find((c) => c.code === code) ?? null;
export const countryBySlug = (slug: string) => COUNTRIES.find((c) => c.slug === slug) ?? null;
