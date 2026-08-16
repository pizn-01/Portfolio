# CLAUDE.md — M.Airaf Adil Portfolio

Next.js 14 (App Router) single-page portfolio. Target: Awwwards-grade — premium/luxury,
technical, creative. Currently mid-redesign from an ember/orange v0.dev scaffold to the
system defined below.

---

## 1. Ground truth (verified — do not contradict)

### Identity
- **Name:** M. Airaf Adil
- **Title:** Lead Full Stack Engineer
- **Location:** Karachi, Pakistan
- **Since:** October 2019 (~6.5 years experience — never say 4)
- **Email:** airafadil619@gmail.com · **Phone:** +92 334 3365685
- **GitHub:** github.com/pizn-01 · **LinkedIn:** /in/muhammad-airaf-adil-b12b33322

### Employment (source: LinkedIn, Aug 2026 — supersedes all older site copy)

| Role | Company | Period | Type |
|---|---|---|---|
| Lead Full Stack Engineer | Tech Cabin | Nov 2024 – Present | Full-time, Hybrid |
| Full-stack Developer | LogoPidea | Jul 2023 – Oct 2024 | Full-time, On-site |
| Full-stack Developer | Friends Technologies | Dec 2021 – Jul 2023 | Part-time, On-site |
| Frontend Web Developer | Bits and digits | Oct 2019 – Oct 2021 | Part-time, Hybrid |

> The pre-redesign `app/page.tsx` had all four of these wrong (missing Tech Cabin, wrong
> dates, wrong titles). If you find old values anywhere, they are stale — use this table.

### Projects — two tiers, honesty is non-negotiable

**Tier 1: Built & owned** (verified against the GitHub API — lead with these)

| Project | Real stack | Evidence |
|---|---|---|
| **Dinely** — restaurant reservation SaaS | React + Vite, TypeScript, Supabase, Express backend, **PL/pgSQL (~38k)**, Docker, Fly.io | `pizn-01/dinely` |
| **IELTS Grader** — AI writing assessment | JS ~1.5M + **Python ~955k**, Supabase, Docker, separate backend + dashboard + site | `pizn-01/IELTS_GRADER` |
| **Apexverse** — full-stack platform | Express, **Drizzle ORM**, Postgres, Passport auth, Multer, Nodemailer, React/wouter, Railway/Render | `pizn-01/apexverse_` |
| **Carmazium** — automotive marketplace | Next.js 15, Tailwind v4, Framer Motion, Docker (~7MB TS) | `pizn-01/carmazium` |
| **FinAcc Solutions** — financial services | Next.js 14, Supabase SSR + middleware, Framer Motion, Lenis | `pizn-01/finaccsolutions` |
| **ThreatV** — security analytics | Python, CISA KEV + EPSS ingestion, OpenVAS parsing, ML scoring | `pizn-01/ThreatV` |

**Tier 2: Client & agency work** — delivered *for* employers. Must be framed by
contribution ("Frontend rebuild for…"), never as ownership.

> ⚠️ **Unresolved:** Fabletics UK, Edmunds, and Monsoon UK are large third-party brands.
> Until Airaf confirms his actual role, they stay out or are explicitly labelled by
> contribution. Never ship them with invented stacks. A single caught overclaim
> discredits the whole list.

**Also stale:** the old site listed Dinely as "Next.js + Stripe" — it is React/Vite and
has no Stripe dependency.

---

## 2. Design system (locked — derive everything from this)

### Palette
Source: user-supplied Canva palette. The rule that makes it work — **Tan carries luxury,
Periwinkle carries tech**, so the two halves of the brief never fight.

| Token | Hex | Role |
|---|---|---|
| `ink` | `#0B1224` | Deepest ground — hero, the void |
| `cadet` | `#1E2952` | Primary surface, section grounds |
| `cadet-lift` | `#2A3766` | Borders, raised cards, hairline grid |
| `tan` | `#DCBE9F` | **Luxury accent** — hairlines, rules, the Spine |
| `periwinkle` | `#BED4F9` | **Tech accent** — interactive, links, live data, code |
| `antique` | `#F1E7D7` | Body text on dark; ground of the inverted section |
| `muted` | `#8FA0C4` | Secondary text |

**Banned:** every `ember` / `warm` / `night` token from the old theme. Orange appears nowhere.

**The inversion:** exactly one section (Contact) flips to `antique` ground with `cadet`
type. It is a cut to daylight after a long descent — do not use it twice.

### Typography
Direction A, "Refined chaos". All via `next/font` — never CSS `@import`.

- **Display — Fraunces** (variable; use the `WONK` axis, weight ~300 at display sizes).
  Luxurious and slightly unhinged. Deliberately *not* Playfair.
