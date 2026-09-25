import { DatabaseRequired } from "@/components/admin/DatabaseRequired";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdminPasswordConfigured } from "@/lib/admin-session";
import { isDbConfigured } from "@/lib/db/client";
import { anton } from "@/components/nuage/typography";

export const metadata = { title: "Connexion" };

export default function LoginPage() {
  if (!isDbConfigured || !isAdminPasswordConfigured()) return <DatabaseRequired />;
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-[28px] border border-[#ff7a3d]/30 bg-[#211209] p-8 shadow-[0_30px_80px_-30px_rgba(255,90,40,.35)]">
        <p className="text-[34px] leading-none tracking-[.02em]" style={anton}>
          ALOHASH<span className="text-[#ff7a3d]">.</span>
        </p>
        <h1 className="mt-2 text-[11px] font-bold tracking-[.16em] text-[#ffc46b] uppercase">Espace d&apos;administration</h1>
        <LoginForm />
      </div>
    </div>
  );
}
