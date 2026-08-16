"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import { ArrowUpRight, Github } from "lucide-react"
import SpineBranch from "@/components/motion/SpineBranch"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal"
import { built, clientWork } from "@/lib/content/projects"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Two tiers, deliberately unequal in weight.
 *
 * Owned products get a pinned horizontal gallery — one at a time, full
 * attention, room for what was actually hard. Client work gets a dense
 * index below, framed by contribution. The layout itself states which is
 * the stronger claim.
 */
export default function ProjectsSection() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Pinned horizontal scroll — desktop only. On narrow screens the
      // track falls back to a native swipe, which is better than a pin
      // that fights the browser's own gestures.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current
        if (!el) return

        // Measure off the last card rather than `scrollWidth`: a flex
        // container drops its trailing padding from scrollWidth, which left
        // the final card short of the viewport and looking like it never
        // arrived. The wrapper is what actually clips, so measure against it.
        const wrapper = el.parentElement!.parentElement!

        const distance = () => {
          const cards = el.children
          const last = cards[cards.length - 1] as HTMLElement | undefined
          if (!last) return 0
          const padRight = parseFloat(getComputedStyle(el).paddingRight) || 0
          const contentRight = last.offsetLeft + last.offsetWidth + padRight
          return Math.max(0, contentRight - wrapper.clientWidth)
        }

        gsap.to(el, {
          x: () => -distance(),
          ease: "none", // scrubbed
          scrollTrigger: {
            trigger: ".gallery-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="relative">
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
            <h2 className="display-lg text-antique">
              Things I
              <br />
              <span className="display-accent text-tan">built and own.</span>
            </h2>
            <p className="mt-8 max-w-lg text-pretty text-muted">
              Products where I made every call — schema, services, interface,
              deployment. Source is public for each.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The wrapper clips; the track translates. `motion-reduce` hands the
          gallery back to native horizontal scrolling, because without the pin
          the track would otherwise overflow the document. */}
      <div className="gallery-pin no-scrollbar relative overflow-x-auto lg:h-[100svh] lg:overflow-hidden motion-reduce:overflow-x-auto motion-reduce:lg:h-auto">
        <div className="flex h-full items-center">
          <div
            ref={track}
            className="flex gap-6 pb-4 lg:pb-0"
            style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}
          >
            {built.map((p, i) => (
              /* min-h rather than a fixed h: flex default `stretch` then
                 levels every card to the tallest, so no card clips its body. */
              <article
                key={p.slug}
                className="surface surface-hover group relative flex w-[82vw] shrink-0 flex-col justify-between overflow-hidden p-8 sm:w-[440px] lg:h-[calc(100svh-9rem)] lg:w-[520px] lg:p-10"
              >
                <div className="flex min-h-0 flex-1 flex-col">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="meta">
                      {String(i + 1).padStart(2, "0")} / {String(built.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-label text-periwinkle">
                      Owned
                    </span>
                  </div>

                  {/* Fixed aspect on mobile; on the pinned desktop layout the
                      image absorbs the leftover height so the card always
                      fits the viewport instead of running under the nav. */}
                  {p.image && (
                    <div className="relative mt-7 aspect-[16/10] shrink-0 overflow-hidden border border-cadet-lift bg-ink lg:aspect-auto lg:min-h-[130px] lg:flex-1 lg:shrink">
                      <Image
                        src={p.image}
                        alt={`${p.title} — homepage`}
                        fill
                        sizes="(min-width: 1024px) 520px, 82vw"
                        className="object-cover object-top transition-transform duration-[900ms] ease-spine group-hover:scale-[1.04]"
                      />
                      {/* Just enough to seat the shot on the page's ground.
                          Anything heavier and the screenshot stops being
                          legible, which defeats the point of showing it. */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
                    </div>
                  )}

                  <h3 className="display-sm mt-6 shrink-0 text-antique lg:text-[2rem]">
                    {p.title}
                  </h3>
                  <p className="mt-3 shrink-0 text-pretty text-sm leading-relaxed text-tan">
                    {p.blurb}
                  </p>
                  <p className="mt-4 text-pretty text-[13px] leading-relaxed text-muted">
                    {p.detail}
                  </p>
                </div>

                <div className="mt-8 shrink-0">
                  <ul className="flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <li
                        key={t}
                        className="border border-cadet-lift px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex items-center gap-6 border-t border-cadet-lift pt-6">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-antique transition-colors hover:text-periwinkle"
                      >
                        Visit <ArrowUpRight size={13} />
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-muted transition-colors hover:text-periwinkle"
                      >
                        <Github size={13} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

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
            <p className="meta">
              {clientWork.length} engagements · 2019—2024
            </p>
          </Reveal>

          {/* A ledger, not a card grid. Column headers make the alignment
              mean something — without them the columns read as arbitrary. */}
          <div className="mt-16">
            <div className="hidden grid-cols-12 gap-6 border-b border-tan/25 pb-3 md:grid">
              <span className="meta col-span-3">Client</span>
              <span className="meta col-span-2">Sector</span>
              <span className="meta col-span-4">Contribution</span>
              <span className="meta col-span-3 text-right">Built with</span>
            </div>

            <RevealGroup stagger={0.04}>
              {clientWork.map((p) => (
                <RevealItem key={p.slug}>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative grid grid-cols-1 items-baseline gap-1 border-b border-cadet-lift py-5 transition-colors duration-500 ease-spine hover:bg-cadet/40 md:grid-cols-12 md:gap-6"
                  >
                    {/* Tan edge marker slides in — the Spine's language,
                        reused at row scale. */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-4 top-0 h-full w-px origin-top scale-y-0 bg-tan transition-transform duration-500 ease-spine group-hover:scale-y-100"
                    />

                    <span className="flex items-center gap-2 font-mono text-sm text-antique transition-colors group-hover:text-periwinkle md:col-span-3">
                      {p.title}
                      <ArrowUpRight
                        size={13}
                        className="shrink-0 -translate-x-1 opacity-0 transition-all duration-500 ease-spine group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </span>

                    <span className="meta md:col-span-2">{p.sector}</span>

                    <span className="text-sm text-muted md:col-span-4">
                      {p.contribution}
                    </span>

                    <span className="mt-1 flex flex-wrap gap-1.5 md:col-span-3 md:mt-0 md:justify-end">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="border border-cadet-lift px-2 py-0.5 font-mono text-[10px] text-muted-deep transition-colors duration-500 ease-spine group-hover:border-periwinkle/30 group-hover:text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>
    </div>
  )
}
