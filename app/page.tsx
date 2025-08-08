import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Experience from "@/components/sections/experience"
import EnhancedProjects from "@/components/sections/enhanced-projects"  // Import the enhanced version
import Blog from "@/components/sections/blog"
import Skills from "@/components/sections/skills"
import Achievements from "@/components/sections/achievements"
import Contact from "@/components/sections/contact"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import ScrollProgress from "@/components/scroll-progress"
import OneSignalNotifications from "@/components/onesignal-notifications"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <ParticleBackground />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <EnhancedProjects />  {/* Using EnhancedProjects component */}
      <Blog />  {/* Using Blog component */}
      <Achievements />
      <Contact />
      <Footer />
      <OneSignalNotifications />
    </main>
  )
}