"use client"

import { useEffect, useRef, type ReactNode } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Lenis and ScrollTrigger must share one clock. If Lenis runs on its own
 * rAF loop, every scrubbed animation lags the actual scroll position by a
 * frame and the Spine visibly trails the viewport.
 *
 * So: drive Lenis from gsap.ticker, and tell ScrollTrigger to update on
 * every Lenis scroll event.
 */
/**
 * Module-level handle on the running instance.
 *
 * Lenis drives the scroll position from its own loop, so a plain
 * `window.scrollTo` gets overwritten on the very next frame — anchor
 * navigation silently does nothing. Anything that wants to move the page has
 * to ask Lenis. Returns null before mount and under reduced motion, where the
 * caller should fall back to native scrolling.
 */
let instance: Lenis | null = null
export const getLenis = () => instance

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenisRef.current = lenis
    instance = lenis

    lenis.on("scroll", ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
      instance = null
    }
  }, [])

  return <>{children}</>
}
