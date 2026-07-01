"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { ShipmentStatusBadge, SeverityBadge } from "@/components/ui/StatusBadges";
import { TempRibbon } from "@/components/charts/TempRibbon";
import { EmptyState } from "@/components/ui/EmptyState";
import { shipments } from "@/lib/mock-data";
import { formatDate, cx } from "@/lib/utils";
import { ShipmentStatus } from "@/lib/types";
import { shipmentStatusMeta } from "@/lib/status";

const filters: { key: ShipmentStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "excursion_open", label: "Excursion open" },
  { key: "under_investigation", label: "Under investigation" },
  { key: "quarantined", label: "Quarantined" },
  { key: "in_transit", label: "In transit" },
  { key: "released", label: "Released" },
  { key: "rejected", label: "Rejected" },
  { key: "delivered", label: "Delivered" },
];

export default function ShipmentsPage() {
  const [filter, setFilter] = useState<ShipmentStatus | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchStatus = filter === "all" || s.status === filter;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        s.id.toLowerCase().includes(q) ||
        s.productName.toLowerCase().includes(q) ||
        s.batchLot.toLowerCase().includes(q) ||
        s.destination.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [filter, query]);

  return (
    <div>
      <PageHeader
        eyebrow="Operations"
        title="Shipments"
        description="Every refrigerated and controlled-room-temperature shipment currently tracked, with linked investigation, disposition and CAPA records."
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cx(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f.key
                  ? "border-teal-500 bg-teal-500/10 text-teal-700 dark:border-teal-300 dark:bg-teal-400/10 dark:text-teal-200"
                  : "border-ink/12 text-ink-soft hover:border-ink/25 dark:border-white/15 dark:text-white/55"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ID, product, batch, destination…"
          className="w-full rounded-md border border-ink/15 bg-white px-3.5 py-2 text-sm outline-none focus:border-teal-500 dark:border-white/15 dark:bg-night-card dark:text-white sm:w-72"
        />
      </div>

      <Card padded={false}>
        {filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No shipments match this view"
              description="Try a different status filter or clear your search to see all tracked shipments."
            />
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[860px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink/[0.07] text-left text-[11px] uppercase tracking-wide text-ink-faint dark:border-white/[0.06] dark:text-white/35">
                  <th className="px-6 py-3 font-medium">Shipment</th>
                  <th className="px-3 py-3 font-medium">Route</th>
                  <th className="px-3 py-3 font-medium">Temp band</th>
                  <th className="px-3 py-3 font-medium">Severity</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-ink/[0.05] last:border-0 hover:bg-ink/[0.02] dark:border-white/[0.05] dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-3.5">
                      <Link href={`/shipments/${s.id}`}>
                        <p className="font-medium text-ink dark:text-white">{s.productName}</p>
                        <p className="font-mono text-[11px] text-ink-faint dark:text-white/40">
                          {s.id} · Lot {s.batchLot}
                        </p>
                      </Link>
                    </td>
                    <td className="px-3 py-3.5 text-xs text-ink-soft dark:text-white/50">
                      <p>{s.origin}</p>
                      <p className="text-ink-faint dark:text-white/35">→ {s.destination}</p>
                    </td>
                    <td className="px-3 py-3.5 w-44">
                      <TempRibbon minTempC={s.minTempC} maxTempC={s.maxTempC} currentTempC={s.currentTempC} compact />
                    </td>
                    <td className="px-3 py-3.5">
                      <SeverityBadge severity={s.excursionSeverity} />
                    </td>
                    <td className="px-3 py-3.5">
                      <ShipmentStatusBadge status={s.status} />
                    </td>
                    <td className="px-6 py-3.5 text-right text-xs text-ink-faint dark:text-white/40">
                      {formatDate(s.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
