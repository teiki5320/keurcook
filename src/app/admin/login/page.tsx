import { Leaf } from "lucide-react";
import { SupabaseRequired } from "@/components/admin/SupabaseRequired";
import { LoginForm } from "@/components/admin/LoginForm";
import { logoutAction } from "../actions";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { siteConfig } from "@/lib/config";

export const metadata = { title: "Connexion" };

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  if (!isSupabaseConfigured) return <SupabaseRequired />;
  const { erreur } = await searchParams;
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="card w-full max-w-sm p-7">
        <p className="flex items-center gap-2 font-display text-2xl text-forest-800">
          <Leaf className="h-5 w-5" aria-hidden /> {siteConfig.name}
        </p>
        <h1 className="mt-1 text-sm text-muted">Espace d&apos;administration</h1>
        {erreur === "acces" && (
          <div className="mt-4 rounded-xl bg-terracotta/10 p-3 text-sm text-terracotta-dark">
            Ce compte n&apos;a pas les droits administrateur.
            <form action={logoutAction}>
              <button className="mt-1 underline">Se déconnecter</button>
            </form>
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
