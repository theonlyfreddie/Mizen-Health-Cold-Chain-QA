import Link from "next/link";
import { MizanWordmark } from "@/components/logo/MizanLogo";
import { ThemeToggle } from "./ThemeToggle";

export function MobileTopBar() {
  return (
    <header className="flex items-center justify-between border-b border-ink/[0.07] bg-paper px-4 py-3.5 dark:border-white/[0.06] dark:bg-night lg:hidden">
      <Link href="/dashboard">
        <MizanWordmark />
      </Link>
      <ThemeToggle compact />
    </header>
  );
}
