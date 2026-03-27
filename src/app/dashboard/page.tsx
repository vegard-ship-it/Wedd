"use client";

import Link from "next/link";
import { useWedding } from "@/lib/hooks/useWedding";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

interface Guest { id: string; firstName: string; lastName: string; rsvp: string; [key: string]: unknown; }
interface Expense { id: string; amount: number; [key: string]: unknown; }
interface Task { id: string; done: boolean; deadline?: string; title: string; [key: string]: unknown; }

export default function DashboardPage() {
  const { config, daysUntil, weddingTitle, formatDate } = useWedding();
  const [guests] = useLocalStorage<Guest[]>("wedding-guests", []);
  const [expenses] = useLocalStorage<Expense[]>("wedding-expenses", []);
  const [tasks] = useLocalStorage<Task[]>("wedding-tasks", []);

  const days = daysUntil();
  const accepted = guests.filter((g) => g.rsvp === "accepted").length;
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const remaining = config.budgetTotal - totalSpent;
  const fmt = (n: number) => n.toLocaleString("nb-NO");

  const upcomingTasks = tasks
    .filter((t) => !t.done && t.deadline)
    .sort((a, b) => (a.deadline || "").localeCompare(b.deadline || ""))
    .slice(0, 6);

  const completedTasks = tasks.filter((t) => t.done).length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Greeting */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
            Hei, {config.name1 || "der"}!
          </h1>
          <p className="mt-1 text-[15px] text-muted-foreground">
            {days !== null && days > 0
              ? `${days} dager til ${weddingTitle()} — ${formatDate()}`
              : "Sett en dato for bryllupet i innstillinger."}
          </p>
        </div>
        <Link
          href="/dashboard/chat"
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
          Spør AI-assistenten
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Dager igjen" value={days !== null ? days.toString() : "—"} sub={formatDate()} accent />
        <StatCard label="Gjester" value={`${guests.length}`} sub={`${accepted} bekreftet av ${config.guestTarget} mål`} />
        <StatCard label="Oppgaver" value={`${completedTasks}/${tasks.length}`} sub={`${tasks.length - completedTasks} gjenstår`} />
        <StatCard label="Budsjett brukt" value={`${fmt(totalSpent)} kr`} sub={`${fmt(remaining)} kr gjenstår`} accent={remaining < 0} />
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Legg til gjest", href: "/dashboard/guests", desc: "Administrer gjestelisten", color: "bg-primary-light text-primary" },
          { label: "Ny utgift", href: "/dashboard/budget", desc: "Registrer betaling", color: "bg-orange-50 text-orange-600" },
          { label: "Ny oppgave", href: "/dashboard/timeline", desc: "Sett en ny deadline", color: "bg-blue-50 text-blue-600" },
          { label: "Ny leverandør", href: "/dashboard/vendors", desc: "Legg til leverandør", color: "bg-purple-50 text-purple-600" },
        ].map((action) => (
          <Link key={action.label} href={action.href} className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:border-primary/20 hover:shadow-[var(--shadow-card-hover)]">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${action.color} transition group-hover:scale-105`}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Upcoming deadlines */}
        <div className="lg:col-span-3 rounded-2xl border border-border bg-white">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-sm font-bold text-foreground">Kommende frister</h2>
            <Link href="/dashboard/timeline" className="text-xs font-semibold text-primary hover:text-primary/80">Se alle &rarr;</Link>
          </div>
          {upcomingTasks.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">Ingen kommende frister.</div>
          ) : (
            <div className="divide-y divide-border">
              {upcomingTasks.map((task) => {
                const d = task.deadline ? Math.max(0, Math.ceil((new Date(task.deadline).getTime() - Date.now()) / 86400000)) : 0;
                return (
                  <div key={task.id} className="flex items-center justify-between px-6 py-4 transition hover:bg-muted/30">
                    <div className="flex items-center gap-4">
                      <div className={`h-2.5 w-2.5 rounded-full ${d < 30 ? "bg-destructive" : d < 90 ? "bg-accent" : "bg-secondary"}`} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.deadline ? new Date(task.deadline).toLocaleDateString("nb-NO", { day: "numeric", month: "short", year: "numeric" }) : ""}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${d < 30 ? "bg-red-50 text-destructive" : d < 90 ? "bg-orange-50 text-orange-600" : "bg-muted text-muted-foreground"}`}>
                      {d} dager
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Budget */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-white">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-sm font-bold text-foreground">Budsjett</h2>
            <Link href="/dashboard/budget" className="text-xs font-semibold text-primary hover:text-primary/80">Detaljer &rarr;</Link>
          </div>
          <div className="px-6 py-5 border-b border-border">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Brukt av totalt</p>
                <p className="mt-1 font-serif text-2xl font-bold text-foreground">
                  {fmt(totalSpent)} <span className="text-base font-normal text-muted-foreground">/ {fmt(config.budgetTotal)} kr</span>
                </p>
              </div>
              <span className="text-xs font-semibold text-primary">
                {config.budgetTotal > 0 ? Math.round((totalSpent / config.budgetTotal) * 100) : 0}%
              </span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-primary-light">
              <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${config.budgetTotal > 0 ? Math.min((totalSpent / config.budgetTotal) * 100, 100) : 0}%` }} />
            </div>
          </div>
          <div className="p-6 text-center">
            <Link href="/dashboard/budget" className="text-sm font-semibold text-primary hover:text-primary/80">
              Administrer budsjett &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Wedding details */}
      {(config.venue || config.city || config.theme) && (
        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-sm font-bold text-foreground mb-4">Bryllupsdetaljer</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {config.venue && <Detail label="Venue" value={config.venue} />}
            {config.city && <Detail label="By" value={config.city} />}
            {config.theme && <Detail label="Tema" value={config.theme} />}
            {config.ceremony && <Detail label="Vielse" value={config.ceremony} />}
            {config.dinnerTime && <Detail label="Middag" value={config.dinnerTime} />}
            {config.partyTime && <Detail label="Fest" value={config.partyTime} />}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className="group rounded-2xl border border-border bg-white p-6 transition-all hover:shadow-[var(--shadow-card-hover)]">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`mt-3 font-serif text-3xl font-bold tracking-tight ${accent ? "text-primary" : "text-foreground"}`}>{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}
