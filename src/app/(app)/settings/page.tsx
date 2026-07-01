import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { qaUsers } from "@/lib/mock-data";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader eyebrow="Governance" title="Settings" description="Workspace, team and integration configuration." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader eyebrow="Workspace" title="Organization profile" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Organization name" value="Mizan Health Distribution — Qatar" />
            <Field label="Primary regulator" value="MOPH Qatar / NAFDAC (cross-border)" />
            <Field label="QMS standard" value="ISO 13485 / GDP aligned" />
            <Field label="Time zone" value="Asia/Qatar (UTC+3)" />
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Display" title="Appearance" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink dark:text-white">Dark mode</p>
              <p className="text-xs text-ink-faint dark:text-white/40">Switch the interface theme</p>
            </div>
            <ThemeToggle />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader eyebrow="Access" title="Team & roles" />
          <div className="space-y-3">
            {qaUsers.map((u) => (
              <div key={u.id} className="flex items-center justify-between rounded-md border border-ink/10 px-4 py-3 text-sm dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/10 text-xs font-medium text-teal-700 dark:bg-teal-400/15 dark:text-teal-200">
                    {u.initials}
                  </div>
                  <div>
                    <p className="font-medium text-ink dark:text-white">{u.name}</p>
                    <p className="text-xs text-ink-faint dark:text-white/40">{u.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Future" title="Integrations" />
          <p className="mb-4 text-sm text-ink-soft dark:text-white/55">
            Not yet connected in this prototype. Structured for future setup:
          </p>
          <ul className="space-y-2 text-sm text-ink-faint dark:text-white/40">
            <li>· Supabase (data &amp; auth)</li>
            <li>· IoT temperature logger feeds</li>
            <li>· Carrier API webhooks</li>
            <li>· E-signature for disposition sign-off</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink-soft dark:text-white/60">{label}</label>
      <input
        defaultValue={value}
        className="w-full rounded-md border border-ink/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-teal-500 dark:border-white/15 dark:bg-night-card dark:text-white"
      />
    </div>
  );
}
