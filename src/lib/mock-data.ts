// src/lib/mock-data.ts
// Seeded sample records for demo purposes.
// In production, these would be fetched from Supabase tables:
// shipments, investigations, dispositions, capas, custody_events, qa_users.
// See lib/supabase-stub.ts for where each query would be introduced.

import {
  Capa,
  Disposition,
  Investigation,
  QaUser,
  Shipment,
  TemperatureLogPoint,
} from "./types";

function genTempLog(
  base: number,
  hours: number,
  excursionAtHour: number | null,
  excursionDeltaC: number,
  excursionDurationH: number
): TemperatureLogPoint[] {
  const points: TemperatureLogPoint[] = [];
  const start = new Date("2026-06-24T06:00:00Z").getTime();
  for (let h = 0; h <= hours; h++) {
    let temp = base + Math.sin(h / 2) * 0.4;
    if (
      excursionAtHour !== null &&
      h >= excursionAtHour &&
      h <= excursionAtHour + excursionDurationH
    ) {
      temp = base + excursionDeltaC;
    }
    points.push({
      timestamp: new Date(start + h * 3600 * 1000).toISOString(),
      tempC: Math.round(temp * 10) / 10,
    });
  }
  return points;
}

export const qaUsers: QaUser[] = [
  { id: "u1", name: "Freddy Osei", role: "QA Manager & Auditor", initials: "FO", openInvestigations: 2, openCapas: 1 },
  { id: "u2", name: "Layla Hassan", role: "QA Reviewer", initials: "LH", openInvestigations: 1, openCapas: 1 },
  { id: "u3", name: "Tariq Al-Sayed", role: "Warehouse QA Lead", initials: "TA", openInvestigations: 1, openCapas: 0 },
  { id: "u4", name: "Sanjee Pillai", role: "Temperature Mapping Specialist", initials: "SP", openInvestigations: 0, openCapas: 1 },
];

