'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Code, Copy, Check, ChevronDown, ChevronRight, Book, Zap, Shield, Globe, ExternalLink, Play, Download, Search } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'

export default function ApiReferencePage() {
  const [selectedCategory, setSelectedCategory] = useState('payments')
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const apiCategories = [
    { id: 'payments', name: 'Payments', icon: Zap, count: 12 },
    { id: 'customers', name: 'Customers', icon: Globe, count: 8 },
    { id: 'webhooks', name: 'Webhooks', icon: Code, count: 6 },
    { id: 'disputes', name: 'Disputes', icon: Shield, count: 5 },
    { id: 'refunds', name: 'Refunds', icon: ArrowRight, count: 4 },
    { id: 'analytics', name: 'Analytics', icon: Book, count: 7 }
  ]

  const endpoints = {
    payments: [
      {
        id: 'create-payment',
        method: 'POST',
        path: '/v1/payments',
        title: 'Create Payment',
        description: 'Process a payment using various payment methods including cards, wallets, and bank transfers.',
        parameters: [
          { name: 'amount', type: 'integer', required: true, description: 'Payment amount in cents' },
          { name: 'currency', type: 'string', required: true, description: 'Three-letter ISO currency code' },
          { name: 'payment_method', type: 'object', required: true, description: 'Payment method details' },
          { name: 'customer_id', type: 'string', required: false, description: 'ID of existing customer' },
          { name: 'description', type: 'string', required: false, description: 'Payment description' },
          { name: 'metadata', type: 'object', required: false, description: 'Additional metadata' }
        ],
        response: {
          id: 'pay_1a2b3c4d5e6f',
          amount: 2000,
          currency: 'usd',
          status: 'succeeded',
          payment_method: { type: 'card', last4: '4242' },
          created: 1672531200
        },
        example: `curl -X POST https://api.enclose.ai/v1/payments \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2000,
    "currency": "usd",
    "payment_method": {
      "type": "card",
      "card": {
        "number": "4242424242424242",
        "exp_month": 12,
        "exp_year": 2025,
        "cvc": "123"
      }
    },
    "description": "Test payment"
  }'`
      },
      {
        id: 'retrieve-payment',
        method: 'GET',
        path: '/v1/payments/{id}',
        title: 'Retrieve Payment',
        description: 'Retrieve details of a specific payment by its unique identifier.',
        parameters: [
          { name: 'id', type: 'string', required: true, description: 'Payment ID' }
        ],
        response: {
          id: 'pay_1a2b3c4d5e6f',
          amount: 2000,
          currency: 'usd',
          status: 'succeeded',
          payment_method: { type: 'card', last4: '4242' },
          created: 1672531200
        },
        example: `curl -X GET https://api.enclose.ai/v1/payments/pay_1a2b3c4d5e6f \\
  -H "Authorization: Bearer sk_live_..."`
      },
      {
        id: 'list-payments',
        method: 'GET',
        path: '/v1/payments',
        title: 'List Payments',
        description: 'Retrieve a list of payments with optional filtering and pagination.',
        parameters: [
          { name: 'limit', type: 'integer', required: false, description: 'Number of results to return (default: 10)' },
          { name: 'starting_after', type: 'string', required: false, description: 'Cursor for pagination' },
          { name: 'customer_id', type: 'string', required: false, description: 'Filter by customer ID' },
          { name: 'status', type: 'string', required: false, description: 'Filter by payment status' }
        ],
        response: {
          object: 'list',
          data: [
            {
              id: 'pay_1a2b3c4d5e6f',
              amount: 2000,
              currency: 'usd',
              status: 'succeeded'
            }
          ],
          has_more: false
        },
        example: `curl -X GET "https://api.enclose.ai/v1/payments?limit=10&status=succeeded" \\
  -H "Authorization: Bearer sk_live_..."`
      }
    ],
    customers: [
      {
        id: 'create-customer',
        method: 'POST',
        path: '/v1/customers',
        title: 'Create Customer',
        description: 'Create a new customer record for storing payment methods and billing information.',
        parameters: [
          { name: 'email', type: 'string', required: true, description: 'Customer email address' },
          { name: 'name', type: 'string', required: false, description: 'Customer full name' },
          { name: 'phone', type: 'string', required: false, description: 'Customer phone number' },
          { name: 'address', type: 'object', required: false, description: 'Customer address' },
          { name: 'metadata', type: 'object', required: false, description: 'Additional metadata' }
        ],
        response: {
          id: 'cus_1a2b3c4d5e6f',
          email: 'customer@example.com',
          name: 'John Doe',
          created: 1672531200
        },
        example: `curl -X POST https://api.enclose.ai/v1/customers \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "customer@example.com",
    "name": "John Doe",
    "phone": "+1234567890"
  }'`
      }
    ],
    webhooks: [
      {
        id: 'webhook-endpoints',
        method: 'POST',
        path: '/v1/webhook_endpoints',
        title: 'Create Webhook Endpoint',
        description: 'Configure a webhook endpoint to receive real-time notifications about events.',
        parameters: [
          { name: 'url', type: 'string', required: true, description: 'Webhook endpoint URL' },
          { name: 'enabled_events', type: 'array', required: true, description: 'List of events to subscribe to' },
          { name: 'description', type: 'string', required: false, description: 'Endpoint description' }
        ],
        response: {
          id: 'we_1a2b3c4d5e6f',
          url: 'https://example.com/webhooks',
          enabled_events: ['payment.succeeded', 'payment.failed'],
          status: 'enabled'
        },
        example: `curl -X POST https://api.enclose.ai/v1/webhook_endpoints \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/webhooks",
    "enabled_events": ["payment.succeeded", "payment.failed"]
  }'`
      }
    ]
  }

  const quickStart = {
    authentication: `// Set your secret API key
const enclose = require('enclose-ai')('sk_live_...');

// Or using environment variables
const enclose = require('enclose-ai')(process.env.ENCLOSE_SECRET_KEY);`,
    createPayment: `// Create a payment
const payment = await enclose.payments.create({
  amount: 2000, // $20.00
  currency: 'usd',
  payment_method: {
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 12,
      exp_year: 2025,
      cvc: '123'
    }
  },
  description: 'Test payment'
});

console.log('Payment created:', payment.id);`,
    handleWebhook: `// Handle webhook events
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['enclose-signature'];

  let event;
  try {
    event = enclose.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send('Webhook signature verification failed');
  }

  // Handle the event
  switch (event.type) {
    case 'payment.succeeded':
      console.log('Payment succeeded:', event.data.object);
      break;
    case 'payment.failed':
      console.log('Payment failed:', event.data.object);
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }

  res.json({received: true});
});`
  }

  const statusCodes = [
    { code: '200', description: 'OK - Request successful' },
    { code: '201', description: 'Created - Resource created successfully' },
    { code: '400', description: 'Bad Request - Invalid request parameters' },
    { code: '401', description: 'Unauthorized - Invalid API key' },
    { code: '402', description: 'Payment Required - Payment failed' },
    { code: '404', description: 'Not Found - Resource not found' },
    { code: '429', description: 'Too Many Requests - Rate limit exceeded' },
    { code: '500', description: 'Internal Server Error - Server error' }
  ]

  const sdks = [
    {
      language: 'Node.js',
      description: 'Official Node.js SDK for server-side integration',
      install: 'npm install enclose-ai',
      github: 'https://github.com/enclose-ai/enclose-node'
    },
    {
      language: 'Python',
      description: 'Official Python SDK with Django and Flask support',
      install: 'pip install enclose-ai',
      github: 'https://github.com/enclose-ai/enclose-python'
    },
    {
      language: 'PHP',
      description: 'Official PHP SDK with Laravel integration',
      install: 'composer require enclose-ai/enclose-php',
      github: 'https://github.com/enclose-ai/enclose-php'
    },
    {
      language: 'Ruby',
      description: 'Official Ruby SDK with Rails support',
      install: 'gem install enclose-ai',
      github: 'https://github.com/enclose-ai/enclose-ruby'
    },
    {
      language: 'Go',
      description: 'Official Go SDK for high-performance applications',
      install: 'go get github.com/enclose-ai/enclose-go',
      github: 'https://github.com/enclose-ai/enclose-go'
    },
    {
      language: 'Java',
      description: 'Official Java SDK with Spring Boot integration',
      install: 'implementation "ai.enclose:enclose-java:1.0.0"',
      github: 'https://github.com/enclose-ai/enclose-java'
    }
  ]

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const filteredEndpoints = endpoints[selectedCategory as keyof typeof endpoints]?.filter(endpoint =>
    endpoint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    endpoint.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

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
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
            API Reference
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Complete API documentation for Enclose.AI payment platform. Start building with our REST API, webhooks, and official SDKs.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search endpoints, methods, or descriptions..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Play className="mr-2 h-5 w-5" />
              Try Live API
            </Button>
            <Button size="lg" variant="outline">
              <Download className="mr-2 h-5 w-5" />
              Download SDKs
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Quick Start</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-indigo-500" />
                  1. Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button
                    onClick={() => copyToClipboard(quickStart.authentication, 'auth')}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'auth' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{quickStart.authentication}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-indigo-500" />
                  2. Create Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button
                    onClick={() => copyToClipboard(quickStart.createPayment, 'payment')}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'payment' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{quickStart.createPayment}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-indigo-500" />
                  3. Handle Webhooks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button
                    onClick={() => copyToClipboard(quickStart.handleWebhook, 'webhook')}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'webhook' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{quickStart.handleWebhook}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API Categories & Endpoints */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">API Endpoints</h2>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {apiCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Endpoints */}
          <div className="space-y-6">
            {filteredEndpoints.map((endpoint) => (
              <Card key={endpoint.id} className="overflow-hidden">
                <button
                  onClick={() => setExpandedEndpoint(expandedEndpoint === endpoint.id ? null : endpoint.id)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded text-xs font-bold mr-4 ${
                        endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                        endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                        endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {endpoint.method}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{endpoint.title}</h3>
                        <p className="text-sm text-gray-500">{endpoint.path}</p>
                      </div>
                    </div>
                    {expandedEndpoint === endpoint.id ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{endpoint.description}</p>
                </button>

                {expandedEndpoint === endpoint.id && (
                  <div className="border-t bg-gray-50 p-6">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Parameters */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Parameters</h4>
                        <div className="space-y-3">
                          {endpoint.parameters.map((param, idx) => (
                            <div key={idx} className="border-l-2 border-indigo-200 pl-4">
                              <div className="flex items-center gap-2">
                                <code className="text-sm font-mono bg-gray-200 px-2 py-1 rounded">
                                  {param.name}
                                </code>
                                <span className="text-xs text-gray-500">{param.type}</span>
                                {param.required && (
                                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                    required
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{param.description}</p>
                            </div>
                          ))}
                        </div>

                        <h4 className="font-semibold text-gray-900 mb-4 mt-8">Response</h4>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <button
                            onClick={() => copyToClipboard(JSON.stringify(endpoint.response, null, 2), `response-${endpoint.id}`)}
                            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedCode === `response-${endpoint.id}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                          <pre className="text-sm text-gray-300 overflow-x-auto">
                            <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                          </pre>
                        </div>
                      </div>

                      {/* Example */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Example Request</h4>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <button
                            onClick={() => copyToClipboard(endpoint.example, `example-${endpoint.id}`)}
                            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedCode === `example-${endpoint.id}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                          <pre className="text-sm text-gray-300 overflow-x-auto">
                            <code>{endpoint.example}</code>
                          </pre>
                        </div>

                        <div className="mt-4">
                          <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                            <Play className="mr-2 h-4 w-4" />
                            Try in API Explorer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {filteredEndpoints.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No endpoints found matching your search.</p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* SDKs */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Official SDKs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdks.map((sdk, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{sdk.language}</CardTitle>
                  <CardDescription>{sdk.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded p-3 mb-4">
                    <code className="text-sm">{sdk.install}</code>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Install
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Status Codes */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">HTTP Status Codes</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {statusCodes.map((status, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <code className={`px-3 py-1 rounded text-sm font-bold mr-4 ${
                        status.code.startsWith('2') ? 'bg-green-100 text-green-700' :
                        status.code.startsWith('4') ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {status.code}
                      </code>
                      <span className="text-gray-900">{status.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Rate Limits</CardTitle>
              <CardDescription>
                Our API has rate limits to ensure fair usage and system stability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">1,000</div>
                  <div className="text-sm text-gray-600">Requests per minute</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">10,000</div>
                  <div className="text-sm text-gray-600">Requests per hour</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">100,000</div>
                  <div className="text-sm text-gray-600">Requests per day</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get your API keys and start processing payments in minutes
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Get API Keys
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/docs">
              <Button size="lg" variant="outline">
                View Full Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}