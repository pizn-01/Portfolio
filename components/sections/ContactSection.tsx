import { ArrowUpRight } from "lucide-react"
import Section from "@/components/Section"
import { Reveal } from "@/components/motion/Reveal"
import MaskedHeading from "@/components/motion/MaskedHeading"
import DoorReveal from "@/components/motion/DoorReveal"
import ContactFlow from "@/components/contact/ContactFlow"
import { site } from "@/lib/content/site"

/**
 * The inversion — antique ground, cadet type. After a long descent through
 * the dark this reads as a cut to daylight. It happens exactly once; using
 * it twice would spend the effect.
 */
export default function ContactSection() {
  // Direct channels stay visible next to the flow — some people want to skip
  // the questions, and hiding the email behind three steps would be hostile.
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
      {/* Door reveal #2 of 2. The cut to daylight opens from the seam,
          which suits a section that is already a hard change of ground. */}
      <DoorReveal className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-6">
          <MaskedHeading
            lines={["Let's build", "something."]}
            accent={1}
            className="display-lg text-cadet"
          />

          <div className="mt-10">
            <ContactFlow />
          </div>
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
      </DoorReveal>
    </Section>
  )
}
