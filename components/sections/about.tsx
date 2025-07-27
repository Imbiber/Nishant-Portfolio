"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, MapPin, Calendar, Coffee, Gamepad2 } from "lucide-react"

const interests = [
  "Open Source 🚀",
  "Chess ♟️ (1100 Elo)",
  "Sudoku 🧩",
  "Rubik's Cube 🎲",
  "Touch Typing ⌨️ (70+ WPM)",
  "Competitive Programming 💻",
  "System Design 🏗️",
  "DevOps ⚙️",
]

const education = [
  {
    degree: "B.Tech - CSIT Engineering",
    institution: "ITER, SOA University",
    cgpa: "9.17",
    year: "2021 - 2025",
    status: "Completed",
  },
  {
    degree: "Senior Secondary",
    institution: "Guru Nanak Hr. Sec. School Ranchi - CBSE",
    cgpa: "81.6%",
    year: "2020",
    status: "Completed",
  },
  {
    degree: "Higher Secondary",
    institution: "Guru Nanak Hr. Sec. School Ranchi - CBSE",
    cgpa: "94.67%",
    year: "2018",
    status: "Completed",
  },
]

export default function About() {
  const [hoveredInterest, setHoveredInterest] = useState<string | null>(null)

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mx-auto animate-pulse"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-500 group">
              <CardContent className="p-8">
                <h3 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <Coffee className="w-8 h-8 mr-3 text-purple-400" />
                  My Journey
                </h3>
                <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>

                <p className="text-gray-300 leading-relaxed mb-4 text-lg">
                  I'm a passionate <span className="text-purple-400 font-semibold">Software Developer</span> currently working at{" "}
                  <span className="text-cyan-400 font-semibold">Broadridge</span> in the{" "}
                  <span className="text-purple-400 font-semibold">Digital Asset and Solution (DAS)</span> team, where we provide
                  end-to-end solutions for managing digital assets like <span className="text-yellow-400 font-semibold">crypto</span>,
                  tokenized securities, and blockchain-based services.
                </p>


                <p className="text-gray-300 leading-relaxed mb-4 text-lg">
                  I love turning complex problems into clean, efficient solutions — whether it's improving performance, building APIs, or
                  scaling backend infrastructure. Clean code and thoughtful design are at the core of my engineering approach.
                </p>

                <p className="text-gray-300 leading-relaxed text-lg">
                  Outside of work, you'll find me solving chess puzzles, contributing to open-source, or speed-typing at{" "}
                  <span className="text-yellow-400 font-semibold">70+ WPM</span>. I’m a lifelong learner, always curious and excited about what’s next in tech.
                </p>

              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-500">
              <CardContent className="p-8">
                <h3 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <Gamepad2 className="w-8 h-8 mr-3 text-pink-400" />
                  Interests & Hobbies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="secondary"
                      className={`bg-gray-800/50 text-gray-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-110 text-sm py-2 px-4 ${hoveredInterest === interest
                        ? "scale-110 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : ""
                        }`}
                      onMouseEnter={() => setHoveredInterest(interest)}
                      onMouseLeave={() => setHoveredInterest(null)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-500">
              <CardContent className="p-8">
                <h3 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <MapPin className="w-8 h-8 mr-3 text-cyan-400" />
                  Quick Facts
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                    <span className="text-gray-300 text-lg">Current Role</span>
                    <span className="text-purple-400 font-semibold">Software Devloper @ Broadridge</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                    <span className="text-gray-300 text-lg">Location</span>
                    <span className="text-cyan-400 font-semibold">Bangalore, India</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                    <span className="text-gray-300 text-lg">Batch</span>
                    <span className="text-yellow-400 font-semibold">CSIT</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                    <span className="text-gray-300 text-lg">CGPA</span>
                    <span className="text-green-400 font-bold text-xl">9.17 / 10</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                    <span className="text-gray-300 text-lg">Graduation Year</span>
                    <span className="text-yellow-400 font-semibold">2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-500">
              <CardContent className="p-8">
                <h3 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <GraduationCap className="w-8 h-8 mr-3 text-green-400" />
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-800/30 rounded-xl border-l-4 border-purple-500 hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-semibold text-lg">{edu.degree}</h4>
                        <Badge
                          variant={edu.status === "Current" ? "default" : "secondary"}
                          className={edu.status === "Completed" ? "bg-green-600 text-white" : "bg-gray-600 text-gray-200"}
                        >
                          {edu.status}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{edu.institution}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-400 font-semibold">{edu.cgpa}</span>
                        <span className="text-gray-400 text-sm flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {edu.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
