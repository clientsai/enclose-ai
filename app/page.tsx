'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, Zap, Shield, Globe, BarChart3, Code, ArrowRight, CheckCircle } from 'lucide-react'
import Logo from '@/components/Logo'

export default function HomePage() {
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const features = [
    {
      icon: CreditCard,
      title: 'Stripe Payment Links',
      description: 'Create secure payment links instantly with Stripe\'s most reliable API',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Zap,
      title: 'Instant Setup',
      description: 'Connect your Stripe account with OAuth in seconds, no complex configuration',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption for all sensitive data and PCI-compliant infrastructure',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Globe,
      title: 'Global Payments',
      description: 'Accept payments in 135+ currencies from customers worldwide',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track conversions, revenue, and payment performance in real-time',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Code,
      title: 'Clients.AI Integration',
      description: 'Seamless API integration with conversion agents for automated checkout',
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <nav className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Logo size="md" />
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline" className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20 fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Trusted by 10,000+ businesses
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
            Payment Integration for
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Conversion Agents
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect your Stripe account and start accepting payments through Clients.AI conversion agents in minutes.
            Simple, secure, and built for scale.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50">
                View Documentation
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card required • 14-day free trial</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className={`transition-all duration-300 border-gray-200 hover:border-indigo-200 hover:shadow-xl cursor-pointer bg-white/80 backdrop-blur-sm ${
                isHovered === feature.title ? 'scale-105 shadow-2xl' : ''
              }`}
              onMouseEnter={() => setIsHovered(feature.title)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <CardHeader>
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect Stripe</h3>
                <p className="opacity-90">
                  Securely connect your Stripe account with OAuth authentication
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Payment Links</h3>
                <p className="opacity-90">
                  Generate secure payment links for your products and services
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Integrate & Scale</h3>
                <p className="opacity-90">
                  Use our API to integrate payments into Clients.AI agents
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of businesses processing payments seamlessly
          </p>
          <Link href="/register">
            <Button size="lg" className="px-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg">
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t bg-white/70 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Logo size="sm" />
              <span className="ml-4 text-gray-600">© 2024 Enclose.AI. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Privacy
              </Link>
              <Link href="/docs" className="text-gray-600 hover:text-indigo-600 transition-colors">
                API Docs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}