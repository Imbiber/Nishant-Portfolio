"use client"

import { Badge } from "@/components/ui/badge"
import { ExternalLink, GitFork, Star, Code, Trophy, Zap } from "lucide-react"
import Image from "next/image"

export default function HolopinBadges() {
  return (
    <section id="open-source-badges" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Innovative Banner Header */}
        <div className="relative mb-20">
          {/* Floating Badge Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 animate-float">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute top-20 right-20 animate-float-delayed">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="absolute bottom-10 left-20 animate-float-slow">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <Code className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="absolute bottom-20 right-10 animate-float-fast">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Main Banner */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 max-w-20"></div>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-lg font-bold animate-pulse">
                🏆 EXCLUSIVE BADGES
              </Badge>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 max-w-20"></div>
            </div>
            
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6 relative">
              <span className="relative z-10">OPEN SOURCE</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient-x">
                OPEN SOURCE
              </div>
            </h2>
            
            <div className="relative mb-8">
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Achievement Collection
              </h3>
              <div className="absolute inset-0 text-3xl sm:text-4xl font-bold text-purple-400/20 blur-sm">
                Achievement Collection
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Banner Display */}
        <div className="relative mb-16">
          {/* Glowing Border Container */}
          <div className="relative p-1 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient-x">
            <div className="bg-black rounded-3xl p-8 relative overflow-hidden">
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 rounded-3xl"></div>
              
              {/* Scanline Animation */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/10 to-transparent h-full w-full transform translate-y-full animate-scan-line rounded-3xl"></div>
              
              {/* Badge Banner Content */}
              <div className="relative z-10">
                {/* Top Banner Stats */}
                <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-spin-slow">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white">Holopin Badge Collection</h4>
                      <p className="text-purple-300">Exclusive Open Source Achievements</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-black text-yellow-400">20+</div>
                      <div className="text-xs text-gray-400">BADGES</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-green-400">2023-PRESENT</div>
                      <div className="text-xs text-gray-400">ACTIVE</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-blue-400">SUPER CONTRIBUTOR</div>
                      <div className="text-xs text-gray-400">RANK</div>
                    </div>
                  </div>
                </div>

                {/* Interactive Badge Showcase */}
                <div className="relative group">
                  <a 
                    href="https://holopin.io/@imbiber" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block relative"
                  >
                    {/* Badge Board Container */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/80 p-6 border border-gray-600/30 backdrop-blur-xl group-hover:border-purple-400/50 transition-all duration-500">
                      {/* Spotlight Effect */}
                      <div className="absolute inset-0 bg-gradient-radial from-purple-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                      
                      {/* Badge Image */}
                      <div className="relative z-10">
                        <Image
                          src="https://holopin.me/imbiber"
                          alt="Nishant's Holopin badges showcasing open source contributions"
                          width={1000}
                          height={500}
                          className="w-full h-auto transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 rounded-xl"
                          priority
                        />
                        
                        {/* Interactive Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl flex items-end justify-center pb-8">
                          <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex items-center gap-3 bg-purple-600/90 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg">
                              <ExternalLink className="w-6 h-6" />
                              <span>Explore Full Collection</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Action Indicators */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                  </a>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex flex-wrap justify-center gap-6 mt-8">
                  <a
                    href="https://holopin.io/@imbiber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                  >
                    <Star className="w-6 h-6 group-hover/btn:animate-spin" />
                    <span>View Holopin Profile</span>
                  </a>
                  <a
                    href="https://github.com/imbiber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-gray-400"
                  >
                    <GitFork className="w-6 h-6 group-hover/btn:animate-pulse" />
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute -top-6 -left-6 w-12 h-12 border-l-4 border-t-4 border-purple-400 rounded-tl-lg"></div>
          <div className="absolute -top-6 -right-6 w-12 h-12 border-r-4 border-t-4 border-pink-400 rounded-tr-lg"></div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 border-l-4 border-b-4 border-blue-400 rounded-bl-lg"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 border-r-4 border-b-4 border-orange-400 rounded-br-lg"></div>
        </div>
      </div>

      {/* Custom Animations Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scan-line {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 15s ease infinite; background-size: 400% 400%; }
        .animate-scan-line { animation: scan-line 8s linear infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
      `}</style>
    </section>
  )
}