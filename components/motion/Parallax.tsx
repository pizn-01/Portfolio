"use client"

import { useRef, type ElementType, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Scroll-linked depth.
 *
 * Everything on the page moves at the scroll rate; a parallax layer moves at
 * a *fraction* of it, and the difference is what the eye reads as distance.
 * `depth` is that fraction: negative drifts against the scroll (further away),
 * positive drifts with it (nearer).
 *
 * Deliberately small numbers. Past about 0.25 the effect stops reading as
 * depth and starts reading as elements sliding around independently, which is
 * the tell of a page animated for its own sake.
 */
export default function Parallax({
  children,
  depth = -0.12,
  className,
  as: Tag = "div",
  /** Fades in as it approaches the centre. Off by default. */
  fade = false,
}: {
  children: ReactNode
  depth?: number
  className?: string
  as?: ElementType
  fade?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Only where there's room for the travel to read, and never against a
      // reduced-motion preference — scroll-linked drift is exactly the kind
      // of movement that setting exists to stop.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = ref.current
        if (!el) return

        const shift = () => window.innerHeight * depth

        gsap.fromTo(
          el,
          { y: () => -shift() },
          {
            y: () => shift(),
            ease: "none", // scrubbed
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        )

        if (fade) {
          gsap.fromTo(
            el,
            { autoAlpha: 0.35 },
            {
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "center center",
                scrub: 0.8,
              },
            },
          )
        }
      })

      return () => mm.revert()
    },
    { scope: ref, dependencies: [depth, fade] },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
