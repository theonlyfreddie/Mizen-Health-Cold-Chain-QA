"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { getDispositionForShipment, getInvestigationForShipment, getShipment } from "@/lib/mock-data";
import { formatDateTime, cx } from "@/lib/utils";
import { DispositionDecision } from "@/lib/types";
import { dispositionLabel } from "@/lib/status";

const decisions: { key: DispositionDecision; description: string; tone: "teal" | "gold" | "rust" }[] = [
  { key: "release", description: "Within validated stability tolerance — approve for distribution.", tone: "teal" },
  { key: "quarantine_pending_review", description: "Hold pending manufacturer or further technical review.", tone: "gold" },
  { key: "reject", description: "Confirmed outside tolerance — remove from distribution.", tone: "rust" },
  { key: "rework_further_testing", description: "Requires additional lab testing before a decision can be made.", tone: "gold" },
];

export default function DispositionPage({ params }: { params: { id: string } }) {
  const shipment = getShipment(params.id);
  if (!shipment) notFound();
  const investigation = getInvestigationForShipment(shipment.id);
  const existing = getDispositionForShipment(shipment.id);

  const [decision, setDecision] = useState<DispositionDecision | null>(existing?.decision ?? null);
  const [rationale, setRationale] = useState(existing?.rationale ?? investigation?.decisionSupportNote ?? "");
  const [submitted, setSubmitted] = useState(!!existing);

  if (!investigation) {
    return (
      <div>
        <PageHeader eyebrow={`Shipment · ${shipment.id}`} title="QA disposition" />
        <EmptyState
          title="No investigation on file"
          description="A disposition can only be recorded once an investigation has been opened for this shipment."
          action={<Button href={`/shipments/${shipment.id}`}>Back to shipment</Button>}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow={`Disposition · ${existing?.id ?? "Pending"}`}
        title={shipment.productName}
        description={`Batch ${shipment.batchLot} — linked to investigation ${investigation.id}`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader eyebrow="Decision" title="Choose disposition" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {decisions.map((d) => (
                <button
                  key={d.key}
                  onClick={() => !submitted && setDecision(d.key)}
                  disabled={submitted}
                  className={cx(
                    "rounded-lg border p-4 text-left transition-colors",
                    decision === d.key
                      ? "border-teal-500 bg-teal-500/[0.06] dark:border-teal-300 dark:bg-teal-400/[0.08]"
                      : "border-ink/12 hover:border-ink/25 dark:border-white/15 dark:hover:border-white/30",
                    submitted && "cursor-not-allowed opacity-70"
                  )}
                >
                  <p className="text-sm font-medium text-ink dark:text-white">{dispositionLabel[d.key]}</p>
                  <p className="mt-1 text-xs text-ink-faint dark:text-white/40">{d.description}</p>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="Required" title="Rationale" />
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              disabled={submitted}
              rows={5}
              className="w-full rounded-md border border-ink/15 bg-white px-3.5 py-2.5 text-sm leading-relaxed outline-none focus:border-teal-500 disabled:bg-ink/[0.03] dark:border-white/15 dark:bg-night-card dark:text-white dark:disabled:bg-white/[0.03]"
            />
            <p className="mt-2 text-xs text-ink-faint dark:text-white/35">
              Every disposition requires a documented rationale referencing manufacturer stability data, validated
              tolerance, and any regulatory clauses relied on.
            </p>
          </Card>

          {existing && (
            <Card>
              <CardHeader eyebrow="On record" title="Regulatory references" />
              <div className="flex flex-wrap gap-2">
                {existing.regulatoryRefs.map((r) => (
                  <Badge key={r} tone="neutral">
                    {r}
                  </Badge>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader eyebrow="Status" title="Disposition record" />
            {submitted ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-faint dark:text-white/40">Decision</span>
                  <span className="font-medium text-ink dark:text-white">
                    {decision ? dispositionLabel[decision] : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-faint dark:text-white/40">Decided by</span>
                  <span className="font-medium text-ink dark:text-white">{existing?.decidedBy ?? "Freddy Osei"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-faint dark:text-white/40">Decided at</span>
                  <span className="font-medium text-ink dark:text-white">
                    {existing ? formatDateTime(existing.decidedAt) : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-faint dark:text-white/40">Risk level</span>
                  <Badge tone={existing?.qualityRiskLevel === "high" ? "rust" : existing?.qualityRiskLevel === "medium" ? "gold" : "teal"}>
                    {existing?.qualityRiskLevel ?? "low"}
                  </Badge>
                </div>
              </div>
            ) : (
              <p className="text-sm text-ink-faint dark:text-white/40">
                No disposition recorded yet. Select a decision and submit to finalize this record.
              </p>
            )}
            {!submitted && (
              <Button
                className="mt-5 w-full"
                disabled={!decision || !rationale.trim()}
                onClick={() => setSubmitted(true)}
              >
                Submit disposition
              </Button>
            )}
            {submitted && decision === "reject" && (
              <Button href={`/shipments/${shipment.id}/capa`} className="mt-5 w-full" variant="secondary">
                Open CAPA →
              </Button>
            )}
          </Card>

          <Card>
            <CardHeader eyebrow="Reference" title="Decision support" />
            <p className="text-sm leading-relaxed text-ink-soft dark:text-white/60">{investigation.decisionSupportNote}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