export const shipments: Shipment[] = [
  {
    id: "SHP-10231",
    productName: "Comirnaty Bivalent (mRNA Vaccine)",
    batchLot: "FF8923",
    gtin: "00380777400015",
    serialRange: "SN-441200–SN-441680",
    isSerialized: true,
    origin: "Doha Hamad Int'l Cargo Hub",
    destination: "Al Wakra Health Center",
    storageCondition: "-20C (Frozen)",
    minTempC: -25,
    maxTempC: -15,
    currentTempC: -6.2,
    excursionStart: "2026-06-25T03:00:00Z",
    excursionEnd: "2026-06-25T07:30:00Z",
    excursionSeverity: "critical",
    status: "excursion_open",
    linkedInvestigationId: "INV-3301",
    linkedCapaId: "CAPA-2201",
    linkedDispositionId: null,
    custodyEvents: [
      { id: "c1", timestamp: "2026-06-24T06:10:00Z", location: "Doha Cold Store A", actor: "Tariq Al-Sayed", action: "Released for transport", temperatureC: -21.0 },
      { id: "c2", timestamp: "2026-06-25T02:40:00Z", location: "In transit — Salwa Rd corridor", actor: "Carrier: ColdLine Qatar", action: "Reefer unit fault flagged", temperatureC: -14.1 },
      { id: "c3", timestamp: "2026-06-25T07:45:00Z", location: "Al Wakra Health Center", actor: "Layla Hassan", action: "Shipment received, quarantined on arrival", temperatureC: -6.2 },
    ],
    temperatureLog: genTempLog(-21, 30, 21, 15, 4.5),
    carrier: "ColdLine Qatar",
    unitsAffected: 4800,
    valueQAR: 612000,
    updatedAt: "2026-06-25T07:50:00Z",
  },
  {
    id: "SHP-10198",
    productName: "Insulin Glargine (Lantus)",
    batchLot: "LG7741",
    gtin: "00088264100123",
    serialRange: null,
    isSerialized: false,
    origin: "Doha Central Distribution",
    destination: "Hamad General Hospital Pharmacy",
    storageCondition: "2-8C (Refrigerated)",
    minTempC: 2,
    maxTempC: 8,
    currentTempC: 5.1,
    excursionStart: "2026-06-23T11:00:00Z",
    excursionEnd: "2026-06-23T12:40:00Z",
    excursionSeverity: "minor",
    status: "under_investigation",
    linkedInvestigationId: "INV-3299",
    linkedCapaId: null,
    linkedDispositionId: null,
    custodyEvents: [
      { id: "c4", timestamp: "2026-06-23T08:00:00Z", location: "Doha Central Distribution", actor: "Tariq Al-Sayed", action: "Released for transport", temperatureC: 5.0 },
      { id: "c5", timestamp: "2026-06-23T11:05:00Z", location: "Loading dock — door left open", actor: "Carrier: Gulf Pharma Logistics", action: "Door-open excursion logged by data logger", temperatureC: 9.4 },
      { id: "c6", timestamp: "2026-06-23T13:10:00Z", location: "Hamad General Hospital Pharmacy", actor: "Layla Hassan", action: "Received, flagged for review", temperatureC: 5.1 },
    ],
    temperatureLog: genTempLog(5, 28, 11, 4.4, 1.5),
    carrier: "Gulf Pharma Logistics",
    unitsAffected: 1200,
    valueQAR: 94000,
    updatedAt: "2026-06-23T13:15:00Z",
  },
  {
    id: "SHP-10172",
    productName: "Pfizer Paxlovid (Oral Antiviral)",
    batchLot: "PX2210",
    gtin: "00069321500088",
    serialRange: "SN-220011–SN-220410",
    isSerialized: true,
    origin: "Doha Central Distribution",
    destination: "Al Khor Pharmacy Branch",
    storageCondition: "15-25C (Controlled Room Temp)",
    minTempC: 15,
    maxTempC: 25,
    currentTempC: 21.0,
    excursionStart: null,
    excursionEnd: null,
    excursionSeverity: "none",
    status: "in_transit",
    linkedInvestigationId: null,
    linkedCapaId: null,
    linkedDispositionId: null,
    custodyEvents: [
      { id: "c7", timestamp: "2026-06-25T05:00:00Z", location: "Doha Central Distribution", actor: "Tariq Al-Sayed", action: "Released for transport", temperatureC: 20.4 },
    ],
    temperatureLog: genTempLog(21, 10, null, 0, 0),
    carrier: "Gulf Pharma Logistics",
    unitsAffected: 3000,
    valueQAR: 187000,
    updatedAt: "2026-06-25T05:05:00Z",
  },
  {
    id: "SHP-10144",
    productName: "Octagam Immunoglobulin",
    batchLot: "OG5567",
    gtin: "00310044200071",
    serialRange: null,
    isSerialized: false,
    origin: "Frankfurt — Doha Air Cargo",
    destination: "Sidra Medicine Pharmacy",
    storageCondition: "2-8C (Refrigerated)",
    minTempC: 2,
    maxTempC: 8,
    currentTempC: 4.8,
    excursionStart: "2026-06-20T14:00:00Z",
    excursionEnd: "2026-06-20T19:00:00Z",
    excursionSeverity: "major",
    status: "released",
    linkedInvestigationId: "INV-3284",
    linkedCapaId: "CAPA-2188",
    linkedDispositionId: "DISP-5510",
    custodyEvents: [
      { id: "c8", timestamp: "2026-06-20T02:00:00Z", location: "Frankfurt FRA Cargo", actor: "DHL Pharma Cold Chain", action: "Released for air transport", temperatureC: 5.2 },
      { id: "c9", timestamp: "2026-06-20T14:10:00Z", location: "Doha HIA Customs Hold", actor: "Customs / Border Control", action: "Customs hold — delayed tarmac transfer", temperatureC: 9.8 },
      { id: "c10", timestamp: "2026-06-20T19:30:00Z", location: "Sidra Medicine Pharmacy", actor: "Freddy Osei", action: "Investigation closed, batch released with rationale", temperatureC: 4.8 },
    ],
    temperatureLog: genTempLog(5, 36, 32, 4.6, 5),
    carrier: "DHL Pharma Cold Chain",
    unitsAffected: 600,
    valueQAR: 256000,
    updatedAt: "2026-06-21T09:00:00Z",
  },
  {
    id: "SHP-10119",
    productName: "Humira (Adalimumab) Pre-filled Pens",
    batchLot: "HM9012",
    gtin: "00074222900456",
    serialRange: "SN-991001–SN-991240",
    isSerialized: true,
    origin: "Doha Central Distribution",
    destination: "Al Rayyan Specialty Pharmacy",
    storageCondition: "2-8C (Refrigerated)",
    minTempC: 2,
    maxTempC: 8,
    currentTempC: 15.6,
    excursionStart: "2026-06-19T09:00:00Z",
    excursionEnd: "2026-06-19T22:00:00Z",
    excursionSeverity: "critical",
    status: "rejected",
    linkedInvestigationId: "INV-3260",
    linkedCapaId: "CAPA-2160",
    linkedDispositionId: "DISP-5489",
    custodyEvents: [
      { id: "c11", timestamp: "2026-06-19T07:30:00Z", location: "Doha Central Distribution", actor: "Tariq Al-Sayed", action: "Released for transport", temperatureC: 5.4 },
      { id: "c12", timestamp: "2026-06-19T09:15:00Z", location: "Reefer unit, Al Rayyan route", actor: "Carrier: ColdLine Qatar", action: "Reefer compressor failure — no power redundancy", temperatureC: 16.9 },
      { id: "c13", timestamp: "2026-06-19T22:40:00Z", location: "Al Rayyan Specialty Pharmacy", actor: "Freddy Osei", action: "Batch rejected — stability exceedance confirmed", temperatureC: 15.6 },
    ],
    temperatureLog: genTempLog(5, 40, 33, 11, 13),
    carrier: "ColdLine Qatar",
    unitsAffected: 2100,
    valueQAR: 980000,
    updatedAt: "2026-06-20T08:00:00Z",
  },
  {
    id: "SHP-10260",
    productName: "Synflorix (Pneumococcal Vaccine)",
    batchLot: "SF4471",
    gtin: "00310099400321",
    serialRange: "SN-771200–SN-771640",
    isSerialized: true,
    origin: "Doha Central Distribution",
    destination: "Primary Health Care Corp — Umm Salal",
    storageCondition: "2-8C (Refrigerated)",
    minTempC: 2,
    maxTempC: 8,
    currentTempC: 5.0,
    excursionStart: null,
    excursionEnd: null,
    excursionSeverity: "none",
    status: "delivered",
    linkedInvestigationId: null,
    linkedCapaId: null,
    linkedDispositionId: null,
    custodyEvents: [
      { id: "c14", timestamp: "2026-06-22T07:00:00Z", location: "Doha Central Distribution", actor: "Tariq Al-Sayed", action: "Released for transport", temperatureC: 5.0 },
      { id: "c15", timestamp: "2026-06-22T09:20:00Z", location: "Primary Health Care Corp — Umm Salal", actor: "Layla Hassan", action: "Received, no excursion, accepted", temperatureC: 5.0 },
    ],
    temperatureLog: genTempLog(5, 12, null, 0, 0),
    carrier: "Gulf Pharma Logistics",
    unitsAffected: 1800,
    valueQAR: 142000,
    updatedAt: "2026-06-22T09:25:00Z",
  },
  {
    id: "SHP-10277",
    productName: "Keytruda (Pembrolizumab)",
    batchLot: "KT3390",
    gtin: "00006077500190",
    serialRange: "SN-100201–SN-100260",
    isSerialized: true,
    origin: "Doha Central Distribution",
    destination: "National Center for Cancer Care",
    storageCondition: "2-8C (Refrigerated)",
    minTempC: 2,
    maxTempC: 8,
    currentTempC: 9.6,
    excursionStart: "2026-06-26T01:00:00Z",
    excursionEnd: null,
    excursionSeverity: "major",
    status: "excursion_open",
    linkedInvestigationId: "INV-3312",
    linkedCapaId: null,
    linkedDispositionId: null,
    custodyEvents: [
      { id: "c16", timestamp: "2026-06-25T22:00:00Z", location: "Doha Central Distribution", actor: "Tariq Al-Sayed", action: "Released for transport", temperatureC: 5.1 },
      { id: "c17", timestamp: "2026-06-26T01:10:00Z", location: "In transit — West Bay corridor", actor: "Carrier: ColdLine Qatar", action: "Excursion alert triggered, carrier notified", temperatureC: 9.6 },
    ],
    temperatureLog: genTempLog(5, 8, 6, 4.6, 2),
    carrier: "ColdLine Qatar",
    unitsAffected: 90,
    valueQAR: 410000,
    updatedAt: "2026-06-26T01:15:00Z",
  },
];

