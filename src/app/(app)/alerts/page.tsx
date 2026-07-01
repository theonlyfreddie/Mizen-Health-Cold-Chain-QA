import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SeverityBadge, InvestigationStatusBadge } from "@/components/ui/StatusBadges";
import { Button } from "@/components/ui/Button";
import { TempRibbon } from "@/components/charts/TempRibbon";
import { EmptyState } from "@/components/ui/EmptyState";
import { getInvestigationForShipment, shipments } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";
import { ExcursionSeverity } from "@/lib/types";

const severityOrder: ExcursionSeverity[] = ["critical", "major", "minor"];

export default function AlertsPage() {
  const alerts = shipments
    .filter((s) => s.excursionSeverity !== "none")
    .sort((a, b) => severityOrder.indexOf(a.excursionSeverity) - severityOrder.indexOf(b.excursionSeverity));

  const counts = severityOrder.reduce<Record<string, number>>((acc, sev) => {
    acc[sev] = shipments.filter((s) => s.excursionSeverity === sev).length;
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        eyebrow="Excursion alert center"
        title="Temperature excursions"
        description="Every shipment with a recorded out-of-range reading, ranked by severity. Each alert connects directly to its investigation and, where complete, its disposition."
      />

      <div className="mb-6 grid grid-cols-3 gap-4 sm:max-w-xl">
        <div className="rounded-lg border border-rust/20 bg-rust/5 px-4 py-3 dark:border-rust/30 dark:bg-rust/10">
          <p className="font-display text-2xl font-medium text-rust">{counts.critical || 0}</p>
          <p className="text-[11px] uppercase tracking-wide text-rust/80">Critical</p>
        </div>
        <div className="rounded-lg border border-gold/30 bg-gold/10 px-4 py-3">
          <p className="font-display text-2xl font-medium text-gold-deep">{counts.major || 0}</p>
          <p className="text-[11px] uppercase tracking-wide text-gold-deep/80">Major</p>
        </div>
        <div className="rounded-lg border border-teal-500/20 bg-teal-500/5 px-4 py-3 dark:border-teal-300/20 dark:bg-teal-400/10">
          <p className="font-display text-2xl font-medium text-teal-600 dark:text-teal-300">{counts.minor || 0}</p>
          <p className="text-[11px] uppercase tracking-wide text-teal-600/80 dark:text-teal-300/70">Minor</p>
        </div>
      </div>

      {alerts.length === 0 ? (
        <EmptyState title="No active excursions" description="All tracked shipments are currently within their validated temperature range." />
      ) : (
        <div className="space-y-4">
          {alerts.map((s) => {
            const investigation = getInvestigationForShipment(s.id);
            return (
              <Card key={s.id}>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <SeverityBadge severity={s.excursionSeverity} />
                      {investigation && <InvestigationStatusBadge status={investigation.status} />}
                      <span className="font-mono text-[11px] text-ink-faint dark:text-white/35">{s.id}</span>
                    </div>
                    <Link href={`/shipments/${s.id}`} className="block">
                      <h3 className="font-display text-base font-medium text-ink dark:text-white">{s.productName}</h3>
                      <p className="text-xs text-ink-faint dark:text-white/40">
                        Lot {s.batchLot} · {s.carrier} · {s.destination}
                      </p>
                    </Link>
                    {s.excursionStart && (
                      <p className="mt-2 text-xs text-ink-soft dark:text-white/50">
                        Excursion detected {formatDateTime(s.excursionStart)}
                        {s.excursionEnd ? ` · resolved ${formatDateTime(s.excursionEnd)}` : " · ongoing"}
                      </p>
                    )}
                  </div>

                  <div className="w-full lg:w-56">
                    <TempRibbon minTempC={s.minTempC} maxTempC={s.maxTempC} currentTempC={s.currentTempC} />
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Button href={`/shipments/${s.id}/investigation`} size="sm" variant={investigation ? "secondary" : "primary"}>
                      {investigation ? "View investigation" : "Open investigation"}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
