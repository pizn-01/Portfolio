"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { context, headline, positioning } from "@/lib/content/operator"

gsap.registerPlugin(useGSAP)

/**
 * The operator hero.
 *
 * The engineer hero opens on a void with a hairline grid and an outlined
 * ghost word — the world of someone who builds systems. This one has to open
 * on the operator's artifact instead, which is a schedule: horizontal ruled
 * lines, a marker showing where "now" is, and the numbers set along the
 * baseline like a plan's data row rather than boxed into cards.
 *
 * Rules run horizontally only. The engineer side's grid is square because a
 * stack has depth in both directions; a schedule only runs one way.
 *
 * Load is one orchestrated timeline rather than scattered reveals — the
 * arrival should read as a single gesture. Line masks rather than SplitText:
 * it keeps the type crisp (fading a heavy face makes the edges shimmer),
 * needs no extra plugin, and matches how the engineer hero already works.
 */

const RULES = 8

export default function OperatorHero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        tl.from(".op-rule", {
          scaleX: 0,
          duration: 0.75,
          stagger: 0.05,
          transformOrigin: "left center",
        })
          .from(".op-eyebrow", { autoAlpha: 0, x: -12, duration: 0.5 }, "-=0.45")
          .from(
            ".op-line",
            { yPercent: 108, duration: 0.9, stagger: 0.08 },
            "-=0.3",
          )
          .from(".op-lede", { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.4")
          .from(
            ".op-figure",
            { autoAlpha: 0, y: 20, duration: 0.55, stagger: 0.07 },
            "-=0.35",
          )
          // The "now" marker arrives last and settles, the way a today-line
          // lands on a plan.
          .from(
            ".op-now",
            { xPercent: -140, autoAlpha: 0, duration: 0.8, ease: "power4.out" },
            "-=0.5",
          )
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden border-b border-op-olive/20"
      style={{
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
        paddingTop: "clamp(5rem,11vh,8rem)",
        paddingBottom: "clamp(2rem,5vh,3.5rem)",
      }}
    >
      {/* The sheet: horizontal rules only. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {Array.from({ length: RULES }).map((_, i) => (
          <div
            key={i}
            className="op-rule absolute left-0 right-0 h-px bg-op-olive/[0.13]"
            style={{ top: `${((i + 1) / (RULES + 1)) * 100}%` }}
          />
        ))}
        {/* Today-line. The one vermilion element in the hero, and it means
            position rather than decoration. */}
        <div className="op-now absolute inset-y-0 left-[62%] w-px bg-op-red/45">
          <span className="absolute -top-px left-1/2 h-1.5 w-1.5 -translate-x-1/2 bg-op-red" />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="op-eyebrow font-mono text-[11px] uppercase tracking-label text-op-olive">
          {positioning.role}
        </p>

        {/* The bar is drawn by `.display-accent`, which paints it as a
            background on the text itself. An absolutely-positioned bar looked
            right until the line wrapped, then stretched the full column width
            instead of sitting under the words. */}
        <h1 className="display-lg mt-8 text-op-ink">
          <span className="block overflow-hidden py-[0.04em]">
            <span className="op-line block">I run engineering.</span>
          </span>
          <span className="block overflow-hidden py-[0.04em]">
            {/* Outer stays block so GSAP can translate it; the accent itself
                must be inline or its background paints the full column width
                rather than tracking the words across wrapped lines. */}
            <span className="op-line block">
              <span className="display-accent">I still review the code.</span>
            </span>
          </span>
        </h1>

        <p className="op-lede mt-9 max-w-2xl text-pretty text-lg leading-relaxed text-op-dim">
          {positioning.lede}
        </p>
      </div>

      {/* The numbers sit on the baseline as a data row, not in cards. */}
      <div className="relative mx-auto mt-14 w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-y-8 border-t border-op-ink pt-6 md:grid-cols-4 md:gap-x-8">
          {headline.map((m) => (
            <div key={m.key} className="op-figure">
              <div className="flex items-baseline gap-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 translate-y-[-0.15em] bg-op-red"
                />
                <span className="font-mono text-3xl leading-none text-op-ink lg:text-4xl">
                  {m.value}
                </span>
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-label text-op-olive">
                {m.key}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-op-dim">
                {m.caption}
              </p>
            </div>
          ))}
        </div>

        <p className="op-figure mt-8 max-w-2xl text-pretty text-sm leading-relaxed text-op-dim">
          {context.concurrent}
        </p>
      </div>
    </section>
  )
}
