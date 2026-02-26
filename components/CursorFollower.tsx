"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useSpring } from "framer-motion"

export default function CursorFollower() {
    const [isHoveringProject, setIsHoveringProject] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
    const cursorX = useSpring(0, springConfig)
    const cursorY = useSpring(0, springConfig)

    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
        if (!isVisible) setIsVisible(true)
    }, [cursorX, cursorY, isVisible])

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove, { passive: true })

        // Observer for project card hover state
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const card = target.closest("[data-project-card]")
            setIsHoveringProject(!!card)
        }

        window.addEventListener("mouseover", handleMouseOver, { passive: true })

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [handleMouseMove])

    if (!isVisible) return null

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed pointer-events-none z-[100] mix-blend-difference hidden lg:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        width: isHoveringProject ? 100 : 12,
                        height: isHoveringProject ? 100 : 12,
                        borderRadius: isHoveringProject ? 50 : 6,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                    }}
                    className="bg-white flex items-center justify-center"
                >
                    <motion.span
                        animate={{
                            opacity: isHoveringProject ? 1 : 0,
                            scale: isHoveringProject ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-black font-heading font-semibold text-xs uppercase tracking-wider whitespace-nowrap"
                    >
                        View
                    </motion.span>
                </motion.div>
            </motion.div>
        </>
    )
}
