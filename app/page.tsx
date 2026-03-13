"use client"

import { useMemo, useCallback } from "react"
import SmoothScrollProvider from "@/components/SmoothScrollProvider"
import ScrollProgress from "@/components/ScrollProgress"
import CursorFollower from "@/components/CursorFollower"
import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"
import SkillsSection from "@/components/sections/SkillsSection"
import ExperienceSection from "@/components/sections/ExperienceSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import ContactSection from "@/components/sections/ContactSection"
import FooterSection from "@/components/sections/FooterSection"
import Navigation from "@/components/Navigation"

export default function Portfolio() {
  // ─── Data ──────────────────────────────────────────────
  const skills = useMemo(
    () => ({
      languages: [
        "JavaScript", "TypeScript", "Python", "PHP", "Java",
        "HTML5", "CSS3", "Sass", "SCSS", "ECMAScript",
        "XQuery", "GraphQL", "SQL",
      ],
      frameworks: [
        "React", "Next.js", "Node.js", "Express.js", "Laravel",
        "WordPress", "Bootstrap", "Tailwind CSS", "Vue.js", "Angular",
        "Nuxt.js", "Semantic UI", "Material UI", "React Bootstrap",
        "LeSS Framework",
      ],
      databases: [
        "MongoDB", "MySQL", "PostgreSQL", "Firebase", "Oracle NoSQL",
        "Microsoft SQL Server", "Azure Cosmos DB", "SQLite",
        "Firebase Realtime Database",
      ],
      tools: [
        "Git", "GitHub", "Docker", "Vercel", "Netlify",
        "Google Cloud Platform", "RESTful API", "GraphQL",
        "Webpack", "Vite", "npm", "Yarn", "GitLab",
      ],
      specialties: [
        "Full-Stack Development", "Responsive Design", "E-commerce",
        "CMS Development", "Brand Development", "SEO",
        "Website Security", "Performance Optimization",
        "AI App Development", "Browser Extensions",
        "Desktop Applications",
      ],
    }),
    [],
  )

  const experiences = useMemo(
    () => [
      {
        title: "Full-Stack Developer",
        company: "Logopidea",
        period: "January 2025 – Present",
        description:
          "Developing Full-stack web applications and enterprise applications. Collaborating with development teams to develop customized Microsoft SharePoint solutions.",
        technologies: ["React", "Node.js", "SharePoint", "TypeScript", "Azure", "Microsoft SQL Server"],
        current: true,
      },
      {
        title: "Front-end/CMS Developer",
        company: "Friends Technologies",
        period: "April 2022 – December 2024",
        description:
          "Responsible for developing visually appealing, user interactive front-end using MERN stack development. Developing user-centric sites and stores using CMS for developing businesses.",
        technologies: ["MERN Stack", "WordPress", "Shopify", "Wix.com", "SquareSpace", "React", "MongoDB"],
        current: false,
      },
      {
        title: "Web Developer",
        company: "Bits & Digits",
        period: "October 2020 – March 2022",
        description:
          "Responsible for developing visually appealing, user interactive sites using HTML, CSS + Libraries, JavaScript + Frameworks. Developing user-centric sites using CMS for developing businesses.",
        technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "Shopify", "jQuery", "PHP"],
        current: false,
      },
    ],
    [],
  )

  const projects = useMemo(
    () => [
      // Basic Projects
      {
        title: "GoTrack UAE",
        description: "Vehicle tracking and fleet management system with real-time GPS monitoring and analytics dashboard.",
        technologies: ["WordPress", "JavaScript", "MySQL", "CSS3"],
        status: "Completed",
        category: "Basic",
        url: "https://gotrack.ae/",
        level: "basic",
      },
      {
        title: "SGS Cleaning",
        description: "Professional cleaning services website with booking system and service portfolio showcase.",
        technologies: ["WordPress", "PHP", "JavaScript", "Bootstrap"],
        status: "Completed",
        category: "Basic",
        url: "https://sgscleaning.ae/",
        level: "basic",
      },
      {
        title: "Me Naturals",
        description: "Natural skincare and beauty products e-commerce platform with product catalog and shopping cart.",
        technologies: ["WordPress", "WooCommerce", "PHP", "CSS3"],
        status: "Completed",
        category: "Basic",
        url: "https://www.menaturals.net/",
        level: "basic",
      },
      // Intermediate Projects
      {
        title: "Fabletics UK",
        description: "Athletic wear and lifestyle brand e-commerce platform with subscription model and personalized shopping experience.",
        technologies: ["React", "Node.js", "MongoDB", "Express.js"],
        status: "Completed",
        category: "Intermediate",
        url: "https://www.fabletics.co.uk/",
        level: "intermediate",
      },
      {
        title: "Crude Oil Capitol",
        description: "Oil trading and investment platform with market analysis, portfolio management, and real-time data integration.",
        technologies: ["React", "Node.js", "MongoDB", "Express.js"],
        status: "Completed",
        category: "Intermediate",
        url: "https://www.crudeoilcapitol.com/",
        level: "intermediate",
      },
      {
        title: "Speakeasy UAE",
        description: "Premium bar and restaurant website with reservation system, menu management, and event booking.",
        technologies: ["React", "WordPress", "PHP", "MySQL"],
        status: "Completed",
        category: "Intermediate",
        url: "https://speakeasy.ae/",
        level: "intermediate",
      },
      {
        title: "Doctor On Calls",
        description: "Telemedicine platform connecting patients with healthcare providers for online consultations and prescriptions.",
        technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
        status: "Completed",
        category: "Intermediate",
        url: "https://doctoroncalls.ae/",
        level: "intermediate",
      },
      {
        title: "UHC Dubai",
        description: "Healthcare management system with patient records, appointment scheduling, and medical billing integration.",
        technologies: ["React", "Express.js", "MongoDB", "Redux"],
        status: "Completed",
        category: "Intermediate",
        url: "https://www.uhcdubai.com/",
        level: "intermediate",
      },
      {
        title: "Edmunds",
        description: "Automotive research and car buying platform with vehicle reviews, pricing data, and dealer network integration.",
        technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
        status: "Completed",
        category: "Intermediate",
        url: "https://www.edmunds.com/",
        level: "intermediate",
      },
      {
        title: "Monsoon UK",
        description: "Fashion retail e-commerce platform with seasonal collections, size guides, and international shipping.",
        technologies: ["React", "Express.js", "MongoDB", "Stripe"],
        status: "Completed",
        category: "Intermediate",
        url: "https://www.monsoon.co.uk/",
        level: "intermediate",
      },
      {
        title: "Swiss Arabian UAE",
        description: "Luxury fragrance and perfume e-commerce platform with product customization and gift packaging options.",
        technologies: ["React", "Node.js", "MySQL", "PayPal"],
        status: "Completed",
        category: "Intermediate",
        url: "https://uae.swissarabian.com/",
        level: "intermediate",
      },
      // Advanced Projects
      {
        title: "Carmazium",
        description: "A premium, cinematic-first automotive marketplace bridging the gap between digital convenience and physical showroom luxury.",
        technologies: ["Next.js 15", "Tailwind CSS", "Framer Motion", "Lucide React"],
        status: "Completed",
        category: "Advanced",
        url: "https://carmazium.vercel.app/",
        level: "advanced",
      },
      {
        title: "Nadia Khan Official",
        description: "Celebrity portfolio and brand website with content management, media gallery, and fan engagement features.",
        technologies: ["Next.js", "React", "Strapi", "PostgreSQL"],
        status: "Completed",
        category: "Advanced",
        url: "https://nadiakhanofficial.com/",
        level: "advanced",
      },
      {
        title: "Davis Interior",
        description: "Luxury interior design studio with 3D visualization, project portfolio, and client management system.",
        technologies: ["Next.js", "Three.js", "MongoDB", "Tailwind CSS"],
        status: "Completed",
        category: "Advanced",
        url: "https://davisinterior.com/",
        level: "advanced",
      },
      {
        title: "The Original Creator",
        description: "Creative agency platform with portfolio showcase, client collaboration tools, and project management system.",
        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
        status: "Completed",
        category: "Advanced",
        url: "https://www.theoriginalcreator.com/",
        level: "advanced",
      },
      {
        title: "Flying Tech",
        description: "Technology solutions company with service portfolio, team management, and client project tracking system.",
        technologies: ["Next.js", "React", "Node.js", "MongoDB"],
        status: "Completed",
        category: "Advanced",
        url: "https://www.flyingtech.co.uk/",
        level: "advanced",
      },
      {
        title: "Madame Pakistan",
        description: "Fashion e-commerce platform with AR try-on, size recommendation, and social shopping features.",
        technologies: ["React", "Node.js", "MongoDB", "WebRTC"],
        status: "Completed",
        category: "Advanced",
        url: "https://madame.pk/",
        level: "advanced",
      },
      {
        title: "Alpha Cargo",
        description: "Logistics and shipping management system with real-time tracking, route optimization, and fleet management.",
        technologies: ["React", "Express.js", "PostgreSQL", "Redis"],
        status: "Completed",
        category: "Advanced",
        url: "https://alphacargo.ae/",
        level: "advanced",
      },
      {
        title: "LIT Co Industries",
        description: "Industrial manufacturing company website with product catalog, B2B portal, and supply chain integration.",
        technologies: ["Next.js", "TypeScript", "MongoDB", "GraphQL"],
        status: "Completed",
        category: "Advanced",
        url: "https://www.litcoindustries.ae/",
        level: "advanced",
      },
      {
        title: "Friends Industries",
        description: "Manufacturing and trading company platform with inventory management, order processing, and CRM integration.",
        technologies: ["React", "Node.js", "MySQL", "Docker"],
        status: "Completed",
        category: "Advanced",
        url: "https://www.friendsindustries.com.pk/",
        level: "advanced",
      },
    ],
    [],
  )

  // ─── Handlers ──────────────────────────────────────────
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 72
      const elementPosition = element.offsetTop - navHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }, [])

  // ─── Render ────────────────────────────────────────────
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        <CursorFollower />
        <ScrollProgress />

        <Navigation scrollToSection={scrollToSection} />

        <HeroSection
          name="M.AIRAF ADIL"
          role="Full Stack Developer"
          tagline="Crafting innovative digital experiences with cutting-edge technologies and creative problem-solving. Specializing in full-stack development, enterprise solutions, and user-centric design."
          scrollToSection={scrollToSection}
          githubUrl="https://github.com/pizn-01"
          linkedinUrl="https://www.linkedin.com/in/muhammad-airaf-adil-b12b33322"
        />

        <AboutSection />

        <SkillsSection skills={skills} />

        <ExperienceSection experiences={experiences} />

        <ProjectsSection projects={projects} />

        <ContactSection
          email="airafadil619@gmail.com"
          phone="+92 334 3365685"
          location="Karachi, Pakistan"
          upworkUrl="https://www.upwork.com/freelancers/~0159c66e59525f8826?s=1110580755107926016"
          socials={{
            github: "https://github.com/pizn-01",
            linkedin: "https://www.linkedin.com/in/muhammad-airaf-adil-b12b33322",
            twitter: "https://twitter.com/pizn_01",
            instagram: "https://www.instagram.com/pizn_01",
          }}
        />

        <FooterSection
          name="M.AIRAF ADIL"
          role="Full Stack Developer"
          scrollToSection={scrollToSection}
        />
      </div>
    </SmoothScrollProvider>
  )
}
