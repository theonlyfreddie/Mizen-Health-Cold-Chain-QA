"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/utils";
import { navItems } from "./nav-items";

const mobileItems = navItems.filter((n) =>
  ["/dashboard", "/alerts", "/shipments", "/capa", "/audit"].includes(n.href)
);

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink/[0.08] bg-white/95 backdrop-blur dark:border-white/[0.08] dark:bg-night/95 lg:hidden">
      {mobileItems.map((item) => {
        const active = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cx(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[10.5px] font-medium",
              active ? "text-teal-600 dark:text-teal-300" : "text-ink-faint dark:text-white/40"
            )}
          >
            <span className={cx("h-1.5 w-1.5 rounded-full", active ? "bg-teal-600 dark:bg-teal-300" : "bg-transparent")} />
            {item.label.split(" ")[0]}
          </Link>
        );
      })}
    </nav>
  );
}
