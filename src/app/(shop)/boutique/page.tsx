import type { Metadata } from "next";
import { ProductListing } from "@/components/shop/ProductListing";

export const metadata: Metadata = {
  title: "Boutique CBD",
  description:
    "Fleurs, résines, huiles, infusions, cosmétiques CBD français et accessoires. THC ≤ 0,3 %, certificat d'analyse pour chaque produit.",
  alternates: { canonical: "/boutique" },
};

export default function ShopPage() {
  return (
    <div className="container-page py-10">
      <ProductListing action="/boutique" showHeading />
    </div>
  );
}
