"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useWedding } from "@/lib/hooks/useWedding";

interface OnboardingFlowProps {
  open: boolean;
  onClose: () => void;
}

const THEME_OPTIONS = [
  "Rustikk",
  "Moderne",
  "Klassisk",
  "Bohemsk",
  "Botanisk",
  "Minimalistisk",
];

const TOTAL_STEPS = 5;

export default function OnboardingFlow({ open, onClose }: OnboardingFlowProps) {
  const router = useRouter();
  const { setConfig } = useWedding();
  const overlayRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  // Form state
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [city, setCity] = useState("");
  const [venue, setVenue] = useState("");
  const [guestTarget, setGuestTarget] = useState<number | "">("");
  const [budgetTotal, setBudgetTotal] = useState<number | "">("");
  const [theme, setTheme] = useState("");
  const [colorScheme, setColorScheme] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const next = () => {
    setDirection("forward");
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const back = () => {
    setDirection("back");
    setStep((s) => Math.max(s - 1, 0));
  };

  const finish = () => {
    setConfig((prev) => ({
      ...prev,
      name1: name1 || prev.name1,
      name2: name2 || prev.name2,
      weddingDate: weddingDate || prev.weddingDate,
      city: city || prev.city,
      venue: venue || prev.venue,
      guestTarget: guestTarget ? Number(guestTarget) : prev.guestTarget,
      budgetTotal: budgetTotal ? Number(budgetTotal) : prev.budgetTotal,
      theme: theme || prev.theme,
      colorScheme: colorScheme || prev.colorScheme,
    }));
    localStorage.setItem("onboarding-complete", "true");
    onClose();
    router.push("/dashboard");
  };

  const canNext = () => {
    if (step === 1) return name1.trim().length > 0;
    return true;
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="w-full max-w-xl rounded-2xl border border-border bg-white shadow-elevated animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-serif text-lg font-bold text-foreground">
            {step === 0 && "Velkommen"}
            {step === 1 && "Hvem er dere?"}
            {step === 2 && "Dato & sted"}
            {step === 3 && "Gjester & budsjett"}
            {step === 4 && "Tema & stil"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Step content */}
        <div className="p-8" key={step}>
          <div className={direction === "forward" ? "animate-step-forward" : "animate-step-back"}>
            {/* Step 0: Welcome */}
            {step === 0 && (
              <div className="text-center py-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-light">
                  <svg className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-bold text-foreground">
                  La oss planlegge bryllupet!
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground max-w-sm mx-auto">
                  Vi stiller noen korte sporsmal slik at vi kan sette opp
                  dashboardet ditt med en gang. Du kan endre alt senere.
                </p>
              </div>
            )}

            {/* Step 1: Names */}
            {step === 1 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Fortell oss navnene pa brudeparet.
                </p>
                <div>
                  <label className="text-sm font-medium text-foreground">Ditt navn *</label>
                  <input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Skriv inn ditt navn"
                    autoFocus
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Partners navn</label>
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Skriv inn partners navn"
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Date & Location */}
            {step === 2 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Har dere bestemt dato og sted? Fyll inn det dere vet.
                </p>
                <div>
                  <label className="text-sm font-medium text-foreground">Bryllupsdato</label>
                  <input
                    type="date"
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">By / sted</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="f.eks. Bergen"
                      className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Venue / lokale</label>
                    <input
                      type="text"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="f.eks. Solstrand Hotel"
                      className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Guests & Budget */}
            {step === 3 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Et omtrentlig anslag holder fint - dere kan justere dette senere.
                </p>
                <div>
                  <label className="text-sm font-medium text-foreground">Antall gjester (ca.)</label>
                  <input
                    type="number"
                    value={guestTarget}
                    onChange={(e) => setGuestTarget(e.target.value ? parseInt(e.target.value) : "")}
                    placeholder="f.eks. 100"
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Totalbudsjett (kr)</label>
                  <input
                    type="number"
                    value={budgetTotal}
                    onChange={(e) => setBudgetTotal(e.target.value ? parseInt(e.target.value) : "")}
                    placeholder="f.eks. 300000"
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Theme */}
            {step === 4 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Har dere en visjon for stilen? Velg et tema eller skriv inn eget.
                </p>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Tema</label>
                  <div className="flex flex-wrap gap-2">
                    {THEME_OPTIONS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(theme === t ? "" : t)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                          theme === t
                            ? "border-stone-900 bg-stone-900 text-white"
                            : "border-border bg-muted text-foreground hover:border-primary/30 hover:bg-primary-light"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Fargepalett (valgfritt)</label>
                  <input
                    type="text"
                    value={colorScheme}
                    onChange={(e) => setColorScheme(e.target.value)}
                    placeholder="f.eks. Sage green & dusty rose"
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer with navigation */}
        <div className="border-t border-border px-6 py-4 flex items-center justify-between">
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step
                    ? "w-6 bg-stone-900"
                    : i < step
                      ? "w-2 bg-stone-400"
                      : "w-2 bg-border"
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            {step > 0 && (
              <button
                onClick={back}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                Tilbake
              </button>
            )}

            {step >= 2 && step < TOTAL_STEPS - 1 && (
              <button
                onClick={next}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                Hopp over
              </button>
            )}

            {step === 0 && (
              <button
                onClick={next}
                className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800"
              >
                La oss starte
              </button>
            )}

            {step > 0 && step < TOTAL_STEPS - 1 && (
              <button
                onClick={next}
                disabled={!canNext()}
                className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Neste
              </button>
            )}

            {step === TOTAL_STEPS - 1 && (
              <button
                onClick={finish}
                className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800"
              >
                Fullfar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
