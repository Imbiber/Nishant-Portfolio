"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const roles = [
    "Full Stack Developer",
    "Software Developer @ Broadridge",
    "Open Source Contributor",
    "Problem Solver",
    "Chess Enthusiast ♟️",
  ]

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length
      const fullText = roles[i]

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1))

      setTypingSpeed(isDeleting ? 30 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed, roles])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-purple-400/20 text-6xl font-mono animate-bounce">{"{"}</div>
        <div className="absolute top-40 right-20 text-pink-400/20 text-4xl font-mono animate-bounce delay-500">
          {"</"}
        </div>
        <div className="absolute bottom-32 left-20 text-cyan-400/20 text-5xl font-mono animate-bounce delay-1000">
          {"()"}
        </div>
        <div className="absolute bottom-20 right-10 text-green-400/20 text-3xl font-mono animate-bounce delay-1500">
          {"[]"}
        </div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="mb-6">

          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block text-white mb-2">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              Nishant Gaurav
            </span>
          </h1>

          <div className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 mb-8 h-16 flex items-center justify-center">
            <span className="text-purple-400 font-semibold">
              {text}
              <span className="animate-ping text-pink-400">|</span>
            </span>
          </div>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            I'm a software developer at <span className="text-purple-400 font-semibold">Broadridge</span>, passionate about building scalable and reliable backend systems. I work mainly with{" "}
            <span className="text-cyan-400">Node.js</span>,
            <span className="text-green-400">PostgreSQL</span>, and{" "}
            <span className="text-blue-400">Docker</span> — and I love turning complex problems into clean, production-ready solutions.
          </p>

        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl shadow-purple-500/25 group"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="mr-2">View My Work</span>
            <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-full transition-all duration-300 bg-transparent hover:shadow-2xl hover:shadow-cyan-500/25 group"
          >
            <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Download Resume
          </Button>
        </div>

        <div className="flex justify-center space-x-8 mb-16">
          <a
            href="https://github.com/imbiber"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
          >
            <Github className="h-8 w-8" />
          </a>
          <a
            href="https://linkedin.com/in/nishantgaurav19"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
          >
            <Linkedin className="h-8 w-8" />
          </a>
          <a
            href="mailto:ng19nishant@gmail.com"
            className="text-gray-400 hover:text-pink-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
          >
            <Mail className="h-8 w-8" />
          </a>
        </div>

        <button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="animate-bounce text-gray-400 hover:text-purple-400 transition-colors duration-300 group"
        >
          <ChevronDown className="h-10 w-10 mx-auto group-hover:scale-125 transition-transform duration-300" />
        </button>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  )
}
