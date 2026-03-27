# Wedding Planner — Bryllupsplanlegger

## Prosjektbeskrivelse

En komplett bryllupsplanlegger-applikasjon som hjelper par med å planlegge og gjennomføre bryllupet fra A til Å. Applikasjonen dekker hele prosessen fra tidlig planlegging til gjennomføring, med fokus på estetikk, flyt og brukervennlighet.

### Kjernefunksjonalitet

- **Dashboard for arrangører** — Fullstendig oversikt over alle aspekter av bryllupet
- **Gjesteportal** — Egen visning for gjester med RSVP, info, bildedeling
- **Budsjett & sparing** — Oversikt over budsjett, sparing, forbruk med kategorier
- **Gjesteliste** — Komplett gjestehåndtering med grupper, RSVP, diett, bordplassering
- **Tidslinje & frister** — Milestones, deadlines, påminnelser og oppfølging
- **Leverandører** — Finne, sammenligne, kontrakter og vurderinger
- **Invitasjoner** — Maler, utsending, sporing av svar
- **E-posthåndtering** — Automatiske svar, maler, oppfølging
- **Bildegalleri** — Opplasting, album, deling mellom arrangører og gjester
- **AI Chat** — Spør om all info, få forslag og hjelp med planlegging

## Tech Stack

| Lag | Teknologi |
|-----|-----------|
| Framework | Next.js 15 (App Router) |
| Språk | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | PostgreSQL (Neon/Supabase) |
| ORM | Prisma |
| Auth | NextAuth.js v5 (Auth.js) |
| E-post | Resend |
| Lagring | Uploadthing (bilder) |
| AI | Claude API (Anthropic SDK) |
| Validering | Zod |
| State | Zustand (klient), React Query (server) |
| Testing | Vitest + Playwright |
| Deploy | Vercel |

## Prosjektstruktur

```
wedding-planner/
├── CLAUDE.md                    # Denne filen
├── .env.local                   # Lokale miljøvariabler (IKKE commit)
├── .env.example                 # Mal for miljøvariabler
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── prisma/
│   ├── schema.prisma            # Databaseskjema
│   ├── migrations/              # Databasemigreringer
│   └── seed/                    # Seed-data for utvikling
│       └── index.ts
├── public/
│   ├── images/                  # Statiske bilder
│   ├── fonts/                   # Custom fonts
│   └── icons/                   # Favicon, app-ikoner
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing page
│   │   ├── globals.css
│   │   ├── (auth)/              # Auth-ruter (login, register, etc.)
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── dashboard/           # Arrangør-dashboard
│   │   │   ├── layout.tsx       # Dashboard layout med sidebar
│   │   │   ├── overview/        # Hovedoversikt
│   │   │   ├── budget/          # Budsjett, sparing, forbruk
│   │   │   ├── guests/          # Gjesteliste, grupper, RSVP
│   │   │   ├── timeline/        # Tidslinjer, frister, påminnelser
│   │   │   ├── vendors/         # Leverandører
│   │   │   ├── invitations/     # Invitasjoner
│   │   │   ├── photos/          # Bilder og album
│   │   │   ├── emails/          # E-posthåndtering
│   │   │   ├── chat/            # AI-chat
│   │   │   └── settings/        # Innstillinger
│   │   ├── guest-portal/        # Gjestevisning
│   │   │   ├── rsvp/
│   │   │   ├── info/
│   │   │   ├── photos/
│   │   │   ├── gift-registry/
│   │   │   └── schedule/
│   │   └── (api)/               # API-ruter
│   ├── components/
│   │   ├── ui/                  # shadcn/ui base-komponenter
│   │   ├── layout/              # Header, Sidebar, Footer, Nav
│   │   ├── dashboard/           # Dashboard-spesifikke komponenter
│   │   ├── guest-portal/        # Gjesteportal-komponenter
│   │   ├── shared/              # Delte komponenter
│   │   ├── forms/               # Skjema-komponenter
│   │   └── charts/              # Grafer og diagrammer
│   ├── lib/
│   │   ├── db/                  # Prisma client, queries
│   │   ├── auth/                # Auth config, helpers
│   │   ├── email/               # Resend config, templates
│   │   ├── storage/             # Uploadthing config
│   │   ├── ai/                  # Claude API, prompts
│   │   ├── utils/               # Hjelpefunksjoner
│   │   ├── validations/         # Zod-skjemaer
│   │   └── hooks/               # Custom React hooks
│   ├── types/                   # TypeScript-typer
│   ├── styles/                  # Globale stiler, tema
│   └── config/                  # App-konfigurasjon
└── docs/                        # Dokumentasjon
```

