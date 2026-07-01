import { cx } from "@/lib/utils";

export function Card({
  children,
  className,
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={cx(
        "rounded-lg border border-ink/[0.07] bg-white shadow-card",
        "dark:border-white/[0.06] dark:bg-night-card dark:shadow-none",
        padded && "p-5 sm:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint dark:text-white/40">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-lg font-medium text-ink dark:text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}
