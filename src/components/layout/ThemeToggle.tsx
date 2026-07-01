"use client";
import { useEffect, useState } from "react";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("mizan-theme") : null;
    const isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("mizan-theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 text-ink-soft transition-colors hover:bg-ink/5 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5"
    >
      {dark ? (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.4"/></svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M17 11.5A7 7 0 1 1 8.5 3a5.5 5.5 0 0 0 8.5 8.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
      )}
      {!compact && <span className="sr-only">Toggle theme</span>}
    </button>
  );
}
