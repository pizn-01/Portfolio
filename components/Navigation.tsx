"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

interface NavigationProps {
    scrollToSection: (id: string) => void
}

const navItems = ["home", "about", "skills", "experience", "projects", "contact"]

export default function Navigation({ scrollToSection }: NavigationProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        let ticking = false
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleNavClick = (id: string) => {
        scrollToSection(id)
        setIsMenuOpen(false)
    }

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                    ? "bg-background/90 backdrop-blur-xl border-b border-border/50"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center h-[72px]">
                    {/* Logo */}
                    <motion.button
                        onClick={() => handleNavClick("home")}
                        className="font-heading font-bold text-base text-foreground tracking-tight"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="text-ember">M.</span>AIRAF
                    </motion.button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                                onClick={() => handleNavClick(item)}
                                className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 capitalize font-body font-medium group"
                            >
                                {item}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-ember group-hover:w-1/2 transition-all duration-300 rounded-full" />
                            </motion.button>
                        ))}
                    </div>

                    {/* CTA Button - Desktop */}
                    <motion.a
                        href="mailto:airafadil619@gmail.com"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-ember text-white rounded-full text-sm font-heading font-semibold hover:bg-ember-dark transition-colors duration-300"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                        Hire Me
                    </motion.a>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            animate={{ rotate: isMenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isMenuOpen ? (
                                <X size={20} className="text-foreground" />
                            ) : (
                                <Menu size={20} className="text-foreground" />
                            )}
                        </motion.div>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 overflow-hidden"
                    >
                        <div className="px-6 py-6 space-y-1">
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleNavClick(item)}
                                    className="block w-full text-left py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all duration-200 capitalize text-base rounded-lg font-body font-medium"
                                >
                                    {item}
                                </motion.button>
                            ))}
                            <motion.a
                                href="mailto:airafadil619@gmail.com"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 }}
                                className="block w-full text-center py-3 px-4 bg-ember text-white rounded-lg font-heading font-semibold text-sm mt-4"
                            >
                                Hire Me
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
