"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * A branch off the Spine. Curves out of the left gutter and runs into the
 * section's layer label, so each section is visibly hung off the trunk.
 *
 * Draws on entry (toggleActions, not scrub) — the branch is an arrival, and
 * an arrival should complete rather than track the scroll.
 */
export default function SpineBranch({ label }: { label: string }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const path = root.current?.querySelector<SVGPathElement>(".branch-path")
        if (!path) return

        const len = path.getTotalLength()

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          })
          .fromTo(
            path,
            { strokeDasharray: len, strokeDashoffset: len },
            { strokeDashoffset: 0, duration: 1.1, ease: "power2.out" },
          )
          .from(
            root.current!.querySelector(".branch-label"),
            { autoAlpha: 0, x: -12, duration: 0.6, ease: "power2.out" },
            "-=0.5",
          )
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="mb-8 flex items-center gap-4">
      <svg
        aria-hidden="true"
        width="56"
        height="24"
        viewBox="0 0 56 24"
        fill="none"
        className="hidden shrink-0 md:block"
      >
        <path
          className="branch-path"
          d="M 0 2 C 0 14, 10 12, 22 12 L 56 12"
          stroke="#DCBE9F"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
      </svg>
      <span className="branch-label layer-label">{label}</span>
    </div>
  )
}
