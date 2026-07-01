import { Badge } from "./Badge";
import { capaStatusMeta, investigationStatusMeta, severityMeta, shipmentStatusMeta } from "@/lib/status";
import { CapaStatus, ExcursionSeverity, InvestigationStatus, ShipmentStatus } from "@/lib/types";

export function ShipmentStatusBadge({ status }: { status: ShipmentStatus }) {
  const meta = shipmentStatusMeta[status];
  const pulse = status === "excursion_open";
  return (
    <Badge tone={meta.tone} dot pulse={pulse}>
      {meta.label}
    </Badge>
  );
}

export function SeverityBadge({ severity }: { severity: ExcursionSeverity }) {
  const meta = severityMeta[severity];
  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}

export function InvestigationStatusBadge({ status }: { status: InvestigationStatus }) {
  const meta = investigationStatusMeta[status];
  return (
    <Badge tone={meta.tone} dot>
      {meta.label}
    </Badge>
  );
}

export function CapaStatusBadge({ status }: { status: CapaStatus }) {
  const meta = capaStatusMeta[status];
  return (
    <Badge tone={meta.tone} dot>
      {meta.label}
    </Badge>
  );
}