export const investigations: Investigation[] = [
  {
    id: "INV-3301",
    shipmentId: "SHP-10231",
    status: "in_progress",
    incidentSummary:
      "Reefer unit on ColdLine Qatar vehicle CL-118 lost compressor function en route to Al Wakra Health Center. Internal trailer temperature rose from -21.0C to -6.0C over approximately 4.5 hours before driver alert was actioned.",
    impactedProduct: "Comirnaty Bivalent (mRNA Vaccine)",
    impactedBatch: "FF8923",
    initialSeverity: "critical",
    potentialProductImpact:
      "mRNA vaccine stability is highly time/temperature dependent above -15C. Manufacturer stability data permits short-term excursions to 2-8C for max 24h cumulative; -6C for 4.5h falls outside frozen-state stability claims and requires manufacturer consultation.",
    rootCause: null,
    rootCauseCategory: "Equipment failure",
    immediateContainmentAction:
      "Full batch quarantined on arrival. Adjacent batches on same vehicle (FF8924, FF8925) placed on hold pending review. Carrier vehicle CL-118 pulled from cold-chain rotation.",
    evidenceFiles: [
      { name: "CL-118_reefer_fault_log.pdf", type: "pdf" },
      { name: "datalogger_export_SHP-10231.csv", type: "csv" },
    ],
    qaReviewer: "Freddy Osei",
    openedAt: "2026-06-25T08:00:00Z",
    dueAt: "2026-06-27T08:00:00Z",
    closedAt: null,
    decisionSupportNote:
      "Manufacturer stability dossier for Comirnaty does not cover excursions above -15C while frozen. Recommend reject pending manufacturer technical confirmation, as time-out-of-range exceeds validated short-term allowance.",
    comments: [
      {
        id: "cm1",
        author: "Sanjee Pillai",
        role: "Temperature Mapping Specialist",
        timestamp: "2026-06-25T09:10:00Z",
        body: "Pulled the datalogger export — confirms a clean monotonic rise, consistent with compressor loss rather than sensor fault. Vehicle CL-118 is now overdue for its quarterly mapping study.",
      },
      {
        id: "cm2",
        author: "Freddy Osei",
        role: "QA Manager & Auditor",
        timestamp: "2026-06-25T10:05:00Z",
        body: "Agreed. Escalating to manufacturer medical/technical affairs for a stability opinion before we finalize disposition. Holding the two adjacent batches in the meantime.",
      },
    ],
    timeline: [
      { timestamp: "2026-06-25T07:50:00Z", label: "Excursion alert generated", actor: "System" },
      { timestamp: "2026-06-25T08:00:00Z", label: "Investigation opened", actor: "Freddy Osei" },
      { timestamp: "2026-06-25T08:05:00Z", label: "Batch quarantined", actor: "Layla Hassan" },
      { timestamp: "2026-06-25T09:10:00Z", label: "Datalogger evidence attached", actor: "Sanjee Pillai" },
    ],
  },
  {
    id: "INV-3299",
    shipmentId: "SHP-10198",
    status: "pending_qa_review",
    incidentSummary:
      "Loading dock door left open for approx. 1h40m during cross-dock transfer, causing ambient air ingress into refrigerated trailer. Logger recorded a peak of 9.4C against a 2-8C label claim.",
    impactedProduct: "Insulin Glargine (Lantus)",
    impactedBatch: "LG7741",
    initialSeverity: "minor",
    potentialProductImpact:
      "Insulin glargine manufacturer guidance permits brief excursions up to 25C for up to 28 days cumulative (in-use stability). A single 1h40m excursion to 9.4C is within validated tolerance.",
    rootCause: "Dock procedure not followed — door interlock override used during high-traffic period.",
    rootCauseCategory: "Human error",
    immediateContainmentAction:
      "Shipment held at receiving dock pending QA sign-off. Dock supervisor briefed on interlock procedure same day.",
    evidenceFiles: [{ name: "dock_cctv_timestamp_extract.pdf", type: "pdf" }],
    qaReviewer: "Layla Hassan",
    openedAt: "2026-06-23T13:20:00Z",
    dueAt: "2026-06-25T13:20:00Z",
    closedAt: null,
    decisionSupportNote:
      "Excursion duration and peak are within manufacturer in-use stability allowance. Recommend release with documented rationale; no CAPA required given isolated, low-severity, procedural cause already corrected at source.",
    comments: [
      {
        id: "cm3",
        author: "Layla Hassan",
        role: "QA Reviewer",
        timestamp: "2026-06-23T14:00:00Z",
        body: "Manufacturer stability letter on file supports release. Drafting disposition for Freddy's review today.",
      },
    ],
    timeline: [
      { timestamp: "2026-06-23T13:15:00Z", label: "Excursion alert generated", actor: "System" },
      { timestamp: "2026-06-23T13:20:00Z", label: "Investigation opened", actor: "Layla Hassan" },
      { timestamp: "2026-06-23T14:00:00Z", label: "Root cause confirmed", actor: "Layla Hassan" },
    ],
  },
  {
    id: "INV-3284",
    shipmentId: "SHP-10144",
    status: "complete",
    incidentSummary:
      "Customs hold at Hamad International Airport tarmac delayed cold-chain transfer by 5 hours, with shipment left in a non-refrigerated holding area.",
    impactedProduct: "Octagam Immunoglobulin",
    impactedBatch: "OG5567",
    initialSeverity: "major",
    potentialProductImpact:
      "Manufacturer permits up to 7 days cumulative at up to 25C for this immunoglobulin product. 5-hour excursion to 9.8C is well within tolerance.",
    rootCause: "Customs documentation mismatch delayed tarmac release; no temperature-control contingency invoked by ground handler.",
    rootCauseCategory: "Customs / border hold",
    immediateContainmentAction: "Shipment moved to refrigerated holding immediately on release; full chain-of-custody reconstructed from air waybill and logger.",
    evidenceFiles: [
      { name: "customs_release_form.pdf", type: "pdf" },
      { name: "manufacturer_stability_letter_OG5567.pdf", type: "pdf" },
    ],
    qaReviewer: "Freddy Osei",
    openedAt: "2026-06-20T20:00:00Z",
    dueAt: "2026-06-22T20:00:00Z",
    closedAt: "2026-06-21T09:00:00Z",
    decisionSupportNote:
      "Within manufacturer-validated excursion tolerance. Released with rationale documented; CAPA opened to address ground handler temperature-control contingency gap.",
    comments: [],
    timeline: [
      { timestamp: "2026-06-20T19:35:00Z", label: "Excursion alert generated", actor: "System" },
      { timestamp: "2026-06-20T20:00:00Z", label: "Investigation opened", actor: "Freddy Osei" },
      { timestamp: "2026-06-21T08:40:00Z", label: "Disposition: release", actor: "Freddy Osei" },
      { timestamp: "2026-06-21T09:00:00Z", label: "Investigation closed", actor: "Freddy Osei" },
    ],
  },
  {
    id: "INV-3260",
    shipmentId: "SHP-10119",
    status: "complete",
    incidentSummary:
      "Reefer compressor failure on route to Al Rayyan with no power redundancy; internal temperature reached 16.9C and remained elevated for over 12 hours before discovery at delivery.",
    impactedProduct: "Humira (Adalimumab) Pre-filled Pens",
    impactedBatch: "HM9012",
    initialSeverity: "critical",
    potentialProductImpact:
      "Adalimumab is a biologic with strict cold-chain dependency; manufacturer data does not support excursions above 25C for any duration, and 13 hours above label range constitutes a confirmed stability breach.",
    rootCause: "Vehicle CL-204 reefer unit had an overdue preventive maintenance service; no backup power module fitted.",
    rootCauseCategory: "Equipment failure",
    immediateContainmentAction: "Full batch rejected on arrival; carrier vehicle grounded pending maintenance audit.",
    evidenceFiles: [{ name: "CL-204_maintenance_history.pdf", type: "pdf" }],
    qaReviewer: "Freddy Osei",
    openedAt: "2026-06-19T23:00:00Z",
    dueAt: "2026-06-21T23:00:00Z",
    closedAt: "2026-06-20T08:00:00Z",
    decisionSupportNote: "Confirmed stability breach outside all manufacturer tolerances. Reject, full batch, no further testing applicable.",
    comments: [],
    timeline: [
      { timestamp: "2026-06-19T22:45:00Z", label: "Excursion alert generated", actor: "System" },
      { timestamp: "2026-06-19T23:00:00Z", label: "Investigation opened", actor: "Freddy Osei" },
      { timestamp: "2026-06-20T07:30:00Z", label: "Disposition: reject", actor: "Freddy Osei" },
      { timestamp: "2026-06-20T08:00:00Z", label: "Investigation closed", actor: "Freddy Osei" },
    ],
  },
  {
    id: "INV-3312",
    shipmentId: "SHP-10277",
    status: "in_progress",
    incidentSummary:
      "Active excursion in progress on ColdLine Qatar vehicle CL-118 (same unit flagged in INV-3301) en route to National Center for Cancer Care. Current temperature 9.6C against 2-8C label.",
    impactedProduct: "Keytruda (Pembrolizumab)",
    impactedBatch: "KT3390",
    initialSeverity: "major",
    potentialProductImpact: "Manufacturer permits up to 96 hours cumulative at up to 25C. Excursion is ongoing; impact assessment pending resolution time.",
    rootCause: null,
    rootCauseCategory: null,
    immediateContainmentAction: "Carrier instructed to divert to nearest QA-approved cold store for immediate re-icing and inspection.",
    evidenceFiles: [],
    qaReviewer: "Freddy Osei",
    openedAt: "2026-06-26T01:20:00Z",
    dueAt: "2026-06-28T01:20:00Z",
    closedAt: null,
    decisionSupportNote: "Awaiting carrier diversion confirmation before severity can be finalized. Vehicle CL-118 should be flagged for fleet-wide maintenance review given repeat fault.",
    comments: [
      {
        id: "cm4",
        author: "Freddy Osei",
        role: "QA Manager & Auditor",
        timestamp: "2026-06-26T01:25:00Z",
        body: "Second excursion this week on CL-118. Recommend this vehicle is grounded fleet-wide pending the CAPA-2201 root cause finding, not just this route.",
      },
    ],
    timeline: [
      { timestamp: "2026-06-26T01:15:00Z", label: "Excursion alert generated", actor: "System" },
      { timestamp: "2026-06-26T01:20:00Z", label: "Investigation opened", actor: "Freddy Osei" },
    ],
  },
];

