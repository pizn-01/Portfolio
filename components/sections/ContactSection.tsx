import { ArrowUpRight } from "lucide-react"
import Section from "@/components/Section"
import { Reveal } from "@/components/motion/Reveal"
import Magnetic from "@/components/motion/Magnetic"
import { site } from "@/lib/content/site"

/**
 * The inversion — antique ground, cadet type. After a long descent through
 * the dark this reads as a cut to daylight. It happens exactly once; using
 * it twice would spend the effect.
 */
export default function ContactSection() {
  const channels = [
    { k: "Email", v: site.email, href: `mailto:${site.email}` },
    { k: "Phone", v: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { k: "GitHub", v: "pizn-01", href: site.links.github },
    { k: "LinkedIn", v: "Muhammad Airaf Adil", href: site.links.linkedin },
    { k: "Upwork", v: "Freelance profile", href: site.links.upwork },
    { k: "Location", v: site.location },
  ]

  return (
    <Section id="contact" layer="Data" inverted>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-6">
          <h2 className="display-lg text-cadet">
            Let&apos;s build
            <br />
            <span className="display-accent">something.</span>
          </h2>

          <p className="mt-8 max-w-md text-pretty leading-relaxed text-cadet/70">
            Open to select full-stack work — product builds, platform
            architecture, or taking something half-finished the rest of the way.
          </p>

          <Magnetic className="mt-12 inline-block">
            <a
              href={`mailto:${site.email}`}
              className="group relative inline-flex items-center gap-3 border border-cadet/30 px-8 py-4 font-mono text-xs uppercase tracking-label text-cadet transition-colors duration-500 ease-spine hover:border-cadet"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-cadet transition-transform duration-500 ease-spine group-hover:scale-x-100" />
              <span className="relative transition-colors duration-500 ease-spine group-hover:text-antique">
                Start a conversation
              </span>
              <ArrowUpRight
                size={13}
                className="relative transition-colors duration-500 ease-spine group-hover:text-antique"
              />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-6">
          <dl className="border-t border-cadet/20">
            {channels.map((c) => {
              const row = (
                <>
                  <dt className="font-mono text-[11px] uppercase tracking-label text-cadet/50">
                    {c.k}
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 font-mono text-sm text-cadet">
                    {c.v}
                    {c.href && (
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition-opacity duration-500 ease-spine group-hover:opacity-100"
                      />
                    )}
                  </dd>
                </>
              )

              return c.href ? (
                <a
                  key={c.k}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group block border-b border-cadet/20 py-5 transition-colors duration-500 ease-spine hover:bg-cadet/[0.06]"
                >
                  {row}
                </a>
              ) : (
                <div key={c.k} className="border-b border-cadet/20 py-5">
                  {row}
                </div>
              )
            })}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
