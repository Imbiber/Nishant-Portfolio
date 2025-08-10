"use client"

import { useState, useEffect } from "react"
import { Menu, X, Code, User, Briefcase, Zap, Trophy, Mail, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "#home", icon: User },
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Zap },
  { name: "Blog", href: "#blog", icon: BookOpen },
  { name: "Achievements", href: "#achievements", icon: Trophy },
  { name: "Contact", href: "#contact", icon: Mail },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)

      // Auto-hide logic (but not when mobile menu is open)
      if (!isOpen && currentScrollY > 400) { // Only hide after scrolling past hero section and when menu is closed
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
          // Scrolling down - hide nav
          setIsVisible(false)
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show nav
          setIsVisible(true)
        }
      } else if (currentScrollY <= 400) {
        // Always show nav in hero section
        setIsVisible(true)
      } else if (isOpen) {
        // Always show nav when mobile menu is open
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)

      const sections = navItems.map((item) => item.href.substring(1))
      const progress: Record<string, number> = {}
      
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const elementHeight = rect.height
          
          // Calculate progress based on element visibility
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            let progressValue = 0
            
            if (rect.top <= 0 && rect.bottom > windowHeight) {
              // Element is taller than viewport and partially visible
              progressValue = Math.min(100, ((windowHeight + Math.abs(rect.top)) / elementHeight) * 100)
            } else if (rect.top <= 0) {
              // Element top is above viewport
              progressValue = Math.min(100, (rect.bottom / windowHeight) * 100)
            } else if (rect.bottom >= windowHeight) {
              // Element bottom is below viewport
              progressValue = Math.min(100, ((windowHeight - rect.top) / elementHeight) * 100)
            } else {
              // Element is fully visible
              progressValue = 100
            }
            
            progress[section] = Math.max(0, Math.min(100, progressValue))
          } else {
            progress[section] = 0
          }
        }
      })
      
      setSectionProgress(progress)

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isOpen, lastScrollY])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/10"
          : "bg-transparent"
      } ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            &lt;Nishant/&gt;
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const progress = sectionProgress[item.href.substring(1)] || 0
              const isActive = activeSection === item.href.substring(1)
              
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group overflow-hidden ${
                    isActive
                      ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-2 relative z-10">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  
                  {/* Progress indicator */}
                  <div 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                  
                  {/* Active section glow */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 animate-pulse" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-purple-600/20"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl rounded-2xl mt-2 p-6 border border-purple-500/20">
            {navItems.map((item) => {
              const Icon = item.icon
              const progress = sectionProgress[item.href.substring(1)] || 0
              const isActive = activeSection === item.href.substring(1)
              
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative flex items-center space-x-3 w-full text-left py-3 px-4 rounded-xl transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "text-white bg-gradient-to-r from-purple-600 to-pink-600"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5 z-10" />
                  <span className="z-10 flex-1">{item.name}</span>
                  
                  {/* Progress indicator */}
                  <div className="z-10 w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 ease-out rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}