"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

// ── Pricing data ──────────────────────────────────────────────

const PRICING_MONTHLY = [
  {
    name: "Gratis",
    price: "0 kr",
    period: "for alltid",
    description: "Kom i gang med det grunnleggende.",
    features: [
      "Gjesteliste (opptil 50)",
      "Enkel budsjettoversikt",
      "Tidslinjemal",
    ],
    cta: "Start gratis",
    style: "free" as const,
  },
  {
    name: "Standard",
    price: "99 kr",
    period: "per maned",
    description: "For par som vil ha full kontroll.",
    features: [
      "Alt i Gratis",
      "Ubegrenset gjester",
      "RSVP & digitale invitasjoner",
      "Full budsjettstyring",
      "Leverandoroversikt",
    ],
    cta: "Velg Standard",
    popular: true,
    style: "standard" as const,
  },
  {
    name: "Premium",
    price: "199 kr",
    period: "per maned",
    description: "Alt du trenger, pluss smarte verktoy.",
    features: [
      "Alt i Standard",
      "AI-leverandorsok",
      "Prissammenligning",
      "Personlig bryllupsside",
      "Prioritert support",
    ],
    cta: "Velg Premium",
    style: "premium" as const,
  },
];

const PRICING_ONETIME = [
  {
    name: "Gratis",
    price: "0 kr",
    period: "for alltid",
    description: "Kom i gang med det grunnleggende.",
    features: [
      "Gjesteliste (opptil 50)",
      "Enkel budsjettoversikt",
      "Tidslinjemal",
    ],
    cta: "Start gratis",
    style: "free" as const,
  },
  {
    name: "Standard",
    price: "799 kr",
    period: "engangskjop · 18 mnd tilgang",
    description: "For par som vil ha full kontroll.",
    features: [
      "Alt i Gratis",
      "Ubegrenset gjester",
      "RSVP & digitale invitasjoner",
      "Full budsjettstyring",
      "Leverandoroversikt",
    ],
    cta: "Velg Standard",
    popular: true,
    style: "standard" as const,
  },
  {
    name: "Premium",
    price: "1 499 kr",
    period: "engangskjop · 18 mnd tilgang",
    description: "Alt du trenger, pluss smarte verktoy.",
    features: [
      "Alt i Standard",
      "AI-leverandorsok",
      "Prissammenligning",
      "Personlig bryllupsside",
      "Prioritert support",
    ],
    cta: "Velg Premium",
    style: "premium" as const,
  },
];