export const dispositions: Disposition[] = [
  {
    id: "DISP-5510",
    shipmentId: "SHP-10144",
    investigationId: "INV-3284",
    decision: "release",
    rationale:
      "5-hour excursion to 9.8C during customs hold falls within manufacturer-validated stability tolerance of 7 cumulative days at up to 25C. Full chain-of-custody and temperature logger evidence support release without further testing.",
    decidedBy: "Freddy Osei",
    decidedAt: "2026-06-21T08:40:00Z",
    qualityRiskLevel: "low",
    regulatoryRefs: ["MOPH Cold Chain Directive 4.2", "WHO PQS E006/RF05 stability annex"],
  },
  {
    id: "DISP-5489",
    shipmentId: "SHP-10119",
    investigationId: "INV-3260",
    decision: "reject",
    rationale:
      "13-hour excursion to 16.9C confirmed outside all manufacturer-validated stability claims for adalimumab. No retest or rework pathway available for biologic stability breach of this magnitude. Full batch rejected and scheduled for destruction per SOP-QA-014.",
    decidedBy: "Freddy Osei",
    decidedAt: "2026-06-20T07:30:00Z",
    qualityRiskLevel: "high",
    regulatoryRefs: ["MOPH Cold Chain Directive 4.2", "Manufacturer Technical Bulletin HM-TB-22"],
  },
];

