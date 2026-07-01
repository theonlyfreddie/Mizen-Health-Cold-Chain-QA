"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MizanWordmark } from "@/components/logo/MizanLogo";
import { navItems } from "./nav-items";
import { cx } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Sidebar() {
  const pathname = usePathname();
  const groups = Array.from(new Set(navItems.map((n) => n.group)));

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-ink/[0.07] bg-paper px-4 py-6 dark:border-white/[0.06] dark:bg-night lg:flex">
      <Link href="/dashboard" className="px-2">
        <MizanWordmark />
      </Link>

      <nav className="mt-9 flex-1 space-y-6">
        {groups.map((group) => (
          <div key={group}>
            <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint dark:text-white/30">
              {group}
            </p>
            <div className="space-y-0.5">
              {navItems
                .filter((n) => n.group === group)
                .map((item) => {
                  const active = pathname?.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cx(
                        "block rounded-md px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-teal-500/10 font-medium text-teal-700 dark:bg-teal-400/10 dark:text-teal-200"
                          : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink dark:text-white/55 dark:hover:bg-white/[0.05] dark:hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>

      <div className="flex items-center justify-between border-t border-ink/[0.07] pt-4 dark:border-white/[0.06]">
        <div className="flex items-center gap-2.5 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/15 text-xs font-medium text-teal-700 dark:bg-teal-400/15 dark:text-teal-200">
            FO
          </div>
          <div className="leading-tight">
            <p className="text-xs font-medium text-ink dark:text-white">Freddy Osei</p>
            <p className="text-[11px] text-ink-faint dark:text-white/40">QA Manager &amp; Auditor</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}
