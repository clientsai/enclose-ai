/* API Overview Page - Comprehensive API Documentation */
import { Code, Zap, Shield, Globe, BookOpen, Terminal, Download, ArrowRight, CheckCircle, Star, Users, Clock, Key, Database, Webhook, CreditCard, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function APIPage() {
  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/v1/payments',
      description: 'Create a new payment',
      icon: <CreditCard className="h-5 w-5 text-blue-500" />,
      example: `curl -X POST https://api.enclose.ai/v1/payments \\
  -H "Authorization: Bearer sk_test_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2000,
    "currency": "usd",
    "customer": {
      "email": "customer@example.com"
    }
  }'`
    },
    {
      method: 'GET',
      endpoint: '/v1/payments/{id}',
      description: 'Retrieve a payment by ID',
      icon: <Database className="h-5 w-5 text-green-500" />,
      example: `curl -X GET https://api.enclose.ai/v1/payments/pay_123 \\
  -H "Authorization: Bearer sk_test_..."`
    },
    {
      method: 'POST',
      endpoint: '/v1/payment-links',
      description: 'Create a payment link',
      icon: <Webhook className="h-5 w-5 text-purple-500" />,
      example: `curl -X POST https://api.enclose.ai/v1/payment-links \\
  -H "Authorization: Bearer sk_test_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 5000,
    "currency": "usd",
    "description": "Premium Plan"
  }'`
    },
    {
      method: 'POST',
      endpoint: '/v1/webhooks',
      description: 'Create a webhook endpoint',
      icon: <Webhook className="h-5 w-5 text-orange-500" />,
      example: `curl -X POST https://api.enclose.ai/v1/webhooks \\
  -H "Authorization: Bearer sk_test_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/webhooks",
    "events": ["payment.completed", "payment.failed"]
  }'`
    }
  ]

  const features = [
    {
      title: 'RESTful API',
      description: 'Clean, intuitive REST endpoints that follow industry standards',
      icon: <Code className="h-6 w-6 text-blue-500" />,
      benefits: ['Intuitive design', 'Consistent responses', 'HTTP status codes', 'JSON payloads']
    },
    {
      title: 'Real-time Webhooks',
      description: 'Instant notifications for payment events and status changes',
      icon: <Webhook className="h-6 w-6 text-green-500" />,
      benefits: ['Instant notifications', 'Reliable delivery', 'Retry logic', 'Signature verification']
    },
    {
      title: 'Comprehensive Security',
      description: 'Bank-grade security with encryption and authentication',
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      benefits: ['TLS 1.3 encryption', 'API key authentication', 'Webhook signatures', 'PCI compliance']
    },
    {
      title: 'Global Scale',
      description: 'Built to handle millions of requests with 99.99% uptime',
      icon: <Globe className="h-6 w-6 text-orange-500" />,
      benefits: ['Global CDN', 'Auto-scaling', '99.99% uptime', 'Multi-region']
    }
  ]

  const sdks = [
    { name: 'JavaScript', version: 'v2.4.1', install: 'npm install @enclose-ai/sdk' },
    { name: 'Python', version: 'v1.8.3', install: 'pip install enclose-ai' },
    { name: 'PHP', version: 'v3.1.0', install: 'composer require enclose-ai/php-sdk' },
    { name: 'Go', version: 'v1.5.2', install: 'go get github.com/enclose-ai/sdk-go' },
    { name: 'Ruby', version: 'v2.2.1', install: 'gem install enclose-ai' },
    { name: 'Java', version: 'v4.0.1', install: 'mvn install enclose-ai-java' }
  ]

  const quickStartCode = `# Install the SDK
npm install @enclose-ai/sdk

# Initialize the client
import { EncloseAI } from '@enclose-ai/sdk'

const enclose = new EncloseAI({
  apiKey: process.env.ENCLOSE_API_KEY,
  environment: 'production' // or 'sandbox'
})

# Create a payment
const payment = await enclose.payments.create({
  amount: 2000, // $20.00
  currency: 'usd',
  customer: {
    email: 'customer@example.com'
  },
  metadata: {
    order_id: 'order_123'
  }
})

console.log('Payment created:', payment.id)`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
            <Code className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            API Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Powerful, secure, and easy-to-use API for payment processing. 
            Build amazing payment experiences with our comprehensive REST API and real-time webhooks.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">47ms</div>
            <div className="text-sm text-gray-600 mt-1">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">99.99%</div>
            <div className="text-sm text-gray-600 mt-1">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">10M+</div>
            <div className="text-sm text-gray-600 mt-1">Requests/Day</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">6</div>
            <div className="text-sm text-gray-600 mt-1">SDK Languages</div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">API Endpoints</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {apiEndpoints.map((endpoint) => (
              <Card key={endpoint.endpoint} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    {endpoint.icon}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-mono rounded ${
                          endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                          endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                      </div>
                      <CardDescription className="mt-2">{endpoint.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{endpoint.example}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">API Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Start</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-blue-500" />
                  JavaScript Example
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{quickStartCode}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Key className="h-5 w-5 text-green-500" />
                  Get Your API Key
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Sign up for a free account and get your API keys instantly. 
                    Start with our sandbox environment for testing.
                  </p>
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/register">
                        Get API Key
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/docs">
                        <BookOpen className="mr-2 h-4 w-4" />
                        View Full Documentation
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SDKs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Official SDKs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdks.map((sdk) => (
              <Card key={sdk.name} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{sdk.name}</CardTitle>
                    <span className="text-sm text-gray-500">v{sdk.version}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <code className="text-sm font-mono">{sdk.install}</code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
            <p className="text-lg text-gray-600">
              Everything you need to integrate with our API successfully
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">API Reference</h3>
              <p className="text-gray-600 mb-4">
                Complete API documentation with examples and responses
              </p>
              <Button asChild>
                <Link href="/api-reference">
                  View Reference
                </Link>
              </Button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Webhook className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Webhooks Guide</h3>
              <p className="text-gray-600 mb-4">
                Learn how to handle real-time events and notifications
              </p>
              <Button asChild variant="outline">
                <Link href="/webhooks">
                  Webhook Docs
                </Link>
              </Button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Developer Support</h3>
              <p className="text-gray-600 mb-4">
                Get help from our engineering team and community
              </p>
              <Button asChild variant="outline">
                <Link href="/support">
                  Get Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
