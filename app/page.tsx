import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Experience from "@/components/sections/experience"
import Projects from "@/components/sections/projects"
import Skills from "@/components/sections/skills"
import Achievements from "@/components/sections/achievements"
import Contact from "@/components/sections/contact"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import ScrollProgress from "@/components/scroll-progress"

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
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  )
}
