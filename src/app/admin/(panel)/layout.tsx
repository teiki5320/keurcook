import { DatabaseRequired } from "@/components/admin/DatabaseRequired";
import { AdminNav } from "@/components/admin/AdminNav";
import { isAdminPasswordConfigured } from "@/lib/admin-session";
import { requireAdmin } from "@/lib/data/admin";
import { isDbConfigured } from "@/lib/db/client";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!isDbConfigured || !isAdminPasswordConfigured()) return <DatabaseRequired />;
  await requireAdmin();
  return (
    <div className="lg:flex">
      <AdminNav />
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 lg:py-10">{children}</main>
    </div>
  );
}
