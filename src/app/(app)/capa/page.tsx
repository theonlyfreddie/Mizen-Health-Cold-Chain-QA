import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { CapaStatusBadge } from "@/components/ui/StatusBadges";
import { capas, getShipment } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function CapaListPage() {
  const open = capas.filter((c) => c.status !== "closed");
  const closed = capas.filter((c) => c.status === "closed");

  return (
    <div>
      <PageHeader
        eyebrow="Operations"
        title="CAPA"
        description="Corrective and preventive actions, opened only where an investigation finding required one — each linked back to its source shipment and investigation."
      />

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-sm font-medium text-ink-soft dark:text-white/55">Open ({open.length})</h2>
          <div className="space-y-3">
            {open.map((c) => {
              const shipment = getShipment(c.shipmentId);
              return (
                <Card key={c.id}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-1.5 flex items-center gap-2">
                        <CapaStatusBadge status={c.status} />
                        <span className="font-mono text-[11px] text-ink-faint dark:text-white/35">{c.id}</span>
                      </div>
                      <Link href={`/shipments/${c.shipmentId}/capa`}>
                        <p className="text-sm font-medium text-ink dark:text-white">{c.correctiveAction}</p>
                      </Link>
                      {shipment && (
                        <p className="mt-1 text-xs text-ink-faint dark:text-white/40">
                          {shipment.productName} · {shipment.batchLot}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-6 text-right text-sm">
                      <div>
                        <p className="font-medium text-ink dark:text-white">{c.owner}</p>
                        <p className="text-[11px] text-ink-faint dark:text-white/35">Owner</p>
                      </div>
                      <div>
                        <p className="font-medium text-ink dark:text-white">{formatDate(c.dueDate)}</p>
                        <p className="text-[11px] text-ink-faint dark:text-white/35">Due</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
            {open.length === 0 && <p className="text-sm text-ink-faint dark:text-white/40">No open CAPAs.</p>}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-medium text-ink-soft dark:text-white/55">Closed ({closed.length})</h2>
          <div className="space-y-3">
            {closed.map((c) => {
              const shipment = getShipment(c.shipmentId);
              return (
                <Card key={c.id} className="opacity-80">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-1.5 flex items-center gap-2">
                        <CapaStatusBadge status={c.status} />
                        <span className="font-mono text-[11px] text-ink-faint dark:text-white/35">{c.id}</span>
                      </div>
                      <Link href={`/shipments/${c.shipmentId}/capa`}>
                        <p className="text-sm font-medium text-ink dark:text-white">{c.correctiveAction}</p>
                      </Link>
                      {shipment && (
                        <p className="mt-1 text-xs text-ink-faint dark:text-white/40">
                          {shipment.productName} · {shipment.batchLot}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-6 text-right text-sm">
                      <div>
                        <p className="font-medium text-ink dark:text-white">{c.owner}</p>
                        <p className="text-[11px] text-ink-faint dark:text-white/35">Owner</p>
                      </div>
                      <div>
                        <p className="font-medium text-ink dark:text-white">
                          {c.effectivenessVerifiedAt ? formatDate(c.effectivenessVerifiedAt) : "—"}
                        </p>
                        <p className="text-[11px] text-ink-faint dark:text-white/35">Verified</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
