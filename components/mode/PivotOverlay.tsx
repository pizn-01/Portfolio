"use client"

import { useCallback, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getLenis } from "@/components/motion/SmoothScroll"
import { registerPivot, type PivotRequest } from "@/lib/pivot"

gsap.registerPlugin(ScrollTrigger)

/**
 * The transition between the two personas. Mounted once in the root layout so
 * it survives the route swap — see lib/pivot.ts for why that matters.
 *
 * Shape of the move: the destination's ground sweeps down and covers, the line
 * turns from vertical (a stack) to horizontal (a schedule) while hidden, and
 * the sheet continues downward to uncover. It reads as passing through rather
 * than backing out, because the sheet never reverses direction.
 *
 * Budget: ~1s end to end. This is a control someone presses repeatedly, so it
 * has to be quicker than a transition they watch once. Keep the total here —
 * lengthening any single step is what pushed the first version to 1.7s and
 * made it feel sluggish rather than considered.
 */
export default function PivotOverlay() {
  const root = useRef<HTMLDivElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLSpanElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  const play = useCallback((req: PivotRequest) => {
    const rootEl = root.current
    const sheetEl = sheet.current
    const lineEl = line.current
    if (!rootEl || !sheetEl || !lineEl) {
      req.navigate()
      return
    }

    // A second press mid-flight would otherwise stack timelines and strand
    // the sheet on screen.
    tl.current?.kill()

    // Colours are the destination's, so the cover already belongs to the
    // page you're arriving at.
    const ground = req.toOperator ? "#E7E6C4" : "#0B1224"
    const stroke = req.toOperator ? "#000000" : "#DCBE9F"
    gsap.set(sheetEl, { backgroundColor: ground })
    gsap.set(lineEl, { backgroundColor: stroke })

    tl.current = gsap
      .timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(rootEl, { pointerEvents: "none" })
        },
      })
      .set(rootEl, { pointerEvents: "auto" })
      // Covers downward from the top. The header is the first thing hidden,
      // not the last — sweeping up from the bottom left the nav exposed until
      // the final frames, so it visibly restyled to the destination's colours
      // before the sheet reached it, which read as the transition tearing.
      .fromTo(
        sheetEl,
        { scaleY: 0, transformOrigin: "50% 0%" },
        { scaleY: 1, duration: 0.26 },
      )
      // Navigate under the cover. Next has already prefetched the route, so
      // the new document is usually painted before the sheet lifts.
      .call(() => {
        req.navigate()
        // Land at the top deterministically. Switching from halfway down a
        // long page otherwise arrives mid-document and then jumps, and Lenis
        // holds its own scroll value which won't reset on its own.
        getLenis()?.scrollTo(0, { immediate: true })
        window.scrollTo(0, 0)
      })
      // Re-measure while still covered. The arriving route's triggers are
      // built against the outgoing page's height otherwise, and correct
      // themselves visibly a moment after the reveal.
      .call(() => {
        ScrollTrigger.refresh()
      }, undefined, "+=0.02")
      .fromTo(
        lineEl,
        { rotate: req.toOperator ? 0 : 90, autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.08 },
      )
      .to(lineEl, {
        rotate: req.toOperator ? 90 : 0,
        duration: 0.26,
      })
      .to(lineEl, { autoAlpha: 0, duration: 0.09 }, "-=0.04")
      // Uncovers downward too, so the sheet keeps travelling in one direction
      // rather than retreating the way it came. The beat before it lifts gives
      // the arriving route a frame to mount its scroll and ScrollTrigger work —
      // revealing during that was the other half of the stutter.
      .to(
        sheetEl,
        { scaleY: 0, transformOrigin: "50% 100%", duration: 0.28 },
        "+=0.05",
      )
  }, [])

  useEffect(() => {
    registerPivot(play)
    return () => registerPivot(null)
  }, [play])

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200]"
    >
      <div
        ref={sheet}
        className="absolute inset-0 origin-bottom scale-y-0 will-change-transform"
      />
      <div className="absolute inset-0 grid place-items-center">
        <span
          ref={line}
          className="block h-[42vmin] w-px opacity-0 will-change-transform"
        />
      </div>
    </div>
  )
}
