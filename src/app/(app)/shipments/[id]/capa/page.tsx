import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CapaStatusBadge } from "@/components/ui/StatusBadges";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCapaForShipment, getInvestigationForShipment, getShipment } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function CapaDetailPage({ params }: { params: { id: string } }) {
  const shipment = getShipment(params.id);
  if (!shipment) notFound();
  const investigation = getInvestigationForShipment(shipment.id);
  const capa = getCapaForShipment(shipment.id);

  if (!investigation) {
    return (
      <div>
        <PageHeader eyebrow={`Shipment · ${shipment.id}`} title="CAPA" />
        <EmptyState
          title="No investigation on file"
          description="A CAPA can only be opened once an investigation has been completed for this shipment."
          action={<Button href={`/shipments/${shipment.id}`}>Back to shipment</Button>}
        />
      </div>
    );
  }

  if (!capa) {
    return (
      <div>
        <PageHeader eyebrow={`Shipment · ${shipment.id}`} title="CAPA" />
        <EmptyState
          title="CAPA not required"
          description="Based on the investigation findings, QA determined the root cause was isolated and adequately addressed at source — no corrective/preventive action workflow was opened for this shipment."
          action={<Button href={`/shipments/${shipment.id}/investigation`}>View investigation</Button>}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow={`CAPA · ${capa.id}`}
        title={shipment.productName}
        description={`Batch ${shipment.batchLot} — linked to investigation ${capa.investigationId}`}
        action={<CapaStatusBadge status={capa.status} />}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader eyebrow="Corrective action" title="What's being fixed now" />
            <p className="text-sm leading-relaxed text-ink-soft dark:text-white/60">{capa.correctiveAction}</p>
          </Card>
          <Card>
            <CardHeader eyebrow="Preventive action" title="What stops recurrence" />
            <p className="text-sm leading-relaxed text-ink-soft dark:text-white/60">{capa.preventiveAction}</p>
          </Card>
          <Card>
            <CardHeader eyebrow="Verification" title="Effectiveness check" />
            {capa.effectivenessCheck ? (
              <>
                <p className="text-sm leading-relaxed text-ink-soft dark:text-white/60">{capa.effectivenessCheck}</p>
                <p className="mt-3 text-xs text-ink-faint dark:text-white/35">
                  {capa.effectivenessVerifiedAt
                    ? `Verified effective on ${formatDate(capa.effectivenessVerifiedAt)}`
                    : "Verification still pending."}
                </p>
              </>
            ) : (
              <p className="text-sm text-ink-faint dark:text-white/40">Effectiveness check not yet defined.</p>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader eyebrow="Ownership" title="CAPA record" />
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-faint dark:text-white/40">Owner</dt>
                <dd className="font-medium text-ink dark:text-white">{capa.owner}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-faint dark:text-white/40">Due date</dt>
                <dd className="font-medium text-ink dark:text-white">{formatDate(capa.dueDate)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-faint dark:text-white/40">Created</dt>
                <dd className="font-medium text-ink dark:text-white">{formatDate(capa.createdAt)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-faint dark:text-white/40">Closure status</dt>
                <dd className="font-medium text-ink dark:text-white">{capa.closureStatus.replace(/_/g, " ")}</dd>
              </div>
            </dl>
          </Card>
          <Button href={`/shipments/${shipment.id}/audit`} variant="secondary" className="w-full">
            View full audit record
          </Button>
        </div>
      </div>
    </div>
  );
}
