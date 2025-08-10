"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Home } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface BreadcrumbItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

const sectionMapping: Record<string, BreadcrumbItem[]> = {
  home: [
    { label: "Home", href: "#home", icon: Home }
  ],
  about: [
    { label: "Home", href: "#home", icon: Home },
    { label: "About", href: "#about" }
  ],
  experience: [
    { label: "Home", href: "#home", icon: Home },
    { label: "Experience", href: "#experience" }
  ],
  skills: [
    { label: "Home", href: "#home", icon: Home },
    { label: "Skills", href: "#skills" }
  ],
  projects: [
    { label: "Home", href: "#home", icon: Home },
    { label: "Projects", href: "#projects" }
  ],
  blog: [
    { label: "Home", href: "#home", icon: Home },
    { label: "Blog", href: "#blog" }
  ],
  achievements: [
    { label: "Home", href: "#home", icon: Home },
    { label: "Achievements", href: "#achievements" }
  ],
  contact: [
    { label: "Home", href: "#home", icon: Home },
    { label: "Contact", href: "#contact" }
  ]
}

export default function Breadcrumb() {
  const [currentSection, setCurrentSection] = useState("home")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(sectionMapping)
      setIsVisible(window.scrollY > 400) // Show breadcrumb after scrolling past hero
      
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setCurrentSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const breadcrumbItems = sectionMapping[currentSection] || []

  if (!isVisible || currentSection === "home") {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 left-4 z-30 bg-black/80 backdrop-blur-xl rounded-full px-4 py-2 border border-purple-500/20 shadow-lg"
      >
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const Icon = item.icon
            const isLast = index === breadcrumbItems.length - 1
            
            return (
              <div key={item.href} className="flex items-center space-x-2">
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center space-x-1 transition-colors duration-200 ${
                    isLast
                      ? "text-purple-400 font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  <span>{item.label}</span>
                </button>
                
                {!isLast && (
                  <ChevronRight className="w-3 h-3 text-gray-600" />
                )}
              </div>
            )
          })}
        </nav>
      </motion.div>
    </AnimatePresence>
  )
}