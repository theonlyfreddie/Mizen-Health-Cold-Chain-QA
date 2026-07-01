// src/lib/supabase-stub.ts
//
// INTEGRATION NOTE — connecting real data later
// ------------------------------------------------
// This file is a placeholder for the future Supabase client and data-access
// layer. Today, every page imports directly from `lib/mock-data.ts`.
//
// To move to Supabase:
//   1. `npm install @supabase/supabase-js`
//   2. Create `src/lib/supabase/client.ts`:
//        import { createClient } from "@supabase/supabase-js";
//        export const supabase = createClient(
//          process.env.NEXT_PUBLIC_SUPABASE_URL!,
//          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//        );
//   3. Create tables mirroring `lib/types.ts`: shipments, investigations,
//      dispositions, capas, custody_events, temperature_log_points,
//      comments, qa_users. Use shipment_id / investigation_id as foreign keys.
//   4. Replace the functions below (and the direct mock-data imports in
//      page files) with real queries, e.g.:
//        export async function getShipments() {
//          const { data, error } = await supabase.from("shipments").select("*");
//          if (error) throw error;
//          return data as Shipment[];
//        }
//   5. For live temperature feeds, use Supabase Realtime channels on the
//      temperature_log_points table instead of the static genTempLog() mock.
//   6. Auth: replace the mock login screen with supabase.auth.signInWithPassword
//      and gate the (app) route group with a server-side session check.
//
// Until then, this file intentionally has no exports in use — it exists so
// the integration points above are easy to find from the file tree.
export {};
