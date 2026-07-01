"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SeverityBadge, InvestigationStatusBadge } from "@/components/ui/StatusBadges";
import { TempChart } from "@/components/charts/TempChart";
import { EmptyState } from "@/components/ui/EmptyState";
import { getInvestigationForShipment, getShipment } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

const rootCauseOptions = [
  "Equipment failure",
  "Human error",
  "Logistics delay",
  "Packaging failure",
  "Customs / border hold",
  "Power outage",
  "Unknown",
];

export default function InvestigationPage({ params }: { params: { id: string } }) {
  const shipment = getShipment(params.id);
  if (!shipment) notFound();
  const investigation = getInvestigationForShipment(shipment.id);

  const [rootCause, setRootCause] = useState(investigation?.rootCauseCategory ?? "");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(investigation?.comments ?? []);

  if (!investigation) {
    return (
      <div>
        <PageHeader eyebrow={`Shipment · ${shipment.id}`} title="Investigation" />
        <EmptyState
          title="No investigation opened"
          description="This shipment has no recorded excursion requiring investigation. Investigations are opened automatically when an alert is generated, or manually from the shipment record."
          action={<Button href={`/shipments/${shipment.id}`}>Back to shipment</Button>}
        />
      </div>
    );
  }

  function handleAddComment() {
    if (!comment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: `local-${prev.length}`,
        author: "Freddy Osei",
        role: "QA Manager & Auditor",
        timestamp: new Date().toISOString(),
        body: comment.trim(),
      },
    ]);
    setComment("");
  }

  return (
    <div>
      <PageHeader
        eyebrow={`Investigation · ${investigation.id}`}
        title={shipment.productName}
        description={`Batch ${shipment.batchLot} — opened ${formatDateTime(investigation.openedAt)} by ${investigation.qaReviewer}`}
        action={
          <>
            <InvestigationStatusBadge status={investigation.status} />
            <SeverityBadge severity={investigation.initialSeverity} />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader eyebrow="Step 1" title="Incident summary" />
            <p className="text-sm leading-relaxed text-ink-soft dark:text-white/60">{investigation.incidentSummary}</p>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-ink/[0.07] pt-5 text-sm dark:border-white/[0.06]">
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-faint dark:text-white/35">Impacted product</p>
                <p className="mt-1 font-medium text-ink dark:text-white">{investigation.impactedProduct}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-faint dark:text-white/35">Impacted batch</p>
                <p className="mt-1 font-mono font-medium text-ink dark:text-white">{investigation.impactedBatch}</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="Step 2" title="Temperature event log" />
            <TempChart data={shipment.temperatureLog} minTempC={shipment.minTempC} maxTempC={shipment.maxTempC} />
          </Card>

          <Card>
            <CardHeader eyebrow="Step 3" title="Severity &amp; potential product impact" />
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xs text-ink-faint dark:text-white/40">Initial classification:</span>
              <SeverityBadge severity={investigation.initialSeverity} />
            </div>
            <p className="text-sm leading-relaxed text-ink-soft dark:text-white/60">{investigation.potentialProductImpact}</p>
          </Card>

          <Card>
            <CardHeader eyebrow="Step 4" title="Root cause" />
            <div className="mb-4 flex flex-wrap gap-2">
              {rootCauseOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setRootCause(opt)}
                  className={
                    rootCause === opt
                      ? "rounded-full border border-teal-500 bg-teal-500/10 px-3 py-1.5 text-xs font-medium text-teal-700 dark:border-teal-300 dark:bg-teal-400/10 dark:text-teal-200"
                      : "rounded-full border border-ink/12 px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-ink/25 dark:border-white/15 dark:text-white/55"
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
            {investigation.rootCause && (
              <p className="text-sm leading-relaxed text-ink-soft dark:text-white/60">{investigation.rootCause}</p>
            )}
          </Card>

          <Card>
            <CardHeader eyebrow="Step 5" title="Immediate containment action" />
            <p className="text-sm leading-relaxed text-ink-soft dark:text-white/60">{investigation.immediateContainmentAction}</p>
          </Card>

          <Card>
            <CardHeader eyebrow="Step 6" title="Evidence" />
            <div className="space-y-2">
              {investigation.evidenceFiles.length === 0 && (
                <p className="text-sm text-ink-faint dark:text-white/40">No evidence attached yet.</p>
              )}
              {investigation.evidenceFiles.map((f) => (
                <div
                  key={f.name}
                  className="flex items-center justify-between rounded-md border border-ink/10 px-3.5 py-2.5 text-sm dark:border-white/10"
                >
                  <span className="font-mono text-xs text-ink dark:text-white">{f.name}</span>
                  <span className="text-[11px] uppercase tracking-wide text-ink-faint dark:text-white/35">{f.type}</span>
                </div>
              ))}
              <button className="mt-2 w-full rounded-md border border-dashed border-ink/20 py-3 text-xs text-ink-faint transition-colors hover:border-teal-500 hover:text-teal-600 dark:border-white/20 dark:text-white/40 dark:hover:border-teal-300 dark:hover:text-teal-300">
                + Attach evidence (datalogger export, photos, correspondence)
              </button>
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="Discussion" title="Comment thread" />
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-[11px] font-medium text-teal-700 dark:bg-teal-400/15 dark:text-teal-200">
                    {c.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <p className="text-sm font-medium text-ink dark:text-white">{c.author}</p>
                      <p className="text-[11px] text-ink-faint dark:text-white/35">{formatDateTime(c.timestamp)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-ink-soft dark:text-white/55">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-2 border-t border-ink/[0.07] pt-4 dark:border-white/[0.06]">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment for the investigation record…"
                className="flex-1 rounded-md border border-ink/15 bg-white px-3.5 py-2 text-sm outline-none focus:border-teal-500 dark:border-white/15 dark:bg-night-card dark:text-white"
              />
              <Button size="sm" onClick={handleAddComment}>
                Post
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-teal-500/30 bg-teal-500/[0.04] dark:border-teal-300/20 dark:bg-teal-400/[0.06]">
            <CardHeader eyebrow="Decision support" title="QA recommendation" />
            <p className="text-sm leading-relaxed text-ink-soft dark:text-white/60">{investigation.decisionSupportNote}</p>
            <Button href={`/shipments/${shipment.id}/disposition`} className="mt-5 w-full">
              Proceed to disposition
            </Button>
          </Card>

          <Card>
            <CardHeader eyebrow="Assignment" title="QA reviewer" />
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500/10 text-xs font-medium text-teal-700 dark:bg-teal-400/15 dark:text-teal-200">
                {investigation.qaReviewer.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-medium text-ink dark:text-white">{investigation.qaReviewer}</p>
                <p className="text-xs text-ink-faint dark:text-white/40">Due {formatDateTime(investigation.dueAt)}</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="Record" title="Timeline" />
            <ol className="space-y-4">
              {investigation.timeline.map((t, i) => (
                <li key={i} className="relative flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-500 dark:bg-teal-300" />
                    {i < investigation.timeline.length - 1 && <span className="mt-1 w-px flex-1 bg-ink/10 dark:bg-white/10" />}
                  </div>
                  <div className="pb-3">
                    <p className="text-xs font-medium text-ink dark:text-white">{t.label}</p>
                    <p className="text-[11px] text-ink-faint dark:text-white/35">
                      {formatDateTime(t.timestamp)} · {t.actor}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
