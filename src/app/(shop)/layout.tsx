import { MaintenanceScreen } from "@/components/nuage/MaintenanceScreen";
import { ShopShell } from "@/components/nuage/ShopShell";
import { siteConfig } from "@/lib/config";
import { getMaintenance } from "@/lib/data/settings";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const maintenance = await getMaintenance();
  if (maintenance.enabled) return <MaintenanceScreen message={maintenance.message} contactEmail={siteConfig.contactEmail} />;
  return <ShopShell>{children}</ShopShell>;
}
