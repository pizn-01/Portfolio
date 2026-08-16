"use client"

import { useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

/**
 * THE PIVOT — the switch between the two personas.
 *
 * The engineer site's organising line is vertical: the Spine, descending
 * through the stack. An operator doesn't think in layers, they think in
 * schedule — a horizontal line with milestones on it. So the transition is
 * the same line turned ninety degrees, and the rotation *is* the argument.
 *
 * This drives a real route change rather than toggling client state, because
 * the two personas need separate URLs (to send to a recruiter), separate
 * documents (so the management content can rank), and working back-button
 * behaviour. The animation is played over the navigation so it still reads as
 * one continuous surface.
 */
export default function ModeSwitch() {
  const router = useRouter()
  const pathname = usePathname()
  const overlay = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)

  const isOperator = pathname?.startsWith("/operator") ?? false
  const target = isOperator ? "/" : "/operator"
  const goingTo = isOperator ? "Engineer" : "Operator"

  const { contextSafe } = useGSAP({ scope: overlay })

  const go = contextSafe(() => {
    if (busy) return
    setBusy(true)

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      router.push(target)
      setBusy(false)
      return
    }

    const root = overlay.current
    if (!root) return

    const tl = gsap.timeline({
      onComplete: () => setBusy(false),
    })

    // Cover: the ground sweeps up. Navigate while it's opaque, so the
    // document swap is never visible.
    tl.set(root, { pointerEvents: "auto" })
      .fromTo(
        ".pivot-sheet",
        { scaleY: 0, transformOrigin: "50% 100%" },
        { scaleY: 1, duration: 0.42, ease: "power3.inOut" },
      )
      // The line turns while it's hidden — the reveal shows the new orientation
      // already settled, which is what makes it read as a pivot rather than a
      // spinning decoration.
      .fromTo(
        ".pivot-line",
        { rotate: isOperator ? 90 : 0, opacity: 0 },
        { opacity: 1, duration: 0.16 },
        "-=0.12",
      )
      .to(".pivot-line", {
        rotate: isOperator ? 0 : 90,
        duration: 0.5,
        ease: "power3.inOut",
      })
      .call(() => router.push(target))
      .to(".pivot-line", { opacity: 0, duration: 0.18 }, "-=0.05")
      // Uncover: continues upward rather than retreating, so the motion reads
      // as passing through rather than backing out.
      .to(".pivot-sheet", {
        scaleY: 0,
        transformOrigin: "50% 0%",
        duration: 0.45,
        ease: "power3.inOut",
      })
      .set(root, { pointerEvents: "none" })
  })

  return (
    <>
      <button
        onClick={go}
        disabled={busy}
        aria-label={`Switch to ${goingTo} mode`}
        className={`group inline-flex items-center gap-2.5 border px-3.5 py-2 font-mono text-[10px] uppercase tracking-label transition-colors duration-500 ease-spine disabled:opacity-60 ${
          isOperator
            ? "border-op-olive/30 text-op-olive hover:border-op-ink hover:text-op-ink"
            : "border-cadet-lift text-muted hover:border-periwinkle hover:text-periwinkle"
        }`}
      >
        {/* The mark states the current mode's orientation: upright for the
            stack, laid flat for the schedule. */}
        <span
          aria-hidden="true"
          className={`block h-3 w-px transition-transform duration-500 ease-spine ${
            isOperator ? "rotate-90 bg-op-red" : "bg-tan"
          }`}
        />
        {goingTo}
      </button>

      {/* Full-screen transition layer. Lives here so it survives the route
          swap; pointer-events are only enabled while it covers. */}
      <div
        ref={overlay}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[200]"
      >
        <div
          className={`pivot-sheet absolute inset-0 origin-bottom scale-y-0 ${
            isOperator ? "bg-ink" : "bg-op-ground"
          }`}
        />
        <div className="absolute inset-0 grid place-items-center">
          <span
            className={`pivot-line block h-[46vmin] w-px opacity-0 ${
              isOperator ? "bg-tan" : "bg-op-ink"
            }`}
          />
        </div>
      </div>
    </>
  )
}
