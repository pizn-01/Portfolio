"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionReveal from "@/components/SectionReveal"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface Project {
    title: string
    description: string
    technologies: string[]
    status: string
    category: string
    url: string
    level: string
}

interface ProjectsSectionProps {
    projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    const [activeFilter, setActiveFilter] = useState("all")
    const [showAllProjects, setShowAllProjects] = useState(false)

    const filteredProjects = useMemo(() => {
        const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.level === activeFilter)
        return showAllProjects ? filtered : filtered.slice(0, 6)
    }, [activeFilter, showAllProjects, projects])

    const totalFilteredProjects = useMemo(
        () => (activeFilter === "all" ? projects.length : projects.filter((p) => p.level === activeFilter).length),
        [activeFilter, projects],
    )

    const handleFilterChange = useCallback((filter: string) => {
        setActiveFilter(filter)
        setShowAllProjects(false)
    }, [])

    const filters = [
        { key: "all", label: "All Work" },
        { key: "basic", label: "Basic" },
        { key: "intermediate", label: "Intermediate" },
        { key: "advanced", label: "Advanced" },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05,
            },
        },
    }

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case "basic":
                return { dot: "bg-emerald-400", border: "border-emerald-400/30", text: "text-emerald-400", bg: "bg-emerald-400/5" }
            case "intermediate":
                return { dot: "bg-amber-400", border: "border-amber-400/30", text: "text-amber-400", bg: "bg-amber-400/5" }
            case "advanced":
                return { dot: "bg-rose-400", border: "border-rose-400/30", text: "text-rose-400", bg: "bg-rose-400/5" }
            default:
                return { dot: "bg-muted-foreground", border: "border-border", text: "text-muted-foreground", bg: "bg-secondary/50" }
        }
    }

    return (
        <section id="projects" className="py-32 px-6 sm:px-8 lg:px-12 relative gradient-dark">
            {/* Background decorative number */}
            <div className="absolute top-20 right-10 pointer-events-none select-none hidden lg:block">
                <span className="parallax-text text-[15rem] leading-none opacity-30">04</span>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section header */}
                <SectionReveal className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-ember font-heading text-sm uppercase tracking-[0.3em] font-medium">04</span>
                        <div className="w-12 h-[1px] bg-gradient-to-r from-ember to-transparent" />
                        <span className="text-ember font-heading text-sm uppercase tracking-[0.3em] font-medium">Projects</span>
                    </div>
                    <h2 className="text-display-md text-foreground mb-6">
                        Portfolio<br />
                        <span className="text-muted-foreground">Showcase</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl font-body">
                        {projects.length}+ completed projects ranging from elegant websites to enterprise applications.
                    </p>
                </SectionReveal>

                {/* Filter tabs */}
                <SectionReveal delay={0.1} className="mb-12">
                    <div className="flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <motion.button
                                key={filter.key}
                                onClick={() => handleFilterChange(filter.key)}
                                className={`relative px-5 py-2.5 rounded-full font-heading font-medium text-sm transition-all duration-300 ${activeFilter === filter.key
                                        ? "text-background"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {activeFilter === filter.key && (
                                    <motion.div
                                        className="absolute inset-0 bg-ember rounded-full"
                                        layoutId="activeFilter"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {filter.label}
                                    <span className="ml-1.5 text-xs opacity-70">
                                        ({filter.key === "all"
                                            ? projects.length
                                            : projects.filter((p) => p.level === filter.key).length})
                                    </span>
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </SectionReveal>

                {/* Project grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeFilter}-${showAllProjects}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="grid md:grid-cols-2 gap-6"
                    >
                        {filteredProjects.map((project, index) => {
                            const colors = getLevelColor(project.level)

                            return (
                                <motion.div
                                    key={`${project.title}-${activeFilter}-${index}`}
                                    variants={cardVariants}
                                    data-project-card
                                >
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block"
                                    >
                                        <div className="h-full p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-ember/40 transition-all duration-400 relative overflow-hidden">
                                            {/* Hover gradient overlay */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-br from-ember/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            />

                                            <div className="relative z-10">
                                                {/* Header */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                                                        <h3 className="font-heading font-semibold text-foreground text-lg group-hover:text-ember transition-colors duration-300">
                                                            {project.title}
                                                        </h3>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className={`text-xs font-medium ${colors.text} ${colors.border} ${colors.bg} flex-shrink-0`}
                                                    >
                                                        {project.category}
                                                    </Badge>
                                                </div>

                                                {/* Description */}
                                                <p className="text-muted-foreground text-sm leading-relaxed mb-5 font-body line-clamp-2">
                                                    {project.description}
                                                </p>

                                                {/* Technologies */}
                                                <div className="flex flex-wrap gap-1.5 mb-5">
                                                    {project.technologies.map((tech) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="secondary"
                                                            className="bg-secondary/50 text-secondary-foreground border border-border text-xs py-0.5 px-2 font-medium"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                {/* Link */}
                                                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-ember transition-colors duration-300">
                                                    <span className="text-sm font-heading font-medium">Visit Site</span>
                                                    <motion.div
                                                        animate={{ x: [0, 3, 0] }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                    >
                                                        <ExternalLink size={14} />
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Show all button */}
                {!showAllProjects && filteredProjects.length < totalFilteredProjects && (
                    <SectionReveal delay={0.2} className="text-center mt-12">
                        <motion.button
                            onClick={() => setShowAllProjects(true)}
                            className="px-8 py-4 rounded-full border border-ember/30 text-ember font-heading font-semibold text-sm uppercase tracking-wider hover:bg-ember hover:text-background transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View All {activeFilter === "all" ? "Projects" : `${activeFilter} Projects`} ({totalFilteredProjects})
                        </motion.button>
                    </SectionReveal>
                )}
            </div>
        </section>
    )
}
