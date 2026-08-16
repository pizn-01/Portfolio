"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * THE SPINE — the page's signature.
 *
 * A tan hairline pinned to the left gutter, drawn downward as the reader
 * descends, with a single periwinkle node riding the reader's position.
 * Each section grows its own branch off this trunk (see <SpineBranch/>),
 * so the structure is literal: the page descends through the stack.
 *
 * The trunk is a plain scaled div rather than an SVG path — a 1px vertical
 * line stretched by `scaleY` stays crisp at any document height, where a
 * stretched SVG viewBox would distort.
 */
export default function Spine() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrub = {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        } as const

        // Trunk draws top-to-bottom in lockstep with page progress.
        gsap.fromTo(
          ".spine-trunk",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: scrub },
        )

        // The node rides the leading edge of the draw.
        gsap.fromTo(
          ".spine-node",
          { top: "0%" },
          { top: "100%", ease: "none", scrollTrigger: scrub },
        )
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".spine-trunk", { scaleY: 1 })
        gsap.set(".spine-node", { autoAlpha: 0 })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 z-30 hidden w-px select-none md:block"
      style={{ left: "calc(var(--gutter) / 2)" }}
    >
      {/* Unlit rail — shows where the line is going */}
      <div className="absolute inset-0 bg-tan/[0.10]" />

      {/* Drawn portion */}
      <div className="spine-trunk absolute inset-0 origin-top bg-tan/40" />

      {/* Reader position */}
      <div className="spine-node absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-periwinkle shadow-[0_0_12px_2px_rgba(190,212,249,0.5)]" />
    </div>
  )
}
