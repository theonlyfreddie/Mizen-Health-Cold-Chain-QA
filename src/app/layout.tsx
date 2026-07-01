import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mizan Health — Cold Chain QA",
  description: "Pharma quality and cold-chain exception management for regulated healthcare supply chains in Qatar.",
};

// NOTE ON FONTS: this build environment had no outbound access to
// fonts.googleapis.com, so type is set via system-font stacks in
// globals.css (see --font-display / --font-body / --font-mono) rather than
// next/font/google. When you run this locally with normal internet access,
// you can optionally swap in next/font/google for Fraunces (display),
// Inter (body) and IBM Plex Mono (data) — see the commented block below.
//
//   import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
//   const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["400","500","600"], style: ["normal","italic"] });
//   const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400","500","600","700"] });
//   const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","500"] });
//   // then add `${fraunces.variable} ${inter.variable} ${plexMono.variable}` to the <body> className below.

// INTEGRATION POINT: wrap children in an auth/session provider here once
// Supabase auth is connected (see lib/supabase-stub.ts).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">{children}</body>
    </html>
  );
}
