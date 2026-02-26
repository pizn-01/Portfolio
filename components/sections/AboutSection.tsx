"use client"

import { motion } from "framer-motion"
import SectionReveal from "@/components/SectionReveal"
import {
    Mail,
    Phone,
    MapPin,
    Briefcase,
    GraduationCap,
} from "lucide-react"

export default function AboutSection() {
    return (
        <section id="about" className="py-32 px-6 sm:px-8 lg:px-12 relative">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <SectionReveal className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-ember font-heading text-sm uppercase tracking-[0.3em] font-medium">01</span>
                        <div className="w-12 h-[1px] bg-gradient-to-r from-ember to-transparent" />
                        <span className="text-ember font-heading text-sm uppercase tracking-[0.3em] font-medium">About</span>
                    </div>
                    <h2 className="text-display-md text-foreground mb-6">
                        Crafting Digital<br />
                        <span className="text-muted-foreground">Experiences</span>
                    </h2>
                </SectionReveal>

                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Left column - description */}
                    <SectionReveal direction="left" className="lg:col-span-3 space-y-8">
                        <p className="text-lg text-muted-foreground leading-relaxed font-body">
                            Full-Stack web developer with expertise in modern JavaScript frameworks and
                            backend technologies. Skilled in creating scalable, responsive web applications
                            with a focus on user experience and performance optimization.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed font-body">
                            I transform complex ideas into elegant digital solutions, bridging the gap
                            between design and functionality. Every project is an opportunity to push
                            creative boundaries while maintaining technical excellence.
                        </p>

                        {/* Contact info */}
                        <div className="grid sm:grid-cols-2 gap-4 pt-6">
                            {[
                                {
                                    icon: Mail,
                                    label: "Email",
                                    value: "airafadil619@gmail.com",
                                    href: "mailto:airafadil619@gmail.com",
                                },
                                {
                                    icon: Phone,
                                    label: "Phone",
                                    value: "+92 334 3365685",
                                    href: "tel:+923343365685",
                                },
                                {
                                    icon: MapPin,
                                    label: "Location",
                                    value: "Karachi, Pakistan",
                                },
                                {
                                    icon: Briefcase,
                                    label: "Upwork",
                                    value: "View Profile",
                                    href: "https://www.upwork.com/freelancers/~0159c66e59525f8826?s=1110580755107926016",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="group"
                                >
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={item.href.startsWith("http") ? "_blank" : undefined}
                                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50 hover:border-ember/30 hover:bg-ember/5 transition-all duration-300"
                                        >
                                            <item.icon size={18} className="text-ember flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.label}</p>
                                                <p className="text-sm text-foreground font-medium truncate">{item.value}</p>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50">
                                            <item.icon size={18} className="text-ember flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.label}</p>
                                                <p className="text-sm text-foreground font-medium">{item.value}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </SectionReveal>

                    {/* Right column - Education */}
                    <SectionReveal direction="right" delay={0.2} className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-3 mb-8">
                            <GraduationCap size={20} className="text-ember" />
                            <h3 className="text-xl font-heading font-semibold text-foreground">
                                Education & Certifications
                            </h3>
                        </div>

                        <div className="space-y-6 relative">
                            {/* Timeline line */}
                            <motion.div
                                className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-ember via-border to-transparent origin-top"
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                transition={{ duration: 1.2, delay: 0.3 }}
                                viewport={{ once: true }}
                            />

                            {[
                                {
                                    title: "BS Computer Networks & Security",
                                    place: "Sir Syed University of Engineering & Technology",
                                    period: "2022 – 2026*",
                                },
                                {
                                    title: "Web Development",
                                    place: "Saylani MassIT",
                                    period: "2021 – 2022",
                                },
                                {
                                    title: "Cisco CyberOps Associate",
                                    place: "Saylani MassIT",
                                    period: "2024 – 2025",
                                },
                            ].map((edu, index) => (
                                <motion.div
                                    key={edu.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="relative pl-8"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full border-2 border-ember bg-background flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-ember" />
                                    </div>
                                    <div className="p-4 rounded-xl border border-border bg-card/50 hover:border-ember/20 transition-colors">
                                        <h4 className="font-heading font-semibold text-foreground text-sm">{edu.title}</h4>
                                        <p className="text-muted-foreground text-xs mt-1">{edu.place}</p>
                                        <span className="text-ember text-xs font-medium mt-2 inline-block">{edu.period}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    )
}
