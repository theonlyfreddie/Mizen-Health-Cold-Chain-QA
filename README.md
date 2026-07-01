# Mizan Health — Cold Chain QA

A pharma quality and cold-chain exception management prototype for regulated
healthcare distribution in Qatar. Built with Next.js (App Router), React,
TypeScript and Tailwind CSS, using seeded mock data.

Core workflow: **shipment alert → investigation → QA disposition → CAPA →
audit-ready report.**

## Getting started

Requires Node.js 18.18+.

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll be redirected to `/login`. Any email and
password will sign you into the demo workspace (this is a mocked auth flow;
see "Connecting Supabase" below for the real thing).

```bash
npm run build   # production build
npm run start   # run the production build
```

## Project structure

```
src/
  app/
    login/page.tsx                       Screen 1 — Login
    (app)/layout.tsx                     Authenticated app shell (sidebar, mobile nav)
    (app)/dashboard/page.tsx             Screen 2 — Dashboard
    (app)/shipments/page.tsx             Screen 3 — Shipments list
    (app)/shipments/[id]/page.tsx        Screen 4 — Shipment detail
    (app)/alerts/page.tsx                Screen 5 — Excursion alert center
    (app)/shipments/[id]/investigation/  Screen 6 — Investigation workflow
    (app)/shipments/[id]/disposition/    Screen 7 — QA disposition
    (app)/shipments/[id]/capa/           Screen 8 — CAPA (per shipment)
    (app)/capa/page.tsx                  CAPA register (all open/closed CAPAs)
    (app)/audit/page.tsx                 Audit & compliance register
    (app)/shipments/[id]/audit/          Screen 9 — Per-shipment audit report (print-ready)
    (app)/settings/page.tsx              Screen 10 — Settings
  components/
    ui/            Badge, Button, Card, KpiCard, EmptyState, PageHeader, StatusBadges
    layout/        Sidebar, MobileNav, MobileTopBar, ThemeToggle, nav-items
    charts/        TempRibbon (signature element), TempChart (SVG temperature graph)
    logo/          MizanLogo (custom SVG mark + wordmark)
  lib/
    types.ts        Domain model (Shipment, Investigation, Disposition, Capa, ...)
    mock-data.ts    Seeded sample records — single source of truth for the prototype
    status.ts       Status/severity → label + colour-tone mappings
    utils.ts        Formatting helpers (dates, currency, time-ago)
    supabase-stub.ts  Where the real backend integration begins (see below)
```

## Design

- **Palette**: warm neutral paper background, deep teal primary (`#0F4C46`),
  muted gold for "needs attention," rust for critical/rejected states. Full
  dark mode via Tailwind's `class` strategy and a persisted toggle.
- **Type**: a serif display face for headings/titles, a humanist sans for UI
  copy, and a monospace face for IDs, batch numbers and temperature readings.
  Wired up as CSS variables in `globals.css`; see the fonts note below.
- **Signature element**: the **temperature ribbon** (`components/charts/TempRibbon.tsx`)
  — a compact band showing a shipment's validated storage range with a
  marker for its current reading, used consistently across cards, lists and
  detail headers so temperature state is legible at a glance.

### A note on fonts

This prototype was built in a sandboxed environment without outbound access
to `fonts.googleapis.com`, so the type system currently falls back to
system font stacks (see `:root` in `src/app/globals.css`). If you're running
this locally with normal internet access, you can swap in the intended
typefaces — Fraunces (display), Inter (body), IBM Plex Mono (data) — via
`next/font/google`. The exact import block is commented directly in
`src/app/layout.tsx`.

## What's prototype-only

- **Authentication** — the login screen accepts any credentials and routes
  straight to the dashboard. There's no real session or password check.
- **Data persistence** — all records live in `lib/mock-data.ts` and reset on
  page reload. Comments added in the investigation thread and disposition
  submissions only persist in local component state for the current session.
- **File uploads** — the evidence attachment control in the investigation
  workflow is a visual placeholder; it doesn't accept or store real files.
- **Temperature feed** — `genTempLog()` in `mock-data.ts` synthesizes a
  temperature curve per shipment; there's no live IoT/datalogger connection.
- **PDF export** — the audit report's "Print / export PDF" button uses the
  browser's native print dialog rather than a generated PDF file.
- **Notifications/email** — no alerts are actually sent anywhere.

## What to build next for a real MVP

1. **Auth & roles** — real sign-in, with role-based access (QA Manager,
   Reviewer, Warehouse Lead) gating which actions each user can take
   (e.g. only a QA Manager can finalize a "reject" disposition).
2. **Persistence** — move off `mock-data.ts` onto a real database (see
   Supabase steps below) so investigations, comments, dispositions and
   CAPAs are durable and multi-user.
3. **Live temperature ingestion** — a webhook or polling integration with
   carrier/data-logger APIs so excursions are detected automatically rather
   than seeded.
4. **Evidence storage** — real file upload to object storage (e.g. Supabase
   Storage) with antivirus scanning and audit-safe immutability.
5. **E-signatures & approval workflow** — disposition and CAPA closure
   should require an auditable electronic signature (21 CFR Part 11 /
   GDP-aligned), not just a button click.
6. **Notification rules** — configurable alerting (SMS/email/Slack) when an
   excursion is detected or an investigation/CAPA is overdue.
7. **True PDF generation** — server-side PDF rendering for the audit report
   (e.g. via a headless browser or a PDF library) instead of browser print.
8. **Validation & error states** — form validation, optimistic UI, and
   proper loading/error boundaries throughout.

## Connecting Supabase later

See the detailed comments in `src/lib/supabase-stub.ts`. In short:

1. `npm install @supabase/supabase-js`
2. Create `src/lib/supabase/client.ts` with `createClient(...)` using
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Create tables mirroring `src/lib/types.ts`: `shipments`, `investigations`,
   `dispositions`, `capas`, `custody_events`, `temperature_log_points`,
   `comments`, `qa_users` — using `shipment_id` / `investigation_id` as
   foreign keys.
4. Replace the direct `mock-data.ts` imports in each page with real Supabase
   queries (server components can call Supabase directly; client components
   like the investigation comment form should call a server action or route
   handler).
5. For live temperature feeds, use Supabase Realtime channels on
   `temperature_log_points` instead of the static `genTempLog()` mock.
6. For auth, replace the mock login screen with
   `supabase.auth.signInWithPassword(...)` and add a server-side session
   check to the `(app)` route group layout.
