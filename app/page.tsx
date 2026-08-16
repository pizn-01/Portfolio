"use client"

import { useCallback } from "react"
import SmoothScroll from "@/components/motion/SmoothScroll"
import Spine from "@/components/motion/Spine"
import Cursor from "@/components/motion/Cursor"
import Navigation from "@/components/Navigation"
import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"
import SkillsSection from "@/components/sections/SkillsSection"
import ExperienceSection from "@/components/sections/ExperienceSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import ContactSection from "@/components/sections/ContactSection"
import FooterSection from "@/components/sections/FooterSection"

/**
 * Content lives in lib/content/ — this file only composes.
 * Do not reintroduce project or experience data here.
 */
export default function Page() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const offset = id === "home" ? 0 : el.offsetTop - 64
    window.scrollTo({
      top: offset,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    })
  }, [])

  return (
    <SmoothScroll>
      <Cursor />
      <Spine />
      <Navigation onNavigate={scrollTo} />

      <main className="relative overflow-x-hidden">
        <HeroSection onNext={scrollTo} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <FooterSection />
    </SmoothScroll>
  )
}
