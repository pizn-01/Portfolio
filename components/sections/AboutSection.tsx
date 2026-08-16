import Section from "@/components/Section"
import { Reveal } from "@/components/motion/Reveal"
import MaskedHeading from "@/components/motion/MaskedHeading"
import Parallax from "@/components/motion/Parallax"
import { site, yearsOfExperience } from "@/lib/content/site"

export default function AboutSection() {
  return (
    <Section id="about" layer="Client">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-7">
          <MaskedHeading
            lines={["I work the", "whole stack."]}
            accent={1}
            className="display-lg text-antique"
          />

          <div className="mt-12 space-y-6 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            <p>
              {yearsOfExperience} years in, most of what I&apos;ve learned came
              from owning a feature all the way down — from the component a user
              clicks to the constraint in Postgres that makes the click safe.
            </p>
            <p>
              That&apos;s the part I care about. A booking system isn&apos;t
              finished when the form submits; it&apos;s finished when two people
              cannot reserve the same table at the same second. Most of the
              interesting work happens below the interface.
            </p>
            <p>
              Currently leading full-stack delivery at Tech Cabin in Karachi —
              architecture through deployment, web and mobile.
            </p>
          </div>
        </Reveal>

        {/* Facts panel — mono, tabular, quiet. Drifts slightly slower than
            the prose beside it, which separates the two columns in depth. */}
        <Reveal delay={0.12} className="lg:col-span-5">
          <Parallax depth={0.06}>
            <dl className="divide-y divide-cadet-lift border-y border-cadet-lift">
            {[
              { k: "Role", v: site.role },
              { k: "Company", v: "Tech Cabin" },
              { k: "Location", v: site.location },
              { k: "Experience", v: `${yearsOfExperience} years` },
              { k: "Focus", v: "Next.js · Node · Postgres" },
              { k: "Availability", v: "Open to select work" },
            ].map((row) => (
              <div
                key={row.k}
                className="flex items-baseline justify-between gap-6 py-4"
              >
                <dt className="meta shrink-0">{row.k}</dt>
                <dd className="text-right font-mono text-sm text-antique">
                  {row.v}
                </dd>
              </div>
              ))}
            </dl>
          </Parallax>
        </Reveal>
      </div>
    </Section>
  )
}
