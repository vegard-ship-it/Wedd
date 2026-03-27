"use client";

import { useWedding } from "@/lib/hooks/useWedding";

export default function SettingsPage() {
  const { config, setConfig } = useWedding();

  const update = (field: string, value: string | number) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">Innstillinger</h1>
        <p className="mt-1 text-[15px] text-muted-foreground">Endre bryllupsdetaljer og innstillinger</p>
      </div>

      {/* Paret */}
      <Section title="Paret">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Navn 1 *" value={config.name1} onChange={(v) => update("name1", v)} placeholder="Ditt navn" />
          <Field label="Navn 2" value={config.name2} onChange={(v) => update("name2", v)} placeholder="Partners navn" />
        </div>
      </Section>

      {/* Dato & sted */}
      <Section title="Dato & sted">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Bryllupsdato" type="date" value={config.weddingDate} onChange={(v) => update("weddingDate", v)} />
          <Field label="By / sted" value={config.city} onChange={(v) => update("city", v)} placeholder="f.eks. Bergen" />
        </div>
        <Field label="Venue / lokale" value={config.venue} onChange={(v) => update("venue", v)} placeholder="f.eks. Solstrand Hotel" />
      </Section>

      {/* Program */}
      <Section title="Program og tider">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Vielse" type="time" value={config.ceremony} onChange={(v) => update("ceremony", v)} />
          <Field label="Mottakelse" type="time" value={config.receptionStart} onChange={(v) => update("receptionStart", v)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Middag" type="time" value={config.dinnerTime} onChange={(v) => update("dinnerTime", v)} />
          <Field label="Fest" type="time" value={config.partyTime} onChange={(v) => update("partyTime", v)} />
        </div>
      </Section>

      {/* Budsjett & gjester */}
      <Section title="Budsjett & gjester">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">Totalbudsjett (kr)</label>
            <input
              type="number"
              value={config.budgetTotal}
              onChange={(e) => update("budgetTotal", parseFloat(e.target.value) || 0)}
              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Antall gjester (mål)</label>
            <input
              type="number"
              value={config.guestTarget}
              onChange={(e) => update("guestTarget", parseInt(e.target.value) || 0)}
              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>
      </Section>

      {/* Tema */}
      <Section title="Tema & stil">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tema" value={config.theme} onChange={(v) => update("theme", v)} placeholder="f.eks. Rustikk, Moderne, Botanisk" />
          <Field label="Fargepalett" value={config.colorScheme} onChange={(v) => update("colorScheme", v)} placeholder="f.eks. Sage green & dusty rose" />
        </div>
      </Section>

      {/* Notater */}
      <Section title="Generelle notater">
        <div>
          <textarea
            value={config.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={4}
            placeholder="Skriv ned viktige ting, ideer, eller hva som helst..."
            className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none"
          />
        </div>
      </Section>

      {/* Danger zone */}
      <Section title="Faresone">
        <p className="text-sm text-muted-foreground mb-4">
          Nullstill all data og start på nytt. Dette kan ikke angres.
        </p>
        <button
          onClick={() => {
            if (window.confirm("Er du sikker? All data vil bli slettet.")) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="rounded-full border-2 border-destructive/30 px-5 py-2.5 text-sm font-semibold text-destructive transition hover:bg-red-50"
        >
          Nullstill all data
        </button>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
      </div>
      <div className="space-y-4 p-6">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
      />
    </div>
  );
}
