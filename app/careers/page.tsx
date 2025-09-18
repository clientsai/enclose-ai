'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, DollarSign, Users, Heart, Zap, Brain, Shield, Globe, Award, Coffee, Laptop, Star, ChevronRight, Building, Target, TrendingUp, Mail } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const companyValues = [
    {
      icon: Heart,
      title: 'Customer Obsession',
      description: 'We put our customers at the center of everything we do, building products that solve real problems and create genuine value.'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We embrace cutting-edge technology and bold ideas to push the boundaries of what\'s possible in fintech.'
    },
    {
      icon: Users,
      title: 'Collaborative Growth',
      description: 'We believe the best results come from diverse teams working together, learning from each other, and growing together.'
    },
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'We maintain the highest standards of security, transparency, and ethical behavior in all our operations.'
    },
    {
      icon: Brain,
      title: 'Continuous Learning',
      description: 'We foster a culture of curiosity and growth, encouraging everyone to expand their skills and knowledge.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'We\'re building technology that democratizes financial services and creates opportunities worldwide.'
    }
  ]

  const benefits = [
    {
      category: 'Health & Wellness',
      items: [
        'Comprehensive health, dental, and vision insurance',
        'Mental health support and counseling services',
        'Wellness stipend for gym memberships and fitness',
        'Annual health and wellness days off'
      ]
    },
    {
      category: 'Financial Benefits',
      items: [
        'Competitive salary with equity participation',
        '401(k) with company matching up to 6%',
        'Performance bonuses and profit sharing',
        'Student loan repayment assistance'
      ]
    },
    {
      category: 'Work-Life Balance',
      items: [
        'Flexible working hours and remote options',
        'Unlimited PTO policy',
        'Parental leave for new parents',
        'Sabbatical opportunities for long-term employees'
      ]
    },
    {
      category: 'Growth & Development',
      items: [
        '$3,000 annual learning and development budget',
        'Conference attendance and speaking opportunities',
        'Internal mentorship and career coaching',
        'Cross-functional project opportunities'
      ]
    },
    {
      category: 'Office & Culture',
      items: [
        'Premium office spaces in major tech hubs',
        'Free meals, snacks, and premium coffee',
        'Latest MacBook Pro and equipment allowance',
        'Team retreats and company events'
      ]
    },
    {
      category: 'Unique Perks',
      items: [
        'Dog-friendly offices',
        'Commuter benefits and parking',
        'Home office setup stipend',
        'Annual company trips and hackathons'
      ]
    }
  ]

  const departments = [
    { id: 'all', name: 'All Departments', count: 47 },
    { id: 'engineering', name: 'Engineering', count: 18 },
    { id: 'product', name: 'Product', count: 8 },
    { id: 'design', name: 'Design', count: 5 },
    { id: 'sales', name: 'Sales', count: 6 },
    { id: 'marketing', name: 'Marketing', count: 4 },
    { id: 'operations', name: 'Operations', count: 6 }
  ]

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'san-francisco', name: 'San Francisco, CA' },
    { id: 'new-york', name: 'New York, NY' },
    { id: 'london', name: 'London, UK' },
    { id: 'singapore', name: 'Singapore' },
    { id: 'remote', name: 'Remote' }
  ]

  const openPositions = [
    {
      title: 'Senior Full-Stack Engineer',
      department: 'engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      level: 'Senior',
      salary: '$180k - $220k',
      description: 'Join our core platform team to build scalable payment infrastructure that processes billions in transactions.',
      requirements: ['5+ years experience with React, Node.js', 'Experience with microservices architecture', 'Payment systems experience preferred'],
      posted: '2 days ago'
    },
    {
      title: 'Product Manager - Fraud Detection',
      department: 'product',
      location: 'Remote',
      type: 'Full-time',
      level: 'Senior',
      salary: '$160k - $190k',
      description: 'Lead the development of next-generation fraud detection and risk management products.',
      requirements: ['7+ years product management experience', 'Background in fraud/risk management', 'Data-driven approach to product decisions'],
      posted: '1 week ago'
    },
    {
      title: 'Senior UX Designer',
      department: 'design',
      location: 'New York, NY',
      type: 'Full-time',
      level: 'Senior',
      salary: '$140k - $170k',
      description: 'Design beautiful, intuitive experiences for our merchant dashboard and payment flows.',
      requirements: ['5+ years UX design experience', 'Portfolio showcasing complex B2B products', 'Experience with design systems'],
      posted: '3 days ago'
    },
    {
      title: 'Enterprise Sales Manager',
      department: 'sales',
      location: 'London, UK',
      type: 'Full-time',
      level: 'Mid-Senior',
      salary: '£80k - £120k + commission',
      description: 'Drive revenue growth by selling our payment solutions to enterprise customers across EMEA.',
      requirements: ['5+ years enterprise B2B sales', 'Experience selling to C-level executives', 'Fintech or payments industry knowledge'],
      posted: '5 days ago'
    },
    {
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'Singapore',
      type: 'Full-time',
      level: 'Mid-level',
      salary: 'S$120k - S$150k',
      description: 'Build and maintain the infrastructure that powers our global payment platform.',
      requirements: ['3+ years DevOps/Infrastructure experience', 'Kubernetes and AWS expertise', 'Experience with high-availability systems'],
      posted: '1 week ago'
    },
    {
      title: 'Content Marketing Manager',
      department: 'marketing',
      location: 'Remote',
      type: 'Full-time',
      level: 'Mid-level',
      salary: '$100k - $130k',
      description: 'Create compelling content that educates developers and drives adoption of our platform.',
      requirements: ['4+ years content marketing experience', 'Technical writing for developer audiences', 'B2B SaaS experience preferred'],
      posted: '4 days ago'
    },
    {
      title: 'Junior Software Engineer',
      department: 'engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      level: 'Junior',
      salary: '$120k - $140k',
      description: 'Start your career building mission-critical payment systems with mentorship from senior engineers.',
      requirements: ['Computer Science degree or equivalent', 'Strong programming fundamentals', 'Passion for learning and growth'],
      posted: '1 week ago'
    },
    {
      title: 'Compliance Manager',
      department: 'operations',
      location: 'New York, NY',
      type: 'Full-time',
      level: 'Senior',
      salary: '$130k - $160k',
      description: 'Ensure our platform meets regulatory requirements across global markets.',
      requirements: ['5+ years compliance experience', 'Financial services regulatory knowledge', 'Strong attention to detail'],
      posted: '6 days ago'
    }
  ]

  const teamStats = [
    { label: 'Team Members', value: '150+', icon: Users },
    { label: 'Countries', value: '12', icon: Globe },
    { label: 'Office Locations', value: '4', icon: Building },
    { label: 'Average Tenure', value: '3.2 years', icon: Clock }
  ]

  const companyMetrics = [
    { label: 'Revenue Growth', value: '300%', period: 'YoY', trend: 'up' },
    { label: 'Customer Growth', value: '250%', period: 'YoY', trend: 'up' },
    { label: 'Employee NPS', value: '87', period: 'Score', trend: 'up' },
    { label: 'Glassdoor Rating', value: '4.8', period: '/5.0', trend: 'up' }
  ]

  const filteredPositions = openPositions.filter(position => {
    const departmentMatch = selectedDepartment === 'all' || position.department === selectedDepartment
    const locationMatch = selectedLocation === 'all' ||
      position.location.toLowerCase().includes(selectedLocation.replace('-', ' ')) ||
      (selectedLocation === 'remote' && position.location === 'Remote')
    return departmentMatch && locationMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/">
              <Logo size="md" />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/features" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                Pricing
              </Link>
              <Link href="/docs" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                Docs
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                About
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
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

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
            Build the Future of Payments
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join our mission to democratize financial services and create a more connected world. We're looking for passionate, talented individuals who want to make a real impact.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Learn About Our Culture
            </Button>
          </div>
        </div>
      </section>

      {/* Company Metrics */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyMetrics.map((metric, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-2">
                    <div className="text-3xl font-bold text-indigo-600">{metric.value}</div>
                    <TrendingUp className="h-5 w-5 text-green-500 ml-2" />
                  </div>
                  <div className="text-sm text-gray-500">{metric.period}</div>
                  <div className="text-sm font-medium text-gray-900 mt-1">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Enclose.AI?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're not just building a company – we're building the future of financial technology and creating an environment where exceptional people can do their best work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Global Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamStats.map((stat, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Benefits</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We believe in taking care of our team members with industry-leading benefits and perks that support your personal and professional growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((category, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start text-gray-600">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="pb-16 px-4" id="positions">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our talented team and help shape the future of financial technology. We're always looking for exceptional people.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.count})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredPositions.map((position, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{position.title}</h3>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">
                          {position.level}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {position.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {position.type}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {position.salary}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{position.description}</p>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {position.requirements.map((req, reqIdx) => (
                            <li key={reqIdx}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-xs text-gray-400">
                        Posted {position.posted}
                      </div>
                    </div>

                    <div className="ml-6">
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPositions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No positions found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedDepartment('all')
                  setSelectedLocation('all')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Life at Enclose */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Life at Enclose.AI</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our culture is built on collaboration, innovation, and making a meaningful impact on the world of financial technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Coffee className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Collaborative Environment</h3>
                <p className="text-gray-600 text-sm">
                  Work alongside brilliant minds in an environment that encourages open communication, knowledge sharing, and cross-team collaboration.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Laptop className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Cutting-Edge Technology</h3>
                <p className="text-gray-600 text-sm">
                  Work with the latest technologies and tools while building systems that handle millions of transactions daily with reliability and scale.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Star className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Growth Opportunities</h3>
                <p className="text-gray-600 text-sm">
                  Accelerate your career with mentorship, challenging projects, and the support you need to reach your full potential in a fast-growing company.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Hiring Process</h2>
            <p className="text-xl text-gray-600">
              We've designed our process to be transparent, efficient, and focused on finding the right mutual fit.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Application Review</h3>
              <p className="text-sm text-gray-600">
                We review your application and portfolio to understand your background and experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Initial Interview</h3>
              <p className="text-sm text-gray-600">
                A 30-minute conversation with our recruiting team to discuss your interests and our opportunities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Technical/Domain Interviews</h3>
              <p className="text-sm text-gray-600">
                Role-specific interviews to assess your technical skills and problem-solving approach.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Final Interview</h3>
              <p className="text-sm text-gray-600">
                Meet with team members and leadership to ensure cultural fit and discuss your potential impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our mission to democratize financial services and create technology that powers global commerce.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              View All Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              <Mail className="mr-2 h-5 w-5" />
              careers@enclose.ai
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}