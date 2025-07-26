"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Wrench, Zap } from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Java", level: 95, proficiency: "Proficient" },
      { name: "JavaScript", level: 85, proficiency: "Intermediate" },
      { name: "C", level: 70, proficiency: "Beginner" },
      { name: "C++", level: 70, proficiency: "Beginner" },
      { name: "SQL", level: 88, proficiency: "Proficient" },
    ],
  },
  {
    title: "Web Development",
    icon: Zap,
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "Node.js", level: 92, proficiency: "Expert" },
      { name: "Express.js", level: 90, proficiency: "Expert" },
      { name: "React", level: 85, proficiency: "Proficient" },
      { name: "HTML/CSS", level: 88, proficiency: "Proficient" },
      { name: "GraphQL", level: 80, proficiency: "Intermediate" },
    ],
  },
  {
    title: "Databases & Tools",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "PostgreSQL", level: 90, proficiency: "Expert" },
      { name: "MongoDB", level: 85, proficiency: "Proficient" },
      { name: "Docker", level: 88, proficiency: "Proficient" },
      { name: "Git/GitHub", level: 95, proficiency: "Expert" },
      { name: "Sequelize", level: 85, proficiency: "Proficient" },
    ],
  },
  {
    title: "DevOps & Monitoring",
    icon: Wrench,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Prometheus", level: 80, proficiency: "Intermediate" },
      { name: "Grafana", level: 78, proficiency: "Intermediate" },
      { name: "GitLab CI/CD", level: 75, proficiency: "Intermediate" },
      { name: "Postman", level: 90, proficiency: "Expert" },
      { name: "System Design", level: 82, proficiency: "Proficient" },
    ],
  },
]

const technicalStrengths = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Database Design",
  "API Development",
  "System Architecture",
  "Performance Optimization",
]

const nonTechnicalSkills = [
  "Quality-Focused Programming",
  "Proficient Communication",
  "Team Leadership",
  "Problem Solving",
  "Project Management",
  "Mentoring",
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Skills &{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mx-auto animate-pulse mb-6"></div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Here are the technologies and tools I use to build amazing software solutions
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card
                key={category.title}
                className={`bg-gradient-to-br from-gray-900/50 to-black/50 border backdrop-blur-xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                  activeCategory === index
                    ? "border-purple-500/50 shadow-2xl shadow-purple-500/20"
                    : "border-gray-700/50 hover:border-purple-500/30"
                }`}
                onClick={() => setActiveCategory(index)}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 font-medium">{skill.name}</span>
                          <Badge
                            variant="secondary"
                            className={`bg-gradient-to-r ${category.color} text-white text-xs`}
                          >
                            {skill.proficiency}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Technical Strengths & Non-Technical Skills */}
        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 backdrop-blur-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Code className="w-6 h-6 mr-3 text-purple-400" />
                Technical Strengths
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {technicalStrengths.map((strength) => (
                  <div
                    key={strength}
                    className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {strength}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 backdrop-blur-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-cyan-400" />
                Non-Technical Skills
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {nonTechnicalSkills.map((skill) => (
                  <div
                    key={skill}
                    className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Special Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-white mb-8">
            Special <span className="text-yellow-400">Abilities</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 text-lg">
              ⌨️ Touch Typing: 70+ WPM
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 text-lg">
              ♟️ Chess Player: 1100 Elo
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 text-lg">
              🧩 Puzzle Solver: Sudoku & Rubik's Cube
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
