"use client"

import { useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Proposal 03 — door reveal.
 *
 * Content opens from a horizontal centre seam outward instead of fading up.
 * It belongs to the elevator idea the whole site is built on, and it costs a
 * clip-path tween.
 *
 * Used on exactly two sections per route. That restraint is the design: apply
 * it everywhere and it stops being a door and becomes the page's default
 * transition, which is how a good effect turns into wallpaper.
 *
 * clip-path is composited and doesn't reflow, so this stays cheap even on a
 * section containing images.
 */
export default function DoorReveal({
  children,
  className,
  /** Seconds. The seam should open decisively, not creep. */
  duration = 1,
}: {
  children: ReactNode
  className?: string
  duration?: number
}) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current,
          { clipPath: "inset(50% 0% 50% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          },
        )
      })

      // Reduced motion: fully open, no tween. Leaving the initial clip in the
      // markup would hide the section outright for anyone with the preference
      // set, which is the one failure mode this must not have.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root.current, { clipPath: "inset(0% 0% 0% 0%)" })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  )
}
