import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-session";
import { getSql } from "@/lib/db/client";

/** Export CSV des inscrits actifs (réservé à l'admin connecté). */
export async function GET() {
  const cookieStore = await cookies();
  if (!verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value)) return new Response("Non autorisé.", { status: 401 });
  const rows = await getSql().query("select email, consent_at from newsletter_subscribers where unsubscribed_at is null order by created_at");
  const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const csv = ["email;date_consentement", ...rows.map((r) => `${cell(String(r.email))};${cell(new Date(r.consent_at).toISOString())}`)].join("\r\n");
  return new Response(`﻿${csv}\r\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="newsletter-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
