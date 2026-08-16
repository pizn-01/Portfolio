import Link from "next/link"
import { ArrowUpRight, ArrowLeft } from "lucide-react"
import ModeSwitch from "@/components/mode/ModeSwitch"
import ProcessTimeline from "@/components/sections/operator/ProcessTimeline"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal"
import {
  agencies,
  engagements,
  headline,
  ownership,
  positioning,
  TBC,
} from "@/lib/content/operator"
import { site } from "@/lib/content/site"

/** A figure Airaf hasn't supplied yet — shown as a gap, never as a guess. */
function Pending({ label }: { label?: string }) {
  return (
    <span className="pending inline-flex items-baseline gap-2" title="Not yet supplied">
      <span aria-hidden="true">{TBC}</span>
      <span className="font-mono text-[9px] uppercase tracking-label">
        {label ?? "TBC"}
      </span>
    </span>
  )
}

const gutter = {
  paddingLeft: "var(--gutter)",
  paddingRight: "var(--gutter)",
} as const

export default function OperatorPage() {
  return (
    <main className="overflow-x-hidden">
      {/* ── Chrome ────────────────────────────────────────────── */}
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

      {/* ── Position ──────────────────────────────────────────── */}
      <section
        className="border-b border-op-olive/20"
        style={{ ...gutter, paddingTop: "clamp(4rem,9vh,7rem)", paddingBottom: "var(--section-y)" }}
      >
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-label text-op-olive">
              {positioning.role}
            </p>
            <h1 className="display-lg mt-8 text-op-ink">
              I own the architecture
              <br />
              <span className="display-accent">and the org chart.</span>
            </h1>
            <p className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-op-dim">
              {positioning.lede}
            </p>
          </Reveal>

          {/* The four numbers a delivery hire gets scanned for. */}
          <RevealGroup
            stagger={0.06}
            className="mt-16 grid gap-px border border-op-olive/25 bg-op-olive/25 sm:grid-cols-2 lg:grid-cols-4"
          >
            {headline.map((m) => (
              <RevealItem key={m.key} className="h-full">
                <div className="flex h-full flex-col justify-between bg-op-ground p-6">
                  <p className="font-mono text-[10px] uppercase tracking-label text-op-olive/70">
                    {m.key}
                  </p>
                  <p className="mt-8 font-mono text-3xl text-op-ink">
                    {m.pending ? <Pending /> : m.value}
                  </p>
                  <p className="mt-2 text-xs text-op-dim">{m.caption}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <p className="mt-6 font-mono text-[11px] leading-relaxed text-op-olive/60">
            Figures marked TBC are being compiled. Nothing on this page is
            estimated or rounded up.
          </p>
        </div>
      </section>

      {/* ── Operating model ───────────────────────────────────── */}
      <section
        className="border-b border-op-olive/20"
        style={{ ...gutter, paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}
      >
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-label text-op-olive">
              Operating model
            </p>
            <h2 className="display-md mt-6 text-op-ink">Two businesses</h2>
            <p className="mt-6 max-w-xl text-pretty text-op-dim">
              One sells engineering time, one sells a product. They fail in
              different ways, which is most of what I&apos;ve learned running both.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {agencies.map((a) => (
              <Reveal key={a.kind} as="article" className="border border-op-olive/25 p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-mono text-base uppercase tracking-wider text-op-ink">
                      {a.pending ? <Pending label="Name TBC" /> : a.name}
                    </h3>
                    <p className="mt-1.5 inline-block bg-op-red px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-label text-black">
                      {a.kind}
                    </p>
                  </div>
                  <span className="shrink-0 border border-op-olive/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-op-olive">
                    {a.role}
                  </span>
                </div>

                <p className="mt-6 text-pretty text-sm leading-relaxed text-op-dim">
                  {a.summary}
                </p>

                <p className="mt-7 font-mono text-[10px] uppercase tracking-label text-op-olive/70">
                  What I own
                </p>
                <ul className="mt-3 grid gap-1.5">
                  {a.owns.map((o) => (
                    <li key={o} className="flex items-baseline gap-2.5 text-sm text-op-ink">
                      <span aria-hidden="true" className="h-1 w-1 shrink-0 bg-op-red" />
                      {o}
                    </li>
                  ))}
                </ul>

                <p className="mt-7 border-t border-op-olive/20 pt-4 font-mono text-[11px] text-op-olive/60">
                  Founded <Pending label="date" /> · Team size <Pending label="n" />
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical ownership ───────────────────────────────── */}
      <section
        className="border-b border-op-olive/20"
        style={{ ...gutter, paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}
      >
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-label text-op-olive">
              What I own
            </p>
            <h2 className="display-md mt-6 text-op-ink">
              Systems and people
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-op-dim">
              The two halves a head of engineering is actually hired for. A
              manager who only owns one of them is a coordinator; an engineer who
              only owns the other is a tech lead.
            </p>
          </Reveal>

          <RevealGroup
            stagger={0.05}
            className="mt-14 grid gap-6 sm:grid-cols-2"
          >
            {ownership.map((o, i) => (
              <RevealItem key={o.area} className="h-full">
                <div className="flex h-full flex-col border-t-2 border-op-ink pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-label text-op-olive/60">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-mono text-sm uppercase tracking-wider text-op-ink">
                    {o.area}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-op-dim">
                    {o.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Process — the signature ───────────────────────────── */}
      <section
        className="border-b border-op-olive/20"
        style={{ ...gutter, paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}
      >
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-label text-op-olive">
              How I run a project
            </p>
            <h2 className="display-md mt-6 text-op-ink">
              Intake to handover
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-op-dim">
              The engineer side of this site descends through a stack. This runs
              left to right through time — same line, turned ninety degrees.
              Red marks what I do personally.
            </p>
          </Reveal>

          <ProcessTimeline />
        </div>
      </section>

      {/* ── Track record ──────────────────────────────────────── */}
      <section
        className="border-b border-op-olive/20"
        style={{ ...gutter, paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}
      >
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-label text-op-olive">
              Track record
            </p>
            <h2 className="display-md mt-6 text-op-ink">Delivered</h2>
          </Reveal>

          {engagements.length === 0 ? (
            <Reveal className="mt-12 border border-dashed border-op-olive/40 p-10">
              <p className="font-mono text-sm text-op-ink">Awaiting real engagements</p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-op-dim">
                This grid stays empty until the actual list is supplied — client
                or sector, duration, team size, outcome. An invented delivery
                record is the one thing that would sink this page, so it renders
                nothing rather than filler.
              </p>
            </Reveal>
          ) : (
            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-op-olive/40">
                    {["Client", "Sector", "Duration", "Team", "Outcome"].map((h) => (
                      <th
                        key={h}
                        className="py-3 pr-6 text-left font-mono text-[10px] font-normal uppercase tracking-label text-op-olive"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {engagements.map((e) => (
                    <tr key={e.client} className="border-b border-op-olive/20">
                      <td className="py-4 pr-6 font-mono text-op-ink">{e.client}</td>
                      <td className="py-4 pr-6 text-op-dim">{e.sector}</td>
                      <td className="py-4 pr-6 font-mono text-op-dim">{e.duration}</td>
                      <td className="py-4 pr-6 font-mono text-op-dim">{e.team}</td>
                      <td className="py-4 pr-6 text-op-ink">{e.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ── Engineering depth — the link back ─────────────────── */}
      <section style={{ ...gutter, paddingTop: "var(--section-y)", paddingBottom: "var(--section-y)" }}>
        <div className="mx-auto w-full max-w-6xl">
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-label text-op-olive">
                The other half
              </p>
              <h2 className="display-md mt-6 text-op-ink">
                Why engineers listen
              </h2>
              <p className="mt-6 max-w-xl text-pretty leading-relaxed text-op-dim">
                A head of engineering who can&apos;t read the code manages by
                proxy. Six years of shipping production systems is what makes the
                architecture calls credible and the estimates hold — and it&apos;s
                on the other side of this switch.
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
