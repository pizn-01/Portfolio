import Image from "next/image"
import { ArrowUpRight, Github } from "lucide-react"
import SpineBranch from "@/components/motion/SpineBranch"
import Parallax from "@/components/motion/Parallax"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal"
import MaskedHeading from "@/components/motion/MaskedHeading"
import DoorReveal from "@/components/motion/DoorReveal"
import { built, clientWork } from "@/lib/content/projects"

/**
 * Two tiers, deliberately unequal in weight.
 *
 * Owned products get full-width editorial rows — the screenshot at a size
 * worth showing, with the writing beside it. The earlier pinned horizontal
 * gallery inverted that: it gave the image a quarter of a viewport and the
 * copy the rest, showed 2.4 cards at a time (neither one-at-a-time nor a
 * grid), and tied every card's height to the viewport, which is why it broke
 * on any laptop with browser chrome.
 *
 * Client work is a tile grid below — enough to establish range, small enough
 * that it never competes with the tier above.
 */
export default function ProjectsSection() {
  return (
    <div className="relative">
      {/* ── Tier 1 · Built & owned ───────────────────────────────── */}
      <section
        id="projects"
        style={{
          paddingTop: "var(--section-y)",
          paddingLeft: "var(--gutter)",
          paddingRight: "var(--gutter)",
        }}
      >
        <div className="mx-auto w-full max-w-6xl">
          <SpineBranch label="Delivery" />
          <Reveal>
            <MaskedHeading
              lines={["Things I", "built and own."]}
              accent={1}
              className="display-lg text-antique"
            />
            <p className="mt-8 max-w-lg text-pretty text-muted">
              Products where I made every call — schema, services, interface,
              deployment.
            </p>
          </Reveal>

          <div className="mt-24 space-y-28 lg:space-y-36">
            {built.map((p, i) => {
              // Alternating sides. The eye tracks the switch, which keeps a
              // long list of similar rows from turning into wallpaper.
              const flipped = i % 2 === 1

              return (
                <Reveal
                  key={p.slug}
                  as="article"
                  className="group grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
                >
                  {/* ── Screenshot ─────────────────────────────── */}
                  <div
                    className={`lg:col-span-7 ${
                      flipped ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {p.image ? (
                      <a
                        href={p.live ?? p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block overflow-hidden border border-cadet-lift bg-ink"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <Parallax depth={0.04}>
                          <div className="relative aspect-[16/10]">
                            <Image
                              src={p.image}
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 55vw, 90vw"
                              className="object-cover object-top transition-transform duration-[1200ms] ease-spine group-hover:scale-[1.03]"
                            />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/60 to-transparent" />
                          </div>
                        </Parallax>
                      </a>
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center border border-dashed border-cadet-lift">
                        <span className="meta">Source only</span>
                      </div>
                    )}
                  </div>

                  {/* ── Writing ────────────────────────────────── */}
                  <div
                    className={`lg:col-span-5 ${
                      flipped ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="meta">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-8 bg-tan/40" />
                      <span className="font-mono text-[10px] uppercase tracking-label text-periwinkle">
                        Owned
                      </span>
                    </div>

                    <h3 className="display-md mt-6 text-antique">
                      <a
                        href={p.live ?? p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-500 ease-spine hover:text-tan"
                      >
                        {p.title}
                      </a>
                    </h3>

                    <p className="mt-4 text-pretty leading-relaxed text-tan">
                      {p.blurb}
                    </p>

                    <p className="mt-5 text-pretty text-sm leading-relaxed text-muted">
                      {p.detail}
                    </p>

                    {p.stack.length > 0 && (
                      <ul className="mt-7 flex flex-wrap gap-2">
                        {p.stack.map((t) => (
                          <li
                            key={t}
                            className="border border-cadet-lift px-2.5 py-1 font-mono text-[11px] text-muted"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-8 flex items-center gap-7 border-t border-cadet-lift pt-6">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-antique transition-colors duration-500 ease-spine hover:text-periwinkle"
                        >
                          Visit site <ArrowUpRight size={13} />
                        </a>
                      )}
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-muted transition-colors duration-500 ease-spine hover:text-periwinkle"
                        >
                          <Github size={13} /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Tier 2 · Client & agency ─────────────────────────────── */}
      <section
        style={{
          paddingTop: "var(--section-y)",
          paddingBottom: "var(--section-y)",
          paddingLeft: "var(--gutter)",
          paddingRight: "var(--gutter)",
        }}
      >
        <div className="mx-auto w-full max-w-6xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h3 className="display-md text-antique">Client work</h3>
              <p className="mt-6 max-w-md text-pretty text-muted">
                Delivered for employers and their clients across four studios.
                Listed by what I contributed, not by what the site became.
              </p>
            </div>
            <p className="meta">{clientWork.length} engagements · 2019—2024</p>
          </Reveal>

          {/* Individually bordered rather than a seamless hairline grid: with
              a `gap-px` background the final row's empty cells show through as
              a solid block, and the count of fillers needed changes per
              breakpoint. */}
          {/* Door reveal #1 of 2 on this route. */}
          <DoorReveal className="mt-16">
          <RevealGroup
            stagger={0.04}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {clientWork.map((p) => (
              <RevealItem key={p.slug} className="h-full">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between border border-cadet-lift p-6 transition-colors duration-500 ease-spine hover:border-periwinkle/30 hover:bg-cadet/40"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-sm text-antique transition-colors duration-500 ease-spine group-hover:text-periwinkle">
                        {p.title}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="mt-0.5 shrink-0 text-muted-deep transition-all duration-500 ease-spine group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-periwinkle"
                      />
                    </div>

                    <p className="meta mt-1.5">{p.sector}</p>

                    <p className="mt-5 text-pretty text-sm leading-relaxed text-muted">
                      {p.contribution}
                    </p>
                  </div>

                  <ul className="mt-7 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <li
                        key={t}
                        className="border border-cadet-lift px-2 py-0.5 font-mono text-[10px] text-muted-deep transition-colors duration-500 ease-spine group-hover:border-periwinkle/25 group-hover:text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
          </DoorReveal>
        </div>
      </section>
    </div>
  )
}
