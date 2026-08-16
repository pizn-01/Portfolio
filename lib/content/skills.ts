/**
 * Cut from ~60 tags to 24.
 *
 * The old list carried React, Vue, Angular, Nuxt, Java, XQuery, Oracle NoSQL
 * and "LeSS Framework" simultaneously. Breadth at that scale reads as a
 * keyword dump and flattens the signal on what's actually deep. What remains
 * is what shows up in the repos and the employment history.
 *
 * Groups mirror the Spine's stack layers, so structure encodes something true.
 */

export type SkillGroup = {
  layer: string
  note: string
  items: { name: string; core?: boolean }[]
}

export const skillGroups: SkillGroup[] = [
  {
    layer: "Interface",
    note: "What the user touches",
    items: [
      { name: "React", core: true },
      { name: "Next.js", core: true },
      { name: "TypeScript", core: true },
      { name: "Tailwind CSS", core: true },
      { name: "Framer Motion" },
      { name: "GSAP" },
      { name: "React Native" },
    ],
  },
  {
    layer: "Service",
    note: "What runs behind it",
    items: [
      { name: "Node.js", core: true },
      { name: "Express", core: true },
      { name: "Python" },
      { name: "REST APIs", core: true },
      { name: "GraphQL" },
      { name: "Passport / Auth" },
    ],
  },
  {
    layer: "Data",
    note: "Where state actually lives",
    items: [
      { name: "PostgreSQL", core: true },
      { name: "Supabase", core: true },
      { name: "PL/pgSQL" },
      { name: "Drizzle ORM" },
      { name: "MongoDB" },
      { name: "MySQL" },
    ],
  },
  {
    layer: "Delivery",
    note: "How it gets to production",
    items: [
      { name: "Docker", core: true },
      { name: "Vercel", core: true },
      { name: "Fly.io" },
      { name: "Git / GitHub", core: true },
      { name: "CI/CD" },
    ],
  },
]
