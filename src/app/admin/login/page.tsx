import { Leaf } from "lucide-react";
import { SupabaseRequired } from "@/components/admin/SupabaseRequired";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdminPasswordConfigured } from "@/lib/admin-session";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { siteConfig } from "@/lib/config";

export const metadata = { title: "Connexion" };

export default function LoginPage() {
  if (!isSupabaseConfigured || !isAdminPasswordConfigured()) return <SupabaseRequired />;
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="card w-full max-w-sm p-7">
        <p className="flex items-center gap-2 font-display text-2xl text-forest-800">
          <Leaf className="h-5 w-5" aria-hidden /> {siteConfig.name}
        </p>
        <h1 className="mt-1 text-sm text-muted">Espace d&apos;administration</h1>
        <LoginForm />
      </div>
    </div>
  );
}
