'use client'

import Link from 'next/link'
import { ArrowRight, Users, Target, Lightbulb, Heart, Award, TrendingUp, Globe, Shield } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We never compromise on security. Every decision we make prioritizes the protection of your data and your customers\' information.'
    },
    {
      icon: Users,
      title: 'Customer Obsessed',
      description: 'Your success is our success. We listen, learn, and iterate based on your feedback to build the platform you need.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Driven',
      description: 'We constantly push boundaries to deliver cutting-edge solutions that keep you ahead of the competition.'
    },
    {
      icon: Heart,
      title: 'Transparency',
      description: 'No hidden fees, no surprises. We believe in honest communication and clear, upfront pricing.'
    }
  ]

  const milestones = [
    { year: '2021', event: 'Founded with a mission to simplify payment processing', highlight: true },
    { year: '2022', event: 'Launched beta with 100 early adopters' },
    { year: '2022', event: 'Achieved PCI DSS Level 1 certification' },
    { year: '2023', event: 'Processed first $10M in transactions' },
    { year: '2023', event: 'Expanded to 50+ countries' },
    { year: '2024', event: 'Reached 10,000+ active businesses', highlight: true },
    { year: '2024', event: 'Processing $127M+ monthly' }
  ]

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Co-Founder & CEO',
      bio: 'Former Stripe engineer with 10+ years in fintech',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Co-Founder & CTO',
      bio: 'Ex-Square architect, distributed systems expert',
      image: '/team/michael.jpg'
    },
    {
      name: 'Emma Watson',
      role: 'VP of Engineering',
      bio: 'Led payment infrastructure at PayPal',
      image: '/team/emma.jpg'
    },
    {
      name: 'David Kim',
      role: 'VP of Product',
      bio: 'Product leader from Adyen and Braintree',
      image: '/team/david.jpg'
    }
  ]

  const investors = [
    'Sequoia Capital',
    'Andreessen Horowitz',
    'Stripe Ventures',
    'Y Combinator'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
              We're Building the Future of Payment Infrastructure
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Founded in 2021 by payment industry veterans, Enclose.AI was born from a simple observation:
              accepting payments online shouldn't require weeks of development or enterprise-level resources.
            </p>
            <p className="text-lg text-gray-600">
              Today, we're proud to power payments for over 10,000 businesses worldwide, processing
              $127M+ monthly with industry-leading reliability and security.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
                <Target className="w-4 h-4 mr-2" />
                Our Mission
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Democratizing Payment Processing
              </h2>
              <p className="text-gray-600 mb-6">
                We believe every business, regardless of size or technical expertise, should have access
                to the same powerful payment infrastructure as industry giants.
              </p>
              <p className="text-gray-600 mb-6">
                Our mission is to remove the complexity, reduce the cost, and accelerate the integration
                of payment processing so businesses can focus on what they do best: serving their customers.
              </p>
              <p className="text-gray-600">
                We're not just building a payment platform; we're enabling dreams, powering innovation,
                and helping businesses grow without limits.
              </p>
            </div>
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">10,000+</div>
                  <p className="text-gray-600 mt-2">Active Businesses</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">$127M+</div>
                  <p className="text-gray-600 mt-2">Processed Monthly</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">195+</div>
                  <p className="text-gray-600 mt-2">Countries</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">99.99%</div>
                  <p className="text-gray-600 mt-2">Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">From startup to industry leader</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"></div>
            {milestones.map((milestone, idx) => (
              <div key={idx} className={`relative flex items-center ${idx % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}>
                <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className={`${milestone.highlight ? 'bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg' : ''}`}>
                    <span className="text-sm font-semibold text-indigo-600">{milestone.year}</span>
                    <p className="text-gray-900 font-medium mt-1">{milestone.event}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-gray-600">Industry veterans with decades of combined experience</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Backed by the Best</h2>
          <p className="text-gray-600 mb-12">Trusted by leading investors in fintech</p>
          <div className="flex flex-wrap justify-center gap-8">
            {investors.map((investor, idx) => (
              <div key={idx} className="px-6 py-3 bg-white rounded-lg shadow-md">
                <span className="text-gray-900 font-medium">{investor}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Us on Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether as a customer, partner, or team member, be part of the payment revolution
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/careers">
              <Button size="lg" variant="outline">
                View Careers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}