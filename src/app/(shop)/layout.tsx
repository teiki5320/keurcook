import type { Metadata } from "next";
import { MaintenanceScreen } from "@/components/nuage/MaintenanceScreen";
import { ShopShell } from "@/components/nuage/ShopShell";
import { siteConfig } from "@/lib/config";
import { getMaintenance } from "@/lib/data/settings";

/** Pendant la maintenance, les pages affichent toutes le même écran : on demande aux moteurs de ne pas les indexer. */
export function generateMetadata(): Metadata {
  return getMaintenance().enabled ? { robots: { index: false, follow: false } } : {};
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const maintenance = getMaintenance();
  if (maintenance.enabled) return <MaintenanceScreen message={maintenance.message} contactEmail={siteConfig.contactEmail} />;
  return <ShopShell>{children}</ShopShell>;
}
