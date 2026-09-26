/** « 21 septembre 2026 » à partir de « 2026-09-21 » (sans décalage de fuseau). */
export function formatConseilDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
