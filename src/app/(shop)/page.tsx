import Link from "next/link";
import { FlaskConical, MapPin, ShieldCheck, Sprout, Truck } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductCard";
import { getCatalog, getFeaturedProducts } from "@/lib/data/catalog";
import { siteConfig } from "@/lib/config";

export const revalidate = 300;

const categoryVisuals: Record<string, string> = {
  fleurs: "from-forest-600 to-forest-800",
  resines: "from-[#7a5a3a] to-[#4a3522]",
  huiles: "from-[#c7a14a] to-[#8a6a22]",
  infusions: "from-[#8aa66b] to-[#56733f]",
  cosmetiques: "from-[#c99a8a] to-[#9a6555]",
};

export default async function HomePage() {
  const [{ categories }, featured] = await Promise.all([getCatalog(), getFeaturedProducts(8)]);
  const cbdCategories = categories.filter((c) => c.kind === "cbd");
  const accessoryCategories = categories.filter((c) => c.kind === "accessoire");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sage-100 to-cream">
        <div className="container-page grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-forest-700">
              <Sprout className="h-3.5 w-3.5" aria-hidden /> Cultivé en France
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-forest-900 sm:text-5xl lg:text-6xl">
              Le chanvre français, <em className="text-terracotta not-italic">de la graine au bocal</em>.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
              Fleurs, résines, huiles, infusions et cosmétiques issus de producteurs français identifiés. Chaque produit
              est tracé et accompagné de son certificat d&apos;analyse en laboratoire.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/boutique?type=cbd" className="btn-primary px-7 py-3">
                Découvrir le CBD
              </Link>
              <Link href="/boutique?type=accessoire" className="btn-secondary px-7 py-3">
                Voir les accessoires
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-gradient-to-br from-forest-500 to-forest-800" />
            <svg viewBox="0 0 200 200" className="absolute inset-[12%] text-cream/90" aria-hidden>
              <g fill="currentColor">
                {[-60, -30, 0, 30, 60].map((r, i) => (
                  <ellipse key={r} cx="100" cy={i === 2 ? 70 : 85} rx={i === 2 ? 14 : 11} ry={i === 2 ? 58 : 44} transform={`rotate(${r} 100 130)`} opacity={i === 2 ? 1 : 0.85} />
                ))}
                <rect x="97" y="120" width="6" height="60" rx="3" />
              </g>
            </svg>
            <div className="absolute -bottom-3 left-4 rounded-2xl bg-white px-4 py-3 shadow-lg">
              <p className="text-xs text-muted">Taux de THC</p>
              <p className="font-semibold text-forest-800">≤ 0,3 % garanti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="container-page -mt-2 py-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, title: "Origine France", text: "Région et producteur indiqués sur chaque fiche." },
            { icon: FlaskConical, title: "Analysé en laboratoire", text: "Certificat d'analyse téléchargeable pour chaque produit CBD." },
            { icon: ShieldCheck, title: "Conforme", text: "THC ≤ 0,3 %, vente réservée aux majeurs." },
            { icon: Truck, title: "Livraison soignée", text: "Colis discret, offert dès 50 € d'achat." },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="card flex gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-700">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-semibold text-forest-900">{title}</span>
                <span className="mt-0.5 block text-sm text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Catégories CBD */}
      <section className="container-page py-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-forest-900">Nos gammes CBD</h2>
          <Link href="/boutique?type=cbd" className="text-sm font-semibold text-forest-700 hover:underline">
            Tout voir →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
          {cbdCategories.map((c) => (
            <Link
              key={c.id}
              href={`/categorie/${c.slug}`}
              className={`group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br p-4 text-cream ${categoryVisuals[c.slug] ?? "from-forest-600 to-forest-800"}`}
            >
              <span className="font-display text-xl sm:text-2xl">{c.name}</span>
              <span className="mt-1 line-clamp-2 text-xs text-cream/80">{c.description}</span>
              <span className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/30">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Sélection */}
      <section className="container-page py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-forest-900">Notre sélection</h2>
          <Link href="/boutique" className="text-sm font-semibold text-forest-700 hover:underline">
            Toute la boutique →
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Accessoires */}
      <section className="container-page py-10">
        <div className="rounded-[2rem] bg-forest-800 p-7 text-cream sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl">Accessoires</h2>
              <p className="mt-3 text-sm text-sage-200">
                Grinders, vaporisateurs, feuilles et boîtes de conservation, sélectionnés pour leur qualité et leur
                durabilité.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {accessoryCategories.map((c) => (
                <Link
                  key={c.id}
                  href={`/categorie/${c.slug}`}
                  className="rounded-2xl bg-white/10 p-4 text-sm font-semibold transition hover:bg-white/20"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engagement éditorial */}
      <section className="container-page py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-forest-900">Transparence avant tout</h2>
            <p className="mt-4 text-muted">
              Nous travaillons exclusivement avec des chanvriers français. Pour chaque produit CBD, vous trouvez sur sa
              fiche la région de culture, le nom du producteur, les taux de CBD et de THC mesurés, ainsi que le
              certificat d&apos;analyse du lot, téléchargeable en PDF.
            </p>
            <Link href="/avertissements" className="btn-secondary mt-6">
              Notre démarche de conformité
            </Link>
          </div>
          <div className="card space-y-3 p-6 text-sm text-muted">
            <p className="font-semibold text-forest-900">Bon à savoir</p>
            <p>Nos produits sont réservés aux personnes majeures et ne sont pas des médicaments.</p>
            <p>
              Le THC, même à faible dose, peut être détecté lors d&apos;un dépistage salivaire : ne prenez pas le volant
              après consommation.
            </p>
            <p>Déconseillé aux femmes enceintes ou allaitantes.</p>
          </div>
        </div>
      </section>
    </>
  );
}
