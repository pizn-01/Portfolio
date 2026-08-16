"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
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

        // The track is `overflow-visible` at this breakpoint, so it is as
        // wide as its content and scrollWidth === clientWidth. Measure the
        // travel against the viewport instead, or the pin gets zero length.
        const distance = () =>
          Math.max(0, el.scrollWidth - document.documentElement.clientWidth)

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
                className="surface surface-hover group relative flex w-[82vw] shrink-0 flex-col justify-between p-8 sm:w-[440px] lg:min-h-[62vh] lg:w-[520px] lg:p-10"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="meta">
                      {String(i + 1).padStart(2, "0")} / {String(built.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-label text-periwinkle">
                      Owned
                    </span>
                  </div>

                  <h3 className="display-md mt-8 text-antique">{p.title}</h3>
                  <p className="mt-4 text-pretty text-sm leading-relaxed text-tan">
                    {p.blurb}
                  </p>
                  <p className="mt-6 text-pretty text-sm leading-relaxed text-muted">
                    {p.detail}
                  </p>
                </div>

                <div className="mt-10">
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
          <Reveal>
            <h3 className="display-md text-antique">Client work</h3>
            <p className="mt-6 max-w-lg text-pretty text-muted">
              Delivered for employers and their clients. Listed by what I
              actually contributed, not by what the site became.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 border-t border-cadet-lift">
            {clientWork.map((p) => (
              <RevealItem key={p.slug}>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-1 items-baseline gap-2 border-b border-cadet-lift py-5 transition-colors duration-500 ease-spine hover:bg-cadet/30 md:grid-cols-12 md:gap-6"
                >
                  <span className="font-mono text-sm text-antique transition-colors group-hover:text-periwinkle md:col-span-3">
                    {p.title}
                  </span>
                  <span className="text-sm text-muted md:col-span-4">
                    {p.blurb}
                  </span>
                  <span className="meta md:col-span-3">{p.contribution}</span>
                  <span className="flex items-center justify-start gap-2 md:col-span-2 md:justify-end">
                    <span className="meta hidden lg:inline">
                      {p.stack[0]}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-muted-deep transition-colors group-hover:text-periwinkle"
                    />
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  )
}
