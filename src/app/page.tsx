import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── NAVBAR ─── */}
      <header className="sticky top-0 z-50 border-b border-border-light bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M16 6C12 6 8 10 8 14c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z" fill="#21897e"/>
              <path d="M16 6c-2 0-4.5 1.5-5.5 4 1.5-1 3.5-1.5 5.5-1.5s4 .5 5.5 1.5C20.5 7.5 18 6 16 6z" fill="#19706a"/>
            </svg>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Bryllupsplanleggeren
            </span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition hover:text-foreground">
              Funksjoner
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground transition hover:text-foreground">
              Slik fungerer det
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground transition hover:text-foreground">
              Priser
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-foreground transition hover:text-primary"
            >
              Logg inn
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md"
            >
              Kom i gang gratis
            </Link>
          </div>
        </nav>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-hero via-hero-dark to-secondary/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <div className="animate-fade-in">
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Planlegg jeres<br />
                <span className="text-primary">drømmebryllup</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground/70">
                Alt du trenger for å planlegge bryllupet — fra budsjett og gjesteliste
                til leverandører og invitasjoner. Helt gratis å starte.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 hover:shadow-lg"
                >
                  Start planleggingen
                </Link>
                <Link
                  href="#how-it-works"
                  className="rounded-full border-2 border-foreground/15 bg-white/60 px-8 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:border-foreground/25 hover:bg-white/80"
                >
                  Se hvordan det fungerer
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-foreground/60">
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Gratis å starte
                </span>
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Ingen kredittkort
                </span>
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Alt på norsk
                </span>
              </div>
            </div>

            {/* Right — mockup */}
            <div className="animate-fade-in-slow delay-200 relative hidden lg:block">
              <div className="relative">
                {/* Browser mockup */}
                <div className="overflow-hidden rounded-2xl border border-white/50 bg-white shadow-elevated">
                  <div className="flex items-center gap-2 border-b border-border-light bg-muted px-4 py-3">
                    <div className="h-3 w-3 rounded-full bg-red-300" />
                    <div className="h-3 w-3 rounded-full bg-yellow-300" />
                    <div className="h-3 w-3 rounded-full bg-green-300" />
                    <div className="ml-4 flex-1 rounded-md bg-white px-3 py-1 text-xs text-muted-foreground">
                      bryllupsplanleggeren.no/dashboard
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="h-3 w-32 rounded bg-foreground/10" />
                        <div className="mt-2 h-2 w-48 rounded bg-foreground/5" />
                      </div>
                      <div className="h-8 w-20 rounded-full bg-primary/20" />
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {["459 dager", "120 gjester", "42 bekreftet", "350 000 kr"].map((text, i) => (
                        <div key={i} className="rounded-xl bg-muted p-3">
                          <div className="h-2 w-12 rounded bg-foreground/10" />
                          <div className="mt-2 font-serif text-sm font-bold text-foreground/70">{text}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-primary-light p-4">
                        <div className="h-2 w-16 rounded bg-primary/30" />
                        <div className="mt-3 h-20 rounded-lg bg-primary/10" />
                      </div>
                      <div className="rounded-xl bg-muted p-4">
                        <div className="h-2 w-20 rounded bg-foreground/10" />
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-destructive/50" />
                            <div className="h-2 w-24 rounded bg-foreground/8" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-accent" />
                            <div className="h-2 w-20 rounded bg-foreground/8" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-border" />
                            <div className="h-2 w-28 rounded bg-foreground/8" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating card */}
                <div className="absolute -bottom-4 -left-8 rounded-xl border border-white/80 bg-white p-4 shadow-elevated">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">RSVP mottatt!</p>
                      <p className="text-xs text-muted-foreground">Lisa & Erik kommer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C240 10 480 0 720 10s480 20 720 0v50H0z" fill="white"/></svg>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Alt på ett sted</p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Alt du trenger for bryllupet
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Fra den første ideen til den siste dansen — vi hjelper dere hele veien.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary transition group-hover:bg-primary group-hover:text-white">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Enkelt å starte</p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Slik fungerer det
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-md">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute left-[60%] top-8 hidden h-0.5 w-[80%] bg-gradient-to-r from-primary/30 to-transparent md:block" />
                )}
                <h3 className="mt-6 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Elsket av par over hele Norge
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Over 2 000 bryllup planlagt med vår plattform
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-white p-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light font-serif text-sm font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">
            Klar for å planlegge bryllupet?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Start gratis i dag og få full kontroll over bryllupsplanleggingen.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex rounded-full bg-white px-10 py-4 text-sm font-bold text-primary shadow-lg transition hover:bg-white/95 hover:shadow-xl"
          >
            Start planleggingen — det er gratis
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2.5">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path d="M16 6C12 6 8 10 8 14c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z" fill="#21897e"/>
                  <path d="M16 6c-2 0-4.5 1.5-5.5 4 1.5-1 3.5-1.5 5.5-1.5s4 .5 5.5 1.5C20.5 7.5 18 6 16 6z" fill="#19706a"/>
                </svg>
                <span className="text-sm font-bold text-foreground">Bryllupsplanleggeren</span>
              </Link>
              <p className="mt-3 text-sm text-muted-foreground">
                Den enkleste veien til drømmebryllupet.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground">Produkt</p>
              <div className="mt-4 space-y-3">
                <Link href="#features" className="block text-sm text-muted-foreground hover:text-foreground">Funksjoner</Link>
                <Link href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground">Priser</Link>
                <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground">Maler</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground">Ressurser</p>
              <div className="mt-4 space-y-3">
                <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground">Bryllupsguide</Link>
                <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground">Sjekkliste</Link>
                <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground">Blogg</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground">Selskap</p>
              <div className="mt-4 space-y-3">
                <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground">Om oss</Link>
                <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground">Kontakt</Link>
                <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground">Personvern</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
            &copy; 2026 Bryllupsplanleggeren. Alle rettigheter reservert.
          </div>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

