import type { Metadata } from "next";
import { ConseilCard } from "@/components/conseils/ConseilCard";
import { anton } from "@/components/nuage/typography";
import { getConseils } from "@/lib/data/conseils";

// Relu toutes les heures : un article programmé paraît le jour de sa date sans redéploiement.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Conseils de cuisine africaine",
  description: "Conserver, cuire, remplacer un ingrédient, réussir une sauce : les réponses aux questions courantes sur la cuisine africaine et ses produits.",
  alternates: { canonical: "/conseils" },
};

export default function ConseilsPage() {
  const conseils = getConseils();
  return (
    <div className="container-page">
      <h1 className="uppercase leading-[.88]" style={{ ...anton, fontSize: "clamp(56px,8vw,120px)" }}>
        Conseils<span className="text-[#ff7a3d]">.</span>
      </h1>
      <p className="mt-3 max-w-2xl text-muted">Une question, une réponse : conserver les produits, cuire les céréales, remplacer un ingrédient, réussir les sauces.</p>
      {conseils.length ? (
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {conseils.map((c) => (
            <li key={c.slug}>
              <ConseilCard conseil={c} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-muted">Les premiers articles arrivent bientôt.</p>
      )}
    </div>
  );
}
