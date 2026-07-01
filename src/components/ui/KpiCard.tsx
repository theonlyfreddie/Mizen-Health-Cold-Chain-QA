import { cx } from "@/lib/utils";
import Link from "next/link";

export function KpiCard({
  label,
  value,
  sub,
  tone = "neutral",
  href,
}: {
  label: string;
  value: string | number;
  sub?: string;
  tone?: "neutral" | "rust" | "gold" | "teal";
  href?: string;
}) {
  const accent: Record<string, string> = {
    neutral: "bg-ink-faint",
    rust: "bg-rust",
    gold: "bg-gold",
    teal: "bg-teal-500 dark:bg-teal-300",
  };
  const content = (
    <div className="group relative overflow-hidden rounded-lg border border-ink/[0.07] bg-white p-5 shadow-card transition-shadow hover:shadow-md dark:border-white/[0.06] dark:bg-night-card dark:shadow-none">
      <div className={cx("absolute left-0 top-0 h-full w-[3px]", accent[tone])} />
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint dark:text-white/40">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-medium text-ink dark:text-white">{value}</p>
      {sub && <p className="mt-1 text-xs text-ink-faint dark:text-white/40">{sub}</p>}
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}
