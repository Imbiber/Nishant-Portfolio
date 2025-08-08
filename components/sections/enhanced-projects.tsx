"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Eye, Calendar, TrendingUp } from "lucide-react"
import type { Project } from "@/types/project"

const projects: Project[] = [
    {
        id: "1",
        title: "Deduct-AI",
        subtitle: "Criminal Investigation App",
        description:
            "Enhanced evidence collection and legal procedure integration app that reduced case processing time by 40% and increased evidence accuracy by 25% through automation.",
        image: "/placeholder.svg?height=300&width=500",
        technologies: ["React", "Node.js", "AI/ML", "MongoDB", "Express"],
        category: "Full Stack",
        featured: true,
        duration: "Dec 2023 - Feb 2024",
        type: "Group Project",
        status: "live",
        popularity: 95,
        dateCreated: "2023-12-01",
        lastUpdated: "2024-02-28",
        tags: ["AI", "Legal Tech", "Automation"],
        impact: {
            processing: "40% faster case processing",
            accuracy: "25% improved evidence accuracy",
            automation: "Full automation pipeline",
        },
        links: {
            github: "#",
            live: "#",
        },
    },
    {
        id: "2",
        title: "Forecastify",
        subtitle: "React Weather App",
        description:
            "Led end-to-end development of a React-based weather app with intuitive UI/UX design, real-time data integration, and custom styling. Successfully deployed on Netlify with 100+ unique users.",
        image: "/placeholder.svg?height=300&width=500",
        technologies: ["React", "JavaScript", "CSS", "Weather API", "Netlify"],
        category: "Frontend",
        featured: true,
        duration: "Aug 2023 - Oct 2023",
        type: "Solo Project",
        status: "live",
        popularity: 85,
        dateCreated: "2023-08-01",
        lastUpdated: "2023-10-31",
        tags: ["Weather", "API", "Real-time"],
        impact: {
            users: "100+ unique users",
            deployment: "Netlify deployment",
            design: "Custom UI/UX",
        },
        links: {
            github: "#",
            live: "#",
        },
    },
    {
        id: "3",
        title: "Recipe Book",
        subtitle: "Recipe Sharing Platform",
        description:
            "A full-stack web application for creating, sharing, and managing recipes. Built with MongoDB Atlas for data storage, GraphQL for API interactions, and React frontend.",
        image: "/placeholder.svg?height=300&width=500",
        technologies: ["React", "GraphQL", "MongoDB Atlas", "Node.js", "Express"],
        category: "Full Stack",
        featured: false,
        duration: "Oct 2024 - Dec 2024",
        type: "Personal Project",
        status: "live",
        popularity: 75,
        dateCreated: "2024-10-01",
        lastUpdated: "2024-12-31",
        tags: ["Food", "Social", "Database"],
        impact: {
            features: "Full CRUD operations",
            api: "GraphQL integration",
            storage: "Cloud database",
        },
        links: {
            github: "#",
            live: "#",
        },
    },
]

const categories = ["All", "Full Stack", "Frontend", "Backend", "AI/ML"]

export default function EnhancedProjects() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)

    const filteredProjects =
        activeCategory === "All"
            ? projects
            : projects.filter((project) => project.category === activeCategory)

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                        Featured{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mx-auto animate-pulse mb-6"></div>
                    <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                        Here are some of my recent projects that showcase my technical skills and problem-solving abilities
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={activeCategory === category ? "default" : "outline"}
                            onClick={() => setActiveCategory(category)}
                            className={`transition-all duration-300 transform hover:scale-105 ${activeCategory === category
                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                                    : "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
                                }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <Card
                            key={project.id}
                            className={`bg-gradient-to-br from-gray-900/50 to-black/50 border backdrop-blur-xl overflow-hidden transition-all duration-500 transform hover:scale-105 group ${project.featured
                                    ? "border-purple-500/50 shadow-2xl shadow-purple-500/20"
                                    : "border-gray-700/50 hover:border-purple-500/30"
                                }`}
                            onMouseEnter={() => setHoveredProject(Number(project.id))}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title}
                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {project.featured && (
                                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                        ⭐ Featured
                                    </Badge>
                                )}
                                {project.type && (
                                    <Badge className="absolute top-4 right-4 bg-black/80 text-white">{project.type}</Badge>
                                )}
                                <div
                                    className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-4 transition-opacity duration-300 ${hoveredProject === Number(project.id) ? "opacity-100" : "opacity-0"
                                        }`}
                                >
                                    {project.links?.live && (
                                        <Button size="sm" variant="secondary" asChild>
                                            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                                                <Eye className="h-4 w-4 mr-2" />
                                                Live Demo
                                            </a>
                                        </Button>
                                    )}
                                    {project.links?.github && (
                                        <Button size="sm" variant="outline" asChild>
                                            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                                <Github className="h-4 w-4 mr-2" />
                                                Code
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                        <p className="text-purple-400 text-sm font-medium">{project.subtitle}</p>
                                    </div>
                                    <Badge variant="secondary" className="bg-gray-800/50 text-gray-300">
                                        {project.category}
                                    </Badge>
                                </div>

                                {project.duration && (
                                    <div className="flex items-center text-gray-400 text-sm mb-4">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {project.duration}
                                    </div>
                                )}

                                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>

                                {/* Impact Metrics */}
                                {project.impact && (
                                    <div className="mb-4">
                                        <h4 className="text-white font-semibold mb-2 text-sm">Impact:</h4>
                                        <div className="space-y-1">
                                            {Object.values(project.impact).slice(0, 3).map((value, index) => (
                                                <div key={index} className="flex items-center text-xs">
                                                    <TrendingUp className="w-3 h-3 mr-2 text-green-400" />
                                                    <span className="text-gray-300">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.slice(0, 4).map((tech) => (
                                        <Badge key={tech} variant="outline" className="border-purple-400/50 text-purple-400 text-xs">
                                            {tech}
                                        </Badge>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                                            +{project.technologies.length - 4}
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    {project.links?.live && (
                                        <Button size="sm" variant="ghost" className="text-purple-400 hover:text-white p-0" asChild>
                                            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                Live Demo
                                            </a>
                                        </Button>
                                    )}
                                    {project.links?.github && (
                                        <Button size="sm" variant="ghost" className="text-purple-400 hover:text-white p-0" asChild>
                                            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                                <Github className="h-4 w-4 mr-2" />
                                                Source
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 bg-transparent transform hover:scale-105 transition-all duration-300"
                    >
                        <Github className="w-5 h-5 mr-2" />
                        View All Projects on GitHub
                    </Button>
                </div>
            </div>
        </section>
    )
}