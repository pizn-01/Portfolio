"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Section from "@/components/Section"
import { Reveal } from "@/components/motion/Reveal"
import { roles, formatPeriod } from "@/lib/content/experience"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * A scrubbed timeline. The rail fills as the reader descends the roles, and
 * each entry's marker lights when it passes — the reader's position in the
 * list is always legible.
 *
 * Data is corrected against LinkedIn; see lib/content/experience.ts.
 */
export default function ExperienceSection() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".xp-rail-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none", // scrubbed
            scrollTrigger: {
              trigger: ".xp-list",
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          },
        )

        gsap.utils.toArray<HTMLElement>(".xp-item").forEach((item) => {
          gsap.to(item.querySelector(".xp-marker"), {
            backgroundColor: "#BED4F9",
            borderColor: "#BED4F9",
            scale: 1.35,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          })

          gsap.from(item.querySelector(".xp-body"), {
            autoAlpha: 0,
            y: 26,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 80%" },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <Section id="experience" layer="Service">
      <Reveal>
        <h2 className="display-lg text-antique">
          Where I&apos;ve
          <br />
          <span className="display-accent text-tan">been building.</span>
        </h2>
      </Reveal>

      <div ref={root} className="mt-20">
        <div className="xp-list relative pl-8 md:pl-14">
          {/* Rail */}
          <div className="absolute bottom-0 left-0 top-2 w-px bg-cadet-lift">
            <div className="xp-rail-fill absolute inset-0 origin-top bg-tan/50" />
          </div>

          {roles.map((role) => (
            <article key={`${role.company}-${role.start}`} className="xp-item relative pb-16 last:pb-0">
              {/* Marker sits on the rail */}
              <span
                aria-hidden="true"
                className="xp-marker absolute -left-8 top-2 h-2 w-2 -translate-x-1/2 rounded-full border border-muted-deep bg-ink md:-left-14"
              />

              <div className="xp-body">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="display-sm text-antique">{role.title}</h3>
                  {role.end === null && (
                    <span className="inline-flex items-center gap-1.5 border border-periwinkle/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-periwinkle">
                      <span className="h-1 w-1 rounded-full bg-periwinkle" />
                      Current
                    </span>
                  )}
                </div>

                <p className="mt-2 font-mono text-sm text-tan">{role.company}</p>

                <p className="meta mt-1">
                  {formatPeriod(role)} · {role.employment} · {role.arrangement} ·{" "}
                  {role.location}
                </p>

                <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted">
                  {role.summary}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
                    <li
                      key={tech}
                      className="border border-cadet-lift px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
