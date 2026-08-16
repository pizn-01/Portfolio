/**
 * Operator mode — engineering leadership.
 *
 * ── Why this file reads the way it does ─────────────────────────────────
 * The first draft was written before any facts existed, so it filled up with
 * management language: "technical direction", "standards and quality",
 * Intake → Scope → Build → QA → Handover. All of it true of every engineering
 * manager alive, and therefore evidence of nothing.
 *
 * Everything here now comes from something Airaf actually did. Where a figure
 * is a range, the range is what he gave — bands are not rounded up to their
 * top end. Anything still unknown is marked `pending` and renders as a gap.
 */

export type Metric = {
  key: string
  value?: string
  caption: string
  pending?: boolean
}

/* ── Positioning ────────────────────────────────────────────────────────
 *
 * Target: Head of Development at a seed-stage startup. That reader is hiring
 * someone who can run the team *and* still make the technical calls, which is
 * the one claim here that isn't generic.
 */

export const positioning = {
  role: "Co-founder · Engineering Leadership",
  claim: "I run engineering. I still review the code.",
  lede:
    "Three years ago I started a development studio with a partner. It's four to eight people depending on the month, and it ships somewhere between sixteen and thirty client projects a year. About half of those clients come back. I do the estimating, the hiring and the code review, and I built all of this alongside a full-time engineering job.",
  /** Aimed at one role. The others read as adjacent without being named. */
  primaryRole: "Head of Development",
  targetContext: "Seed-stage startups",
  availability: "Remote — US-hours overlap, or any timezone",
}

/* ── The numbers ────────────────────────────────────────────────────────
 * Ranges are stated as ranges. A studio of this size shipping this many
 * projects is the actual claim: throughput per head, not headcount.
 */

export const headline: Metric[] = [
  {
    key: "Team size",
    value: "4–8",
    caption: "Employees and contractors, varying by month",
  },
  {
    key: "Projects a year",
    value: "16–30",
    caption: "Client work shipped across the studio",
  },
  {
    key: "Clients who return",
    value: "~50%",
    caption: "Roughly half commission again",
  },
  {
    key: "Longest client",
    value: "2–3 yrs",
    caption: "Almost the studio's whole life",
  },
]

/* ── Ventures ───────────────────────────────────────────────────────────
 * Xtenzium carries the evidence. The other two show range without
 * competing for the reader's judgement.
 */

export type Venture = {
  name: string
  kind: string
  role: string
  status: "Running" | "Running · product" | "In build"
  summary: string
  lead?: boolean
  url?: string
}

export const ventures: Venture[] = [
  {
    name: "Xtenzium",
    kind: "Custom development studio",
    role: "Co-founder",
    status: "Running",
    lead: true,
    summary:
      "Client engineering. Engagements are typically $6–7k, which means the margin lives or dies on how accurately the work was scoped. Most of what I know about running a team came from getting that wrong and then fixing it.",
  },
  {
    name: "Elevon",
    kind: "SaaS with a marketplace side",
    role: "Co-founder",
    status: "Running · product",
    summary:
      "Our own product rather than client work. Different failure mode: nobody is paying an invoice at the end of the month, so priorities have to be argued rather than assigned.",
  },
  {
    name: "Overlap",
    kind: "Engineering studio, US working hours",
    role: "Founder",
    status: "In build",
    url: "https://overlap-gules.vercel.app",
    summary:
      "A studio built around a shifted schedule so a Pakistan-based team overlaps the US business day. Currently being launched.",
  },
]

/* ── Decisions ──────────────────────────────────────────────────────────
 *
 * Two things that actually happened. These replace the generic capability
 * cards, because a hiring manager can interrogate these and can't
 * interrogate the phrase "standards and quality".
 */

export type Decision = {
  id: string
  kind: "Process" | "Architecture"
  title: string
  /** What was true before. */
  situation: string
  /** What was done. */
  action: string
  /** What changed permanently as a result — the part that matters. */
  result: string
  /** The alternative that was available and not taken. */
  rejected?: string
}

