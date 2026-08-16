/**
 * Source of truth: LinkedIn, verified Aug 2026.
 *
 * The previous version of this data (inlined in app/page.tsx) was wrong on
 * every entry — it omitted Tech Cabin entirely, downgraded the current title,
 * and started the timeline in 2020 instead of 2019. Do not "restore" it.
 */

export type Role = {
  title: string
  company: string
  start: string // ISO-ish, for sorting and display
  end: string | null // null = present
  employment: "Full-time" | "Part-time"
  arrangement: "On-site" | "Hybrid" | "Remote"
  location: string
  summary: string
  stack: string[]
}

export const roles: Role[] = [
  {
    title: "Lead Full Stack Engineer",
    company: "Tech Cabin",
    start: "2024-11",
    end: null,
    employment: "Full-time",
    arrangement: "Hybrid",
    location: "Pakistan",
    summary:
      "Leading end-to-end delivery of web and mobile products for clients across several industries — architecture and UI/UX through deployment and post-launch support.",
    stack: [
      "Next.js",
      "TypeScript",
      "React Native",
      "Supabase",
      "Postgres",
      "Software Infrastructure",
    ],
  },
  {
    title: "Full-stack Developer",
    company: "LogoPidea",
    start: "2023-07",
    end: "2024-10",
    employment: "Full-time",
    arrangement: "On-site",
    location: "Karachi, Sindh",
    summary:
      "Built full-stack web and enterprise applications, working alongside product teams to ship client-facing platforms.",
    stack: ["React", "Node.js", "TypeScript", "MongoDB", "REST APIs"],
  },
  {
    title: "Full-stack Developer",
    company: "Friends Technologies",
    start: "2021-12",
    end: "2023-07",
    employment: "Part-time",
    arrangement: "On-site",
    location: "Karachi, Sindh",
    summary:
      "Developed interactive front-ends on the MERN stack and delivered CMS-backed storefronts for growing businesses.",
    stack: ["MERN", "React", "MongoDB", "WordPress", "Shopify"],
  },
  {
    title: "Frontend Web Developer",
    company: "Bits and digits",
    start: "2019-10",
    end: "2021-10",
    employment: "Part-time",
    arrangement: "Hybrid",
    location: "Karachi, Sindh",
    summary:
      "Built and maintained front-end websites, applying SEO and accessibility best practices across client projects.",
    stack: ["HTML5", "CSS3", "JavaScript", "WordPress", "SEO", "UX"],
  },
]

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

export function formatPeriod(role: Role): string {
  const fmt = (v: string) => {
    const [y, m] = v.split("-")
    return `${MONTHS[Number(m) - 1]} ${y}`
  }
  return `${fmt(role.start)} — ${role.end ? fmt(role.end) : "Present"}`
}
