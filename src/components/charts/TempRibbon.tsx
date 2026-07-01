import { cx } from "@/lib/utils";

// Signature element: the "temperature ribbon" — a compact visual encoding
// of where a shipment's current reading sits relative to its validated
// storage band. Used across shipment cards, detail headers and the
// dashboard so temperature state is always legible at a glance.
export function TempRibbon({
  minTempC,
  maxTempC,
  currentTempC,
  compact = false,
}: {
  minTempC: number;
  maxTempC: number;
  currentTempC: number;
  compact?: boolean;
}) {
  const pad = (maxTempC - minTempC) * 0.6 || 4;
  const lo = minTempC - pad;
  const hi = maxTempC + pad;
  const pct = (t: number) => Math.min(100, Math.max(0, ((t - lo) / (hi - lo)) * 100));

  const bandStart = pct(minTempC);
  const bandEnd = pct(maxTempC);
  const markerPos = pct(currentTempC);
  const inRange = currentTempC >= minTempC && currentTempC <= maxTempC;

  return (
    <div className={cx("w-full", compact ? "py-1" : "py-2")}>
      <div className="relative h-2 w-full rounded-full bg-ink/[0.06] dark:bg-white/[0.08]">
        <div
          className="absolute top-0 h-2 rounded-full bg-teal-500/25 dark:bg-teal-400/25"
          style={{ left: `${bandStart}%`, width: `${Math.max(2, bandEnd - bandStart)}%` }}
        />
        <div
          className={cx(
            "absolute -top-1 h-4 w-[3px] -translate-x-1/2 rounded-full",
            inRange ? "bg-teal-600 dark:bg-teal-300" : "bg-rust"
          )}
          style={{ left: `${markerPos}%` }}
        />
      </div>
      {!compact && (
        <div className="mt-1.5 flex justify-between text-[11px] text-ink-faint dark:text-white/40">
          <span>{minTempC}°C</span>
          <span className={cx("font-mono font-medium", inRange ? "text-teal-600 dark:text-teal-300" : "text-rust")}>
            {currentTempC}°C
          </span>
          <span>{maxTempC}°C</span>
        </div>
      )}
    </div>
  );
}
