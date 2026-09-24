import { SupabaseRequired } from "@/components/admin/SupabaseRequired";
import { AdminNav } from "@/components/admin/AdminNav";
import { isAdminPasswordConfigured } from "@/lib/admin-session";
import { requireAdmin } from "@/lib/data/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured || !isAdminPasswordConfigured()) return <SupabaseRequired />;
  await requireAdmin();
  return (
    <div className="lg:flex">
      <AdminNav />
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 lg:py-10">{children}</main>
    </div>
  );
}
