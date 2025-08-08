// types/project.ts
export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription?: string
  category: 'tool' | 'feature' | 'application' | 'library' | 'experiment' | 'Full Stack' | 'Frontend' | 'Backend' | 'AI/ML'
  tags: string[]
  technologies: string[]
  status: 'live' | 'beta' | 'development' | 'archived'
  featured: boolean
  popularity: number
  dateCreated: string
  lastUpdated: string
  demoUrl?: string
  githubUrl?: string
  documentationUrl?: string
  videoUrl?: string
  image?: string
  images?: {
    thumbnail: string
    gallery?: string[]
  }
  metrics?: {
    users?: number
    stars?: number
    downloads?: number
    performance?: number
  }
  impact?: {
    processing?: string
    accuracy?: string
    automation?: string
    users?: string
    deployment?: string
    design?: string
    features?: string
    api?: string
    storage?: string
  }
  testimonials?: {
    author: string
    role: string
    content: string
    avatar?: string
  }[]
  links?: {
    github?: string
    live?: string
  }
  duration?: string
  type?: string
}