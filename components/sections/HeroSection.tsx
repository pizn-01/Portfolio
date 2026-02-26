"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import MorphingSVG from "@/components/MorphingSVG"
import {
    ChevronDown,
    Github,
    Linkedin,
} from "lucide-react"

interface HeroSectionProps {
    name: string
    role: string
    tagline: string
    scrollToSection: (id: string) => void
    githubUrl: string
    linkedinUrl: string
}

export default function HeroSection({
    name,
    role,
    tagline,
    scrollToSection,
    githubUrl,
    linkedinUrl,
}: HeroSectionProps) {
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    })

    const bgTextY = useTransform(scrollYProgress, [0, 1], [0, 200])
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60])

    // Split name into words for staggered reveal
    const nameWords = name.split(" ")

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3,
            },
        },
    }

    const wordVariants = {
        hidden: { y: 80, opacity: 0, rotateX: -40 },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }

    const fadeUpVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }

    return (
        <section
            id="home"
            ref={heroRef}
            className="min-h-screen relative overflow-hidden gradient-hero flex items-center justify-center"
        >
            {/* Grid lines decoration */}
            <div className="absolute inset-0 grid-lines opacity-30" />

            {/* Parallax background text */}
            <motion.div
                style={{ y: bgTextY }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            >
                <span className="parallax-text text-display-xl opacity-40 whitespace-nowrap">
                    FULL STACK
                </span>
            </motion.div>

            {/* Morphing SVG decoration */}
            <MorphingSVG
                className="absolute top-20 right-10 opacity-60 hidden md:block"
                size={300}
                color="hsl(25, 90%, 55%)"
            />
            <MorphingSVG
                className="absolute bottom-20 left-10 opacity-40 hidden lg:block"
                size={200}
                color="hsl(220, 10%, 30%)"
            />

            {/* Main content */}
            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Role label */}
                    <motion.div variants={fadeUpVariants} className="flex items-center gap-3">
                        <div className="w-12 h-[1px] bg-gradient-to-r from-ember to-transparent" />
                        <span className="text-ember font-heading text-sm uppercase tracking-[0.3em] font-medium">
                            {role}
                        </span>
                    </motion.div>

                    {/* Name - cinematic display */}
                    <div className="overflow-hidden">
                        <motion.h1 className="text-display-xl text-foreground">
                            {nameWords.map((word, index) => (
                                <motion.span
                                    key={index}
                                    variants={wordVariants}
                                    className="inline-block mr-[0.3em]"
                                    style={{ perspective: 400 }}
                                >
                                    {index === nameWords.length - 1 ? (
                                        <span className="bg-gradient-to-r from-ember to-ember-light bg-clip-text text-transparent">
                                            {word}
                                        </span>
                                    ) : (
                                        word
                                    )}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </div>

                    {/* Tagline */}
                    <motion.p
                        variants={fadeUpVariants}
                        className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed font-body"
                    >
                        {tagline}
                    </motion.p>

                    {/* CTAs and social links */}
                    <motion.div
                        variants={fadeUpVariants}
                        className="flex flex-col sm:flex-row items-start gap-6 pt-4"
                    >
                        <motion.button
                            onClick={() => scrollToSection("projects")}
                            className="group relative px-8 py-4 bg-ember text-white font-heading font-semibold text-sm uppercase tracking-wider rounded-lg overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Explore My Work
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-ember-dark"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>

                        <div className="flex items-center gap-4">
                            {[
                                { icon: Github, href: githubUrl, label: "GitHub" },
                                { icon: Linkedin, href: linkedinUrl, label: "LinkedIn" },
                            ].map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-ember/50 transition-all duration-300"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.button
                    onClick={() => scrollToSection("about")}
                    className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    aria-label="Scroll to about section"
                >
                    <span className="text-xs font-heading uppercase tracking-widest">
                        Scroll
                    </span>
                    <ChevronDown size={16} />
                </motion.button>
            </motion.div>
        </section>
    )
}
