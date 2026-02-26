"use client"

import { motion } from "framer-motion"
import SectionReveal from "@/components/SectionReveal"
import { Badge } from "@/components/ui/badge"
import {
    Code,
    Globe,
    Database,
    Server,
    Palette,
} from "lucide-react"

interface SkillsSectionProps {
    skills: {
        languages: string[]
        frameworks: string[]
        databases: string[]
        tools: string[]
        specialties: string[]
    }
}

const categoryIcons: Record<string, React.ElementType> = {
    languages: Code,
    frameworks: Globe,
    databases: Database,
    tools: Server,
    specialties: Palette,
}

const categoryLabels: Record<string, string> = {
    languages: "Languages",
    frameworks: "Frameworks",
    databases: "Databases",
    tools: "Dev Tools",
    specialties: "Specialties",
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    }

    const cardVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }

    return (
        <section id="skills" className="py-32 px-6 sm:px-8 lg:px-12 relative gradient-dark">
            {/* Background decorative number */}
            <div className="absolute top-20 right-10 pointer-events-none select-none hidden lg:block">
                <span className="parallax-text text-[15rem] leading-none opacity-30">02</span>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section header */}
                <SectionReveal className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-ember font-heading text-sm uppercase tracking-[0.3em] font-medium">02</span>
                        <div className="w-12 h-[1px] bg-gradient-to-r from-ember to-transparent" />
                        <span className="text-ember font-heading text-sm uppercase tracking-[0.3em] font-medium">Skills</span>
                    </div>
                    <h2 className="text-display-md text-foreground mb-6">
                        Technical<br />
                        <span className="text-muted-foreground">Arsenal</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl font-body">
                        A comprehensive toolkit of modern technologies for building exceptional digital experiences.
                    </p>
                </SectionReveal>

                {/* Skills grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {Object.entries(skills).map(([category, skillList]) => {
                        const Icon = categoryIcons[category] || Code

                        return (
                            <motion.div
                                key={category}
                                variants={cardVariants}
                                className="group"
                            >
                                <div className="h-full p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-ember/30 hover:bg-card/50 transition-all duration-300">
                                    {/* Category header */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            className="w-10 h-10 rounded-xl bg-ember/10 flex items-center justify-center"
                                        >
                                            <Icon size={18} className="text-ember" />
                                        </motion.div>
                                        <h3 className="text-lg font-heading font-semibold text-foreground">
                                            {categoryLabels[category] || category}
                                        </h3>
                                    </div>

                                    {/* Skill badges */}
                                    <div className="flex flex-wrap gap-2">
                                        {skillList.map((skill: string, skillIndex: number) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    delay: skillIndex * 0.03,
                                                    type: "spring",
                                                    stiffness: 200,
                                                    damping: 20,
                                                }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                viewport={{ once: true }}
                                            >
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-secondary/50 text-secondary-foreground hover:bg-ember/10 hover:text-ember border border-border hover:border-ember/30 transition-all duration-200 cursor-default text-xs py-1 px-2.5 font-medium"
                                                >
                                                    {skill}
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
