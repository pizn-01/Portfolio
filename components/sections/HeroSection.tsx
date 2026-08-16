"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowDown } from "lucide-react"
import Magnetic from "@/components/motion/Magnetic"
import { site, yearsOfExperience } from "@/lib/content/site"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * The hero is the thesis: a name set in wonked Fraunces, the role stated
 * plainly in mono, and three facts that are checkable. No "crafting
 * innovative digital experiences" — that sentence belongs to anyone.
 *
 * Load sequence is one orchestrated GSAP timeline rather than scattered
 * per-element delays, so the whole arrival reads as a single gesture.
 */
export default function HeroSection({
  onNext,
}: {
  onNext: (id: string) => void
}) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        tl.from(".hero-rule", { scaleX: 0, duration: 0.9, transformOrigin: "left" })
          .from(".hero-eyebrow", { autoAlpha: 0, x: -14, duration: 0.6 }, "-=0.6")
          .from(
            ".hero-line",
            { yPercent: 108, duration: 1.15, stagger: 0.09 },
            "-=0.35",
          )
          .from(".hero-lede", { autoAlpha: 0, y: 18, duration: 0.8 }, "-=0.65")
          .from(
            ".hero-fact",
            { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.08 },
            "-=0.5",
          )
          .from(".hero-cta", { autoAlpha: 0, y: 14, duration: 0.6 }, "-=0.4")
          .from(".hero-scroll", { autoAlpha: 0, duration: 0.6 }, "-=0.2")

        // Departure: the hero lifts and dims as it leaves.
        gsap.to(".hero-inner", {
          yPercent: -12,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })

        // Ghost word drifts against the scroll.
        gsap.to(".hero-ghost", {
          yPercent: 26,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  const facts = [
    { k: "Based", v: "Karachi, PK" },
    { k: "Building since", v: String(site.since) },
    { k: "Shipping", v: `${yearsOfExperience} yrs` },
  ]

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}
    >
      <div className="grid-hairline absolute inset-0 opacity-70" />

      {/* Oversized ghost word — outlined, never filled.
          Drawn as SVG text rather than a sized span: `textLength` pins the
          word to the viewBox width, so it always fits edge to edge instead
          of overflowing and clipping at the first letter. */}
      <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
        <svg
          aria-hidden="true"
          className="hero-ghost w-full"
          viewBox="0 0 1000 190"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="500"
            y="150"
            textAnchor="middle"
            textLength="960"
            lengthAdjust="spacingAndGlyphs"
            fontSize="180"
            fill="none"
            stroke="rgba(220, 190, 159, 0.16)"
            strokeWidth="1"
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontVariationSettings: '"SOFT" 0, "WONK" 1, "opsz" 144',
              fontWeight: 300,
            }}
          >
            FULL STACK
          </text>
        </svg>
      </div>

      <div className="hero-inner relative z-10 mx-auto w-full max-w-6xl">
        {/* Eyebrow */}
        <div className="mb-10 flex items-center gap-4">
          <div className="hero-rule h-px w-14 bg-tan/60" />
          <span className="hero-eyebrow layer-label">{site.role}</span>
        </div>

        {/* Name — each line masked so it rises out of nothing */}
        <h1 className="display-xl text-antique">
          {["M. Airaf", "Adil"].map((line, i) => (
            <span key={line} className="block overflow-hidden py-[0.06em]">
              <span className="hero-line block">
                {i === 1 ? (
                  <span className="display-accent text-tan">{line}</span>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-lede mt-10 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          I build systems end to end — the interface people touch, the services
          behind it, and the database that decides what&apos;s true.
        </p>

        {/* Checkable facts, in mono */}
        <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
          {facts.map((f) => (
            <div key={f.k} className="hero-fact">
              <dt className="meta">{f.k}</dt>
              <dd className="mt-1 font-mono text-sm text-antique">{f.v}</dd>
            </div>
          ))}
        </dl>

        <div className="hero-cta mt-14">
          <Magnetic className="inline-block">
            <button
              onClick={() => onNext("projects")}
              className="group relative inline-flex items-center gap-3 border border-tan/40 px-8 py-4 font-mono text-xs uppercase tracking-label text-antique transition-colors duration-500 ease-spine hover:border-tan"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-tan transition-transform duration-500 ease-spine group-hover:scale-x-100" />
              <span className="relative transition-colors duration-500 ease-spine group-hover:text-ink">
                See the work
              </span>
              <ArrowDown
                size={13}
                className="relative transition-colors duration-500 ease-spine group-hover:text-ink"
              />
            </button>
          </Magnetic>
        </div>
      </div>

      <button
        onClick={() => onNext("about")}
        aria-label="Scroll to about"
        className="hero-scroll absolute bottom-8 right-[var(--gutter)] z-10 flex items-center gap-3 text-muted transition-colors hover:text-antique"
      >
        <span className="meta">Scroll</span>
        <span className="h-10 w-px bg-tan/30" />
      </button>
    </section>
  )
}
