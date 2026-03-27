export default function PhotosPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">Bilder</h1>
          <p className="mt-1 text-[15px] text-muted-foreground">Saml og del bilder fra bryllupet</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted hover:shadow-sm">
            + Nytt album
          </button>
          <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md">
            Last opp bilder
          </button>
        </div>
      </div>

      {/* Albums */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Album</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Forlovelse", gradient: "from-rose-100 to-pink-50" },
            { name: "Save the date", gradient: "from-blue-100 to-cyan-50" },
            { name: "Bryllupsdagen", gradient: "from-amber-100 to-yellow-50" },
            { name: "Gjestenes bilder", gradient: "from-emerald-100 to-green-50" },
          ].map((album) => (
            <div key={album.name} className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-white transition-all hover:border-primary/20 hover:shadow-[var(--shadow-card-hover)]">
              <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${album.gradient}`}>
                <svg className="h-10 w-10 text-foreground/15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-foreground">{album.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">0 bilder</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload */}
      <div className="rounded-2xl border-2 border-dashed border-border bg-white p-16 text-center transition hover:border-primary/30 cursor-pointer group">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light transition group-hover:bg-primary">
          <svg className="h-8 w-8 text-primary transition group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
          </svg>
        </div>
        <h3 className="mt-5 font-serif text-lg font-bold text-foreground">Dra og slipp bilder her</h3>
        <p className="mt-1 text-sm text-muted-foreground">eller klikk for å velge filer</p>
        <p className="mt-2 text-xs text-muted-foreground">JPG, PNG, WEBP &mdash; maks 10 MB per fil</p>
      </div>
    </div>
  );
}
