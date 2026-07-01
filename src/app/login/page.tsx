"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MizanLogo } from "@/components/logo/MizanLogo";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("freddy.osei@mizanhealth.qa");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // INTEGRATION POINT: replace with
    // await supabase.auth.signInWithPassword({ email, password })
    setTimeout(() => router.push("/dashboard"), 500);
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper dark:bg-night lg:flex-row">
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden bg-teal-600 px-8 py-10 text-paper sm:px-14 sm:py-14 lg:max-w-[44%]">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[-4rem] left-[-2rem] h-56 w-56 rounded-full bg-gold/10 blur-3xl"
          aria-hidden
        />
        <div className="relative flex items-center gap-2.5">
          <MizanLogo className="h-7 w-7 text-paper" />
          <span className="font-display text-lg font-medium tracking-tight">Mizan Health</span>
        </div>

        <div className="relative max-w-sm">
          <p className="font-display text-[13px] uppercase tracking-[0.18em] text-teal-200">
            Cold Chain QA
          </p>
          <h1 className="mt-3 font-display text-[34px] font-medium leading-[1.15] italic">
            Equilibrium between product integrity and cold-chain risk.
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-teal-100">
            Every excursion, investigation, disposition and CAPA — in one
            audit-ready record, built for regulated healthcare distribution
            in Qatar.
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-4 border-t border-white/15 pt-6 text-teal-100">
          <div>
            <p className="font-display text-xl font-medium text-white">7</p>
            <p className="text-[11px] uppercase tracking-wide text-teal-200">Active shipments</p>
          </div>
          <div>
            <p className="font-display text-xl font-medium text-white">3</p>
            <p className="text-[11px] uppercase tracking-wide text-teal-200">Open investigations</p>
          </div>
          <div>
            <p className="font-display text-xl font-medium text-white">99.2%</p>
            <p className="text-[11px] uppercase tracking-wide text-teal-200">Audit readiness</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-14 sm:px-14">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h2 className="font-display text-2xl font-medium text-ink dark:text-white">Sign in</h2>
          <p className="mt-1.5 text-sm text-ink-faint dark:text-white/40">
            Access your QA workspace.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-soft dark:text-white/60">
                Work email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal-500 dark:border-white/15 dark:bg-night-card dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-soft dark:text-white/60">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal-500 dark:border-white/15 dark:bg-night-card dark:text-white"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-ink-soft dark:text-white/50">
              <input type="checkbox" defaultChecked className="rounded border-ink/30" />
              Keep me signed in
            </label>
            <a href="#" className="text-teal-600 hover:underline dark:text-teal-300">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="mt-7 w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>

          <p className="mt-5 text-center text-[11px] text-ink-faint dark:text-white/30">
            Prototype build — any credentials will sign you in to the demo workspace.
          </p>
        </form>
      </div>
    </div>
  );
}
