import type { Metadata } from "next";
import { CartView } from "@/components/shop/CartView";
import { shippingConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Panier", robots: { index: false } };

export default function CartPage() {
  return (
    <div className="container-page py-10">
      <h1 className="mb-8 font-display text-4xl text-forest-900">Votre panier</h1>
      <CartView flatRateCents={shippingConfig.flatRateCents} freeThresholdCents={shippingConfig.freeThresholdCents} />
    </div>
  );
}
