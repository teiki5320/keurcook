import type { ImageActu } from "@/lib/veille";

/** Crédit obligatoire de l'image : « Photo : auteur · licence » (lien vers la page d'origine), ou « Illustration : Keur Cook ». */
export function CreditImage({ image, className = "" }: { image: ImageActu; className?: string }) {
  if (image.source === "carte") return <p className={`text-[11.5px] text-[#fbeee2]/50 ${className}`}>Illustration : Keur Cook</p>;
  const texte = [image.credit, image.licence].filter(Boolean).join(" · ");
  return (
    <p className={`text-[11.5px] break-words text-[#fbeee2]/50 ${className}`}>
      Photo :{" "}
      {image.page ? (
        <a href={image.page} target="_blank" rel="noopener nofollow" className="underline decoration-[#fbeee2]/25 underline-offset-2 hover:text-[#fbeee2]">
          {texte}
        </a>
      ) : (
        texte
      )}
    </p>
  );
}
