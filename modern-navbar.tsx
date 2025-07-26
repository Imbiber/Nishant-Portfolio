"use client"

import { useState } from "react"
import { Home, User, MessageCircle, Camera, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ModernNavbar() {
  const [activeItem, setActiveItem] = useState("message")

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "message", icon: MessageCircle, label: "Message", isCenter: true },
    { id: "camera", icon: Camera, label: "Camera" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 border border-cyan-500/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-80 h-80 border border-cyan-500/10 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 border border-cyan-500/20 rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="text-white text-sm">@codewith_muhilan</span>
          </div>
          <div className="border-l-4 border-cyan-400 pl-6">
            <h1 className="text-4xl font-bold text-cyan-400 mb-2">Modern Navbar</h1>
            <p className="text-gray-300 text-lg">Toggle Bar</p>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="relative">
          <div className="bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-2xl p-1 shadow-2xl shadow-cyan-500/25">
            <div className="bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-2xl">
              <ul className="flex items-center justify-between px-4 py-3 relative">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.id

                  if (item.isCenter) {
                    return (
                      <li key={item.id} className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setActiveItem(item.id)}
                          className={`
                            relative w-14 h-14 rounded-full transition-all duration-300 transform
                            ${
                              isActive
                                ? "bg-gray-900 text-cyan-400 scale-110 shadow-lg"
                                : "bg-gray-800/50 text-gray-900 hover:bg-gray-800 hover:scale-105"
                            }
                          `}
                        >
                          <Icon className="w-6 h-6" />
                          <span className="sr-only">{item.label}</span>
                        </Button>
                        {isActive && (
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                            <span className="text-xs text-gray-900 font-medium">{item.label}</span>
                          </div>
                        )}
                      </li>
                    )
                  }

                  return (
                    <li key={item.id}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setActiveItem(item.id)}
                        className={`
                          w-12 h-12 rounded-xl transition-all duration-300
                          ${
                            isActive
                              ? "bg-gray-900/20 text-gray-900 scale-105"
                              : "text-gray-900/70 hover:bg-gray-900/10 hover:text-gray-900"
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="sr-only">{item.label}</span>
                      </Button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Active indicator */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </nav>

        {/* Demo content */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Active: <span className="text-cyan-400 font-medium capitalize">{activeItem}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
