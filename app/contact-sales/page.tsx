'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Users, Building, Globe, Shield, Zap, TrendingUp, CheckCircle, Star, Phone, Mail, MessageSquare, Clock, Award, Target, DollarSign } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'

export default function ContactSalesPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    companySize: '',
    monthlyVolume: '',
    useCase: '',
    timeline: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 2000)
  }

  const enterpriseFeatures = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Advanced security features including SSO, MFA, and role-based access controls.',
      benefits: ['SOC 2 Type II compliant', 'Advanced fraud detection', 'PCI DSS Level 1 certified', 'Custom security controls']
    },
    {
      icon: Zap,
      title: 'High-Volume Processing',
      description: 'Built to handle enterprise-scale transaction volumes with 99.99% uptime.',
      benefits: ['Unlimited transactions', 'Global load balancing', 'Auto-scaling infrastructure', 'Priority processing']
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Priority support with dedicated account management and technical resources.',
      benefits: ['24/7 priority support', 'Dedicated account manager', 'Technical implementation team', 'Custom SLAs available']
    },
    {
      icon: Building,
      title: 'Custom Integration',
      description: 'Tailored integration solutions for complex enterprise requirements.',
      benefits: ['Custom API endpoints', 'White-label solutions', 'Legacy system integration', 'Custom reporting']
    },
    {
      icon: Globe,
      title: 'Global Compliance',
      description: 'Meet regulatory requirements across multiple jurisdictions and markets.',
      benefits: ['Multi-currency support', 'Local payment methods', 'Regional compliance', 'Cross-border settlements']
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Enterprise-grade reporting and analytics for data-driven decision making.',
      benefits: ['Real-time dashboards', 'Custom reporting', 'Data export capabilities', 'Advanced fraud analytics']
    }
  ]

  const companySizes = [
    { value: '1-50', label: '1-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1,000 employees' },
    { value: '1001-5000', label: '1,001-5,000 employees' },
    { value: '5000+', label: '5,000+ employees' }
  ]

  const monthlyVolumes = [
    { value: '10k-100k', label: '$10k - $100k' },
    { value: '100k-1m', label: '$100k - $1M' },
    { value: '1m-10m', label: '$1M - $10M' },
    { value: '10m-100m', label: '$10M - $100M' },
    { value: '100m+', label: '$100M+' }
  ]

  const useCases = [
    { value: 'ecommerce', label: 'E-commerce Platform' },
    { value: 'marketplace', label: 'Marketplace' },
    { value: 'subscription', label: 'Subscription Business' },
    { value: 'saas', label: 'SaaS Platform' },
    { value: 'fintech', label: 'Fintech Application' },
    { value: 'other', label: 'Other' }
  ]

  const timelines = [
    { value: 'immediate', label: 'Immediate (within 1 month)' },
    { value: 'quarter', label: 'This quarter (1-3 months)' },
    { value: 'half-year', label: 'Next 6 months' },
    { value: 'year', label: 'Within a year' },
    { value: 'exploring', label: 'Just exploring options' }
  ]

  const customerLogos = [
    { name: 'TechCorp', logo: '/logos/techcorp.png' },
    { name: 'GlobalRetail', logo: '/logos/globalretail.png' },
    { name: 'FinanceX', logo: '/logos/financex.png' },
    { name: 'MarketPlace', logo: '/logos/marketplace.png' },
    { name: 'CloudSoft', logo: '/logos/cloudsoft.png' },
    { name: 'DataFlow', logo: '/logos/dataflow.png' }
  ]

  const testimonials = [
    {
      quote: "Enclose.AI transformed our payment infrastructure. We've seen a 40% reduction in processing costs and 99.9% uptime since switching.",
      author: "Sarah Johnson",
      title: "CTO, TechCorp",
      company: "Leading SaaS Platform"
    },
    {
      quote: "The enterprise support team helped us integrate seamlessly with our existing systems. Implementation was smooth and faster than expected.",
      author: "Michael Chen",
      title: "Head of Engineering, GlobalRetail",
      company: "Fortune 500 E-commerce"
    },
    {
      quote: "Security and compliance were our top concerns. Enclose.AI exceeded all our requirements and audit standards.",
      author: "Jessica Rodriguez",
      title: "VP of Security, FinanceX",
      company: "Financial Services"
    }
  ]

  const salesTeam = [
    {
      name: 'David Thompson',
      title: 'VP of Enterprise Sales',
      region: 'North America',
      email: 'david.thompson@enclose.ai',
      phone: '+1 (415) 555-0101',
      image: '/team/david.jpg'
    },
    {
      name: 'Emma Clarke',
      title: 'Enterprise Sales Director',
      region: 'EMEA',
      email: 'emma.clarke@enclose.ai',
      phone: '+44 20 5555 0201',
      image: '/team/emma.jpg'
    },
    {
      name: 'Alex Kim',
      title: 'Enterprise Sales Director',
      region: 'APAC',
      email: 'alex.kim@enclose.ai',
      phone: '+65 6555 0301',
      image: '/team/alex.jpg'
    }
  ]

  const pricingBenefits = [
    'Volume-based pricing discounts',
    'Custom contract terms',
    'Dedicated technical resources',
    'Priority feature development',
    'Extended payment terms available',
    'Multi-year discount options'
  ]

  const stats = [
    { value: '99.99%', label: 'Uptime SLA', icon: Shield },
    { value: '<100ms', label: 'API Response Time', icon: Zap },
    { value: '150+', label: 'Currencies Supported', icon: Globe },
    { value: '24/7', label: 'Enterprise Support', icon: Users }
  ]

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
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                Enterprise Payment Solutions
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Unlock the full potential of Enclose.AI with enterprise-grade features, dedicated support, and custom pricing. Built for companies processing millions in payments.
              </p>
              <div className="flex gap-4 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Demo
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Sales: +1 (415) 555-0100
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Contact Enterprise Sales</CardTitle>
                <CardDescription className="text-center">
                  Get custom pricing and a personalized demo
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h3>
                    <p className="text-gray-600 mb-6">
                      An enterprise sales representative will contact you within 2 business hours.
                    </p>
                    <Button onClick={() => {setSubmitted(false); setFormData({firstName: '', lastName: '', email: '', company: '', jobTitle: '', phone: '', companySize: '', monthlyVolume: '', useCase: '', timeline: '', message: ''})}}>
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Size *
                        </label>
                        <select
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.companySize}
                          onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                        >
                          <option value="">Select size</option>
                          {companySizes.map((size) => (
                            <option key={size.value} value={size.value}>{size.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Monthly Payment Volume *
                        </label>
                        <select
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.monthlyVolume}
                          onChange={(e) => setFormData({...formData, monthlyVolume: e.target.value})}
                        >
                          <option value="">Select volume</option>
                          {monthlyVolumes.map((volume) => (
                            <option key={volume.value} value={volume.value}>{volume.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Primary Use Case *
                        </label>
                        <select
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.useCase}
                          onChange={(e) => setFormData({...formData, useCase: e.target.value})}
                        >
                          <option value="">Select use case</option>
                          {useCases.map((useCase) => (
                            <option key={useCase.value} value={useCase.value}>{useCase.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Implementation Timeline *
                        </label>
                        <select
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.timeline}
                          onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                        >
                          <option value="">Select timeline</option>
                          {timelines.map((timeline) => (
                            <option key={timeline.value} value={timeline.value}>{timeline.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Requirements
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us about your specific requirements, integration needs, or questions..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Contact Sales Team'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Logos */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Trusted by leading companies worldwide
          </h2>
          <div className="flex items-center justify-center gap-8 grayscale opacity-60">
            {customerLogos.map((customer, idx) => (
              <div key={idx} className="h-12 flex items-center">
                <span className="text-2xl font-bold text-gray-400">{customer.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise-Grade Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for scale, security, and compliance. Everything you need to power enterprise payment operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseFeatures.map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIdx) => (
                      <li key={benefitIdx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What Our Enterprise Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Benefits */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Enterprise Pricing Benefits</CardTitle>
              <CardDescription>
                Get better rates, terms, and support as you scale
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {pricingBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sales Team */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Your Sales Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our experienced enterprise sales team is ready to help you find the perfect solution for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {salesTeam.map((member, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{member.title}</p>
                  <p className="text-sm text-indigo-600 mb-4">{member.region}</p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      {member.email}
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      {member.phone}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Multiple Ways to Connect</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Schedule Demo</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Book a personalized demo with our solutions team
                </p>
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Book Demo
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Direct</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Speak with our sales team immediately
                </p>
                <Button variant="outline" className="w-full">
                  +1 (415) 555-0100
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Chat with our sales team in real-time
                </p>
                <Button variant="outline" className="w-full">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Scale Your Payment Operations?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of enterprise customers who trust Enclose.AI with their payment infrastructure
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Enterprise Demo
            </Button>
            <Button size="lg" variant="outline">
              <Phone className="mr-2 h-5 w-5" />
              Call Sales Now
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Response time: <Clock className="inline h-4 w-4 mx-1" /> Within 2 business hours
          </p>
        </div>
      </section>
    </div>
  )
}