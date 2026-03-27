"use client";

import Link from "next/link";
import { useState } from "react";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ─── NAVBAR ─── */}
      <header className="sticky top-0 z-40 border-b border-border-light bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e11d48"/>
            </svg>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Planlegg
            </span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition hover:text-foreground">
              Funksjoner
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground transition hover:text-foreground">
              Pris
            </Link>
            <Link href="#waitlist" className="text-sm text-muted-foreground transition hover:text-foreground">
              Venteliste
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-foreground transition hover:text-primary"
            >
              Logg inn
            </Link>
            <button
              onClick={() => setShowOnboarding(true)}
              className="rounded-lg bg-stone-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Kom i gang
            </button>
          </div>
        </nav>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/80 to-background" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — text */}
            <div className="animate-fade-in">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-medium text-rose-600 ring-1 ring-rose-200/60">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                Kommer snart — meld deg pa ventelisten
              </div>
              <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-stone-900 md:text-5xl lg:text-[3.5rem]">
                Bryllupsplanlegging<br />
                <span className="text-primary">uten kaoset.</span>
              </h1>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-stone-500">
                Gjesteliste, budsjett, leverandorer og invitasjoner — alt samlet pa ett sted.
                Slik at du kan fokusere pa det som faktisk betyr noe.
              </p>

              {/* Waitlist form */}
              <form onSubmit={handleWaitlist} className="mt-8">
                {!submitted ? (
                  <div className="flex max-w-md gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Din e-postadresse"
                      required
                      className="h-12 flex-1 rounded-lg border border-stone-300 bg-white px-4 text-sm text-foreground placeholder:text-stone-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                    <button
                      type="submit"
                      className="h-12 rounded-lg bg-stone-900 px-6 text-sm font-semibold text-white transition hover:bg-stone-800"
                    >
                      Meld deg pa
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-emerald-600">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Du er pa listen! Vi sender deg en e-post nar vi lanserer.
                  </div>
                )}
                <p className="mt-3 text-xs text-stone-400">
                  127 personer har allerede meldt seg pa · Ingen spam, vi lover
                </p>
              </form>
            </div>

            {/* Right — product showcase */}
            <div className="animate-fade-in-slow delay-200 relative hidden lg:block">
              <div className="relative">
                {/* Browser mockup */}
                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-elevated">
                  <div className="flex items-center gap-2 border-b border-stone-100 bg-stone-50 px-4 py-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-300" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-300" />
                    <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-stone-400 ring-1 ring-stone-200">
                      planlegg.no/dashboard
                    </div>
                  </div>
                  <div className="p-5">
                    {/* Dashboard header */}
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-stone-900">Hei, Vegard & Line</p>
                        <p className="text-xs text-stone-400">447 dager til bryllupet</p>
                      </div>
                      <div className="rounded-lg bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">14. jun 2027</div>
                    </div>
                    {/* Stat cards */}
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: "Dager igjen", value: "447", bg: "bg-stone-50" },
                        { label: "Gjester", value: "124", bg: "bg-rose-50" },
                        { label: "Bekreftet", value: "67", bg: "bg-emerald-50" },
                        { label: "Budsjett", value: "350k", bg: "bg-stone-50" },
                      ].map((stat) => (
                        <div key={stat.label} className={`rounded-xl ${stat.bg} p-2.5`}>
                          <p className="text-[10px] text-stone-400">{stat.label}</p>
                          <p className="mt-0.5 text-lg font-bold text-stone-900">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                    {/* Content cards */}
                    <div className="mt-3 grid grid-cols-5 gap-2">
                      <div className="col-span-3 rounded-xl border border-stone-100 p-3">
                        <p className="text-[10px] font-semibold text-stone-700">Budsjett</p>
                        <div className="mt-2 space-y-1.5">
                          {[
                            { name: "Venue", pct: 75, color: "bg-stone-800" },
                            { name: "Catering", pct: 45, color: "bg-rose-400" },
                            { name: "Fotograf", pct: 100, color: "bg-emerald-500" },
                            { name: "Blomster", pct: 20, color: "bg-stone-400" },
                          ].map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                              <p className="w-14 text-[9px] text-stone-400">{item.name}</p>
                              <div className="h-1.5 flex-1 rounded-full bg-stone-100">
                                <div className={`h-1.5 rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-2 rounded-xl border border-stone-100 p-3">
                        <p className="text-[10px] font-semibold text-stone-700">Kommende</p>
                        <div className="mt-2 space-y-2">
                          {[
                            { task: "Bestill fotograf", days: "3d", urgent: true },
                            { task: "Smaksprove", days: "12d", urgent: false },
                            { task: "Send invitasjoner", days: "30d", urgent: false },
                          ].map((t) => (
                            <div key={t.task} className="flex items-start gap-1.5">
                              <div className={`mt-1 h-1.5 w-1.5 rounded-full ${t.urgent ? "bg-red-400" : "bg-stone-300"}`} />
                              <div>
                                <p className="text-[9px] leading-tight text-stone-700">{t.task}</p>
                                <p className="text-[8px] text-stone-400">{t.days}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating RSVP notification */}
                <div className="absolute -bottom-4 -left-6 rounded-xl border border-stone-200 bg-white p-3 shadow-elevated">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                      <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-stone-900">RSVP mottatt</p>
                      <p className="text-[10px] text-stone-400">Lisa & Erik kommer</p>
                    </div>
                  </div>
                </div>

                {/* Floating guest badge */}
                <div className="absolute -top-3 -right-3 rounded-xl border border-stone-200 bg-white px-3 py-2 shadow-elevated">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50">
                      <svg className="h-3.5 w-3.5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-stone-900">67 / 124</p>
                      <p className="text-[9px] text-stone-400">bekreftet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PAIN POINT STATS ─── */}
      <section className="border-y border-stone-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-sm font-medium text-stone-400 mb-10">
            Bryllupsplanlegging skal ikke foles som en jobb.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {painPoints.map((point) => (
              <div key={point.stat} className="text-center">
                <p className="font-serif text-4xl font-bold text-stone-900">{point.stat}</p>
                <p className="mt-2 text-sm text-stone-500">{point.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-stone-400">
            De fleste verktoyene der ute er enten for dyre for det du far, eller sa enkle at du like gjerne kunne brukt et regneark.
          </p>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">En plattform. Hele bryllupet.</p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
              Alt du trenger, ingenting du ikke trenger
            </h2>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-stone-200 bg-white p-7 transition-all duration-300 hover:border-stone-300 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-500 transition group-hover:bg-stone-900 group-hover:text-white">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-[15px] font-bold text-stone-900">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">Enkel prising</p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
              Ett bryllup. En pris.
            </h2>
            <p className="mt-4 text-[16px] text-stone-500">
              Full tilgang fra forlovelse til bryllupsdag. Ingen skjulte kostnader, ingen abonnement som tikker etter festen er over.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-md">
            <div className="rounded-2xl border-2 border-stone-900 bg-white p-8 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-stone-900">Planlegg</h3>
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">Popularr</span>
              </div>
              <p className="mt-4 text-sm text-stone-500">Alt du trenger for a planlegge bryllupet, fra start til slutt.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-serif text-4xl font-bold text-stone-900">Tidlig tilgang</span>
              </div>
              <p className="mt-1 text-xs text-stone-400">Tidlig tilgang + lavere pris for deg som er tidlig ute</p>

              <div className="mt-6 space-y-3">
                {pricingFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <svg className="h-4 w-4 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-sm text-stone-700">{f}</span>
                  </div>
                ))}
              </div>

              <a
                href="#waitlist"
                className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-stone-900 text-sm font-semibold text-white transition hover:bg-stone-800"
              >
                Bli med pa ventelisten
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WAITLIST CTA ─── */}
      <section id="waitlist" className="bg-stone-900 py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">
            Fa tidlig tilgang
          </h2>
          <p className="mt-4 text-[16px] text-stone-400">
            Var blant de forste som prover Planlegg. Meld deg pa ventelisten sa sender vi deg en invitasjon nar vi er klare.
          </p>

          <form onSubmit={handleWaitlist} className="mt-8">
            {!submitted ? (
              <div className="mx-auto flex max-w-md gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Din e-postadresse"
                  required
                  className="h-12 flex-1 rounded-lg border border-stone-700 bg-stone-800 px-4 text-sm text-white placeholder:text-stone-500 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
                <button
                  type="submit"
                  className="h-12 rounded-lg bg-white px-6 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
                >
                  Meld meg pa
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-sm text-emerald-400">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Du er pa listen! Vi sender deg en e-post nar vi lanserer.
              </div>
            )}
            <p className="mt-3 text-xs text-stone-500">
              127 personer har allerede meldt seg pa · Ingen spam, vi lover
            </p>
          </form>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-stone-200 bg-background py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e11d48"/>
              </svg>
              <span className="text-sm font-semibold text-stone-700">Planlegg</span>
            </div>
            <p className="text-xs text-stone-400">
              &copy; 2026 Planlegg. Laget med kjaerlighet i Norge.
            </p>
          </div>
        </div>
      </footer>

      {/* ─── ONBOARDING MODAL ─── */}
      <OnboardingFlow open={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </div>
  );
}

const painPoints = [
  { stat: "78%", description: "av par foler seg stresset under planleggingen" },
  { stat: "62%", description: "overskrider bryllupsbudsjettet sitt" },
  { stat: "45%", description: "opplever familiekonflikt rundt planleggingen" },
];

const features = [
  {
    title: "Gjesteliste & invitasjoner",
    description: "Legg til gjester, send digitale invitasjoner, og folg med pa RSVP i sanntid. Ingen flere regneark.",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    title: "Budsjett med oversikt",
    description: "Sett opp budsjettet ditt og se noyaktig hvor pengene gar. Aldri mer ukontrollerte kostnader.",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>,
  },
  {
    title: "Leverandoroversikt",
    description: "Hold styr pa alle leverandorer, tilbud og kontrakter. Sammenlign priser og hold deg organisert.",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/></svg>,
  },
  {
    title: "Finn lokaler & tilbydere",
    description: "Sok etter bryllupslokaler, cateringfirmaer, blomsterdekoratorer og mer — basert pa ditt omrade.",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  },
  {
    title: "Smart leverandormatch",
    description: "Fa skreddersydde anbefalinger basert pa budsjett, lokasjon og preferanser. La oss gjore jobben.",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>,
  },
  {
    title: "Tidslinjeplanlegger",
    description: "En oversikt over alt som ma gjores — fra forlovelse til bryllupsdag. Aldri glem en deadline.",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>,
  },
];

const pricingFeatures = [
  "Gjesteliste & RSVP-handtering",
  "Budsjettoversikt",
  "Leverandorsporing",
  "Tidslinjeplanlegger",
  "Digitale invitasjoner",
  "AI-drevet leverandorsok",
  "Prissammenligning lokaler",
  "Personlig bryllupsside",
];
