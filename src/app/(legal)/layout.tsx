import { ShopShell } from "@/components/nuage/ShopShell";

/** Pages légales : toujours accessibles, y compris pendant la maintenance (obligation légale). */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <ShopShell>{children}</ShopShell>;
}
