import type { Metadata } from "next";
import { CheckoutForm } from "@/components/shop/CheckoutForm";
import { shippingConfig } from "@/lib/config";
import { getPaymentOptions } from "@/lib/payments/registry";

export const metadata: Metadata = { title: "Commande", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <div className="container-page py-10">
      <h1 className="mb-8 font-display text-4xl text-forest-900">Finaliser la commande</h1>
      <CheckoutForm
        paymentOptions={getPaymentOptions()}
        flatRateCents={shippingConfig.flatRateCents}
        freeThresholdCents={shippingConfig.freeThresholdCents}
      />
    </div>
  );
}
