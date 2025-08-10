"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={scrollToTop}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-full shadow-2xl shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 hover:shadow-purple-500/40"
            size="icon"
          >
            <ArrowUp className="h-5 w-5 group-hover:animate-bounce" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}