export const capas: Capa[] = [
  {
    id: "CAPA-2201",
    shipmentId: "SHP-10231",
    investigationId: "INV-3301",
    required: true,
    status: "in_progress",
    correctiveAction:
      "Ground vehicle CL-118 fleet-wide and perform full reefer unit diagnostic and compressor replacement before return to cold-chain rotation.",
    preventiveAction:
      "Bring forward quarterly temperature mapping schedule for all ColdLine Qatar vehicles to monthly for Q3 2026; require dual-sensor redundancy with driver-facing alert above 2C deviation.",
    owner: "Sanjee Pillai",
    dueDate: "2026-07-10T00:00:00Z",
    effectivenessCheck: null,
    effectivenessVerifiedAt: null,
    closureStatus: "open",
    createdAt: "2026-06-25T10:10:00Z",
  },
  {
    id: "CAPA-2188",
    shipmentId: "SHP-10144",
    investigationId: "INV-3284",
    required: true,
    status: "pending_effectiveness_check",
    correctiveAction: "Ground handler briefed on mandatory refrigerated holding contingency for any customs-related cargo delay exceeding 60 minutes.",
    preventiveAction: "New SLA clause added to ground handling contract requiring temperature-controlled holding bay access within 30 minutes of customs flag.",
    owner: "Freddy Osei",
    dueDate: "2026-07-05T00:00:00Z",
    effectivenessCheck: "Review next 90 days of customs-hold shipments for recurrence.",
    effectivenessVerifiedAt: null,
    closureStatus: "open",
    createdAt: "2026-06-21T09:05:00Z",
  },
  {
    id: "CAPA-2160",
    shipmentId: "SHP-10119",
    investigationId: "INV-3260",
    required: true,
    status: "closed",
    correctiveAction: "Vehicle CL-204 removed from service; reefer unit and backup power module replaced.",
    preventiveAction: "All cold-chain vehicles retrofitted with backup power modules; preventive maintenance interval reduced from 6 to 3 months fleet-wide.",
    owner: "Tariq Al-Sayed",
    dueDate: "2026-06-30T00:00:00Z",
    effectivenessCheck: "Zero equipment-related excursions across fleet for 30 days post-retrofit.",
    effectivenessVerifiedAt: "2026-06-29T00:00:00Z",
    closureStatus: "verified_effective",
    createdAt: "2026-06-20T08:10:00Z",
  },
];

export function getShipment(id: string) {
  return shipments.find((s) => s.id === id);
}
export function getInvestigationForShipment(shipmentId: string) {
  return investigations.find((i) => i.shipmentId === shipmentId);
}
export function getDispositionForShipment(shipmentId: string) {
  return dispositions.find((d) => d.shipmentId === shipmentId);
}
export function getCapaForShipment(shipmentId: string) {
  return capas.find((c) => c.shipmentId === shipmentId);
}
