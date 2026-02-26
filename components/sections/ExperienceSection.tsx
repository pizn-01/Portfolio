"use client"

import { motion } from "framer-motion"
import SectionReveal from "@/components/SectionReveal"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"

interface Experience {
    title: string
    company: string
    period: string
    description: string
    technologies: string[]
    current: boolean
}

interface ExperienceSectionProps {
    experiences: Experience[]
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
    return (
        <section id="experience" className="py-32 px-6 sm:px-8 lg:px-12 relative">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <SectionReveal className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-ember font-heading text-sm uppercase tracking-[0.3em] font-medium">03</span>
                        <div className="w-12 h-[1px] bg-gradient-to-r from-ember to-transparent" />
                        <span className="text-ember font-heading text-sm uppercase tracking-[0.3em] font-medium">Experience</span>
                    </div>
                    <h2 className="text-display-md text-foreground mb-6">
                        Professional<br />
                        <span className="text-muted-foreground">Journey</span>
                    </h2>
                </SectionReveal>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical timeline line */}
                    <motion.div
                        className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-ember via-border to-transparent -translate-x-1/2 origin-top hidden md:block"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    />

                    <div className="space-y-16">
                        {experiences.map((exp, index) => {
                            const isLeft = index % 2 === 0

                            return (
                                <motion.div
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        x: isLeft ? -60 : 60,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        delay: index * 0.15,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    className={`relative md:w-[calc(50%-2rem)] ${isLeft
                                            ? "md:mr-auto md:pr-8"
                                            : "md:ml-auto md:pl-8"
                                        }`}
                                >
                                    {/* Timeline dot */}
                                    <div
                                        className={`absolute top-6 hidden md:flex items-center justify-center ${isLeft
                                                ? "right-0 translate-x-[calc(100%+1.5rem)]"
                                                : "left-0 -translate-x-[calc(100%+1.5rem)]"
                                            }`}
                                    >
                                        <motion.div
                                            className={`w-4 h-4 rounded-full border-2 ${exp.current
                                                    ? "border-ember bg-ember shadow-lg shadow-ember/30"
                                                    : "border-border bg-background"
                                                }`}
                                            animate={
                                                exp.current
                                                    ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }
                                                    : {}
                                            }
                                            transition={
                                                exp.current
                                                    ? { duration: 2, repeat: Infinity }
                                                    : {}
                                            }
                                        />
                                    </div>

                                    {/* Card */}
                                    <div className="group p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-ember/30 hover:bg-card/50 transition-all duration-300">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-ember/10 flex items-center justify-center flex-shrink-0">
                                                    <Zap size={18} className="text-ember" />
                                                </div>
                                                <div>
                                                    <h3 className="font-heading font-semibold text-foreground text-lg">
                                                        {exp.title}
                                                    </h3>
                                                    <p className="text-ember font-medium text-sm">{exp.company}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Period badge */}
                                        <div className="flex items-center gap-2 mb-4">
                                            {exp.current && (
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.3, 1],
                                                        opacity: [1, 0.7, 1],
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/30"
                                                />
                                            )}
                                            <Badge
                                                variant="outline"
                                                className={`text-xs font-medium ${exp.current
                                                        ? "text-green-400 border-green-400/30 bg-green-400/5"
                                                        : "text-muted-foreground border-border"
                                                    }`}
                                            >
                                                {exp.period}
                                            </Badge>
                                        </div>

                                        {/* Description */}
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-5 font-body">
                                            {exp.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {exp.technologies.map((tech) => (
                                                <Badge
                                                    key={tech}
                                                    variant="secondary"
                                                    className="bg-secondary/50 text-secondary-foreground border border-border text-xs py-0.5 px-2 font-medium"
                                                >
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
