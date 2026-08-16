"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Ambient depth behind everything.
 *
 * Two very low-alpha fields — tan and periwinkle, the palette's two accents —
 * drifting at different rates as the page scrolls, plus a slow pointer lean.
 * The result reads as atmosphere and distance without shipping a 3D runtime
 * for what is, in the end, a background.
 *
 * Alpha is kept near the floor on purpose. It should never be nameable as
 * "the glowing blobs"; you should only notice the page has air in it.
 */
export default function Atmosphere() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Scroll drift — the two fields separate as the page moves, which is
        // what creates the sense of one being further back than the other.
        gsap.to(".atmo-tan", {
          yPercent: -18,
          xPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        })

        gsap.to(".atmo-peri", {
          yPercent: 24,
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.6,
          },
        })
      })

      // Pointer lean — desktop pointers only. Heavily damped, so it feels
      // like the light shifting rather than something tracking the cursor.
      mm.add(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const tanX = gsap.quickTo(".atmo-tan", "x", { duration: 1.6, ease: "power3" })
          const tanY = gsap.quickTo(".atmo-tan", "y", { duration: 1.6, ease: "power3" })
          const perX = gsap.quickTo(".atmo-peri", "x", { duration: 2.2, ease: "power3" })
          const perY = gsap.quickTo(".atmo-peri", "y", { duration: 2.2, ease: "power3" })

          const onMove = (e: PointerEvent) => {
            const dx = e.clientX / window.innerWidth - 0.5
            const dy = e.clientY / window.innerHeight - 0.5
            tanX(dx * 60)
            tanY(dy * 40)
            perX(dx * -80)
            perY(dy * -50)
          }

          window.addEventListener("pointermove", onMove, { passive: true })
          return () => window.removeEventListener("pointermove", onMove)
        },
      )

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="atmo-tan absolute -left-[10%] top-[8%] h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(220,190,159,0.07) 0%, rgba(220,190,159,0) 62%)",
        }}
      />
      <div
        className="atmo-peri absolute -right-[14%] top-[46%] h-[62vmax] w-[62vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(190,212,249,0.06) 0%, rgba(190,212,249,0) 62%)",
        }}
      />
    </div>
  )
}
