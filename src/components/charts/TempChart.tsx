"use client";
import { TemperatureLogPoint } from "@/lib/types";

export function TempChart({
  data,
  minTempC,
  maxTempC,
  height = 220,
}: {
  data: TemperatureLogPoint[];
  minTempC: number;
  maxTempC: number;
  height?: number;
}) {
  if (!data.length) return null;
  const width = 800;
  const temps = data.map((d) => d.tempC);
  const lo = Math.min(...temps, minTempC) - 2;
  const hi = Math.max(...temps, maxTempC) + 2;
  const x = (i: number) => (i / (data.length - 1)) * width;
  const y = (t: number) => height - ((t - lo) / (hi - lo)) * height;

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(d.tempC).toFixed(1)}`)
    .join(" ");

  const bandTop = y(maxTempC);
  const bandBottom = y(minTempC);

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" style={{ minWidth: 480 }}>
        <rect
          x={0}
          y={bandTop}
          width={width}
          height={bandBottom - bandTop}
          className="fill-teal-500/10 dark:fill-teal-400/10"
        />
        <line x1={0} x2={width} y1={bandTop} y2={bandTop} className="stroke-teal-500/40 dark:stroke-teal-300/40" strokeDasharray="4 4" strokeWidth={1} />
        <line x1={0} x2={width} y1={bandBottom} y2={bandBottom} className="stroke-teal-500/40 dark:stroke-teal-300/40" strokeDasharray="4 4" strokeWidth={1} />
        <path d={linePath} fill="none" className="stroke-rust dark:stroke-rust" strokeWidth={2} />
        {data.map((d, i) => {
          const out = d.tempC < minTempC || d.tempC > maxTempC;
          if (!out) return null;
          return <circle key={i} cx={x(i)} cy={y(d.tempC)} r={2.5} className="fill-rust" />;
        })}
      </svg>
      <div className="mt-2 flex items-center justify-between text-[11px] text-ink-faint dark:text-white/40">
        <span>{new Date(data[0].timestamp).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-teal-500/30" /> Validated range
          <span className="ml-3 h-2 w-2 rounded-full bg-rust" /> Out of range reading
        </span>
        <span>{new Date(data[data.length - 1].timestamp).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </div>
  );
}
