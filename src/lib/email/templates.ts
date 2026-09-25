import { siteConfig } from "../config";
import { formatPrice, ORDER_STATUS_LABELS } from "../format";
import { paymentLabel } from "../payments/registry";
import type { PaymentInstructions } from "../payments/types";
import type { Order } from "../types";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const WARNING =
  "Denrées alimentaires : consultez la liste des ingrédients et des allergènes sur l'emballage de chaque produit.";

function layout(title: string, body: string) {
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>${esc(title)}</title></head>
<body style="margin:0;background:#f6f3ea;font-family:Arial,Helvetica,sans-serif;color:#1f2a22">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
        <tr><td style="background:#2f4a37;color:#f6f3ea;padding:20px 24px;font-size:22px;font-weight:bold">${esc(siteConfig.name)}</td></tr>
        <tr><td style="padding:24px">${body}</td></tr>
        <tr><td style="padding:16px 24px;background:#eef0e6;font-size:12px;color:#55604f">${esc(WARNING)}<br><br>${esc(siteConfig.name)} — ${esc(siteConfig.url)}</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function itemsTable(order: Order) {
  const rows = order.items
    .map(
      (i) => `<tr>
        <td style="padding:6px 0;border-bottom:1px solid #eee">${esc(i.productName)} <span style="color:#6b7466">— ${esc(i.variantLabel)}</span></td>
        <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:center">× ${i.quantity}</td>
        <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right">${formatPrice(i.unitPriceCents * i.quantity)}</td>
      </tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
    ${rows}
    <tr><td colspan="2" style="padding-top:10px">Sous-total</td><td style="padding-top:10px;text-align:right">${formatPrice(order.subtotalCents)}</td></tr>
    <tr><td colspan="2">Livraison</td><td style="text-align:right">${order.shippingCents === 0 ? "Offerte" : formatPrice(order.shippingCents)}</td></tr>
    <tr><td colspan="2" style="font-weight:bold;padding-top:6px">Total TTC</td><td style="font-weight:bold;padding-top:6px;text-align:right">${formatPrice(order.totalCents)}</td></tr>
  </table>`;
}

function itemsText(order: Order) {
  return [
    ...order.items.map((i) => `- ${i.productName} (${i.variantLabel}) × ${i.quantity} : ${formatPrice(i.unitPriceCents * i.quantity)}`),
    `Sous-total : ${formatPrice(order.subtotalCents)}`,
    `Livraison : ${order.shippingCents === 0 ? "offerte" : formatPrice(order.shippingCents)}`,
    `Total TTC : ${formatPrice(order.totalCents)}`,
  ].join("\n");
}

function address(order: Order) {
  return [
    `${order.firstName} ${order.lastName}`,
    order.addressLine1,
    order.addressLine2,
    `${order.postalCode} ${order.city}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function orderConfirmationEmail(order: Order, instructions: PaymentInstructions | null, orderUrl: string) {
  const subject = `Confirmation de votre commande ${order.orderNumber}`;
  const payHtml = instructions
    ? `<div style="background:#f6f3ea;border-radius:8px;padding:16px;margin:20px 0">
        <p style="margin:0 0 8px;font-weight:bold">${esc(instructions.title)}</p>
        ${instructions.intro ? `<p style="margin:0 0 8px;font-size:14px">${esc(instructions.intro)}</p>` : ""}
        <table role="presentation" style="font-size:14px">${instructions.lines
          .map((l) => `<tr><td style="padding:2px 12px 2px 0;color:#55604f">${esc(l.label)}</td><td style="font-family:monospace">${esc(l.value)}</td></tr>`)
          .join("")}</table>
        ${instructions.note ? `<p style="margin:8px 0 0;font-size:12px;color:#55604f">${esc(instructions.note)}</p>` : ""}
      </div>`
    : "";
  const html = layout(
    subject,
    `<h1 style="font-size:20px;margin:0 0 12px">Merci pour votre commande, ${esc(order.firstName)} !</h1>
     <p style="font-size:14px;line-height:1.5">Nous avons bien enregistré votre commande <strong>${esc(order.orderNumber)}</strong>.
     ${order.status === "pending_payment" ? "Elle sera préparée dès réception de votre paiement." : ""}</p>
     ${payHtml}
     ${itemsTable(order)}
     <p style="font-size:14px;margin-top:20px"><strong>Adresse de livraison</strong><br>${esc(address(order)).replace(/\n/g, "<br>")}</p>
     <p style="margin-top:24px"><a href="${esc(orderUrl)}" style="background:#2f4a37;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-size:14px">Voir ma commande</a></p>`,
  );
  const text = [
    `Merci pour votre commande, ${order.firstName} !`,
    `Numéro de commande : ${order.orderNumber}`,
    "",
    ...(instructions
      ? [instructions.title, instructions.intro ?? "", ...instructions.lines.map((l) => `${l.label} : ${l.value}`), instructions.note ?? "", ""]
      : []),
    itemsText(order),
    "",
    "Adresse de livraison :",
    address(order),
    "",
    `Suivre votre commande : ${orderUrl}`,
    "",
    WARNING,
  ].join("\n");
  return { subject, html, text };
}

export function adminNewOrderEmail(order: Order, adminUrl: string) {
  const subject = `Nouvelle commande ${order.orderNumber} — ${formatPrice(order.totalCents)}`;
  const html = layout(
    subject,
    `<h1 style="font-size:18px;margin:0 0 12px">Nouvelle commande ${esc(order.orderNumber)}</h1>
     <p style="font-size:14px">Client : ${esc(order.firstName)} ${esc(order.lastName)} — ${esc(order.email)}<br>
     Paiement : ${esc(paymentLabel(order.paymentProvider))} — ${esc(ORDER_STATUS_LABELS[order.status])}</p>
     ${itemsTable(order)}
     <p style="margin-top:20px"><a href="${esc(adminUrl)}">Ouvrir dans l'espace admin</a></p>`,
  );
  const text = `Nouvelle commande ${order.orderNumber}\nClient : ${order.firstName} ${order.lastName} (${order.email})\n\n${itemsText(order)}\n\n${adminUrl}`;
  return { subject, html, text };
}

export function orderStatusEmail(order: Order, orderUrl: string) {
  const label = ORDER_STATUS_LABELS[order.status];
  const messages: Partial<Record<Order["status"], string>> = {
    paid: "Nous avons bien reçu votre paiement. Votre commande va être préparée.",
    preparing: "Votre commande est en cours de préparation.",
    shipped: `Votre commande a été expédiée.${order.trackingNumber ? ` Numéro de suivi : ${order.trackingNumber}.` : ""}`,
    delivered: "Votre commande a été livrée. Merci pour votre confiance !",
    cancelled: "Votre commande a été annulée. Pour toute question, répondez simplement à cet email.",
  };
  const message = messages[order.status] ?? `Nouveau statut : ${label}.`;
  const subject = `Commande ${order.orderNumber} : ${label.toLowerCase()}`;
  const html = layout(
    subject,
    `<h1 style="font-size:20px;margin:0 0 12px">Bonjour ${esc(order.firstName)},</h1>
     <p style="font-size:14px;line-height:1.5">${esc(message)}</p>
     <p style="margin-top:24px"><a href="${esc(orderUrl)}" style="background:#2f4a37;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-size:14px">Voir ma commande</a></p>`,
  );
  const text = `Bonjour ${order.firstName},\n\n${message}\n\nVoir votre commande : ${orderUrl}\n\n${WARNING}`;
  return { subject, html, text };
}
