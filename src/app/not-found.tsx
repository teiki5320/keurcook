import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="text-center">
        <Leaf className="mx-auto h-10 w-10 text-forest-500" aria-hidden />
        <h1 className="mt-4 font-display text-4xl text-forest-900">Page introuvable</h1>
        <p className="mt-2 text-muted">Cette page n&apos;existe pas ou n&apos;est plus disponible.</p>
        <Link href="/" className="btn-primary mt-6">Retour à l&apos;accueil</Link>
      </div>
    </main>
  );
}
