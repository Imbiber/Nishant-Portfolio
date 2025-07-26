"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Star, GitBranch, TreePine } from "lucide-react"

const achievements = [
  {
    title: "Vimarsh 5G Hackathon",
    organization: "Ministry of Home Affairs",
    achievement: "Among top 15 nationwide",
    description: "Presented innovative solution at 5G test bed in IIT Madras",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
    badge: "🏆 Top 15",
    year: "2024",
  },
  {
    title: "Google Cloud Jam",
    organization: "Google",
    achievement: "Among top 80 students",
    description: "Won exciting rewards from Google for cloud computing excellence",
    icon: Award,
    color: "from-blue-500 to-cyan-500",
    badge: "☁️ Top 80",
    year: "2024",
  },
  {
    title: "Quine Open Source",
    organization: "Quine",
    achievement: "Bronze Pack Reward",
    description: "Successfully merged 15+ Pull Requests in open source projects",
    icon: GitBranch,
    color: "from-purple-500 to-pink-500",
    badge: "🥉 Bronze",
    year: "2024",
  },
  {
    title: "Hacktoberfest",
    organization: "DigitalOcean & GitHub",
    achievement: "Tree Planted Recognition",
    description: "Acknowledged with one tree planted in appreciation (2023 & 2024)",
    icon: TreePine,
    color: "from-green-500 to-emerald-500",
    badge: "🌳 2 Years",
    year: "2023-2024",
  },
  {
    title: "Social Winter of Code",
    organization: "SWOC",
    achievement: "Top 5% Contributor",
    description: "Won exclusive goodies for being among top contributors",
    icon: Star,
    color: "from-indigo-500 to-purple-500",
    badge: "⭐ Top 5%",
    year: "2024",
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Achievements &{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Recognition
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mx-auto animate-pulse mb-6"></div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Recognition and awards that highlight my dedication to excellence in technology and open source
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50 backdrop-blur-xl hover:border-yellow-500/50 transition-all duration-500 transform hover:scale-105 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge className={`bg-gradient-to-r ${achievement.color} text-white`}>{achievement.badge}</Badge>
                      <p className="text-gray-400 text-xs mt-1">{achievement.year}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{achievement.organization}</p>

                  <div className="mb-4">
                    <Badge variant="outline" className="border-yellow-400 text-yellow-400 mb-2">
                      {achievement.achievement}
                    </Badge>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">{achievement.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">5+</div>
            <div className="text-gray-300">Major Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">15+</div>
            <div className="text-gray-300">Open Source PRs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">2</div>
            <div className="text-gray-300">Years Hacktoberfest</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">Top 5%</div>
            <div className="text-gray-300">SWOC Contributor</div>
          </div>
        </div>
      </div>
    </section>
  )
}