// ── Component ─────────────────────────────────────────────────

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [billingMode, setBillingMode] = useState<"monthly" | "onetime">("monthly");

  // Waitlist form
  const [wlName, setWlName] = useState("");
  const [wlEmail, setWlEmail] = useState("");
  const [wlCity, setWlCity] = useState("");
  const [wlSubmitted, setWlSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (wlEmail.trim() && wlName.trim()) {
      setWlSubmitted(true);
    }
  };

  const pricing = billingMode === "monthly" ? PRICING_MONTHLY : PRICING_ONETIME;

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      {/* ─── NAVBAR (glassmorphism) ─── */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 bg-white/60 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "shadow-sm border-b border-stone-200/50" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e11d48"/>
            </svg>
            <span className="text-lg font-bold tracking-tight text-stone-900">Planlegg</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-stone-500 transition hover:text-stone-900">Funksjoner</a>
            <a href="#pricing" className="text-sm text-stone-500 transition hover:text-stone-900">Pris</a>
            <a href="#waitlist" className="text-sm text-stone-500 transition hover:text-stone-900">Venteliste</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-medium text-stone-700 transition hover:text-rose-600">
              Logg inn
            </Link>
            <button
              onClick={() => setShowOnboarding(true)}
              className="rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Kom i gang
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

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
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#waitlist"
                  className="rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
                >
                  Sikre din plass
                </a>
                <a
                  href="#features"
                  className="rounded-full border border-stone-300 bg-white/60 px-7 py-3 text-sm font-semibold text-stone-700 backdrop-blur-sm transition hover:bg-white"
                >
                  Se funksjoner
                </a>
              </div>
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
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-stone-900">Hei, Vegard & Line</p>
                        <p className="text-xs text-stone-400">447 dager til bryllupet</p>
                      </div>
                      <div className="rounded-lg bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">14. jun 2027</div>
                    </div>
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
            <p className="text-sm font-semibold text-primary">Enkel og rettferdig prising</p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
              Velg planen som passer dere
            </h2>
            <p className="mt-4 text-[16px] text-stone-500">
              Full tilgang fra forlovelse til bryllupsdag. Ingen skjulte kostnader.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 inline-flex items-center gap-1 rounded-full bg-stone-100 p-1">
              <button
                onClick={() => setBillingMode("monthly")}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  billingMode === "monthly"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                Manedlig
              </button>
              <button
                onClick={() => setBillingMode("onetime")}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  billingMode === "onetime"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                Engangskjop
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {pricing.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl p-8 ${
                  tier.style === "free"
                    ? "border border-stone-200 bg-white"
                    : tier.style === "standard"
                      ? "border-2 border-rose-200 bg-white shadow-lg"
                      : "bg-stone-900 text-white"
                }`}
              >
                {tier.style === "standard" && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-rose-500 px-4 py-1 text-xs font-semibold text-white">
                    Mest populaer
                  </span>
                )}
                <h3
                  className={`text-lg font-bold ${
                    tier.style === "premium" ? "text-white" : "text-stone-900"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    tier.style === "premium" ? "text-stone-400" : "text-stone-500"
                  }`}
                >
                  {tier.description}
                </p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span
                    className={`font-serif text-4xl font-bold ${
                      tier.style === "premium" ? "text-white" : "text-stone-900"
                    }`}
                  >
                    {tier.price}
                  </span>
                </div>
                <p
                  className={`mt-1 text-xs ${
                    tier.style === "premium" ? "text-stone-500" : "text-stone-400"
                  }`}
                >
                  {tier.period}
                </p>

                <div className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <svg
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          tier.style === "premium" ? "text-rose-400" : "text-emerald-500"
                        }`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span
                        className={`text-sm ${
                          tier.style === "premium" ? "text-stone-300" : "text-stone-600"
                        }`}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#waitlist"
                  className={`mt-8 flex h-12 w-full items-center justify-center rounded-lg text-sm font-semibold transition ${
                    tier.style === "free"
                      ? "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                      : tier.style === "standard"
                        ? "bg-stone-900 text-white hover:bg-stone-800"
                        : "bg-white text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-stone-400">
            Usikker? Start gratis og oppgrader nar du er klar.
          </p>
        </div>
      </section>

      {/* ─── WAITLIST ─── */}
      <section id="waitlist" className="bg-gradient-to-b from-white to-rose-50/40 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left — text */}
            <div>
              <p className="text-sm font-semibold text-primary">Begrenset tilgang</p>
              <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                Fa tidlig tilgang
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-stone-500">
                Meld deg pa ventelisten og vaer blant de forste som tester Planlegg.
                Tidlige brukere far gratis Premium i 3 maneder.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["V", "L", "S", "M"].map((letter, i) => (
                    <div
                      key={letter}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-stone-200 text-xs font-bold text-stone-600"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-stone-500">
                  <span className="font-semibold text-stone-700">127 personer</span> har allerede sikret sin plass
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-lg">
              {!wlSubmitted ? (
                <form onSubmit={handleWaitlist} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-stone-700">Navn *</label>
                    <input
                      type="text"
                      value={wlName}
                      onChange={(e) => setWlName(e.target.value)}
                      placeholder="Ditt navn"
                      required
                      className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-white px-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/10"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-stone-700">E-post *</label>
                    <input
                      type="email"
                      value={wlEmail}
                      onChange={(e) => setWlEmail(e.target.value)}
                      placeholder="din@epost.no"
                      required
                      className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-white px-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/10"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-stone-700">Hvilken by gifter du deg i? <span className="text-stone-400">(valgfritt)</span></label>
                    <input
                      type="text"
                      value={wlCity}
                      onChange={(e) => setWlCity(e.target.value)}
                      placeholder="f.eks. Bergen, Oslo, Trondheim"
                      className="mt-1.5 h-11 w-full rounded-lg border border-stone-300 bg-white px-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/10"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-stone-900 text-sm font-semibold text-white transition hover:bg-stone-800"
                  >
                    Sikre min plass
                  </button>
                  <p className="text-center text-xs text-stone-400">Ingen spam, vi lover.</p>
                </form>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                    <svg className="h-8 w-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-stone-900">Du er pa listen!</h3>
                  <p className="mt-2 text-sm text-stone-500">
                    Vi kontakter deg snart med en invitasjon til Planlegg. Hold utkikk i innboksen.
                  </p>
                </div>
              )}
            </div>
          </div>
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

// ── Static data ───────────────────────────────────────────────

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
