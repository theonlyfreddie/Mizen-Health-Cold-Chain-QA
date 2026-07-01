// src/lib/types.ts
// Core domain types for Mizan Health Cold Chain QA.
// These map closely to what would become Supabase tables later
// (see lib/supabase-stub.ts for integration notes).

export type ExcursionSeverity = "critical" | "major" | "minor" | "none";

export type ShipmentStatus =
  | "in_transit"
  | "excursion_open"
  | "under_investigation"
  | "quarantined"
  | "released"
  | "rejected"
  | "delivered";

export type StorageCondition =
  | "2-8C (Refrigerated)"
  | "-20C (Frozen)"
  | "15-25C (Controlled Room Temp)"
  | "-70C (Ultra-Cold)";

export type DispositionDecision =
  | "release"
  | "quarantine_pending_review"
  | "reject"
  | "rework_further_testing";

export type CapaStatus = "not_required" | "open" | "in_progress" | "pending_effectiveness_check" | "closed";

export type InvestigationStatus = "not_started" | "in_progress" | "pending_qa_review" | "complete";

export interface CustodyEvent {
  id: string;
  timestamp: string; // ISO
  location: string;
  actor: string;
  action: string;
  temperatureC: number | null;
}

export interface TemperatureLogPoint {
  timestamp: string; // ISO
  tempC: number;
}

export interface Comment {
  id: string;
  author: string;
  role: string;
  timestamp: string;
  body: string;
}

export interface Investigation {
  id: string;
  shipmentId: string;
  status: InvestigationStatus;
  incidentSummary: string;
  impactedProduct: string;
  impactedBatch: string;
  initialSeverity: ExcursionSeverity;
  potentialProductImpact: string;
  rootCause: string | null;
  rootCauseCategory:
    | "Equipment failure"
    | "Human error"
    | "Logistics delay"
    | "Packaging failure"
    | "Customs / border hold"
    | "Power outage"
    | "Unknown"
    | null;
  immediateContainmentAction: string;
  evidenceFiles: { name: string; type: string }[];
  qaReviewer: string;
  openedAt: string;
  dueAt: string;
  closedAt: string | null;
  decisionSupportNote: string;
  comments: Comment[];
  timeline: { timestamp: string; label: string; actor: string }[];
}

export interface Disposition {
  id: string;
  shipmentId: string;
  investigationId: string;
  decision: DispositionDecision;
  rationale: string;
  decidedBy: string;
  decidedAt: string;
  qualityRiskLevel: "low" | "medium" | "high";
  regulatoryRefs: string[]; // e.g. MOPH / NAFDAC / WHO PQS clauses referenced
}

export interface Capa {
  id: string;
  shipmentId: string;
  investigationId: string;
  required: boolean;
  status: CapaStatus;
  correctiveAction: string;
  preventiveAction: string;
  owner: string;
  dueDate: string;
  effectivenessCheck: string | null;
  effectivenessVerifiedAt: string | null;
  closureStatus: "open" | "verified_effective" | "closed_ineffective" | "closed";
  createdAt: string;
}

export interface Shipment {
  id: string;
  productName: string;
  batchLot: string;
  gtin: string;
  serialRange: string | null;
  isSerialized: boolean;
  origin: string;
  destination: string;
  storageCondition: StorageCondition;
  minTempC: number;
  maxTempC: number;
  currentTempC: number;
  excursionStart: string | null;
  excursionEnd: string | null;
  excursionSeverity: ExcursionSeverity;
  status: ShipmentStatus;
  linkedInvestigationId: string | null;
  linkedCapaId: string | null;
  linkedDispositionId: string | null;
  custodyEvents: CustodyEvent[];
  temperatureLog: TemperatureLogPoint[];
  carrier: string;
  unitsAffected: number;
  valueQAR: number;
  updatedAt: string;
}

export interface QaUser {
  id: string;
  name: string;
  role: string;
  initials: string;
  openInvestigations: number;
  openCapas: number;
}
