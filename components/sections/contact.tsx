"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, MessageCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })

    alert("Thank you for your message! I'll get back to you soon.")
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ng19nishant@gmail.com",
      href: "mailto:ng19nishant@gmail.com",
      color: "text-purple-400",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-8789830828",
      href: "tel:+918789830828",
      color: "text-green-400",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bhubaneswar, India",
      href: "#",
      color: "text-cyan-400",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/imbiber",
      label: "GitHub",
      color: "hover:text-purple-400",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/nishantgaurav19",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: ExternalLink,
      href: "https://leetcode.com/imbiber/",
      label: "LeetCode",
      color: "hover:text-yellow-400",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Let's{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mx-auto animate-pulse mb-6"></div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Have an exciting project in mind or want to collaborate? I'm always open to discussing new opportunities and
            innovative ideas!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 backdrop-blur-xl">
              <CardContent className="p-8">
                <h3 className="text-3xl font-semibold text-white mb-6 flex items-center">
                  <MessageCircle className="w-8 h-8 mr-3 text-purple-400" />
                  Get In Touch
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  I'm currently working as a Software Devloper at{" "}
                  <span className="text-purple-400 font-semibold">Broadridge</span> and always excited to discuss new
                  opportunities, collaborate on interesting projects, or just have a tech chat!
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info) => {
                    const Icon = info.icon
                    return (
                      <div key={info.label} className="flex items-center space-x-4 group">
                        <div className="bg-gray-800/50 p-4 rounded-xl group-hover:bg-purple-600/20 transition-all duration-300">
                          <Icon className={`h-6 w-6 ${info.color}`} />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{info.label}</p>
                          <a
                            href={info.href}
                            className={`text-white ${info.color} transition-colors duration-300 text-lg font-medium`}
                          >
                            {info.value}
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h4 className="text-xl font-semibold text-white mb-6">Connect With Me</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`bg-gray-800/50 p-4 rounded-xl text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 hover:bg-purple-600/20`}
                          aria-label={social.label}
                        >
                          <Icon className="h-6 w-6" />
                        </a>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl border border-purple-500/20">
                  <h4 className="text-white font-semibold mb-2">Currently Available For:</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Full-time opportunities</li>
                    <li>• Freelance projects</li>
                    <li>• Open source collaborations</li>
                    <li>• Technical mentoring</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 backdrop-blur-xl">
            <CardContent className="p-8">
              <h3 className="text-3xl font-semibold text-white mb-6 flex items-center">
                <Send className="w-8 h-8 mr-3 text-purple-400" />
                Send Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-3" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
