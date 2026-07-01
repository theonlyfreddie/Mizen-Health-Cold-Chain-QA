import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShipmentStatusBadge, SeverityBadge } from "@/components/ui/StatusBadges";
import { TempChart } from "@/components/charts/TempChart";
import {
  getCapaForShipment,
  getDispositionForShipment,
  getInvestigationForShipment,
  getShipment,
  shipments,
} from "@/lib/mock-data";
import { formatDateTime, formatQAR } from "@/lib/utils";

export function generateStaticParams() {
  return shipments.map((s) => ({ id: s.id }));
}

export default function ShipmentDetailPage({ params }: { params: { id: string } }) {
  const shipment = getShipment(params.id);
  if (!shipment) notFound();

  const investigation = getInvestigationForShipment(shipment.id);
  const disposition = getDispositionForShipment(shipment.id);
  const capa = getCapaForShipment(shipment.id);

  const fields: [string, string][] = [
    ["Shipment ID", shipment.id],
    ["GTIN", shipment.gtin],
    ["Serial range", shipment.serialRange ?? "Not serialized"],
    ["Carrier", shipment.carrier],
    ["Storage condition", shipment.storageCondition],
    ["Units affected", shipment.unitsAffected.toLocaleString()],
    ["Declared value", formatQAR(shipment.valueQAR)],
    ["Last updated", formatDateTime(shipment.updatedAt)],
  ];

  return (
    <div>
      <PageHeader
        eyebrow={`Shipment · ${shipment.id}`}
        title={shipment.productName}
        description={`Batch ${shipment.batchLot} — ${shipment.origin} → ${shipment.destination}`}
        action={
          <>
            <ShipmentStatusBadge status={shipment.status} />
            <SeverityBadge severity={shipment.excursionSeverity} />
          </>
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <Button href={`/shipments/${shipment.id}/investigation`} variant={investigation ? "secondary" : "primary"} size="sm">
          {investigation ? "View investigation" : "Open investigation"}
        </Button>
        <Button href={`/shipments/${shipment.id}/disposition`} variant="secondary" size="sm" disabled={!investigation}>
          QA disposition
        </Button>
        <Button href={`/shipments/${shipment.id}/capa`} variant="secondary" size="sm" disabled={!investigation}>
          CAPA
        </Button>
        <Button href={`/shipments/${shipment.id}/audit`} variant="secondary" size="sm">
          Audit record
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader eyebrow="Cold chain" title="Temperature log" />
          <TempChart data={shipment.temperatureLog} minTempC={shipment.minTempC} maxTempC={shipment.maxTempC} />
          {shipment.excursionStart && (
            <p className="mt-4 rounded-md bg-rust/8 px-3.5 py-2.5 text-xs text-rust dark:bg-rust/15">
              Excursion window: {formatDateTime(shipment.excursionStart)}
              {shipment.excursionEnd ? ` → ${formatDateTime(shipment.excursionEnd)}` : " → ongoing"}
            </p>
          )}
        </Card>

        <Card>
          <CardHeader eyebrow="Record" title="Shipment details" />
          <dl className="space-y-3 text-sm">
            {fields.map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-3">
                <dt className="text-ink-faint dark:text-white/40">{k}</dt>
                <dd className="text-right font-medium text-ink dark:text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader eyebrow="Custody" title="Chain of custody" />
          <ol className="space-y-0">
            {shipment.custodyEvents.map((e, idx) => (
              <li key={e.id} className="relative flex gap-4 pb-6 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-teal-500 dark:bg-teal-300" />
                  {idx < shipment.custodyEvents.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-ink/10 dark:bg-white/10" />
                  )}
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <p className="text-sm font-medium text-ink dark:text-white">{e.action}</p>
                    <p className="text-xs text-ink-faint dark:text-white/40">{formatDateTime(e.timestamp)}</p>
                  </div>
                  <p className="text-xs text-ink-soft dark:text-white/50">
                    {e.location} · {e.actor}
                    {e.temperatureC !== null && (
                      <span className="ml-2 font-mono text-ink-faint dark:text-white/35">{e.temperatureC}°C</span>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Card>

        <Card>
          <CardHeader eyebrow="Linked records" title="Quality chain" />
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-faint dark:text-white/35">Investigation</p>
              {investigation ? (
                <Link href={`/shipments/${shipment.id}/investigation`} className="font-mono text-teal-600 hover:underline dark:text-teal-300">
                  {investigation.id}
                </Link>
              ) : (
                <p className="text-ink-faint dark:text-white/40">None opened</p>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-faint dark:text-white/35">Disposition</p>
              {disposition ? (
                <Link href={`/shipments/${shipment.id}/disposition`} className="font-mono text-teal-600 hover:underline dark:text-teal-300">
                  {disposition.id}
                </Link>
              ) : (
                <p className="text-ink-faint dark:text-white/40">Pending</p>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-faint dark:text-white/35">CAPA</p>
              {capa ? (
                <Link href={`/shipments/${shipment.id}/capa`} className="font-mono text-teal-600 hover:underline dark:text-teal-300">
                  {capa.id}
                </Link>
              ) : (
                <p className="text-ink-faint dark:text-white/40">Not required</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
