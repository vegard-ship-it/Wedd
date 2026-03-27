export default function InvitationsPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">Invitasjoner</h1>
          <p className="mt-1 text-[15px] text-muted-foreground">Design, send og spor invitasjoner</p>
        </div>
        <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md">
          + Opprett invitasjon
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-4">
        {[
          { label: "Sendt", value: "0" },
          { label: "Åpnet", value: "0" },
          { label: "Besvart", value: "0" },
          { label: "Venter", value: "0" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-white p-6 transition hover:shadow-[var(--shadow-card-hover)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
            <p className="mt-3 font-serif text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Templates */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Velg mal</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          {[
            { name: "Elegant Klassisk", gradient: "from-stone-100 to-amber-50" },
            { name: "Moderne Minimalist", gradient: "from-slate-100 to-blue-50" },
            { name: "Botanisk", gradient: "from-emerald-50 to-lime-50" },
          ].map((template) => (
            <div key={template.name} className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-white transition-all hover:border-primary/20 hover:shadow-[var(--shadow-card-hover)]">
              <div className={`flex h-48 items-center justify-center bg-gradient-to-br ${template.gradient}`}>
                <div className="rounded-lg border border-white/60 bg-white/80 px-8 py-6 text-center backdrop-blur-sm">
                  <p className="font-serif text-xs text-muted-foreground">Vi inviterer til</p>
                  <p className="mt-1 font-serif text-lg font-bold text-foreground">Vegard & Partner</p>
                  <p className="mt-1 text-xs text-muted-foreground">14. juni 2027</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-foreground">{template.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">Invitasjonsmal</p>
                <button className="mt-3 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white">
                  Velg mal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
