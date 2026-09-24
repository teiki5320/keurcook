import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { LegacyRedirect } from "@/components/layout/LegacyRedirect";
import { isStaticExport } from "@/lib/paths";

// Ancienne page « Accessoires » : désormais une gamme de la boutique.
export const metadata: Metadata = { robots: { index: false } };

export default function LegacyAccessoriesPage() {
  const to = "/boutique?gamme=accessoires";
  if (!isStaticExport) permanentRedirect(to);
  return <LegacyRedirect to={to} />;
}
