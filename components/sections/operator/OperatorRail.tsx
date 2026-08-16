"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * The operator side's Spine — the same line, turned.
 *
 * On the engineer route a tan hairline runs down the left gutter and draws as
 * you descend the stack. Here it lies flat under the header and fills left to
 * right, because this persona measures progress in schedule rather than in
 * layers. It's the pivot made permanent rather than a one-off transition.
 */
export default function OperatorRail() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".op-rail-fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none", // scrubbed
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
            },
          },
        )

        gsap.fromTo(
          ".op-rail-head",
          { left: "0%" },
          {
            left: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
            },
          },
        )
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".op-rail-fill", { scaleX: 1 })
        gsap.set(".op-rail-head", { autoAlpha: 0 })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-16 z-40 h-px"
    >
      <div className="absolute inset-0 bg-op-olive/15" />
      <div className="op-rail-fill absolute inset-0 origin-left bg-op-ink" />
      <span className="op-rail-head absolute top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 bg-op-red" />
    </div>
  )
}
