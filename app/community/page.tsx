import PageLayout from '@/components/PageLayout'
import { Users, MessageSquare, Github, Heart, BookOpen, Calendar, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function CommunityPage() {
  const stats = [
    { label: 'Active Members', value: '10,000+', icon: <Users className="h-5 w-5" /> },
    { label: 'Discussions', value: '5,000+', icon: <MessageSquare className="h-5 w-5" /> },
    { label: 'Contributors', value: '500+', icon: <Heart className="h-5 w-5" /> },
    { label: 'Projects Built', value: '2,000+', icon: <Star className="h-5 w-5" /> },
  ]

  const communityChannels = [
    {
      title: 'Discord Community',
      description: 'Join our active Discord server for real-time discussions and support',
      icon: <MessageSquare className="h-8 w-8 text-indigo-600" />,
      link: 'https://discord.gg/encloseai',
      members: '5,000+ members',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'GitHub Discussions',
      description: 'Participate in technical discussions and feature requests',
      icon: <Github className="h-8 w-8 text-gray-700" />,
      link: 'https://github.com/enclose-ai/discussions',
      members: '2,000+ contributors',
      color: 'from-gray-600 to-gray-800',
    },
    {
      title: 'Developer Forum',
      description: 'Share knowledge, ask questions, and help other developers',
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      link: '/forum',
      members: '3,000+ developers',
      color: 'from-green-500 to-teal-500',
    },
  ]

  const upcomingEvents = [
    {
      title: 'Monthly Developer Meetup',
      date: 'January 25, 2025',
      time: '2:00 PM EST',
      type: 'Virtual',
    },
    {
      title: 'API Workshop: Advanced Integration',
      date: 'February 5, 2025',
      time: '3:00 PM EST',
      type: 'Virtual',
    },
    {
      title: 'Enclose.AI Conference 2025',
      date: 'March 15-17, 2025',
      time: 'All Day',
      type: 'San Francisco, CA',
    },
  ]

  const featuredContributors = [
    { name: 'Sarah Chen', contributions: 127, avatar: 'SC' },
    { name: 'Mike Johnson', contributions: 98, avatar: 'MJ' },
    { name: 'Elena Rodriguez', contributions: 76, avatar: 'ER' },
    { name: 'David Kim', contributions: 64, avatar: 'DK' },
    { name: 'Anna Smith', contributions: 52, avatar: 'AS' },
    { name: 'Tom Wilson', contributions: 45, avatar: 'TW' },
  ]

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Community
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of developers building the future of payment integration
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl mb-3 text-indigo-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Community Channels */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Join the Conversation</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {communityChannels.map((channel) => (
                <Link
                  key={channel.title}
                  href={channel.link}
                  className="group bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${channel.color} rounded-xl flex items-center justify-center mb-4 text-white`}>
                    {channel.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{channel.title}</h3>
                  <p className="text-gray-600 mb-4">{channel.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{channel.members}</span>
                    <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">
                      Join →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Contributors */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Top Contributors</h2>
              <Link href="/contributors" className="text-indigo-600 hover:text-indigo-700 font-medium">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredContributors.map((contributor) => (
                <div key={contributor.name} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium mb-2 mx-auto">
                    {contributor.avatar}
                  </div>
                  <div className="text-sm font-medium text-gray-900">{contributor.name}</div>
                  <div className="text-xs text-gray-500">{contributor.contributions} PRs</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Upcoming Events</h2>
              <Link href="/events" className="text-indigo-600 hover:text-indigo-700 font-medium">
                View Calendar →
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="bg-white rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                        <span>•</span>
                        <span>{event.type}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Register
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Get Involved CTA */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <TrendingUp className="h-12 w-12 mx-auto mb-6 text-white/90" />
            <h2 className="text-3xl font-bold mb-4">Ready to Contribute?</h2>
            <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
              Whether you're fixing bugs, improving docs, or building integrations, every contribution makes a difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/enclose-ai"
                className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </Link>
              <Link
                href="/docs/contributing"
                className="px-8 py-3 bg-indigo-700 text-white rounded-lg font-medium hover:bg-indigo-800 transition-colors"
              >
                Contribution Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}