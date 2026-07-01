// Custom mark for Mizan Health: "mizan" (ميزان) means scale/balance in Arabic —
// rendered here as a balanced beam holding a droplet and a temperature mark,
// evoking the QA equilibrium between product integrity and cold-chain risk.
export function MizanLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="20" cy="20" r="19" className="stroke-current" strokeWidth="1" opacity="0.25" />
      <line x1="20" y1="9" x2="20" y2="27" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="9" y1="14" x2="31" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 14 L5.5 21 a4 4 0 0 0 7 0 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <path d="M31 14 L27.5 21 a4 4 0 0 0 7 0 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <path d="M20 27 L14 32 h12 Z" fill="currentColor" />
      <circle cx="20" cy="9" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function MizanWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <MizanLogo className="h-6 w-6 text-teal-500 dark:text-teal-300" />
      <span className="font-display text-[17px] font-medium tracking-tight text-ink dark:text-white">
        Mizan Health
      </span>
    </div>
  );
}
