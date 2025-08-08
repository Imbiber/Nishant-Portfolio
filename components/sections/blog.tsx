// components/sections/blog.tsx
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    BookOpen, Clock, Eye, Heart, MessageSquare, Share2,
    Bookmark, TrendingUp, Code, Lightbulb, Zap, Coffee,
    Video, FileText, Hash, Calendar, User, ArrowRight
} from "lucide-react"
import { motion } from "framer-motion"

interface BlogPost {
    id: string
    title: string
    excerpt: string
    content: string
    category: 'tutorial' | 'tool-launch' | 'case-study' | 'tech-talk' | 'update'
    tags: string[]
    author: {
        name: string
        avatar: string
        role: string
    }
    publishedAt: string
    readTime: number
    views: number
    likes: number
    comments: number
    featured: boolean
    coverImage: string
    codeSnippet?: string
    videoUrl?: string
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
}

const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "Building a Real-time Collaboration Tool with WebRTC",
        excerpt: "Learn how I built a powerful collaboration tool that allows real-time code sharing and video conferencing using WebRTC and Socket.io",
        content: "Full content here...",
        category: "tutorial",
        tags: ["WebRTC", "Socket.io", "React", "Real-time"],
        author: {
            name: "Nishant Gaurav",
            avatar: "/placeholder.svg",
            role: "Software Developer"
        },
        publishedAt: "2025-01-15",
        readTime: 8,
        views: 2450,
        likes: 189,
        comments: 23,
        featured: true,
        coverImage: "/placeholder.svg",
        difficulty: "advanced",
        codeSnippet: `// WebRTC Connection Setup
const pc = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
});

// Handle ICE candidates
pc.onicecandidate = (event) => {
  if (event.candidate) {
    socket.emit('ice-candidate', event.candidate);
  }
};`
    },
    {
        id: "2",
        title: "Introducing AI Code Review Assistant - My Latest Tool",
        excerpt: "Announcing my new VS Code extension that uses AI to review your code, suggest improvements, and catch potential bugs before they happen",
        content: "Full content here...",
        category: "tool-launch",
        tags: ["AI", "VS Code", "Developer Tools", "Launch"],
        author: {
            name: "Nishant Gaurav",
            avatar: "/placeholder.svg",
            role: "Software Developer"
        },
        publishedAt: "2025-01-14",
        readTime: 5,
        views: 3890,
        likes: 267,
        comments: 45,
        featured: true,
        coverImage: "/placeholder.svg",
        videoUrl: "https://youtube.com/watch?v=demo"
    }
]

export default function BlogSection() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set())

    const categories = ["all", "tutorial", "tool-launch", "case-study", "tech-talk", "update"]

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const toggleBookmark = (postId: string) => {
        setBookmarkedPosts(prev => {
            const newSet = new Set(prev)
            if (newSet.has(postId)) {
                newSet.delete(postId)
            } else {
                newSet.add(postId)
            }
            return newSet
        })
    }

    return (
        <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900/50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge className="mb-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                            <Zap className="w-3 h-3 mr-1" />
                            Daily Insights
                        </Badge>
                        <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                            Blog & <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                Tutorials
                            </span>
                        </h2>
                        <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                            Deep dives into my daily tools, technical tutorials, and insights from building
                            innovative solutions
                        </p>
                    </motion.div>
                </div>

                {/* Featured Posts Carousel */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="grid lg:grid-cols-2 gap-8">
                        {blogPosts.filter(p => p.featured).map((post, index) => (
                            <Card
                                key={post.id}
                                className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-green-500/20 backdrop-blur-xl overflow-hidden group hover:border-green-500/40 transition-all duration-500"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                                    {/* Featured Badge */}
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600">
                                            <TrendingUp className="w-3 h-3 mr-1" />
                                            Featured
                                        </Badge>
                                    </div>

                                    {/* Category & Difficulty */}
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <Badge variant="secondary" className="bg-black/50 backdrop-blur">
                                            {post.category}
                                        </Badge>
                                        {post.difficulty && (
                                            <Badge
                                                variant="secondary"
                                                className={`bg-black/50 backdrop-blur ${post.difficulty === 'beginner' ? 'text-green-400' :
                                                        post.difficulty === 'intermediate' ? 'text-yellow-400' :
                                                            'text-red-400'
                                                    }`}
                                            >
                                                {post.difficulty}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Title Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-300">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {post.readTime} min read
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                {post.views.toLocaleString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MessageSquare className="w-4 h-4" />
                                                {post.comments}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.slice(0, 3).map(tag => (
                                            <Badge key={tag} variant="outline" className="border-green-400/50 text-green-400 text-xs">
                                                <Hash className="w-3 h-3 mr-1" />
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Code Preview (if tutorial) */}
                                    {post.codeSnippet && (
                                        <div className="mb-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Code className="w-3 h-3" />
                                                    Code Preview
                                                </span>
                                                <Button size="sm" variant="ghost" className="text-xs text-purple-400">
                                                    Copy
                                                </Button>
                                            </div>
                                            <pre className="text-xs text-gray-300 overflow-x-auto">
                                                <code>{post.codeSnippet.slice(0, 150)}...</code>
                                            </pre>
                                        </div>
                                    )}

                                    {/* Author Info */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                className="w-10 h-10 rounded-full border-2 border-green-400/50"
                                            />
                                            <div>
                                                <p className="text-white font-medium text-sm">{post.author.name}</p>
                                                <p className="text-gray-400 text-xs">{post.author.role}</p>
                                            </div>
                                        </div>
                                        <span className="text-gray-400 text-xs flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(post.publishedAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-gray-400 hover:text-red-400"
                                            >
                                                <Heart className="w-4 h-4 mr-1" />
                                                {post.likes}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-gray-400 hover:text-blue-400"
                                                onClick={() => toggleBookmark(post.id)}
                                            >
                                                <Bookmark
                                                    className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? 'fill-blue-400 text-blue-400' : ''}`}
                                                />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-gray-400 hover:text-green-400"
                                            >
                                                <Share2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                        >
                                            Read More
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Newsletter Subscription */}
                <motion.div
                    className="mb-12 p-8 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl border border-green-500/20 backdrop-blur-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="text-center">
                        <Coffee className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Get Daily Tool Updates
                        </h3>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                            Subscribe to receive notifications whenever I publish a new tool, feature, or tutorial.
                            Join 5,000+ developers staying ahead of the curve.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800/50 border-gray-700 text-white"
                            />
                            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                                Subscribe
                            </Button>
                        </div>
                        <p className="text-gray-500 text-xs mt-4">
                            No spam, unsubscribe anytime. I respect your inbox.
                        </p>
                    </div>
                </motion.div>

                {/* Categories Filter */}
                <div className="mb-8 flex flex-wrap gap-3 justify-center">
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            onClick={() => setSelectedCategory(cat)}
                            className={selectedCategory === cat
                                ? "bg-gradient-to-r from-green-600 to-emerald-600"
                                : "border-green-400/50 text-green-400 hover:bg-green-400/10"}
                        >
                            {cat === 'all' ? 'All Posts' : cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </Button>
                    ))}
                </div>

                {/* Recent Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.slice(2).map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50 backdrop-blur-xl hover:border-green-500/30 transition-all duration-500 h-full flex flex-col">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {post.videoUrl && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <Video className="w-12 h-12 text-white" />
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-4 flex-1 flex flex-col">
                                    <Badge variant="outline" className="w-fit mb-2 border-green-400/50 text-green-400 text-xs">
                                        {post.category}
                                    </Badge>
                                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime} min
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {post.views}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Heart className="w-3 h-3" />
                                            {post.likes}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}