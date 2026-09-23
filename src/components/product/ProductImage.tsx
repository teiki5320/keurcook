import Image from "next/image";

/** Image produit : les SVG de démonstration ne passent pas par l'optimiseur. */
export function ProductImage({
  src,
  alt,
  sizes,
  priority,
  className,
}: {
  src: string | null | undefined;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!src) {
    return <div className={`flex h-full w-full items-center justify-center bg-sage-100 text-sm text-muted ${className ?? ""}`}>Pas d&apos;image</div>;
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={src.endsWith(".svg")}
      className={`object-cover ${className ?? ""}`}
    />
  );
}
