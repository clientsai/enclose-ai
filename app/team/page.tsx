import { Users, Award, Code, Shield, Zap, Globe, Heart, Building, Target, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function TeamPage() {
  const teamValues = [
    {
      title: 'Engineering Excellence',
      description: 'Our engineering team brings decades of experience from leading technology companies, building scalable payment infrastructure that powers businesses worldwide.',
      icon: <Code className="h-8 w-8 text-blue-500" />,
      highlights: ['Former engineers from Stripe, Google, and AWS', 'Expertise in distributed systems and real-time processing', 'Built payment systems handling billions in transactions']
    },
    {
      title: 'Product Innovation',
      description: 'Our product team combines deep payment industry knowledge with cutting-edge AI and machine learning to create solutions that drive real business results.',
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      highlights: ['AI-powered conversion optimization', 'Real-time analytics and insights', 'Seamless integration with existing workflows']
    },
    {
      title: 'Security & Compliance',
      description: 'Security is at the core of everything we build. Our team ensures bank-grade security and compliance with global standards.',
      icon: <Shield className="h-8 w-8 text-green-500" />,
      highlights: ['PCI DSS Level 1 certified', 'SOC 2 Type II compliant', 'GDPR and global privacy standards']
    },
    {
      title: 'Customer Success',
      description: 'Our customer success team works closely with businesses to ensure they get maximum value from our platform and achieve their growth goals.',
      icon: <Target className="h-8 w-8 text-purple-500" />,
      highlights: ['Dedicated customer success managers', '24/7 technical support', 'Custom integration assistance']
    }
  ]

  const teamStats = [
    { label: 'Team Members', value: '50+', description: 'Across engineering, product, and operations' },
    { label: 'Years Experience', value: '200+', description: 'Combined experience in payments and fintech' },
    { label: 'Countries', value: '15+', description: 'Remote-first team across multiple time zones' },
    { label: 'Companies', value: '50+', description: 'Former employees of leading tech companies' }
  ]

  const openPositions = [
    {
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build the next generation of payment infrastructure with React, Node.js, and modern cloud technologies.'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Shape the future of payment processing by leading product strategy and working with our engineering team.'
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help our customers succeed by providing technical support and strategic guidance on payment optimization.'
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Scale our infrastructure to handle millions of transactions with high availability and security.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're a team of passionate engineers, product managers, and industry experts 
            building the future of payment processing. Our diverse backgrounds and shared 
            commitment to excellence drive everything we do.
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {teamStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Team Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Drives Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {teamValues.map((value) => (
              <Card key={value.title} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    {value.icon}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600 mb-4">{value.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {value.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full flex-shrink-0"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Join Our Team</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {openPositions.map((position) => (
              <Card key={position.title} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{position.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{position.description}</p>
                  <Button variant="outline" className="w-full">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Culture Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Culture</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mission-Driven</h3>
              <p className="text-gray-600">
                We're passionate about democratizing access to payment infrastructure 
                and helping businesses grow through better payment experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Remote-First</h3>
              <p className="text-gray-600">
                We believe in the power of remote work and have built a culture 
                that supports distributed teams across multiple time zones.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We maintain the highest standards in everything we do, from code 
                quality to customer support, ensuring exceptional experiences.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for 
            building exceptional payment experiences. Explore our open positions 
            and join our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100">
              View All Positions
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Learn About Our Culture
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}