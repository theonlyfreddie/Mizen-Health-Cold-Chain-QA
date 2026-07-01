export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-ink/15 px-6 py-14 text-center dark:border-white/15">
      <div className="mb-3 h-9 w-9 rounded-full border border-ink/15 dark:border-white/20" />
      <h3 className="font-display text-base font-medium text-ink dark:text-white">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-ink-faint dark:text-white/40">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