export const decisions: Decision[] = [
  {
    id: "scope",
    kind: "Process",
    title: "A scope breach, and the document that came out of it",
    situation:
      "A client's expectations drifted past what we'd agreed. On a $6–7k engagement there isn't margin to absorb that quietly, and there wasn't a written record of where the line had been.",
    action:
      "I took it to the client directly and walked them through the actual effort our team had spent against what was scoped. They agreed. The relationship survived and the project finished.",
    result:
      "Every scope document since has a section listing what is explicitly not included. Naming the exclusions up front stops the conversation happening at invoice time, when it always goes badly. It costs an hour to write and it has never cost us a client since.",
  },
  {
    id: "dinely",
    kind: "Architecture",
    title: "Putting the booking rules in Postgres instead of the app",
    situation:
      "Dinely is a restaurant reservation platform. Two people hitting the same table at the same second is the one failure the product cannot have.",
    action:
      "The scheduling and availability rules live in the database — roughly 38k lines of PL/pgSQL — rather than in application code. A double booking is rejected by Postgres, not caught by a check in the request handler.",
    rejected:
      "Enforcing it in the app layer, which is faster to write and what most of these systems do. It also can't guarantee correctness once two requests are in flight at once.",
    result:
      "It held. The trade is that the logic is harder to change and harder for a new developer to pick up, which is a real cost and one I'd make again for this particular guarantee.",
  },
]

/* ── How the studio runs ────────────────────────────────────────────────
 * Kept deliberately short. Four rules that are actually enforced, rather
 * than a five-stage diagram every agency on earth also has.
 */

export type Rule = {
  label: string
  detail: string
}

export const rules: Rule[] = [
  {
    label: "Scope says what we're not doing",
    detail:
      "Every proposal lists exclusions, not just inclusions. This came out of the breach above and it's the single most useful thing I've added.",
  },
  {
    label: "Estimates come from the architecture",
    detail:
      "I cost against how the thing will actually be built. At $6–7k an engagement, an estimate that's 30% out isn't a rounding error, it's the profit.",
  },
  {
    label: "I review the work",
    detail:
      "Not all of it, but enough that I know what's going out. A lead who has stopped reading the code is managing a report, not a team.",
  },
  {
    label: "Handover means they own it",
    detail:
      "Documentation and access transfer at the end. A client who can't leave isn't a retained client, they're a hostage — and about half of ours come back anyway.",
  },
]

/* ── Context an employer will ask about ────────────────────────────────── */

export const context = {
  concurrent:
    "All of this was built alongside full-time engineering roles — LogoPidea, then Tech Cabin. I'm not hiding that, and I'd rather answer it up front than have it found on LinkedIn.",
  /**
   * Framed as criteria rather than a request.
   *
   * The earlier version opened "I'm looking for a Head of Development role at
   * a seed-stage company", which reads as an application from someone who
   * needs the job. He runs three companies and isn't unemployed — so the
   * honest position is selectivity, and the page should state the conditions
   * under which a move makes sense rather than ask to be considered.
   */
  moveHeading: "What would make me move",
  move:
    "I'm not trying to walk away from what I've built. A Head of Development role would have to be worth leaving it for, which for me means three things.",
}

export type Condition = {
  label: string
  detail: string
}

export const conditions: Condition[] = [
  {
    label: "Engineering is still hands-on",
    detail:
      "Small enough that whoever leads it is expected to build. I'd be bad at a job where I only read dashboards.",
  },
  {
    label: "The team is mine to shape",
    detail:
      "Hiring, standards and how the work gets reviewed. Not inheriting a process I'm not allowed to change.",
  },
  {
    label: "The product is the business",
    detail:
      "Engineering treated as where the company is made rather than a cost line to be managed down.",
  },
]

/* ── Sections, for the rail's position indicator ───────────────────────
 * The engineer route names its sections after stack layers. This one names
 * them after what a reader is actually looking at, because a schedule has
 * stages rather than layers.
 */

export const opSections = [
  { id: "decisions", label: "Decisions" },
  { id: "ventures", label: "Ventures" },
  { id: "rules", label: "Rules" },
  { id: "terms", label: "Terms" },
]

export const TBC = "—"
