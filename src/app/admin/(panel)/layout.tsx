import { DatabaseRequired } from "@/components/admin/DatabaseRequired";
import { AdminNav } from "@/components/admin/AdminNav";
import { isAdminPasswordConfigured } from "@/lib/admin-session";
import { adminNavCounts, requireAdmin } from "@/lib/data/admin";
import { getMaintenance } from "@/lib/data/settings";
import { isDbConfigured } from "@/lib/db/client";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!isDbConfigured || !isAdminPasswordConfigured()) return <DatabaseRequired />;
  await requireAdmin();
  const [counts, maintenance] = await Promise.all([adminNavCounts(), getMaintenance()]);
  return (
    <div className="lg:flex">
      <AdminNav counts={{ ...counts, maintenance: maintenance.enabled }} />
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 lg:py-10">{children}</main>
    </div>
  );
}
