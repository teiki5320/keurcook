import "server-only";
import nodemailer from "nodemailer";

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

/**
 * Envoi d'emails via SMTP (IONOS, Brevo, Mailjet, Gmail…).
 * Sans configuration SMTP, les emails sont simplement affichés dans la
 * console du serveur (pratique en développement).
 */
export async function sendEmail(message: EmailMessage): Promise<void> {
  const host = process.env.SMTP_HOST;
  const from = process.env.EMAIL_FROM || "Alohash <contact@alohash.fr>";

  if (!host) {
    console.info(
      `\n[email:console] À : ${message.to}\nObjet : ${message.subject}\n\n${message.text}\n`,
    );
    return;
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined,
  });

  await transporter.sendMail({ from, ...message });
}

/** Envoie un email sans jamais faire échouer l'action appelante. */
export async function sendEmailSafe(message: EmailMessage) {
  try {
    await sendEmail(message);
  } catch (error) {
    console.error("[email] Échec de l'envoi :", error);
  }
}
