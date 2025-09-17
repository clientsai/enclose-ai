'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Code, Copy, Check, Terminal, Globe, Lock, Zap, Book, ChevronRight } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/checkout',
      description: 'Create a payment checkout session'
    },
    {
      method: 'GET',
      path: '/api/v1/payments',
      description: 'List all payments'
    },
    {
      method: 'GET',
      path: '/api/v1/payments/:id',
      description: 'Get a specific payment'
    },
    {
      method: 'POST',
      path: '/api/v1/refunds',
      description: 'Create a refund'
    },
    {
      method: 'GET',
      path: '/api/v1/analytics',
      description: 'Get analytics data'
    }
  ]

  const codeExamples = {
    curl: `curl -X POST https://api.enclose.ai/v1/checkout \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 9999,
    "currency": "usd",
    "product_name": "Premium Plan",
    "customer_email": "customer@example.com",
    "success_url": "https://your-app.com/success",
    "cancel_url": "https://your-app.com/cancel"
  }'`,
    javascript: `const response = await fetch('https://api.enclose.ai/v1/checkout', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 9999,
    currency: 'usd',
    product_name: 'Premium Plan',
    customer_email: 'customer@example.com',
    success_url: 'https://your-app.com/success',
    cancel_url: 'https://your-app.com/cancel'
  })
});

const data = await response.json();
console.log(data.checkout_url);`,
    python: `import requests

response = requests.post(
    'https://api.enclose.ai/v1/checkout',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'amount': 9999,
        'currency': 'usd',
        'product_name': 'Premium Plan',
        'customer_email': 'customer@example.com',
        'success_url': 'https://your-app.com/success',
        'cancel_url': 'https://your-app.com/cancel'
    }
)

data = response.json()
print(data['checkout_url'])`,
    php: `<?php
$ch = curl_init('https://api.enclose.ai/v1/checkout');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'amount' => 9999,
    'currency' => 'usd',
    'product_name' => 'Premium Plan',
    'customer_email' => 'customer@example.com',
    'success_url' => 'https://your-app.com/success',
    'cancel_url' => 'https://your-app.com/cancel'
]));

$response = curl_exec($ch);
$data = json_decode($response, true);
echo $data['checkout_url'];`
  }

  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof codeExamples>('curl')

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
              <Link href="/docs" className="text-indigo-600 font-medium">
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

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r hidden lg:block">
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Documentation</h3>
            <nav className="space-y-2">
              <a href="#introduction" className="flex items-center text-indigo-600 font-medium py-2 px-3 rounded-lg bg-indigo-50">
                <Book className="h-4 w-4 mr-2" />
                Introduction
              </a>
              <a href="#authentication" className="flex items-center text-gray-600 hover:text-indigo-600 py-2 px-3 rounded-lg hover:bg-gray-50">
                <Lock className="h-4 w-4 mr-2" />
                Authentication
              </a>
              <a href="#endpoints" className="flex items-center text-gray-600 hover:text-indigo-600 py-2 px-3 rounded-lg hover:bg-gray-50">
                <Globe className="h-4 w-4 mr-2" />
                Endpoints
              </a>
              <a href="#webhooks" className="flex items-center text-gray-600 hover:text-indigo-600 py-2 px-3 rounded-lg hover:bg-gray-50">
                <Zap className="h-4 w-4 mr-2" />
                Webhooks
              </a>
              <a href="#errors" className="flex items-center text-gray-600 hover:text-indigo-600 py-2 px-3 rounded-lg hover:bg-gray-50">
                <Terminal className="h-4 w-4 mr-2" />
                Error Handling
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-12 max-w-4xl mx-auto">
          {/* Introduction */}
          <section id="introduction" className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">API Documentation</h1>
            <p className="text-gray-600 mb-6">
              The Enclose.AI API is organized around REST. Our API has predictable resource-oriented URLs,
              accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP
              response codes, authentication, and verbs.
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-indigo-900 font-medium mb-2">Base URL</p>
              <code className="text-indigo-700">https://api.enclose.ai/v1</code>
            </div>
          </section>

          {/* Authentication */}
          <section id="authentication" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Authentication</h2>
            <p className="text-gray-600 mb-6">
              The Enclose.AI API uses API keys to authenticate requests. You can view and manage your API keys
              in your Dashboard. Your API keys carry many privileges, so be sure to keep them secure!
            </p>
            <p className="text-gray-600 mb-6">
              Authentication to the API is performed via Bearer Auth. Provide your API key as the bearer token value.
            </p>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Authorization Header</span>
                <button
                  onClick={() => copyCode('auth', 'Authorization: Bearer YOUR_API_KEY')}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedCode === 'auth' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <code className="text-green-400">Authorization: Bearer YOUR_API_KEY</code>
            </div>
          </section>

          {/* Endpoints */}
          <section id="endpoints" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">API Endpoints</h2>
            <div className="space-y-4">
              {endpoints.map((endpoint, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-4 mb-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      endpoint.method === 'POST' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-gray-900 font-mono">{endpoint.path}</code>
                  </div>
                  <p className="text-gray-600">{endpoint.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Code Examples */}
          <section id="examples" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Code Examples</h2>
            <p className="text-gray-600 mb-6">
              Here's how to create a checkout session using different programming languages:
            </p>

            {/* Language Tabs */}
            <div className="flex gap-2 mb-4">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang as keyof typeof codeExamples)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    selectedLanguage === lang
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Code Display */}
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <button
                onClick={() => copyCode('example', codeExamples[selectedLanguage])}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                {copiedCode === 'example' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
              <pre className="text-gray-300 overflow-x-auto">
                <code>{codeExamples[selectedLanguage]}</code>
              </pre>
            </div>
          </section>

          {/* Response */}
          <section id="response" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Response Format</h2>
            <p className="text-gray-600 mb-6">
              All API responses return JSON. Successful requests return a 200 status code along with the requested data.
            </p>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-gray-300">
                <code>{`{
  "success": true,
  "checkout_url": "https://checkout.stripe.com/pay/cs_xxx",
  "payment_link_id": "pl_1234567890",
  "expires_at": "2024-01-01T00:00:00Z"
}`}</code>
              </pre>
            </div>
          </section>

          {/* Webhooks */}
          <section id="webhooks" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Webhooks</h2>
            <p className="text-gray-600 mb-6">
              Webhooks allow you to receive real-time notifications when events occur in your account.
              Configure your webhook endpoint in the Dashboard and we'll send POST requests with event data.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Available Events</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                  <code className="text-sm">payment.completed</code> - Payment successfully processed
                </li>
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                  <code className="text-sm">payment.failed</code> - Payment failed
                </li>
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                  <code className="text-sm">refund.created</code> - Refund issued
                </li>
                <li className="flex items-center text-gray-600">
                  <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                  <code className="text-sm">subscription.created</code> - New subscription started
                </li>
              </ul>
            </div>
          </section>

          {/* Rate Limits */}
          <section id="rate-limits" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Rate Limits</h2>
            <p className="text-gray-600 mb-6">
              The API enforces rate limits to ensure fair usage and platform stability:
            </p>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Standard endpoints</span>
                  <span className="font-mono text-gray-900">1000 requests/minute</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Checkout creation</span>
                  <span className="font-mono text-gray-900">100 requests/minute</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Analytics endpoints</span>
                  <span className="font-mono text-gray-900">60 requests/minute</span>
                </li>
              </ul>
            </div>
          </section>

          {/* SDKs */}
          <section id="sdks" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">SDKs & Libraries</h2>
            <p className="text-gray-600 mb-6">
              Official SDKs are available for popular programming languages:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="#" className="bg-white rounded-lg border border-gray-200 p-4 hover:border-indigo-300 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Node.js</h3>
                <code className="text-sm text-gray-600">npm install @enclose-ai/node</code>
              </a>
              <a href="#" className="bg-white rounded-lg border border-gray-200 p-4 hover:border-indigo-300 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Python</h3>
                <code className="text-sm text-gray-600">pip install enclose-ai</code>
              </a>
              <a href="#" className="bg-white rounded-lg border border-gray-200 p-4 hover:border-indigo-300 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">PHP</h3>
                <code className="text-sm text-gray-600">composer require enclose-ai/php</code>
              </a>
              <a href="#" className="bg-white rounded-lg border border-gray-200 p-4 hover:border-indigo-300 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Ruby</h3>
                <code className="text-sm text-gray-600">gem install enclose-ai</code>
              </a>
            </div>
          </section>

          {/* Support */}
          <section className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Our developer support team is here to help you integrate successfully.
            </p>
            <div className="flex gap-4">
              <Link href="/contact">
                <Button>Contact Support</Button>
              </Link>
              <Link href="https://github.com/enclose-ai">
                <Button variant="outline">View on GitHub</Button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}