/**
 * Grouped by stack layer, so the shape of the list says something about how
 * the work is structured rather than being an alphabet soup of tags.
 *
 * The bar for inclusion: it shows up in a repo, or in the employment history.
 * `core` marks what gets reached for by default — that distinction is what
 * keeps a longer list from flattening into noise.
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
      { name: "React Native", core: true },
      { name: "Framer Motion" },
      { name: "GSAP" },
      { name: "Vite" },
      { name: "Radix UI" },
      { name: "TanStack Query" },
      { name: "React Hook Form" },
      { name: "Zod" },
      { name: "Sass / SCSS" },
    ],
  },
  {
    layer: "Service",
    note: "What runs behind it",
    items: [
      { name: "Node.js", core: true },
      { name: "Express", core: true },
      { name: "REST APIs", core: true },
      { name: "Next.js Route Handlers", core: true },
      { name: "Python" },
      { name: "GraphQL" },
      { name: "Supabase Edge Functions" },
      { name: "Auth & Sessions" },
      { name: "WebSockets" },
      { name: "Transactional Email" },
      { name: "File Uploads" },
    ],
  },
  {
    layer: "Data",
    note: "Where state actually lives",
    items: [
      { name: "PostgreSQL", core: true },
      { name: "Supabase", core: true },
      { name: "PL/pgSQL", core: true },
      { name: "Drizzle ORM" },
      { name: "Row Level Security" },
      { name: "Schema Migrations" },
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Firebase" },
    ],
  },
  {
    layer: "Delivery",
    note: "How it gets to production",
    items: [
      { name: "Docker", core: true },
      { name: "Vercel", core: true },
      { name: "Git / GitHub", core: true },
      { name: "CI/CD", core: true },
      { name: "GitHub Actions" },
      { name: "Fly.io" },
      { name: "Railway" },
      { name: "Render" },
      { name: "Netlify" },
    ],
  },
  {
    layer: "Platforms",
    note: "Where the client already lives",
    items: [
      { name: "WordPress", core: true },
      { name: "WooCommerce", core: true },
      { name: "Shopify", core: true },
      { name: "PHP" },
      { name: "Headless CMS" },
      { name: "SEO" },
      { name: "Accessibility" },
      { name: "Performance" },
    ],
  },
]
