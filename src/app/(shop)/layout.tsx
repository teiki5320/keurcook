import { ShopShell } from "@/components/nuage/ShopShell";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <ShopShell>{children}</ShopShell>;
}
