import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { ShipmentStatusBadge } from "@/components/ui/StatusBadges";
import { capas, dispositions, investigations, shipments } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { dispositionLabel } from "@/lib/status";

export default function AuditRegisterPage() {
  const records = shipments
    .filter((s) => s.linkedInvestigationId)
    .map((s) => {
      const investigation = investigations.find((i) => i.id === s.linkedInvestigationId);
      const disposition = dispositions.find((d) => d.shipmentId === s.id);
      const capa = capas.find((c) => c.shipmentId === s.id);
      return { shipment: s, investigation, disposition, capa };
    });

  return (
    <div>
      <PageHeader
        eyebrow="Governance"
        title="Audit & compliance register"
        description="Complete record chain for every investigated shipment — who acted, when, the disposition rationale, and CAPA linkage. Each row opens an audit-ready, print-friendly report."
      />

      <Card padded={false}>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[920px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-ink/[0.07] text-left text-[11px] uppercase tracking-wide text-ink-faint dark:border-white/[0.06] dark:text-white/35">
                <th className="px-6 py-3 font-medium">Shipment</th>
                <th className="px-3 py-3 font-medium">Investigation</th>
                <th className="px-3 py-3 font-medium">Disposition</th>
                <th className="px-3 py-3 font-medium">CAPA</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Record</th>
              </tr>
            </thead>
            <tbody>
              {records.map(({ shipment, investigation, disposition, capa }) => (
                <tr
                  key={shipment.id}
                  className="border-b border-ink/[0.05] last:border-0 hover:bg-ink/[0.02] dark:border-white/[0.05] dark:hover:bg-white/[0.02]"
                >
                  <td className="px-6 py-3.5">
                    <p className="font-medium text-ink dark:text-white">{shipment.productName}</p>
                    <p className="font-mono text-[11px] text-ink-faint dark:text-white/40">
                      {shipment.id} · Lot {shipment.batchLot}
                    </p>
                  </td>
                  <td className="px-3 py-3.5 text-xs text-ink-soft dark:text-white/50">
                    {investigation ? (
                      <>
                        <p className="font-mono">{investigation.id}</p>
                        <p className="text-ink-faint dark:text-white/35">{investigation.qaReviewer}</p>
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-3 py-3.5 text-xs text-ink-soft dark:text-white/50">
                    {disposition ? dispositionLabel[disposition.decision] : "Pending"}
                  </td>
                  <td className="px-3 py-3.5 text-xs text-ink-soft dark:text-white/50">{capa ? capa.id : "Not required"}</td>
                  <td className="px-3 py-3.5">
                    <ShipmentStatusBadge status={shipment.status} />
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <Link
                      href={`/shipments/${shipment.id}/audit`}
                      className="text-xs font-medium text-teal-600 hover:underline dark:text-teal-300"
                    >
                      Open report →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
