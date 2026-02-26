"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

interface FooterSectionProps {
    name: string
    role: string
    scrollToSection: (id: string) => void
}

export default function FooterSection({ name, role, scrollToSection }: FooterSectionProps) {
    const navLinks = [
        { label: "Home", id: "home" },
        { label: "About", id: "about" },
        { label: "Skills", id: "skills" },
        { label: "Experience", id: "experience" },
        { label: "Projects", id: "projects" },
        { label: "Contact", id: "contact" },
    ]

    return (
        <footer className="relative gradient-footer overflow-hidden">
            {/* Large brand name */}
            <div className="pt-20 pb-8 px-6 sm:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="overflow-hidden mb-16">
                        <motion.h2
                            className="text-display-xl text-foreground/10 leading-none select-none whitespace-nowrap"
                            initial={{ y: 80 }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {name}
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Navigation */}
                        <div>
                            <h4 className="text-sm font-heading uppercase tracking-widest text-muted-foreground mb-6">
                                Navigation
                            </h4>
                            <nav className="space-y-3">
                                {navLinks.map((link, index) => (
                                    <motion.button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                        className="block text-foreground/70 hover:text-ember transition-colors duration-200 font-body text-sm"
                                    >
                                        {link.label}
                                    </motion.button>
                                ))}
                            </nav>
                        </div>

                        {/* Role */}
                        <div>
                            <h4 className="text-sm font-heading uppercase tracking-widest text-muted-foreground mb-6">
                                Specialization
                            </h4>
                            <p className="text-foreground/70 text-sm font-body leading-relaxed">
                                {role}
                            </p>
                            <p className="text-foreground/70 text-sm font-body leading-relaxed mt-2">
                                Creative Problem Solver &amp; Digital Innovation Specialist
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col items-start md:items-end justify-between">
                            <div className="text-right hidden md:block">
                                <p className="text-foreground font-heading font-semibold text-lg mb-2">
                                    Ready to start your next digital experience?
                                </p>
                                <motion.a
                                    href="mailto:airafadil619@gmail.com"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-heading font-semibold text-sm uppercase tracking-wider hover:bg-ember hover:text-white transition-all duration-300"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <span className="w-2 h-2 rounded-full bg-ember" />
                                    Get in Touch
                                </motion.a>
                            </div>

                            {/* Scroll to top */}
                            <motion.button
                                onClick={() => scrollToSection("home")}
                                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-ember hover:border-ember/50 transition-all duration-300 mt-6 md:mt-0"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Scroll to top"
                            >
                                <ArrowUp size={18} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                        className="border-t border-border/50 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
                    >
                        <p className="text-muted-foreground text-xs font-body">
                            © {new Date().getFullYear()} {name}. All rights reserved.
                        </p>
                        <p className="text-muted-foreground text-xs font-body">
                            Crafted with passion & modern web technologies
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    )
}
