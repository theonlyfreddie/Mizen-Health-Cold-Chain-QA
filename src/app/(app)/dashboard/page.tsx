import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShipmentStatusBadge, SeverityBadge } from "@/components/ui/StatusBadges";
import { TempRibbon } from "@/components/charts/TempRibbon";
import { capas, investigations, qaUsers, shipments } from "@/lib/mock-data";
import { formatDateTime, timeAgo } from "@/lib/utils";
import { shipmentStatusMeta } from "@/lib/status";
import { ShipmentStatus } from "@/lib/types";

export default function DashboardPage() {
  const activeShipments = shipments.filter((s) => s.status !== "delivered").length;
  const excursionsToday = shipments.filter(
    (s) => s.excursionStart && new Date(s.excursionStart) > new Date("2026-06-25T00:00:00Z")
  ).length;
  const openInvestigations = investigations.filter((i) => i.status !== "complete").length;
  const openCapas = capas.filter((c) => c.status !== "closed").length;
  const quarantined = shipments.filter((s) => s.status === "quarantined" || s.status === "excursion_open").length;

  const recentAlerts = [...shipments]
    .filter((s) => s.excursionSeverity !== "none")
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const statusCounts = shipments.reduce<Record<string, number>>((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {});
  const statusOrder: ShipmentStatus[] = [
    "excursion_open",
    "under_investigation",
    "quarantined",
    "in_transit",
    "released",
    "rejected",
    "delivered",
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Good morning, Freddy"
        description="Tuesday, 30 June 2026 — here's where cold-chain quality stands across active shipments."
        action={
          <>
            <Button href="/alerts" variant="secondary" size="sm">
              View alert center
            </Button>
            <Button href="/shipments" size="sm">
              All shipments
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard label="Active shipments" value={activeShipments} sub={`of ${shipments.length} total`} tone="teal" href="/shipments" />
        <KpiCard label="Excursions today" value={excursionsToday} sub="since 00:00, 25 Jun" tone="rust" href="/alerts" />
        <KpiCard label="Open investigations" value={openInvestigations} sub="across all severities" tone="gold" href="/alerts" />
        <KpiCard label="CAPAs open" value={openCapas} sub={`${capas.length} total this quarter`} tone="gold" href="/capa" />
        <KpiCard label="Quarantined batches" value={quarantined} sub="pending disposition" tone="rust" href="/shipments" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" padded={false}>
          <div className="p-5 sm:p-6 sm:pb-0">
            <CardHeader eyebrow="Needs attention" title="Recent excursion alerts" />
          </div>
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-ink/[0.07] text-left text-[11px] uppercase tracking-wide text-ink-faint dark:border-white/[0.06] dark:text-white/35">
                  <th className="px-6 py-2.5 font-medium">Shipment</th>
                  <th className="px-3 py-2.5 font-medium">Severity</th>
                  <th className="px-3 py-2.5 font-medium">Temp band</th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                  <th className="px-6 py-2.5 font-medium text-right">Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentAlerts.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-ink/[0.05] last:border-0 hover:bg-ink/[0.02] dark:border-white/[0.05] dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-3.5">
                      <Link href={`/shipments/${s.id}`} className="block">
                        <p className="font-medium text-ink dark:text-white">{s.productName}</p>
                        <p className="font-mono text-[11px] text-ink-faint dark:text-white/40">
                          {s.id} · {s.batchLot}
                        </p>
                      </Link>
                    </td>
                    <td className="px-3 py-3.5">
                      <SeverityBadge severity={s.excursionSeverity} />
                    </td>
                    <td className="px-3 py-3.5 w-44">
                      <TempRibbon minTempC={s.minTempC} maxTempC={s.maxTempC} currentTempC={s.currentTempC} compact />
                    </td>
                    <td className="px-3 py-3.5">
                      <ShipmentStatusBadge status={s.status} />
                    </td>
                    <td className="px-6 py-3.5 text-right text-xs text-ink-faint dark:text-white/40">
                      {timeAgo(s.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-ink/[0.07] px-6 py-3.5 dark:border-white/[0.06]">
            <Link href="/alerts" className="text-xs font-medium text-teal-600 hover:underline dark:text-teal-300">
              View all alerts →
            </Link>
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Team" title="QA workload" />
          <div className="space-y-4">
            {qaUsers.map((u) => (
              <div key={u.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-xs font-medium text-teal-700 dark:bg-teal-400/15 dark:text-teal-200">
                  {u.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink dark:text-white">{u.name}</p>
                  <p className="truncate text-xs text-ink-faint dark:text-white/40">{u.role}</p>
                </div>
                <div className="flex shrink-0 gap-3 text-right">
                  <div>
                    <p className="font-display text-sm font-medium text-ink dark:text-white">{u.openInvestigations}</p>
                    <p className="text-[10px] uppercase tracking-wide text-ink-faint dark:text-white/35">Invest.</p>
                  </div>
                  <div>
                    <p className="font-display text-sm font-medium text-ink dark:text-white">{u.openCapas}</p>
                    <p className="text-[10px] uppercase tracking-wide text-ink-faint dark:text-white/35">CAPA</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader eyebrow="Fleet-wide" title="Shipment status overview" />
          <div className="space-y-3">
            {statusOrder.map((status) => {
              const count = statusCounts[status] || 0;
              const pct = Math.round((count / shipments.length) * 100);
              const meta = shipmentStatusMeta[status];
              return (
                <div key={status} className="flex items-center gap-4">
                  <div className="w-44 shrink-0 text-sm text-ink-soft dark:text-white/55">{meta.label}</div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/[0.06] dark:bg-white/[0.07]">
                    <div
                      className={
                        meta.tone === "rust"
                          ? "h-full rounded-full bg-rust"
                          : meta.tone === "gold"
                          ? "h-full rounded-full bg-gold"
                          : meta.tone === "teal"
                          ? "h-full rounded-full bg-teal-500 dark:bg-teal-300"
                          : "h-full rounded-full bg-ink-faint"
                      }
                      style={{ width: `${Math.max(pct, count ? 4 : 0)}%` }}
                    />
                  </div>
                  <div className="w-10 shrink-0 text-right font-mono text-sm text-ink dark:text-white">{count}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Shortcuts" title="Quick actions" />
          <div className="space-y-2.5">
            <Button href="/shipments/SHP-10231/investigation" variant="secondary" className="w-full justify-start">
              Open investigation — SHP-10231
            </Button>
            <Button href="/capa" variant="secondary" className="w-full justify-start">
              Review open CAPAs
            </Button>
            <Button href="/audit" variant="secondary" className="w-full justify-start">
              Generate audit report
            </Button>
            <Button href="/shipments" variant="secondary" className="w-full justify-start">
              Log a new excursion
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
