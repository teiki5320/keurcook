import { Download, Trash2 } from "lucide-react";
import { deleteSubscriberAction } from "@/app/admin/actions";
import { anton } from "@/components/nuage/typography";
import { adminListSubscribers } from "@/lib/data/admin";
import { formatDateTime } from "@/lib/format";

export const metadata = { title: "Newsletter" };

export default async function AdminNewsletterPage() {
  const subscribers = await adminListSubscribers();
  const active = subscribers.filter((s) => !s.unsubscribedAt);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="uppercase leading-none" style={{ ...anton, fontSize: "clamp(40px,5vw,64px)" }}>
          Newsletter<span className="text-[#ff7a3d]">.</span>
        </h1>
        {/* Lien simple (pas de préchargement) : le fichier CSV est généré à la demande. */}
        <a href="/admin/newsletter/export" className="btn-primary">
          <Download className="h-4 w-4" aria-hidden /> Exporter (CSV)
        </a>
      </div>
      <p className="mt-1 text-sm text-muted">
        {active.length} inscrit{active.length > 1 ? "s" : ""}. L&apos;export s&apos;importe dans un outil d&apos;envoi (Brevo, par exemple) ;
        l&apos;envoi automatique de la « recette de la semaine » sera branché plus tard.
      </p>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-sage-200 text-xs text-muted uppercase">
            <tr>
              <th className="p-3">E-mail</th>
              <th className="p-3">Inscription</th>
              <th className="p-3">Statut</th>
              <th className="p-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-200">
            {subscribers.map((s) => (
              <tr key={s.id}>
                <td className="p-3 font-medium">{s.email}</td>
                <td className="p-3 text-muted">{formatDateTime(s.consentAt)}</td>
                <td className="p-3">{s.unsubscribedAt ? <span className="text-muted">Désinscrit</span> : <span className="text-[#ffc46b]">Inscrit</span>}</td>
                <td className="p-3 text-right">
                  <form action={deleteSubscriberAction}>
                    <input type="hidden" name="id" value={s.id} />
                    <button className="rounded-full p-1.5 text-[#ff7a3d] hover:bg-[#ff7a3d]/10" aria-label={`Supprimer ${s.email}`}>
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 && <p className="p-6 text-sm text-muted">Aucun inscrit pour le moment.</p>}
      </div>
    </div>
  );
}
