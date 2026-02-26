"use client"

import { motion } from "framer-motion"

interface MorphingSVGProps {
    className?: string
    size?: number
    color?: string
}

export default function MorphingSVG({ className = "", size = 200, color = "hsl(25, 90%, 55%)" }: MorphingSVGProps) {
    const paths = [
        "M 100 0 C 155 0 200 45 200 100 C 200 155 155 200 100 200 C 45 200 0 155 0 100 C 0 45 45 0 100 0 Z",
        "M 100 10 C 170 20 190 55 195 100 C 185 165 155 195 100 190 C 35 185 5 160 10 100 C 15 40 40 15 100 10 Z",
        "M 100 5 C 160 0 200 35 195 100 C 200 165 165 200 100 195 C 40 200 0 165 5 100 C 0 40 45 5 100 5 Z",
        "M 100 0 C 155 0 200 45 200 100 C 200 155 155 200 100 200 C 45 200 0 155 0 100 C 0 45 45 0 100 0 Z",
    ]

    return (
        <div className={className}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    d={paths[0]}
                    fill={color}
                    fillOpacity={0.08}
                    stroke={color}
                    strokeWidth={0.5}
                    strokeOpacity={0.2}
                    animate={{
                        d: paths,
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.path
                    d={paths[2]}
                    fill={color}
                    fillOpacity={0.04}
                    animate={{
                        d: [...paths].reverse(),
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </svg>
        </div>
    )
}