## Kodestandarder

### Generelt
- **Språk i kode**: Engelsk for kode, norsk for brukergrensesnitt (UI-tekster)
- **TypeScript strict mode** — Ingen `any`, alltid eksplisitte typer
- **Funksjonelle komponenter** — Bruk React Server Components der mulig
- **Server Actions** — Bruk Next.js Server Actions for mutasjoner
- **Imports** — Bruk `@/` path alias for src/

### Filnavngivning
- Komponenter: `PascalCase.tsx` (f.eks. `GuestList.tsx`)
- Utilities: `camelCase.ts` (f.eks. `formatCurrency.ts`)
- Typer: `camelCase.ts` med PascalCase for type/interface-navn
- Sider: `page.tsx` (Next.js konvensjon)

### Komponentstruktur
```tsx
// 1. Imports
// 2. Types/interfaces
// 3. Component
// 4. Sub-components (hvis nødvendig)
```

### Dataflyt
- Server Components henter data direkte via Prisma
- Client Components bruker React Query for server-state
- Zustand for UI-state (modaler, sidebarer, filtre)
- Zod-validering på både klient og server

### Feilhåndtering
- Bruk Next.js `error.tsx` boundaries per rute
- Vis brukervennlige feilmeldinger på norsk
- Logg tekniske feil server-side

## Database (Prisma Schema Oversikt)

### Hovedmodeller
- `User` — Bruker (arrangør)
- `Wedding` — Bryllup (knyttet til par)
- `Guest` — Gjest med RSVP-status, diett, bordgruppe
- `GuestGroup` — Gruppering av gjester
- `BudgetCategory` — Budsjettkategorier
- `BudgetItem` — Individuelle utgifter/sparinger
- `Vendor` — Leverandør med kategori, kontakt, kontrakt
- `TimelineEvent` — Milestones, deadlines, påminnelser
- `Invitation` — Invitasjon med mal og sporingsstatus
- `Photo` — Bilde med album, tags, deling
- `Album` — Bildealbum
- `Email` — E-post med mal, status, auto-svar
- `ChatMessage` — AI-chat meldinger
- `Notification` — Varslinger og påminnelser

### Relasjoner
- En Wedding har mange Guests, BudgetItems, Vendors, etc.
- Gjester kan tilhøre GuestGroups
- BudgetItems tilhører BudgetCategories
- Photos tilhører Albums

## Design & UX Prinsipper

- **Minimalistisk og elegant** — Bryllupsestetikk, soft fargepalett
- **Mobile-first** — Responsivt design
- **Flyt-fokusert** — Minst mulig friksjon, logisk navigasjon
- **Progressiv avsløring** — Vis kun det som er relevant
- **Micro-interactions** — Subtile animasjoner med Framer Motion
- **Tilgjengelighet** — WCAG 2.1 AA

### Fargepalett (forslag)
- Primary: Dempet sage/oliven grønn
- Secondary: Varm beige/cream
- Accent: Dusty rose / soft gold
- Neutral: Warm greys
- Background: Off-white / cream

## Viktige Kommandoer

```bash
# Utvikling
npm run dev              # Start utviklingsserver
npm run build            # Bygg for produksjon
npm run lint             # Kjør linting
npm run type-check       # TypeScript sjekk

# Database
npx prisma generate      # Generer Prisma client
npx prisma db push       # Push skjema til database
npx prisma migrate dev   # Opprett migrering
npx prisma studio        # Åpne Prisma Studio
npx prisma db seed       # Seed database

# Testing
npm run test             # Kjør enhetstester
npm run test:e2e         # Kjør E2E-tester
```

## Miljøvariabler

Se `.env.example` for komplett liste. Krever:
- Database URL (PostgreSQL)
- NextAuth secret + providers
- Resend API key
- Uploadthing credentials
- Anthropic API key (Claude)

## AI Chat-funksjon

Chatten bruker Claude API og har tilgang til all bryllupsdata for brukeren. Den kan:
- Svare på spørsmål om gjestelisten, budsjettet, tidslinjen
- Foreslå leverandører basert på budsjett og preferanser
- Hjelpe med å skrive invitasjonstekster
- Gi påminnelser om kommende frister
- Foreslå bordplassering basert på relasjoner
- Hjelpe med e-postutkast til leverandører og gjester
- Gi generelle bryllupstips og råd

Chatten bruker RAG-mønster: hent relevant data fra databasen basert på spørsmålet, send som kontekst til Claude.
