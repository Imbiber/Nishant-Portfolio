"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, MapPin, TrendingUp, Users, Award } from "lucide-react"

const experience = {
  title: "Member Technical (Internship)",
  company: "Broadridge",
  location: "On-Site",
  duration: "Jan 2025 - Present",
  type: "Internship",
  achievements: [
    {
      title: "Backend Optimization",
      description: "Built and optimized backend services using Node.js, Express, Sequelize, and PostgreSQL",
      impact: "30% improvement in API performance",
      icon: TrendingUp,
    },
    {
      title: "DevOps Implementation",
      description: "Dockerized services and configured monitoring with Prometheus and Grafana",
      impact: "80% reduction in deployment issues",
      icon: Award,
    },
    {
      title: "Full CRUD Development",
      description: "Enabled complete CRUD functionality for employee management systems",
      impact: "Real-time observability achieved",
      icon: Users,
    },
  ],
  technologies: ["Node.js", "Express", "Sequelize", "PostgreSQL", "Docker", "Prometheus", "Grafana"],
}

const positions = [
  {
    title: "Coordinator",
    organization: "Atal Incubation Centre (AIC - SOA Foundation)",
    duration: "Jun 2024- Jun 2025",
    description:
      "Coordinated 400+ students from 50 colleges for Hackathon, Ideathon, and Business Marathon at E-Summit 2024",
    type: "Leadership",
  },
  {
    title: "Core Member - Technical Team",
    organization: "Google Developers Student Club, ITER, SOA University",
    duration: "Sept 2023 - Jan 2025",
    description: "Spearheaded coding culture promotion in college through seminars and workshops (500+ students)",
    type: "Technical",
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Professional{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mx-auto animate-pulse"></div>
        </div>

        {/* Main Experience */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-500 transform hover:scale-[1.02]">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div className="flex items-center mb-4 lg:mb-0">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl mr-6">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{experience.title}</h3>
                    <p className="text-2xl text-purple-400 font-semibold">{experience.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-gray-300 mb-2">
                    <Calendar className="w-5 h-5 mr-2" />
                    {experience.duration}
                  </div>
                  <div className="flex items-center text-gray-300 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    {experience.location}
                  </div>
                  <Badge className="bg-green-600 text-white">{experience.type}</Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {experience.achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={index}
                      className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center mb-4">
                        <Icon className="w-6 h-6 text-purple-400 mr-3 group-hover:scale-110 transition-transform duration-300" />
                        <h4 className="text-white font-semibold">{achievement.title}</h4>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{achievement.description}</p>
                      <Badge variant="outline" className="border-green-400 text-green-400">
                        {achievement.impact}
                      </Badge>
                    </div>
                  )
                })}
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4 text-lg">Technologies Used:</h4>
                <div className="flex flex-wrap gap-3">
                  {experience.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-gray-800/50 text-gray-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 transform hover:scale-110 px-4 py-2"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Positions of Responsibility */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Positions of{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Responsibility
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {positions.map((position, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-500 transform hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-semibold text-white">{position.title}</h4>
                    <Badge
                      variant="outline"
                      className={
                        position.type === "Leadership"
                          ? "border-yellow-400 text-yellow-400"
                          : "border-cyan-400 text-cyan-400"
                      }
                    >
                      {position.type}
                    </Badge>
                  </div>
                  <p className="text-cyan-400 font-medium mb-2">{position.organization}</p>
                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {position.duration}
                  </div>
                  <p className="text-gray-300 leading-relaxed">{position.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
