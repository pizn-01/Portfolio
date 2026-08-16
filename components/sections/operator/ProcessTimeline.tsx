"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { stages } from "@/lib/content/operator"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * The operator side's Spine.
 *
 * Where the engineer page descends through layers, this runs left to right
 * through time — the line is the same idea rotated, and the rotation is the
 * whole thesis of the mode switch.
 *
 * Deliberately not pinned. The last thing this page needs is to take scrolling
 * away from a reader who is scanning for evidence, and pinning is what coupled
 * the old project gallery to viewport height. The rail draws on scroll; the
 * page keeps moving.
 */
export default function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".rail-fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none", // scrubbed
            scrollTrigger: {
              trigger: root.current,
              start: "top 72%",
              end: "bottom 70%",
              scrub: 0.5,
            },
          },
        )

        gsap.utils.toArray<HTMLElement>(".stage-item").forEach((item) => {
          gsap.to(item.querySelector(".stage-mark"), {
            backgroundColor: "#FF3500",
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          })

          gsap.from(item.querySelector(".stage-body"), {
            autoAlpha: 0,
            y: 18,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div ref={root} className="mt-16">
      {/* The rail. Horizontal from md up; on narrow screens it falls back to a
          vertical list, because a horizontal timeline on a phone is a
          horizontal scrollbar pretending to be a design decision. */}
      <div className="relative hidden md:block">
        <div className="absolute left-0 right-0 top-[7px] h-px bg-op-olive/20">
          <div className="rail-fill absolute inset-0 origin-left bg-op-ink" />
        </div>

        <ol className="grid grid-cols-5 gap-6">
          {stages.map((s, i) => (
            <li key={s.id} className="stage-item relative">
              <span
                aria-hidden="true"
                className="stage-mark block h-[15px] w-[15px] scale-[0.55] bg-op-olive/30"
              />
              <div className="stage-body mt-6">
                <p className="font-mono text-[10px] uppercase tracking-label text-op-olive/60">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-mono text-sm font-medium uppercase tracking-wider text-op-ink">
                  {s.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-op-dim">{s.what}</p>
                <p className="mt-4 border-l-2 border-op-red pl-3 text-sm leading-relaxed text-op-ink">
                  {s.mine}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile: same content, vertical */}
      <ol className="md:hidden">
        {stages.map((s, i) => (
          <li
            key={s.id}
            className="border-t border-op-olive/20 py-6 first:border-t-0 first:pt-0"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="block h-2.5 w-2.5 bg-op-red" />
              <h3 className="font-mono text-sm font-medium uppercase tracking-wider text-op-ink">
                {String(i + 1).padStart(2, "0")} · {s.label}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-op-dim">{s.what}</p>
            <p className="mt-3 border-l-2 border-op-red pl-3 text-sm leading-relaxed text-op-ink">
              {s.mine}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
