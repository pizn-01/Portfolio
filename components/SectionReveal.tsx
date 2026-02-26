"use client"

import { motion, type Variants } from "framer-motion"
import { useRef } from "react"

interface SectionRevealProps {
    children: React.ReactNode
    className?: string
    direction?: "up" | "left" | "right" | "scale"
    delay?: number
    duration?: number
    stagger?: number
}

export default function SectionReveal({
    children,
    className = "",
    direction = "up",
    delay = 0,
    duration = 0.7,
}: SectionRevealProps) {
    const ref = useRef(null)

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 60 : 0,
            x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
            scale: direction === "scale" ? 0.9 : 1,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
