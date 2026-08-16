/**
 * Two tiers, and the distinction matters.
 *
 *   `built`  — products Airaf owns end to end. Stacks below were verified
 *              against the GitHub API (languages + package.json), not guessed.
 *   `client` — work delivered for an employer. Framed by contribution, never
 *              as ownership.
 *
 * Rule: never invent a stack. If it isn't verifiable, leave it out.
 */

export type Project = {
  slug: string
  title: string
  kind: "built" | "client"
  /** One line. What it is, not how it makes you feel. */
  blurb: string
  /** Only on `built` — what was actually hard about it. */
  detail?: string
  stack: string[]
  live?: string
  repo?: string
  /** For client work: the honest scope of involvement. */
  contribution?: string
  year?: string
}

/* ── Tier 1 · Built & owned ─────────────────────────────────────────── */

export const built: Project[] = [
  {
    slug: "dinely",
    title: "Dinely",
    kind: "built",
    blurb:
      "Reservation and floor-management platform for high-end restaurants.",
    detail:
      "A four-step booking wizard sits on top of an interactive floor map, while staff work a live occupancy dashboard on the same data. The scheduling and availability rules live in Postgres — roughly 38k lines of PL/pgSQL — so a double-booking is impossible at the database level rather than the UI level.",
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "Supabase",
      "PL/pgSQL",
      "Express",
      "Docker",
      "Fly.io",
    ],
    live: "https://dinely-ashy.vercel.app",
    repo: "https://github.com/pizn-01/dinely",
  },
  {
    slug: "ielts-grader",
    title: "IELTS Grader",
    kind: "built",
    blurb: "AI-assisted assessment engine for IELTS writing tasks.",
    detail:
      "Three deployed surfaces — marketing site, candidate app, and an examiner dashboard — over a shared Python grading service. Scoring runs against the public band descriptors, so feedback cites the criterion it came from instead of returning an opaque number.",
    stack: ["React", "Node.js", "Python", "Supabase", "Postgres", "Docker"],
    live: "https://ielts-grader-one.vercel.app",
    repo: "https://github.com/pizn-01/IELTS_GRADER",
  },
  {
    slug: "apexverse",
    title: "Apexverse",
    kind: "built",
    blurb: "Full-stack platform with authentication, media, and mail.",
    detail:
      "Built the whole vertical: session auth with Passport, a type-safe schema layer in Drizzle over Postgres, upload handling, and transactional mail — deployed as a single Express service behind a React client.",
    stack: [
      "Express",
      "Drizzle ORM",
      "Postgres",
      "Passport",
      "React",
      "TypeScript",
      "Zod",
    ],
    live: "https://apexverse-murex.vercel.app",
    repo: "https://github.com/pizn-01/apexverse_",
  },
  {
    slug: "carmazium",
    title: "Carmazium",
    kind: "built",
    blurb: "Cinematic-first automotive marketplace.",
    detail:
      "An attempt to give a car listing the weight it has in a physical showroom — full-bleed imagery, scroll-driven sequencing, and a browsing model built around one vehicle at a time rather than a results grid.",
    stack: ["Next.js 15", "Tailwind v4", "Framer Motion", "TypeScript", "Docker"],
    live: "https://carmazium.vercel.app",
    repo: "https://github.com/pizn-01/carmazium",
  },
  {
    slug: "threatv",
    title: "ThreatV",
    kind: "built",
    blurb: "Vulnerability triage tooling for security teams.",
    detail:
      "Ingests the CISA KEV catalogue and EPSS exploit-probability scores, normalises OpenVAS scan output against them, and ranks findings by likelihood of real-world exploitation — so remediation queues are ordered by risk rather than raw CVSS.",
    stack: ["Python", "CISA KEV", "EPSS", "OpenVAS", "Machine Learning"],
    repo: "https://github.com/pizn-01/ThreatV",
  },
  {
    slug: "finacc",
    title: "FinAcc Solutions",
    kind: "built",
    blurb: "Financial and accounting services platform.",
    detail:
      "Server-rendered throughout, with Supabase SSR and middleware-enforced auth so gated content is never shipped to the client and then hidden.",
    stack: ["Next.js 14", "Supabase SSR", "Framer Motion", "Lenis", "TypeScript"],
    live: "https://finaccsolutions.vercel.app",
    repo: "https://github.com/pizn-01/finaccsolutions",
  },
]

/* ── Tier 2 · Client & agency work ──────────────────────────────────── */
//
// Delivered under Tech Cabin, LogoPidea, Friends Technologies, and
// Bits and digits. `contribution` states the actual scope — these are not
// owned products and must never be presented as such.
//
// ⚠ Fabletics UK, Edmunds, and Monsoon UK were listed on the previous
// version of this site with invented stacks. They are held out pending
// confirmation of the real scope of involvement. Do not re-add them without it.

