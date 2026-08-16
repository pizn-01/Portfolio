# Portfolio — M. Airaf Adil

Single-page portfolio for a Lead Full Stack Engineer. Next.js 14 (App Router),
TypeScript, Tailwind, GSAP + Framer Motion.

Live: https://airafadil.vercel.app

## Run

```bash
npm install
npm run dev
```

```bash
npm run build
```

## Design system

Palette is fixed and documented in [CLAUDE.md](CLAUDE.md). The short version:
Space Cadet ground, **Tan carries luxury, Periwinkle carries tech** — the two
accents never do each other's job. Type is Fraunces (display, WONK axis on),
Geist (body), JetBrains Mono (data).

The signature element is **the Spine**: a tan hairline running the full page,
drawn on scroll, branching once per stack layer — Client, Interface, Service,
Delivery, Data. Sections are labelled by layer rather than numbered, because
the layers encode something true and `01 / 02 / 03` doesn't.

## Structure

```
app/
  layout.tsx          fonts + metadata
  page.tsx            composition only — no content
  opengraph-image.tsx generated social card
  icon.tsx            generated favicon
lib/content/          all copy and data lives here
components/motion/    Spine, Reveal, Magnetic, Cursor, SmoothScroll
components/sections/  one file per section
```

**Content never goes in components.** To update a project, a role, or a skill,
edit `lib/content/`.

## Motion

GSAP owns anything scrubbed or pinned (the Spine, the hero, the experience
timeline, the horizontal project gallery). Framer Motion owns entrances and
hover. Every GSAP animation is wrapped in `gsap.matchMedia` and honours
`prefers-reduced-motion`; scrubbed tweens use `ease: "none"`.

## Data accuracy

Employment history is kept in sync with LinkedIn. Project stacks for owned
work are verified against the GitHub API, and client work is described by
contribution rather than ownership. See CLAUDE.md before editing either.
