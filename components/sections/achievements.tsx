"use client"

import * as React from "react"
import Image from "next/image"
import { Trophy, Award, Star, GitBranch, TreePine, Landmark, ArrowLeft, ArrowRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const achievements = [
  {
    title: "Courageous Experimenter Award",
    organization: "Broadridge India",
    achievement: "AI & Digital Assets Innovator",
    description: "Recognized for continuous learning, trying new ideas, and stepping out of comfort zones while building AI-driven solutions in the digital assets space to improve efficiency.",
    icon: Award,
    color: "from-rose-500 to-red-600",
    badge: "🥇 Broadridge",
    year: "2026",
    image: "/images/achievements/courageous_experimenter.jpeg",
  },
  {
    title: "Vimarsh 5G Hackathon",
    organization: "Ministry of Home Affairs",
    achievement: "Among top 15 nationwide",
    description: "Presented innovative solution at 5G test bed in IIT Madras",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
    badge: "🏆 Top 15",
    year: "2024",
    image: "/images/achievements/vimarsh5g.jpg",
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
    image: "/images/achievements/google_cloud.jpg",
  },
  {
    title: "Quine Open Source",
    organization: "Quine",
    achievement: "Bronze Pack Reward",
    description: "Successfully merged 20+ PRs in open source projects",
    icon: GitBranch,
    color: "from-purple-500 to-pink-500",
    badge: "🥉 Bronze",
    year: "2024",
    image: "/images/achievements/Quine.jpg",
  },
  {
    title: "Hacktoberfest Contribution",
    organization: "DigitalOcean & GitHub",
    achievement: "Open Source Contributor",
    description: "Participated and completed the global open-source challenge, contributing to multiple repositories.",
    icon: TreePine,
    color: "from-orange-500 to-red-500",
    badge: "💻 Contributor",
    year: "2023-2025",
    image: "/images/achievements/hacktoberfest.jpg",
  },
  {
    title: "Hacktoberfest Recognition",
    organization: "DigitalOcean & GitHub",
    achievement: "Tree Planted Recognition",
    description: "Acknowledged with one tree planted in appreciation of sustainable open-source contributions.",
    icon: TreePine,
    color: "from-green-500 to-emerald-500",
    badge: "🌳 3 Years",
    year: "2023-2025",
    image: "/images/achievements/tree-certificate.jpg",
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
    image: "/images/achievements/swoc.jpeg",
  },
]

export default function Achievements() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  React.useEffect(() => {
    if (!api || isHovered) return
    const intervalId = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 5000)
    return () => clearInterval(intervalId)
  }, [api, isHovered])

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Achievements &{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Recognition
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mx-auto animate-pulse mb-6"></div>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-light text-center">
            Highlighting key milestones and honors from hackathons, open source contributions, and global programs.
          </p>
        </div>

        {/* Carousel Container - wider max-w-7xl */}
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <CarouselItem key={index} className="basis-full">
                    {/* Glassmorphic split-screen card */}
                    <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-gray-950/40 group shadow-2xl flex flex-col md:flex-row md:h-[540px] transition-all duration-300">
                      
                      {/* Blurred Image Background behind the whole card */}
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={achievement.image}
                          alt=""
                          fill
                          className="object-cover blur-3xl opacity-10 scale-105 select-none pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-black/70" />
                      </div>

                      {/* Left Side: Information Content */}
                      <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-between p-6 sm:p-10 md:p-12 order-2 md:order-1 h-auto md:h-full">
                        {/* Top Metadata row */}
                        <div className="flex items-center justify-between md:justify-start gap-4">
                          <div className={`p-3 rounded-2xl bg-gradient-to-r ${achievement.color} shadow-lg shadow-black/25 border border-white/10`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-white/5 border border-white/10 text-gray-300">
                              {achievement.year}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${achievement.color} text-white shadow-md`}>
                              {achievement.badge}
                            </span>
                          </div>
                        </div>

                        {/* Text details */}
                        <div className="space-y-4 mt-8 md:mt-0 flex-1 flex flex-col justify-center">
                          <span className="text-yellow-400 font-semibold tracking-wider text-xs sm:text-sm uppercase flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                            {achievement.achievement}
                          </span>
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight font-sans tracking-tight">
                            {achievement.title}
                          </h3>
                          <p className="text-gray-300 text-sm font-medium flex items-center gap-1.5">
                            <Landmark className="w-4 h-4 text-gray-400" />
                            {achievement.organization}
                          </p>
                          <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed max-w-xl pt-2">
                            {achievement.description}
                          </p>
                        </div>
                      </div>

                      {/* Right Side: Photo Showcase Frame */}
                      <div className="relative z-10 w-full md:w-1/2 p-4 sm:p-6 md:p-8 order-1 md:order-2 h-[280px] sm:h-[380px] md:h-full flex items-center justify-center">
                        <div className="relative w-full h-full bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden p-4 flex items-center justify-center group-hover:border-white/10 transition-all duration-300 shadow-inner">
                          {/* Inside-frame blurred fallback background */}
                          <Image
                            src={achievement.image}
                            alt=""
                            fill
                            className="object-cover blur-2xl opacity-15 select-none pointer-events-none"
                          />
                          {/* Sharp Certificate/Photo */}
                          <div className="relative w-full h-full">
                            <Image
                              src={achievement.image}
                              alt={achievement.title}
                              fill
                              className="object-contain rounded-lg transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                              priority={index === 0}
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>

            {/* Custom Interactive Controls */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-2 sm:px-6">
              <button
                onClick={() => {
                  if (api) {
                    if (api.canScrollPrev()) {
                      api.scrollPrev()
                    } else {
                      api.scrollTo(api.scrollSnapList().length - 1)
                    }
                  }
                }}
                className="pointer-events-auto h-12 w-12 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-95 group shadow-lg"
                aria-label="Previous Slide"
              >
                <ArrowLeft className="h-6 w-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => {
                  if (api) {
                    if (api.canScrollNext()) {
                      api.scrollNext()
                    } else {
                      api.scrollTo(0)
                    }
                  }
                }}
                className="pointer-events-auto h-12 w-12 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-95 group shadow-lg"
                aria-label="Next Slide"
              >
                <ArrowRight className="h-6 w-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </Carousel>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  current === index ? "bg-yellow-400 w-8" : "bg-gray-700 hover:bg-gray-500"
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {[
            { value: "5+", label: "Major Achievements", color: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5" },
            { value: "40+", label: "Open Source PRs", color: "text-green-400 border-green-500/20 bg-green-500/5" },
            { value: "2", label: "Years Hacktoberfest", color: "text-blue-400 border-blue-500/20 bg-blue-500/5" },
            { value: "Top 5%", label: "SWOC Contributor", color: "text-purple-400 border-purple-500/20 bg-purple-500/5" }
          ].map((stat, i) => (
            <div
              key={i}
              className={cn(
                "p-6 rounded-2xl border backdrop-blur-md text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.02]",
                stat.color
              )}
            >
              <div className="text-3xl sm:text-4xl font-extrabold mb-1 drop-shadow">{stat.value}</div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
