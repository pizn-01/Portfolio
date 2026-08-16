"use client"

import { useEffect, useState } from "react"

/**
 * Which section the reader is currently in.
 *
 * Used by the floor indicators on both routes. An IntersectionObserver with a
 * band around the middle of the viewport rather than a scroll handler: the
 * browser does the work off the main thread, and "the section crossing the
 * middle" is what a reader would say they're looking at.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    if (!ids.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      // A thin band across the middle. Without it, two tall sections can both
      // be intersecting and the indicator flickers between them.
      { rootMargin: "-45% 0px -50% 0px" },
    )

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
