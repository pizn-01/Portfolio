/**
 * Operator mode — the delivery and operations persona.
 *
 * ── The rule for this file ──────────────────────────────────────────────
 * Every figure here is either supplied by Airaf or marked `pending`. A
 * `pending` field renders as a visible gap with a TBC marker, never as a
 * plausible-looking number. Management proof is exactly the kind of claim a
 * hiring manager checks in the first interview, and one invented figure would
 * discredit the page the way an invented stack would discredit the projects.
 *
 * To fill one in: replace the value and delete `pending: true`.
 */

export type Metric = {
  key: string
  /** Supplied value. Ignored while `pending` is true. */
  value?: string
  /** What the number means. Shown under the value. */
  caption: string
  pending?: boolean
}

export type Agency = {
  name: string
  /** Marks whether this is the custom-development or product-led business. */
  kind: "Custom development" | "Product"
  role: string
  since?: string
  /** What Airaf actually owns day to day. */
  owns: string[]
  summary: string
  pending?: boolean
}

export type Stage = {
  id: string
  label: string
  /** What happens at this stage. */
  what: string
  /** Specifically what Airaf does — this is the part that gets the interview. */
  mine: string
}

/* ── Positioning ────────────────────────────────────────────────────────
 *
 * Not "engineer who also manages" — that reads as two half-claims. The claim
 * is the combination as a specialty: someone who can cost and sequence a
 * build because they have shipped it themselves.
 */

export const positioning = {
  role: "Co-founder · Engineering Leadership",
  claim: "I own the architecture and the org chart.",
  lede:
    "I co-founded two companies — one doing custom engineering for clients, one building our own product — and I run engineering across both. Technical direction, hiring, standards and delivery are mine. The reason I can lead engineers is that I am one, and I still review the code.",
  /**
   * The page aims at engineering leadership, not project administration.
   * A CTO or Head of Development is hired for judgement about systems and
   * people together — so the proof on this page has to be both.
   */
  targetRoles: [
    "Head of Development",
    "CTO",
    "Head of Operations",
    "Development Manager",
  ],
}

/* ── What technical ownership actually means here ──────────────────────
 * The differentiator against a non-technical manager, and against an
 * engineer who has never carried a team.
 */

export type Ownership = {
  area: string
  detail: string
}

export const ownership: Ownership[] = [
  {
    area: "Technical direction",
    detail:
      "Stack choices, architecture reviews, and the calls about what we don't build. I make these with the team, not above it.",
  },
  {
    area: "Hiring and the bar",
    detail:
      "Who joins, how they're assessed, and what 'good' means here. I run the technical interviews myself.",
  },
  {
    area: "Standards and quality",
    detail:
      "Review culture, testing expectations, and what has to be true before something ships to a client.",
  },
  {
    area: "Delivery and commercials",
    detail:
      "Estimates, sequencing and scope changes — priced against the real architecture rather than a wishlist.",
  },
]

/* ── Headline metrics ───────────────────────────────────────────────────
 * The four numbers a delivery hire is scanned for. All pending.
 */

export const headline: Metric[] = [
  {
    key: "Engineers led",
    caption: "Across both companies",
    pending: true,
  },
  {
    key: "Projects shipped",
    caption: "Delivered to clients",
    pending: true,
  },
  {
    key: "Repeat-client rate",
    caption: "Clients who came back",
    pending: true,
  },
  {
    key: "Years leading",
    caption: "Since co-founding",
    pending: true,
  },
]

/* ── The two businesses ─────────────────────────────────────────────────── */

export const agencies: Agency[] = [
  {
    name: "Agency one",
    kind: "Custom development",
    role: "Co-founder",
    owns: [
      "Scoping and estimation",
      "Client relationships",
      "Team allocation",
      "Delivery cadence",
    ],
    summary:
      "Custom engineering for clients — the work is bespoke, so the hard part is scoping honestly and staffing to match.",
    pending: true,
  },
  {
    name: "Agency two",
    kind: "Product",
    role: "Co-founder · Operations",
    owns: [
      "Full operations",
      "Roadmap and prioritisation",
      "Hiring and onboarding",
      "Process and tooling",
    ],
    summary:
      "Product-led business where I'm accountable for operations end to end rather than for a single project's delivery.",
    pending: true,
  },
]

/* ── How a project actually runs ────────────────────────────────────────
 *
 * The operator equivalent of the engineer side's stack layers: where that
 * page descends CLIENT → DATA, this one runs left to right through time.
 * This is the section that earns the interview, because it's the only one
 * that shows judgement rather than volume.
 */

export const stages: Stage[] = [
  {
    id: "intake",
    label: "Intake",
    what: "Work out what the client actually needs, which is rarely what they asked for.",
    mine: "I run this call myself. A misread here costs more than every later mistake combined.",
  },
  {
    id: "scope",
    label: "Scope",
    what: "Turn it into a costed, sequenced plan with the risky parts named.",
    mine: "I estimate against the real architecture, not a wishlist — so the number holds.",
  },
  {
    id: "build",
    label: "Build",
    what: "Staff it, run the cadence, keep the client informed without theatre.",
    mine: "I review the work. Scope changes get priced when they appear, not at the end.",
  },
  {
    id: "qa",
    label: "QA",
    what: "Test against the brief, not against the ticket.",
    mine: "I sign off the last mile — the part that decides whether a client returns.",
  },
  {
    id: "handover",
    label: "Handover",
    what: "Documentation, access, and a support window that's honoured.",
    mine: "I make sure it's owned by them, not hostage to us.",
  },
]

/* ── Delivery record ────────────────────────────────────────────────────
 * Left empty deliberately. Populate from real engagements; the grid renders
 * an explicit empty state until then rather than filler rows.
 */

export type Engagement = {
  client: string
  sector: string
  duration: string
  team: string
  outcome: string
}

export const engagements: Engagement[] = []

/** Renders as the TBC marker wherever a value hasn't been supplied. */
export const TBC = "—"
