import { cx } from "@/lib/utils";

type Tone = "neutral" | "teal" | "gold" | "rust" | "ink";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-ink/[0.06] text-ink-soft dark:bg-white/[0.08] dark:text-white/70",
  teal: "bg-teal-500/10 text-teal-600 dark:bg-teal-400/15 dark:text-teal-200",
  gold: "bg-gold/15 text-gold-deep dark:bg-gold/20 dark:text-gold-soft",
  rust: "bg-rust/10 text-rust dark:bg-rust/20 dark:text-rust-soft",
  ink: "bg-ink text-paper dark:bg-white dark:text-night",
};

const dotClasses: Record<Tone, string> = {
  neutral: "bg-ink-faint",
  teal: "bg-teal-500 dark:bg-teal-300",
  gold: "bg-gold-deep dark:bg-gold-soft",
  rust: "bg-rust",
  ink: "bg-paper dark:bg-night",
};

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  pulse = false,
  size = "md",
}: {
  children: React.ReactNode;
  tone?: Tone;
  dot?: boolean;
  pulse?: boolean;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full font-medium tracking-wide",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        toneClasses[tone]
      )}
    >
      {dot && (
        <span
          className={cx(
            "h-1.5 w-1.5 rounded-full",
            dotClasses[tone],
            pulse && "animate-pulse-dot"
          )}
        />
      )}
      {children}
    </span>
  );
}
