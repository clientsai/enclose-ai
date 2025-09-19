import { Users, Linkedin, Twitter, Github, Mail, MapPin, Award, Code, Shield, Zap, Globe, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Sarah Chen',
      title: 'CEO & Co-Founder',
      bio: 'Former Stripe engineer with 8+ years in payment infrastructure. Led the team that built Stripe Connect for platforms.',
      image: '/team/sarah.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/sarahchen',
        twitter: 'https://twitter.com/sarahchen',
        github: 'https://github.com/sarahchen'
      },
      expertise: ['Payment Infrastructure', 'Platform Strategy', 'Team Leadership'],
      location: 'San Francisco, CA'
    },
    {
      name: 'Michael Rodriguez',
      title: 'CTO & Co-Founder',
      bio: 'Ex-Google engineer specializing in distributed systems and real-time processing. Built payment systems handling $10B+ annually.',
      image: '/team/michael.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/michaelrodriguez',
        twitter: 'https://twitter.com/michaelrod',
        github: 'https://github.com/michaelrod'
      },
      expertise: ['Distributed Systems', 'Real-time Processing', 'Security Architecture'],
      location: 'Austin, TX'
    },
    {
      name: 'Elena Kim',
      title: 'VP of Engineering',
      bio: 'Former AWS principal engineer with deep expertise in cloud infrastructure and developer experience. Led teams building developer tools used by millions.',
      image: '/team/elena.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/elenakim',
        twitter: 'https://twitter.com/elenakim',
        github: 'https://github.com/elenakim'
      },
      expertise: ['Cloud Infrastructure', 'Developer Experience', 'API Design'],
      location: 'Seattle, WA'
    },
    {
      name: 'David Thompson',
      title: 'VP of Sales',
      bio: 'Enterprise sales leader with 12+ years experience in fintech and SaaS. Previously led sales at Stripe and helped scale from startup to IPO.',
      image: '/team/david.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/davidthompson',
        twitter: 'https://twitter.com/davidthompson'
      },
      expertise: ['Enterprise Sales', 'Fintech', 'Customer Success'],
      location: 'New York, NY'
    },
    {
      name: 'Jessica Park',
      title: 'Head of Product',
      bio: 'Product leader with experience at both startups and Fortune 500 companies. Specializes in building developer-first products and platform ecosystems.',
      image: '/team/jessica.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/jessicapark',
        twitter: 'https://twitter.com/jessicapark'
      },
      expertise: ['Product Strategy', 'Developer Tools', 'Platform Design'],
      location: 'San Francisco, CA'
    },
    {
      name: 'Alex Chen',
      title: 'Principal Engineer',
      bio: 'Infrastructure engineer focused on performance and reliability. Led the team that achieved our 47ms API response times at scale.',
      image: '/team/alex.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/alexchen',
        github: 'https://github.com/alexchen'
      },
      expertise: ['Performance Engineering', 'Infrastructure', 'API Optimization'],
      location: 'San Francisco, CA'
    },
    {
      name: 'Maria Garcia',
      title: 'Head of Security',
      bio: 'Cybersecurity expert with 15+ years experience in financial services. Former security lead at major banks and fintech companies.',
      image: '/team/maria.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/mariagarcia',
        twitter: 'https://twitter.com/mariagarcia'
      },
      expertise: ['Cybersecurity', 'Compliance', 'Risk Management'],
      location: 'Chicago, IL'
    },
    {
      name: 'Tom Anderson',
      title: 'Head of Design',
      bio: 'Design leader focused on creating exceptional user experiences. Previously led design at multiple successful fintech startups.',
      image: '/team/tom.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/tomanderson',
        twitter: 'https://twitter.com/tomanderson'
      },
      expertise: ['UX Design', 'Design Systems', 'Conversion Optimization'],
      location: 'Portland, OR'
    }
  ]

  const values = [
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Developer First',
      description: 'We build tools that developers love to use, with comprehensive documentation, intuitive APIs, and excellent developer experience.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Security & Trust',
      description: 'Security is not an afterthought. We maintain the highest standards of security and compliance to protect our customers and their users.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Performance',
      description: 'Every millisecond matters in payments. We obsess over performance and reliability to ensure the best possible experience.'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Impact',
      description: 'We believe in the power of payments to connect the world. Our platform enables businesses to accept payments globally with ease.'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Customer Obsession',
      description: 'Our customers success is our success. We go above and beyond to ensure our customers can achieve their goals with our platform.'
    }
  ]

  const stats = [
    { value: '50+', label: 'Team Members' },
    { value: '15+', label: 'Countries' },
    { value: '8+', label: 'Years Avg Experience' },
    { value: '99%', label: 'Employee Satisfaction' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're a diverse team of engineers, designers, and business leaders passionate about building the future of payments. 
            Our collective experience spans decades at companies like Stripe, Google, AWS, and leading fintech startups.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-indigo-600 font-medium mb-2">{member.title}</p>
                    <p className="text-sm text-gray-500 mb-4 flex items-center justify-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {member.location}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                    
                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {member.expertise.map((skill, skillIdx) => (
                        <span key={skillIdx} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors">
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.github && (
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors">
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardContent className="p-12 text-center">
              <Award className="h-16 w-16 mx-auto mb-6 text-white/90" />
              <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
              <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
                We're always looking for talented individuals who share our passion for building exceptional payment infrastructure. 
                Join us in shaping the future of payments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                  <Mail className="mr-2 h-5 w-5" />
                  View Open Positions
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Users className="mr-2 h-5 w-5" />
                  Learn About Our Culture
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Team */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions about our team or want to learn more about working with us?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
            <Button size="lg" variant="outline">
              <Users className="mr-2 h-5 w-5" />
              Meet the Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