export const clientWork: Project[] = [
  {
    slug: "gotrack",
    title: "GoTrack UAE",
    kind: "client",
    blurb: "Fleet tracking and GPS monitoring service.",
    contribution: "Front-end build and CMS integration",
    stack: ["WordPress", "JavaScript", "MySQL"],
    live: "https://gotrack.ae/",
  },
  {
    slug: "doctor-on-calls",
    title: "Doctor On Calls",
    kind: "client",
    blurb: "Telemedicine booking for online consultations.",
    contribution: "Front-end build",
    stack: ["React", "WordPress", "PHP"],
    live: "https://doctoroncalls.ae/",
  },
  {
    slug: "uhc-dubai",
    title: "UHC Dubai",
    kind: "client",
    blurb: "Healthcare group site with appointment scheduling.",
    contribution: "Front-end build",
    stack: ["React", "WordPress", "PHP"],
    live: "https://www.uhcdubai.com/",
  },
  {
    slug: "alpha-cargo",
    title: "Alpha Cargo",
    kind: "client",
    blurb: "Logistics and shipment tracking.",
    contribution: "Front-end build and CMS integration",
    stack: ["React", "WordPress", "PHP"],
    live: "https://alphacargo.ae/",
  },
  {
    slug: "swiss-arabian",
    title: "Swiss Arabian UAE",
    kind: "client",
    blurb: "Fragrance house e-commerce storefront.",
    contribution: "Storefront development",
    stack: ["WooCommerce", "PHP", "JavaScript"],
    live: "https://uae.swissarabian.com/",
  },
  {
    slug: "madame",
    title: "Madame Pakistan",
    kind: "client",
    blurb: "Fashion retail e-commerce.",
    contribution: "Storefront development",
    stack: ["Shopify", "JavaScript", "Liquid"],
    live: "https://madame.pk/",
  },
  {
    slug: "speakeasy",
    title: "Speakeasy UAE",
    kind: "client",
    blurb: "Bar and restaurant site with reservations.",
    contribution: "Front-end build",
    stack: ["WordPress", "PHP", "JavaScript"],
    live: "https://speakeasy.ae/",
  },
  {
    slug: "nadia-khan",
    title: "Nadia Khan Official",
    kind: "client",
    blurb: "Media personality site with content management.",
    contribution: "Full site build",
    stack: ["Next.js", "React", "CMS"],
    live: "https://nadiakhanofficial.com/",
  },
  {
    slug: "davis-interior",
    title: "Davis Interior",
    kind: "client",
    blurb: "Interior design studio portfolio.",
    contribution: "Front-end build",
    stack: ["Next.js", "Tailwind CSS"],
    live: "https://davisinterior.com/",
  },
  {
    slug: "original-creator",
    title: "The Original Creator",
    kind: "client",
    blurb: "Creative agency portfolio platform.",
    contribution: "Front-end build",
    stack: ["Next.js", "TypeScript"],
    live: "https://www.theoriginalcreator.com/",
  },
  {
    slug: "flying-tech",
    title: "Flying Tech",
    kind: "client",
    blurb: "Technology services company site.",
    contribution: "Front-end build",
    stack: ["Next.js", "React", "Node.js"],
    live: "https://www.flyingtech.co.uk/",
  },
  {
    slug: "litco",
    title: "LIT Co Industries",
    kind: "client",
    blurb: "Industrial manufacturer with a product catalogue.",
    contribution: "Front-end build and CMS integration",
    stack: ["Next.js", "TypeScript", "CMS"],
    live: "https://www.litcoindustries.ae/",
  },
  {
    slug: "friends-industries",
    title: "Friends Industries",
    kind: "client",
    blurb: "Manufacturing and trading company platform.",
    contribution: "Full site build",
    stack: ["React", "Node.js", "MySQL"],
    live: "https://www.friendsindustries.com.pk/",
  },
  {
    slug: "sgs-cleaning",
    title: "SGS Cleaning",
    kind: "client",
    blurb: "Facilities services site with online booking.",
    contribution: "Front-end build",
    stack: ["WordPress", "PHP", "JavaScript"],
    live: "https://sgscleaning.ae/",
  },
  {
    slug: "me-naturals",
    title: "Me Naturals",
    kind: "client",
    blurb: "Skincare e-commerce storefront.",
    contribution: "Storefront development",
    stack: ["WooCommerce", "WordPress", "PHP"],
    live: "https://www.menaturals.net/",
  },
  {
    slug: "crude-oil-capitol",
    title: "Crude Oil Capitol",
    kind: "client",
    blurb: "Commodity trading information platform.",
    contribution: "Front-end build",
    stack: ["React", "Node.js"],
    live: "https://www.crudeoilcapitol.com/",
  },
]

export const allProjects = [...built, ...clientWork]