- **Body — Geist**
- **Data — JetBrains Mono**: section labels, dates, stacks, metrics

**Banned:** Space Grotesk + Inter (the default AI-portfolio pairing).

### The signature: "The Spine"
One continuous 1px Tan hairline running the full page length, drawn as an SVG path via
GSAP ScrollTrigger `scrub`. It descends through the stack; each section's eyebrow is its
**layer**, not a number:

```
CLIENT ──── about
  ├─ INTERFACE ──── skills
  ├─ SERVICE ────── experience
  ├─ DELIVERY ───── projects
  └─ DATA ───────── contact
```

The Spine branches at each section into that section's divider rule, then rejoins.

**Kill the `01 / 02 / 03` eyebrows.** The content is not a sequence; the numbers encode
nothing. Layer names encode something true about full-stack work.

This is the *one* bold element. Everything around it stays quiet and disciplined
(Chanel rule: remove one accessory before shipping).

---

## 3. Motion

Strict library split — do not overlap.

| Pattern | Library | Where |
|---|---|---|
| Spine path draw (scrubbed) | GSAP ScrollTrigger, stroke-dashoffset | Global |
| Pinned hero intro sequence | GSAP timeline, `pin: true` | Hero |
| Horizontal pinned gallery | GSAP `xPercent` scrub | Projects |
| Timeline scrub-reveal | GSAP | Experience |
| Entrance reveals | Framer Motion `whileInView` | Everywhere |
| Hover / magnetic micro-interactions | Framer Motion `useSpring` | Buttons, cards |
| Cursor follower | Framer Motion `useSpring` | Global |

### Non-negotiable rules
- `gsap.registerPlugin(ScrollTrigger)` before any ScrollTrigger use
- **`useGSAP` from `@gsap/react`** — never plain `useEffect` (it auto-cleans triggers)
- **`ease: 'none'` on every scrub** — easing feels wrong when scrubbing
- Animate `transform` and `opacity` only — never `width`, `height`, `box-shadow`
- **`gsap.matchMedia` + `prefers-reduced-motion` everywhere.** The old site had zero
  reduced-motion handling. Awwwards jurors check this.
- `markers: true` is for dev only — strip before commit
- Framer `useTransform` output goes into `style` on a `motion.*` element, not a plain div
- Every file using motion hooks needs `'use client'`
- Lenis stays; ScrollTrigger must be wired to it via `scrollerProxy`/`lenis.on('scroll')`

---

## 4. Architecture rules

- **Content lives in `lib/content/`**, not in `app/page.tsx`. The old page was a 343-line
  client component holding every project as an inline `useMemo`. Updating the portfolio
  should never mean editing a component.
- Keep `page.tsx` a server component where possible; push `'use client'` down to the
  leaves that need it.
- `components/sections/` = one file per section. `components/motion/` = reusable
  animation primitives.

### Known debt to clear
- `next.config.mjs` disables **both** `eslint` and `typescript` build checks — re-enable
  once the redesign type-checks
- Fonts load via render-blocking `@import` in `globals.css:1` → move to `next/font`
- ~50 shadcn/ui components installed, **one** (`badge`) used. Unused deps: `recharts`,
  `embla-carousel-react`, `react-hook-form`, `cmdk`, `vaul`, `input-otp`, `sonner`,
  `next-themes`, most `@radix-ui/*`
- Many deps pinned to `"latest"` → non-reproducible builds
- No `metadataBase`, OG image, favicon, sitemap, or robots
- `images.unoptimized: true` — must change when real screenshots land
- `README.md` is still v0.dev sync boilerplate

### Assets still needed from Airaf
Project screenshots, an OG image, a favicon. Cannot be generated here.

---

## 5. Commands

```bash
npm run dev
npm run build
npm run lint
node scripts/capture-shots.mjs   # refresh project screenshots
```

> ⚠️ **Never run `npm run build` while `next dev` is running.** They share
> `.next`, and the build overwrites the dev server's chunks. The page then
> loads unstyled, 404s its JS, and reports phantom syntax errors in files that
> are perfectly valid — this has already cost two debugging detours. Stop the
> dev server, `rm -rf .next`, then build.

### Contact form env
```
RESEND_API_KEY=re_xxx     required, or the form reports it isn't configured
CONTACT_TO=...            defaults to airafadil619@gmail.com
CONTACT_FROM=...          must be a Resend-verified sender
```

### Sizing the pinned gallery
Cards are capped with `max-h` **and** height-based media variants
(`[@media(max-height:780px)]`), not viewport height alone. A laptop at
1366×768 leaves roughly 530px of usable page — a card sized only in `svh`
overflows there, collides with its own footer, and hides under the navbar.
Always test the gallery at ~530px viewport height, not just at the window size.

Windows + PowerShell. Deploys to Vercel from `main`.
