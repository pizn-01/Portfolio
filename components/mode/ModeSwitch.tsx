"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { runPivot } from "@/lib/pivot"

/**
 * The control only. The transition itself lives in <PivotOverlay/> at the
 * root layout, because this button unmounts the instant navigation starts.
 *
 * Two personas need two URLs — one to send a recruiter, one for search to
 * index, and both so the back button behaves. So this drives a real route
 * change, with the pivot played over the top to keep it feeling continuous.
 */
export default function ModeSwitch() {
  const router = useRouter()
  const pathname = usePathname()
  const [busy, setBusy] = useState(false)

  const isOperator = pathname?.startsWith("/operator") ?? false
  const target = isOperator ? "/" : "/operator"
  const goingTo = isOperator ? "Engineer" : "Operator"

  // Prefetch on mount so the destination is already built by the time the
  // sheet covers. Without this the uncover can reveal an unpainted page.
  useEffect(() => {
    router.prefetch(target)
  }, [router, target])

  const go = () => {
    if (busy) return
    setBusy(true)

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      router.push(target)
      setBusy(false)
      return
    }

    runPivot({
      toOperator: !isOperator,
      navigate: () => router.push(target),
    })

    // Released on a timer rather than on the timeline, because this component
    // is replaced by the destination's own copy long before it finishes.
    window.setTimeout(() => setBusy(false), 1200)
  }

  return (
    <button
      onClick={go}
      onPointerEnter={() => router.prefetch(target)}
      disabled={busy}
      aria-label={`Switch to ${goingTo} mode`}
      className={`group inline-flex items-center gap-2.5 border px-3.5 py-2 font-mono text-[10px] uppercase tracking-label transition-colors duration-500 ease-spine disabled:opacity-60 ${
        isOperator
          ? "border-op-olive/30 text-op-olive hover:border-op-ink hover:text-op-ink"
          : "border-cadet-lift text-muted hover:border-periwinkle hover:text-periwinkle"
      }`}
    >
      {/* Upright for the stack, laid flat for the schedule. */}
      <span
        aria-hidden="true"
        className={`block h-3 w-px transition-transform duration-500 ease-spine ${
          isOperator ? "rotate-90 bg-op-red" : "bg-tan"
        }`}
      />
      {goingTo}
    </button>
  )
}
