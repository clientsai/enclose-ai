'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertTriangle, XCircle, Clock, TrendingUp, Activity, Server, Zap, Shield, Globe, Database, Bell, Calendar, ExternalLink } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const overallStatus = {
    status: 'operational',
    uptime: '99.99%',
    lastIncident: '23 days ago',
    avgResponseTime: '127ms'
  }

  const services = [
    {
      name: 'Payment Processing API',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '89ms',
      description: 'Core payment processing and transaction handling',
      icon: Zap,
      lastUpdate: '2 minutes ago'
    },
    {
      name: 'Webhook Delivery System',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '156ms',
      description: 'Real-time event notifications and webhook delivery',
      icon: Bell,
      lastUpdate: '5 minutes ago'
    },
    {
      name: 'Dashboard & Web Portal',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '134ms',
      description: 'Merchant dashboard and web interface',
      icon: Globe,
      lastUpdate: '1 minute ago'
    },
    {
      name: 'Authentication Services',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '67ms',
      description: 'API authentication and authorization',
      icon: Shield,
      lastUpdate: '3 minutes ago'
    },
    {
      name: 'Database Systems',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '45ms',
      description: 'Primary and backup database infrastructure',
      icon: Database,
      lastUpdate: '4 minutes ago'
    },
    {
      name: 'Mobile SDKs',
      status: 'operational',
      uptime: '99.96%',
      responseTime: '178ms',
      description: 'iOS and Android SDK services',
      icon: Activity,
      lastUpdate: '6 minutes ago'
    }
  ]

  const incidents = [
    {
      date: '2024-01-15',
      time: '14:23 UTC',
      title: 'Elevated API Response Times',
      status: 'resolved',
      duration: '23 minutes',
      impact: 'Minor',
      description: 'Some users experienced slightly elevated response times due to increased traffic. Issue was resolved by scaling additional server capacity.',
      updates: [
        { time: '14:46 UTC', message: 'Issue fully resolved. All systems operating normally.' },
        { time: '14:35 UTC', message: 'Additional capacity deployed. Response times improving.' },
        { time: '14:23 UTC', message: 'Investigating elevated response times for payment API.' }
      ]
    },
    {
      date: '2024-01-08',
      time: '09:15 UTC',
      title: 'Webhook Delivery Delays',
      status: 'resolved',
      duration: '1 hour 12 minutes',
      impact: 'Minor',
      description: 'Webhook deliveries experienced delays due to a configuration issue in our message queue system.',
      updates: [
        { time: '10:27 UTC', message: 'All delayed webhooks have been delivered. Service fully operational.' },
        { time: '09:45 UTC', message: 'Fix deployed. Webhook delivery resuming normally.' },
        { time: '09:15 UTC', message: 'Investigating webhook delivery delays.' }
      ]
    }
  ]

  const maintenanceSchedule = [
    {
      date: '2024-01-25',
      time: '02:00 - 04:00 UTC',
      title: 'Database Maintenance Window',
      impact: 'No expected downtime',
      description: 'Routine database optimization and security updates. Services will remain available with automatic failover.'
    },
    {
      date: '2024-02-01',
      time: '01:00 - 03:00 UTC',
      title: 'Network Infrastructure Upgrade',
      impact: 'Brief intermittent connectivity',
      description: 'Upgrading core network infrastructure to improve performance and reliability.'
    }
  ]

  const metrics = {
    '24h': {
      uptime: '100%',
      requests: '2.4M',
      avgResponse: '127ms',
      errorRate: '0.01%'
    },
    '7d': {
      uptime: '99.98%',
      requests: '16.8M',
      avgResponse: '132ms',
      errorRate: '0.02%'
    },
    '30d': {
      uptime: '99.97%',
      requests: '72.1M',
      avgResponse: '129ms',
      errorRate: '0.03%'
    },
    '90d': {
      uptime: '99.96%',
      requests: '218.5M',
      avgResponse: '135ms',
      errorRate: '0.04%'
    }
  }

  const uptimeData = [
    { day: 'Mon', uptime: 100 },
    { day: 'Tue', uptime: 99.8 },
    { day: 'Wed', uptime: 100 },
    { day: 'Thu', uptime: 100 },
    { day: 'Fri', uptime: 99.9 },
    { day: 'Sat', uptime: 100 },
    { day: 'Sun', uptime: 100 }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-50'
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50'
      case 'outage':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const currentMetrics = metrics[selectedTimeframe as keyof typeof metrics]

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
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
              System Status
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-time status and performance metrics for all Enclose.AI services
            </p>
          </div>

          {/* Overall Status */}
          <Card className="mb-8 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(overallStatus.status)}
                  <div className="ml-3">
                    <CardTitle className="text-2xl">All Systems Operational</CardTitle>
                    <CardDescription>Last updated: {currentTime.toLocaleString()}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">{overallStatus.uptime}</div>
                  <div className="text-sm text-gray-500">30-day uptime</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{overallStatus.avgResponseTime}</div>
                  <div className="text-sm text-gray-500">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{overallStatus.lastIncident}</div>
                  <div className="text-sm text-gray-500">Last Incident</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-500">Active Incidents</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Service Status */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Service Status</h2>
          <div className="space-y-4">
            {services.map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                        <service.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{service.uptime}</div>
                        <div className="text-xs text-gray-500">30-day uptime</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{service.responseTime}</div>
                        <div className="text-xs text-gray-500">Response time</div>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(service.status)}
                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                          {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-gray-400">
                    Last updated: {service.lastUpdate}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Performance Metrics</h2>

          {/* Timeframe Selector */}
          <div className="flex gap-2 mb-6">
            {Object.keys(metrics).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {timeframe.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  Uptime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{currentMetrics.uptime}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-500" />
                  Total Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{currentMetrics.requests}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Avg Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{currentMetrics.avgResponse}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <XCircle className="h-5 w-5 mr-2 text-red-500" />
                  Error Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{currentMetrics.errorRate}</div>
              </CardContent>
            </Card>
          </div>

          {/* Uptime Chart */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>7-Day Uptime History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-32 gap-4">
                {uptimeData.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-green-500 rounded-t"
                      style={{ height: `${data.uptime}%` }}
                    ></div>
                    <div className="mt-2 text-xs text-gray-500">{data.day}</div>
                    <div className="text-xs font-medium">{data.uptime}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Recent Incidents</h2>
          <div className="space-y-6">
            {incidents.map((incident, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                        <CardDescription>{incident.date} at {incident.time}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Resolved
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Duration: {incident.duration}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{incident.description}</p>
                  <div className="border-l-2 border-gray-200 pl-4">
                    <h4 className="font-medium text-gray-900 mb-2">Updates:</h4>
                    <div className="space-y-2">
                      {incident.updates.map((update, updateIdx) => (
                        <div key={updateIdx} className="text-sm">
                          <span className="font-medium text-gray-700">{update.time}:</span>
                          <span className="text-gray-600 ml-2">{update.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scheduled Maintenance */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Scheduled Maintenance</h2>
          <div className="space-y-4">
            {maintenanceSchedule.map((maintenance, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-indigo-500 mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{maintenance.title}</h3>
                        <p className="text-sm text-gray-500">{maintenance.date} • {maintenance.time}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      Scheduled
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600 mb-2">{maintenance.description}</p>
                    <p className="text-sm text-orange-600 font-medium">
                      Expected impact: {maintenance.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Status Subscriptions */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Stay Informed</CardTitle>
              <CardDescription>
                Subscribe to status updates and get notified about incidents and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  <Bell className="mr-2 h-4 w-4" />
                  Subscribe to Updates
                </Button>
                <Button variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  RSS Feed
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Questions about our status?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact our support team for detailed information about any service issues
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/support">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Contact Support
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}