"use client"

import { motion } from "framer-motion"
import SectionReveal from "@/components/SectionReveal"
import {
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Github,
    Linkedin,
    Twitter,
    Instagram,
    ArrowUpRight,
} from "lucide-react"

interface ContactSectionProps {
    email: string
    phone: string
    location: string
    upworkUrl: string
    socials: {
        github: string
        linkedin: string
        twitter: string
        instagram: string
    }
}

export default function ContactSection({
    email,
    phone,
    location,
    upworkUrl,
    socials,
}: ContactSectionProps) {
    const contactItems = [
        {
            icon: Mail,
            label: "Email",
            value: email,
            href: `mailto:${email}`,
        },
        {
            icon: Phone,
            label: "Phone",
            value: phone,
            href: `tel:${phone.replace(/\s/g, "")}`,
        },
        {
            icon: MapPin,
            label: "Location",
            value: location,
        },
        {
            icon: Briefcase,
            label: "Upwork",
            value: "Professional Profile",
            href: upworkUrl,
        },
    ]

    const socialLinks = [
        { icon: Github, label: "GitHub", href: socials.github },
        { icon: Linkedin, label: "LinkedIn", href: socials.linkedin },
        { icon: Twitter, label: "Twitter", href: socials.twitter },
        { icon: Instagram, label: "Instagram", href: socials.instagram },
    ]

    return (
        <section id="contact" className="py-32 px-6 sm:px-8 lg:px-12 relative">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <SectionReveal className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-ember font-heading text-sm uppercase tracking-[0.3em] font-medium">05</span>
                        <div className="w-12 h-[1px] bg-gradient-to-r from-ember to-transparent" />
                        <span className="text-ember font-heading text-sm uppercase tracking-[0.3em] font-medium">Contact</span>
                    </div>
                    <h2 className="text-display-md text-foreground mb-6">
                        Let&apos;s Create<br />
                        <span className="text-muted-foreground">Together</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl font-body">
                        Ready to transform your ideas into exceptional digital experiences?
                        Let&apos;s collaborate and build something remarkable.
                    </p>
                </SectionReveal>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact info */}
                    <div className="space-y-4">
                        {contactItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target={item.href.startsWith("http") ? "_blank" : undefined}
                                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/30 hover:border-ember/30 hover:bg-ember/5 transition-all duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-ember/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ember/20 transition-colors">
                                            <item.icon size={20} className="text-ember" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{item.label}</p>
                                            <p className="text-foreground font-medium text-sm truncate">{item.value}</p>
                                        </div>
                                        <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-ember transition-colors flex-shrink-0" />
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/30">
                                        <div className="w-12 h-12 rounded-xl bg-ember/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon size={20} className="text-ember" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{item.label}</p>
                                            <p className="text-foreground font-medium text-sm">{item.value}</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Social links + CTA */}
                    <div className="space-y-8">
                        <SectionReveal direction="right" delay={0.2}>
                            <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
                                Connect With Me
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.08 }}
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        viewport={{ once: true }}
                                        className="group flex items-center justify-center gap-3 p-4 rounded-xl border border-border bg-card/30 hover:border-ember/30 hover:bg-ember/5 transition-all duration-300"
                                    >
                                        <social.icon size={18} className="text-muted-foreground group-hover:text-ember transition-colors" />
                                        <span className="text-sm font-heading font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                            {social.label}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </SectionReveal>

                        <SectionReveal direction="right" delay={0.4}>
                            <motion.a
                                href={`mailto:${email}`}
                                className="group block w-full p-6 rounded-2xl bg-ember text-center hover:bg-ember-dark transition-colors duration-300"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <span className="text-white font-heading font-semibold text-lg">
                                    Start a Project Together
                                </span>
                                <motion.span
                                    className="inline-block ml-2"
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </motion.a>
                        </SectionReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
