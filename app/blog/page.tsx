/* Blog Page - Thought Leadership & Industry Insights */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { BookOpen, Calendar, User, Clock, ArrowRight, Search, TrendingUp, Zap, Shield, Globe, Code, DollarSign } from 'lucide-react'
import Logo from '@/components/Logo'

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Articles', count: 24 },
    { id: 'payments', label: 'Payments', count: 8 },
    { id: 'security', label: 'Security', count: 6 },
    { id: 'engineering', label: 'Engineering', count: 5 },
    { id: 'business', label: 'Business Growth', count: 5 },
  ]

  const featuredPost = {
    id: 1,
    title: 'The Future of Payment Processing: AI-Powered Conversions',
    excerpt: 'Discover how artificial intelligence is revolutionizing payment processing and increasing conversion rates by up to 47%. Learn about the latest trends, technologies, and best practices that are shaping the future of digital payments.',
    author: 'Sarah Chen',
    role: 'CEO & Co-founder',
    date: 'January 15, 2024',
    readTime: '8 min read',
    category: 'payments',
    image: '/api/placeholder/800/400',
    tags: ['AI', 'Payments', 'Conversion Optimization'],
  }

  const blogPosts = [
    {
      id: 'pci-compliant-infrastructure',
      title: 'Building a PCI-Compliant Payment Infrastructure from Scratch',
      excerpt: 'A comprehensive guide to achieving PCI DSS Level 1 certification. Learn about security requirements, implementation strategies, and common pitfalls to avoid.',
      author: 'Michael Rodriguez',
      date: 'January 12, 2024',
      readTime: '12 min read',
      category: 'security',
      tags: ['Security', 'Compliance', 'PCI DSS'],
    },
    {
      id: 'how-we-achieved-47ms-api-response-times',
      title: 'How We Achieved 47ms API Response Times at Scale',
      excerpt: 'Deep dive into our infrastructure optimizations that led to industry-leading API performance. From database indexing to edge caching strategies.',
      author: 'Alex Kim',
      date: 'January 10, 2024',
      readTime: '15 min read',
      category: 'engineering',
      tags: ['Performance', 'Infrastructure', 'API'],
    },
    {
      id: 'global-payment-methods-complete-guide',
      title: 'Global Payment Methods: A Complete Guide for 2024',
      excerpt: 'Understanding local payment preferences across 195+ countries. From digital wallets to bank transfers, learn what your customers prefer.',
      author: 'Emma Watson',
      date: 'January 8, 2024',
      readTime: '10 min read',
      category: 'payments',
      tags: ['International', 'Payment Methods', 'Localization'],
    },
    {
      id: 'economics-of-payment-processing',
      title: 'The Economics of Payment Processing: Understanding Fees',
      excerpt: 'Demystifying payment processing fees, interchange rates, and how to optimize your payment stack for maximum profitability.',
      author: 'David Park',
      date: 'January 5, 2024',
      readTime: '7 min read',
      category: 'business',
      tags: ['Pricing', 'Business Strategy', 'Fees'],
    },
    {
      id: 'webhook-security-best-practices',
      title: 'Webhook Security: Best Practices for Payment Notifications',
      excerpt: 'Secure your webhook endpoints against common attacks. Implementation guide with code examples in multiple languages.',
      author: 'Lisa Chen',
      date: 'January 3, 2024',
      readTime: '9 min read',
      category: 'security',
      tags: ['Webhooks', 'Security', 'API'],
    },
    {
      id: 'conversion-rate-optimization',
      title: 'Conversion Rate Optimization for Payment Pages',
      excerpt: 'Data-driven strategies that increased our clients\' conversion rates by an average of 23%. A/B testing insights and implementation tips.',
      author: 'Tom Anderson',
      date: 'December 28, 2023',
      readTime: '11 min read',
      category: 'business',
      tags: ['Conversion', 'Optimization', 'UX'],
    },
    {
      id: 8,
      title: 'Building Real-time Payment Analytics at Scale',
      excerpt: 'How we process millions of events per second to deliver instant analytics. Architecture decisions and technology choices explained.',
      author: 'Rachel Green',
      date: 'December 25, 2023',
      readTime: '14 min read',
      category: 'engineering',
      tags: ['Analytics', 'Real-time', 'Architecture'],
    },
    {
      id: 9,
      title: 'The State of Payment Fraud in 2024: Trends and Prevention',
      excerpt: 'Latest fraud patterns, detection techniques, and prevention strategies. How machine learning is changing the fraud prevention landscape.',
      author: 'James Wilson',
      date: 'December 22, 2023',
      readTime: '13 min read',
      category: 'security',
      tags: ['Fraud', 'Security', 'Machine Learning'],
    },
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const trendingTopics = [
    'AI Payments', 'PCI Compliance', 'API Performance', 'Global Expansion',
    'Fraud Prevention', 'Conversion Optimization', 'Webhook Security', 'Real-time Analytics'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Logo size="md" />
            <div className="hidden md:flex items-center gap-6">
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">Docs</Link>
              <Link href="/blog" className="text-gray-900 font-medium">Blog</Link>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
            <BookOpen className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">Enclose.AI Blog</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Insights & Innovation
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Stay ahead with the latest trends in payment processing, security best practices, and engineering insights
            from the team building the future of digital payments.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-y">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-500 p-12 flex items-center justify-center">
                <div className="text-white">
                  <div className="text-6xl font-bold mb-2">AI</div>
                  <div className="text-xl">Powered Payments</div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="text-sm text-gray-500">{featuredPost.date}</span>
                  <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 hover:text-indigo-600 transition-colors">
                  <Link href="/blog/future-of-payment-processing">{featuredPost.title}</Link>
                </h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                    <div>
                      <div className="font-medium">{featuredPost.author}</div>
                      <div className="text-sm text-gray-500">{featuredPost.role}</div>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href="/blog/future-of-payment-processing">
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="hover:text-indigo-600 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{post.excerpt}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <h3 className="text-xl font-semibold">Trending Topics</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {trendingTopics.map((topic) => (
              <Button key={topic} variant="outline" size="sm" asChild>
                <Link href={`/blog?topic=${topic.toLowerCase().replace(' ', '-')}`}>
                  {topic}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 opacity-90">
            Get the latest insights on payment processing, security updates, and product news delivered to your inbox.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-75">
            Join 10,000+ developers and business leaders. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}