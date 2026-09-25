import { MaintenanceForm } from "@/components/admin/MaintenanceForm";
import { anton } from "@/components/nuage/typography";
import { getMaintenance } from "@/lib/data/settings";

export const metadata = { title: "Maintenance" };

export default async function MaintenancePage() {
  const maintenance = await getMaintenance();
  return (
    <div className="max-w-3xl">
      <h1 className="uppercase leading-none" style={{ ...anton, fontSize: "clamp(40px,5vw,64px)" }}>
        Maintenance<span className="text-[#ff7a3d]">.</span>
      </h1>
      <p className="mt-2 text-muted">
        Mettez le site en pause le temps d&apos;une mise à jour : les visiteurs voient un écran d&apos;attente avec la carte de
        l&apos;Afrique en particules, et les commandes sont suspendues. L&apos;admin reste accessible.
      </p>
      <MaintenanceForm current={maintenance} />
    </div>
  );
}
