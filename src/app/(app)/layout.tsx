import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { MobileTopBar } from "@/components/layout/MobileTopBar";

// INTEGRATION POINT: gate this layout with a server-side Supabase session
// check once auth is connected; redirect to /login if no session.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper dark:bg-night">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <MobileTopBar />
        <main className="flex-1 px-4 pb-24 pt-6 sm:px-8 sm:pt-9 lg:pb-9">
          <div className="mx-auto w-full max-w-[1400px]">{children}</div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
