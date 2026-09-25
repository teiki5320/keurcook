import "server-only";
import { orderUrl } from "../data/orders";
import { getPaymentProvider } from "../payments/registry";
import type { Order } from "../types";
import { sendEmailSafe } from "./sender";
import { adminNewOrderEmail, orderConfirmationEmail } from "./templates";

/** Confirmation au client + notification à l'admin pour une commande. */
export async function sendNewOrderEmails(order: Order, baseUrl: string) {
  const provider = getPaymentProvider(order.paymentProvider);
  const instructions = order.status === "pending_payment" ? provider?.getInstructions?.(order) ?? null : null;
  await sendEmailSafe({ to: order.email, ...orderConfirmationEmail(order, instructions, orderUrl(order, baseUrl)) });
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (adminEmail) {
    await sendEmailSafe({ to: adminEmail, replyTo: order.email, ...adminNewOrderEmail(order, `${baseUrl}/admin/commandes/${order.id}`) });
  }
}
