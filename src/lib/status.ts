// src/lib/status.ts
import { CapaStatus, DispositionDecision, ExcursionSeverity, InvestigationStatus, ShipmentStatus } from "./types";

export const shipmentStatusMeta: Record<ShipmentStatus, { label: string; tone: "neutral" | "teal" | "gold" | "rust" | "ink" }> = {
  in_transit: { label: "In transit", tone: "teal" },
  excursion_open: { label: "Excursion — open", tone: "rust" },
  under_investigation: { label: "Under investigation", tone: "gold" },
  quarantined: { label: "Quarantined", tone: "gold" },
  released: { label: "Released", tone: "teal" },
  rejected: { label: "Rejected", tone: "rust" },
  delivered: { label: "Delivered", tone: "neutral" },
};

export const severityMeta: Record<ExcursionSeverity, { label: string; tone: "neutral" | "teal" | "gold" | "rust" }> = {
  critical: { label: "Critical", tone: "rust" },
  major: { label: "Major", tone: "gold" },
  minor: { label: "Minor", tone: "teal" },
  none: { label: "No excursion", tone: "neutral" },
};

export const investigationStatusMeta: Record<InvestigationStatus, { label: string; tone: "neutral" | "teal" | "gold" | "rust" }> = {
  not_started: { label: "Not started", tone: "neutral" },
  in_progress: { label: "In progress", tone: "gold" },
  pending_qa_review: { label: "Pending QA review", tone: "gold" },
  complete: { label: "Complete", tone: "teal" },
};

export const capaStatusMeta: Record<CapaStatus, { label: string; tone: "neutral" | "teal" | "gold" | "rust" }> = {
  not_required: { label: "Not required", tone: "neutral" },
  open: { label: "Open", tone: "rust" },
  in_progress: { label: "In progress", tone: "gold" },
  pending_effectiveness_check: { label: "Pending effectiveness check", tone: "gold" },
  closed: { label: "Closed", tone: "teal" },
};

export const dispositionLabel: Record<DispositionDecision, string> = {
  release: "Release",
  quarantine_pending_review: "Quarantine — pending review",
  reject: "Reject",
  rework_further_testing: "Rework / further testing",
};
