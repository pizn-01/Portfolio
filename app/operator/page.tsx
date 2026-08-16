import Link from "next/link"
import { ArrowUpRight, ArrowLeft } from "lucide-react"
import ModeSwitch from "@/components/mode/ModeSwitch"
import Atmosphere from "@/components/motion/Atmosphere"
import Cursor from "@/components/motion/Cursor"
import Parallax from "@/components/motion/Parallax"
import OperatorHero from "@/components/sections/operator/OperatorHero"
import OperatorRail from "@/components/sections/operator/OperatorRail"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal"
import MaskedHeading from "@/components/motion/MaskedHeading"
import DoorReveal from "@/components/motion/DoorReveal"
import {
  conditions,
  context,
  decisions,
  positioning,
  rules,
  ventures,
} from "@/lib/content/operator"
import { site } from "@/lib/content/site"

const gutter = {
  paddingLeft: "var(--gutter)",
  paddingRight: "var(--gutter)",
} as const

const section = {
  ...gutter,
  paddingTop: "var(--section-y)",
  paddingBottom: "var(--section-y)",
} as const

export default function OperatorPage() {
  const lead = ventures.find((v) => v.lead)
  const others = ventures.filter((v) => !v.lead)

  return (
    <main className="relative overflow-x-hidden">
      {/* Same ambient layer and cursor as the engineer route — crossing between
          the two should feel like turning one site around, not arriving at a
          second one built by someone else. */}
      <Cursor />
      <Atmosphere mode="operator" />
      <OperatorRail />

      <header
        className="sticky top-0 z-50 border-b border-op-olive/20 bg-op-ground/90 backdrop-blur-md"
        style={gutter}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between">
          <Link
            href="/operator"
            className="font-mono text-xs uppercase tracking-label text-op-ink"
          >
            Airaf<span className="text-op-red">.</span>
          </Link>
          <ModeSwitch />
        </div>
      </header>

      <OperatorHero />

      {/* ── Decisions — the evidence ──────────────────────────── */}
      <section id="decisions" className="border-b border-op-olive/20" style={section}>
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-label text-op-olive">
              Two decisions
            </p>
            <MaskedHeading
              lines={["What I'd be", "asked about"]}
              className="display-md mt-6 text-op-ink"
            />
            <p className="mt-6 max-w-xl text-pretty text-op-dim">
              One process, one technical. Both are things an interviewer can dig
              into, which is more than a list of capabilities offers.
            </p>
          </Reveal>

          <DoorReveal className="mt-16 grid gap-6 lg:grid-cols-2">
            {decisions.map((d) => (
              <Reveal
                key={d.id}
                as="article"
                className="flex flex-col border-t-2 border-op-ink pt-6"
              >
                <span className="inline-flex w-fit bg-op-red px-2 py-0.5 font-mono text-[10px] uppercase tracking-label text-black">
                  {d.kind}
                </span>

                <h3 className="mt-5 font-mono text-base leading-snug text-op-ink">
                  {d.title}
                </h3>

                <dl className="mt-7 grid gap-5">
                  {[
                    { k: "Situation", v: d.situation },
                    { k: "What I did", v: d.action },
                    ...(d.rejected ? [{ k: "What I rejected", v: d.rejected }] : []),
                    { k: "What changed", v: d.result },
                  ].map((row) => (
                    <div key={row.k}>
                      <dt className="font-mono text-[10px] uppercase tracking-label text-op-olive/70">
                        {row.k}
                      </dt>
                      <dd className="mt-1.5 text-pretty text-sm leading-relaxed text-op-ink">
                        {row.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </DoorReveal>
        </div>
      </section>

      {/* ── Ventures ──────────────────────────────────────────── */}
      <section id="ventures" className="border-b border-op-olive/20" style={section}>
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-label text-op-olive">
              What I run
            </p>
            <MaskedHeading lines={["Three,", "honestly"]} accent={1} className="display-md mt-6 text-op-ink" />
          </Reveal>

          {lead && (
            <Reveal as="article" className="mt-14 border border-op-olive/30 p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-mono text-xl uppercase tracking-wider text-op-ink">
                    {lead.name}
                  </h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-label text-op-olive">
                    {lead.kind}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="border border-op-olive/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-op-olive">
                    {lead.role}
                  </span>
                  <span className="bg-op-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-op-ground">
                    {lead.status}
                  </span>
                </div>
              </div>
              <p className="mt-7 max-w-2xl text-pretty leading-relaxed text-op-dim">
                {lead.summary}
              </p>
            </Reveal>
          )}

          <Parallax depth={0.04} className="mt-6">
          <RevealGroup stagger={0.06} className="grid gap-6 sm:grid-cols-2">
            {others.map((v) => (
              <RevealItem key={v.name} className="h-full">
                <article className="flex h-full flex-col border border-op-olive/25 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-mono text-base uppercase tracking-wider text-op-ink">
                      {v.name}
                    </h3>
                    <span className="shrink-0 border border-op-olive/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-label text-op-olive">
                      {v.status}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-label text-op-olive/70">
                    {v.kind}
                  </p>
                  <p className="mt-5 flex-1 text-pretty text-sm leading-relaxed text-op-dim">
                    {v.summary}
                  </p>
                  {v.url && (
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-op-ink transition-opacity hover:opacity-60"
                    >
                      Visit <ArrowUpRight size={12} />
                    </a>
                  )}
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
          </Parallax>
        </div>
      </section>

      {/* ── Rules ─────────────────────────────────────────────── */}
      <section id="rules" className="border-b border-op-olive/20" style={section}>
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-label text-op-olive">
              How the studio runs
            </p>
            <MaskedHeading lines={["Four rules"]} className="display-md mt-6 text-op-ink" />
            <p className="mt-6 max-w-xl text-pretty text-op-dim">
              Not a process diagram. These are the four things actually enforced,
              and each exists because something went wrong without it.
            </p>
          </Reveal>

          {/* Door reveal #2 of 2 on this route. The rules read as a plate
              being opened, which suits a list of things that are enforced. */}
          <DoorReveal className="mt-14">
          <RevealGroup
            stagger={0.05}
            className="divide-y divide-op-olive/20 border-y border-op-olive/20"
          >
            {rules.map((r, i) => (
              <RevealItem key={r.label}>
                <div className="grid gap-3 py-7 md:grid-cols-12 md:gap-8">
                  <p className="font-mono text-[10px] uppercase tracking-label text-op-olive/60 md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-mono text-sm uppercase tracking-wider text-op-ink md:col-span-4">
                    {r.label}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-op-dim md:col-span-7">
                    {r.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          </DoorReveal>
        </div>
      </section>

      {/* ── Looking for / contact ─────────────────────────────── */}
      <section id="terms" style={section}>
        <div className="mx-auto w-full max-w-6xl">
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-label text-op-olive">
                Terms
              </p>
              <MaskedHeading
                lines={["What would", "make me move"]}
                accent={1}
                className="display-md mt-6 text-op-ink"
              />
              <p className="mt-6 max-w-xl text-pretty leading-relaxed text-op-dim">
                {context.move}
              </p>

              <ol className="mt-9 grid gap-5 border-t border-op-olive/25 pt-7">
                {conditions.map((c, i) => (
                  <li key={c.label} className="grid gap-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] text-op-red">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-mono text-sm uppercase tracking-wider text-op-ink">
                        {c.label}
                      </h3>
                    </div>
                    <p className="pl-8 text-sm leading-relaxed text-op-dim">
                      {c.detail}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-9 font-mono text-sm text-op-ink">
                {positioning.primaryRole} · {positioning.availability}
              </p>

              <Link
                href="/"
                className="group mt-10 inline-flex items-center gap-3 border border-op-ink/30 px-7 py-3.5 font-mono text-xs uppercase tracking-label text-op-ink transition-colors duration-500 ease-spine hover:border-op-ink"
              >
                <ArrowLeft size={13} />
                See the engineering
              </Link>
            </div>

            <div className="lg:col-span-5">
              <dl className="border-t border-op-olive/25">
                {[
                  { k: "Email", v: site.email, href: `mailto:${site.email}` },
                  { k: "Phone", v: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
                  { k: "LinkedIn", v: "Muhammad Airaf Adil", href: site.links.linkedin },
                  { k: "Based", v: site.location },
                ].map((c) => {
                  const inner = (
                    <>
                      <dt className="font-mono text-[10px] uppercase tracking-label text-op-olive/70">
                        {c.k}
                      </dt>
                      <dd className="mt-1 flex items-center gap-2 font-mono text-sm text-op-ink">
                        {c.v}
                        {c.href && (
                          <ArrowUpRight
                            size={13}
                            className="opacity-0 transition-opacity duration-500 ease-spine group-hover:opacity-100"
                          />
                        )}
                      </dd>
                    </>
                  )
                  return c.href ? (
                    <a
                      key={c.k}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group block border-b border-op-olive/25 py-5 transition-colors duration-500 ease-spine hover:bg-op-olive/[0.06]"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={c.k} className="border-b border-op-olive/25 py-5">
                      {inner}
                    </div>
                  )
                })}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-op-olive/25" style={gutter}>
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 py-8">
          <p className="font-mono text-[11px] text-op-olive/70">
            {site.name} · {positioning.role}
          </p>
          <p className="font-mono text-[11px] text-op-olive/70">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  )
}