const features = [
  {
    title: "Budsjett & sparing",
    description: "Hold full oversikt over budsjettet. Se hva dere har brukt, spart og hva som gjenstår — med smarte kategorier.",
    icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>,
  },
  {
    title: "Gjesteliste & RSVP",
    description: "Administrer gjester, grupper, bordplassering og diett. Send digitale invitasjoner og spor svar i sanntid.",
    icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    title: "Tidslinje & frister",
    description: "Aldri gå glipp av en frist. Automatiske påminnelser og en komplett sjekkliste fra 12 måneder til bryllupsdagen.",
    icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>,
  },
  {
    title: "Leverandører",
    description: "Hold styr på alle leverandører, kontrakter, priser og betalinger. Sammenlign og vurder med egne notater.",
    icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/></svg>,
  },
  {
    title: "Bildegalleri",
    description: "Samle alle bilder på ett sted. Gjester kan laste opp egne bilder, og dere kan dele album med alle inviterte.",
    icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
  },
  {
    title: "AI-assistent",
    description: "Spør chatten om hva som helst — den kjenner bryllupet ditt og kan hjelpe med alt fra tekster til bordplassering.",
    icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>,
  },
];

const steps = [
  {
    title: "Opprett bryllupet",
    description: "Registrer deg gratis og legg inn dato, sted og grunnleggende info om bryllupet.",
  },
  {
    title: "Planlegg alt",
    description: "Bruk verktøyene våre for budsjett, gjesteliste, leverandører, tidslinjer og invitasjoner.",
  },
  {
    title: "Nyt dagen",
    description: "Med alt planlagt og organisert kan dere fokusere på det som virkelig betyr noe — å feire kjærligheten.",
  },
];

const testimonials = [
  {
    name: "Ingrid & Thomas",
    detail: "Gift august 2025, Bergen",
    quote: "Vi hadde aldri klart å holde oversikt over 150 gjester, leverandører og budsjett uten denne plattformen. Utrolig enkelt og vakkert.",
  },
  {
    name: "Sara & Magnus",
    detail: "Gift juni 2025, Oslo",
    quote: "AI-chatten er genial! Den hjalp oss med å skrive invitasjonstekster, lage tidsplan og til og med foreslå bordplassering.",
  },
  {
    name: "Maren & Henrik",
    detail: "Gift september 2025, Trondheim",
    quote: "Gjesteportalen var en hit. Gjestene våre elsket å kunne RSVP digitalt og laste opp bilder fra festen rett etterpå.",
  },
];
