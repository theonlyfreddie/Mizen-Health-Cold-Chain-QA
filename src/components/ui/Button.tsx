import { cx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-400 dark:text-night dark:hover:bg-teal-300",
  secondary:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/30 hover:bg-ink/[0.03] dark:text-white dark:border-white/15 dark:hover:bg-white/5",
  ghost:
    "bg-transparent text-ink-soft hover:text-ink hover:bg-ink/[0.05] dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5",
  danger:
    "bg-rust text-white hover:bg-rust/90",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  onClick,
  href,
  disabled,
}: {
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}) {
  const classes = cx(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-night",
    size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2.5 text-sm",
    variants[variant],
    className
  );
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
