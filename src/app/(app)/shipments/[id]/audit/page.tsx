"use client";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  getCapaForShipment,
  getDispositionForShipment,
  getInvestigationForShipment,
  getShipment,
} from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";
import { dispositionLabel } from "@/lib/status";
import { MizanWordmark } from "@/components/logo/MizanLogo";

export default function ShipmentAuditPage({ params }: { params: { id: string } }) {
  const shipment = getShipment(params.id);
  if (!shipment) notFound();
  const investigation = getInvestigationForShipment(shipment.id);
  const disposition = getDispositionForShipment(shipment.id);
  const capa = getCapaForShipment(shipment.id);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between print:hidden">
        <PageHeader eyebrow={`Audit record · ${shipment.id}`} title="Compliance report" />
      </div>
      <div className="mb-6 flex justify-end gap-2 print:hidden">
        <Button variant="secondary" size="sm" onClick={() => window.print()}>
          Print / export PDF
        </Button>
      </div>

      <div className="mx-auto max-w-3xl rounded-lg border border-ink/[0.08] bg-white p-8 shadow-card print:border-0 print:shadow-none dark:border-white/[0.07] dark:bg-night-card sm:p-10">
        <div className="mb-8 flex items-center justify-between border-b border-ink/[0.08] pb-6 dark:border-white/[0.08]">
          <MizanWordmark />
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-ink-faint dark:text-white/35">Report generated</p>
            <p className="text-sm font-medium text-ink dark:text-white">{formatDateTime(new Date().toISOString())}</p>
          </div>
        </div>

        <h1 className="font-display text-2xl font-medium text-ink dark:text-white">{shipment.productName}</h1>
        <p className="mt-1 text-sm text-ink-faint dark:text-white/40">
          {shipment.id} · Batch {shipment.batchLot} · GTIN {shipment.gtin}
        </p>

        <section className="mt-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-teal-600 dark:text-teal-300">
            Shipment record
          </h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            <Row label="Origin" value={shipment.origin} />
            <Row label="Destination" value={shipment.destination} />
            <Row label="Carrier" value={shipment.carrier} />
            <Row label="Storage condition" value={shipment.storageCondition} />
            <Row label="Validated range" value={`${shipment.minTempC}°C to ${shipment.maxTempC}°C`} />
            <Row label="Units affected" value={shipment.unitsAffected.toLocaleString()} />
          </dl>
        </section>

        {investigation && (
          <section className="mt-8 border-t border-ink/[0.08] pt-6 dark:border-white/[0.08]">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-teal-600 dark:text-teal-300">
              Investigation — {investigation.id}
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft dark:text-white/60">{investigation.incidentSummary}</p>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              <Row label="QA reviewer" value={investigation.qaReviewer} />
              <Row label="Opened" value={formatDateTime(investigation.openedAt)} />
              <Row label="Root cause" value={investigation.rootCauseCategory ?? "Pending"} />
              <Row label="Closed" value={investigation.closedAt ? formatDateTime(investigation.closedAt) : "Open"} />
            </dl>
          </section>
        )}

        {disposition ? (
          <section className="mt-8 border-t border-ink/[0.08] pt-6 dark:border-white/[0.08]">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-teal-600 dark:text-teal-300">
              Disposition — {disposition.id}
            </h2>
            <div className="mb-2 flex items-center gap-2">
              <Badge tone={disposition.decision === "reject" ? "rust" : "teal"}>
                {dispositionLabel[disposition.decision]}
              </Badge>
              <span className="text-xs text-ink-faint dark:text-white/40">
                by {disposition.decidedBy} on {formatDateTime(disposition.decidedAt)}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-soft dark:text-white/60">{disposition.rationale}</p>
            <p className="mt-3 text-xs text-ink-faint dark:text-white/35">
              References: {disposition.regulatoryRefs.join("; ")}
            </p>
          </section>
        ) : (
          <section className="mt-8 border-t border-ink/[0.08] pt-6 dark:border-white/[0.08]">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-teal-600 dark:text-teal-300">
              Disposition
            </h2>
            <p className="text-sm text-ink-faint dark:text-white/40">No disposition recorded yet.</p>
          </section>
        )}

        <section className="mt-8 border-t border-ink/[0.08] pt-6 dark:border-white/[0.08]">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-teal-600 dark:text-teal-300">
            CAPA linkage
          </h2>
          {capa ? (
            <>
              <p className="text-sm text-ink dark:text-white">{capa.id} — {capa.closureStatus.replace(/_/g, " ")}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft dark:text-white/60">{capa.correctiveAction}</p>
            </>
          ) : (
            <p className="text-sm text-ink-faint dark:text-white/40">No CAPA required for this shipment.</p>
          )}
        </section>

        <section className="mt-8 border-t border-ink/[0.08] pt-6 dark:border-white/[0.08]">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-teal-600 dark:text-teal-300">
            Chain of custody
          </h2>
          <ul className="space-y-2 text-sm">
            {shipment.custodyEvents.map((e) => (
              <li key={e.id} className="flex justify-between gap-4 border-b border-ink/[0.05] pb-2 last:border-0 dark:border-white/[0.06]">
                <span className="text-ink-soft dark:text-white/55">
                  {e.action} — {e.actor}
                </span>
                <span className="shrink-0 text-xs text-ink-faint dark:text-white/35">{formatDateTime(e.timestamp)}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-center text-[11px] text-ink-faint dark:text-white/30">
          Generated by Mizan Health Cold Chain QA — record is system-of-record for {shipment.id} as of report date.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink-faint dark:text-white/40">{label}</dt>
      <dd className="text-right font-medium text-ink dark:text-white">{value}</dd>
    </div>
  );
}
