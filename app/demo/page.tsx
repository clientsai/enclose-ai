/* Interactive Demo Page - Live Payment Link Creation */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Play, CreditCard, Copy, CheckCircle, ArrowRight, Zap, Globe, Shield, BarChart3, Code, DollarSign, ShoppingCart, RefreshCw, Sparkles } from 'lucide-react'
import Logo from '@/components/Logo'

export default function DemoPage() {
  const [step, setStep] = useState(1)
  const [productName, setProductName] = useState('Premium Subscription')
  const [amount, setAmount] = useState('29.99')
  const [currency, setCurrency] = useState('USD')
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const demoFeatures = [
    { id: 'instant', label: 'Instant Generation', icon: Zap },
    { id: 'global', label: 'Global Payments', icon: Globe },
    { id: 'secure', label: 'Secure Checkout', icon: Shield },
    { id: 'analytics', label: 'Real-time Analytics', icon: BarChart3 },
  ]

  const currencies = [
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
    { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
    { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar' },
  ]

  const generatePaymentLink = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const linkId = Math.random().toString(36).substring(2, 9)
      setGeneratedLink(`https://pay.enclose.ai/demo/${linkId}`)
      setStep(3)
      setIsAnimating(false)
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetDemo = () => {
    setStep(1)
    setProductName('Premium Subscription')
    setAmount('29.99')
    setCurrency('USD')
    setGeneratedLink('')
    setSelectedFeatures([])
  }

  const demoStats = [
    { value: '2.3s', label: 'Average Generation Time' },
    { value: '47%', label: 'Higher Conversion Rate' },
    { value: '135+', label: 'Supported Currencies' },
    { value: '0%', label: 'Transaction Fees (Demo)' },
  ]

  const integrationExamples = [
    {
      language: 'JavaScript',
      code: `// Create a payment link with Enclose.AI
const response = await fetch('https://api.enclose.ai/v1/payment-links', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    product_name: '${productName}',
    amount: ${amount},
    currency: '${currency}',
    success_url: 'https://yoursite.com/success',
    cancel_url: 'https://yoursite.com/cancel'
  })
});

const { payment_link } = await response.json();
console.log('Payment link created:', payment_link.url);`
    },
    {
      language: 'Python',
      code: `# Create a payment link with Enclose.AI
import requests

response = requests.post(
    'https://api.enclose.ai/v1/payment-links',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'product_name': '${productName}',
        'amount': ${amount},
        'currency': '${currency}',
        'success_url': 'https://yoursite.com/success',
        'cancel_url': 'https://yoursite.com/cancel'
    }
)

payment_link = response.json()
print(f"Payment link created: {payment_link['url']}")`
    },
    {
      language: 'cURL',
      code: `curl -X POST https://api.enclose.ai/v1/payment-links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "product_name": "${productName}",
    "amount": ${amount},
    "currency": "${currency}",
    "success_url": "https://yoursite.com/success",
    "cancel_url": "https://yoursite.com/cancel"
  }'`
    },
  ]

  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Logo size="md" />
            <div className="hidden md:flex items-center gap-6">
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">Docs</Link>
              <Link href="/demo" className="text-gray-900 font-medium">Demo</Link>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
            <Play className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">Interactive Demo</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Try Enclose.AI Live
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the power of instant payment link generation. Create your first payment link in seconds,
            see real-time analytics, and understand why thousands of businesses trust Enclose.AI.
          </p>
        </div>
      </section>

      {/* Demo Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {demoStats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-indigo-600">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <CardTitle className="text-2xl">Payment Link Generator</CardTitle>
              <CardDescription className="text-indigo-100">
                Create a payment link in real-time with our demo
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8">
                <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                    1
                  </div>
                  <span className="ml-2 font-medium">Configure</span>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                    2
                  </div>
                  <span className="ml-2 font-medium">Generate</span>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                <div className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                    3
                  </div>
                  <span className="ml-2 font-medium">Share</span>
                </div>
              </div>

              {/* Step 1: Configuration */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="product">Product Name</Label>
                    <Input
                      id="product"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Enter product name"
                      className="mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <select
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {currencies.map((curr) => (
                          <option key={curr.code} value={curr.code}>
                            {curr.code} - {curr.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label>Features to Enable</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {demoFeatures.map((feature) => (
                        <div
                          key={feature.id}
                          onClick={() => {
                            setSelectedFeatures(prev =>
                              prev.includes(feature.id)
                                ? prev.filter(f => f !== feature.id)
                                : [...prev, feature.id]
                            )
                          }}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedFeatures.includes(feature.id)
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <feature.icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{feature.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setStep(2)}
                  >
                    Continue to Generate <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}

              {/* Step 2: Generation */}
              {step === 2 && (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Review Your Payment Link</h3>
                    <div className="bg-gray-50 rounded-lg p-6 text-left space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Product:</span>
                        <span className="font-medium">{productName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">{currencies.find(c => c.code === currency)?.symbol}{amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Currency:</span>
                        <span className="font-medium">{currency}</span>
                      </div>
                      {selectedFeatures.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Features:</span>
                          <span className="font-medium">{selectedFeatures.length} enabled</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={generatePaymentLink}
                    disabled={isAnimating}
                  >
                    {isAnimating ? (
                      <>
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Generating Link...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        Generate Payment Link
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Step 3: Share */}
              {step === 3 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Payment Link Created!</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Input
                        value={generatedLink}
                        readOnly
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={copyToClipboard}
                      >
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <Button variant="outline" asChild>
                      <Link href={generatedLink} target="_blank">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Preview Checkout
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={resetDemo}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Create Another
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    This is a demo link. In production, your customers would complete real transactions.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Integration Examples</h2>
            <p className="text-lg text-gray-600">See how easy it is to integrate with your application</p>
          </div>
          <Card>
            <CardHeader>
              <div className="flex gap-2">
                {integrationExamples.map((example) => (
                  <Button
                    key={example.language}
                    variant={selectedLanguage === example.language ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLanguage(example.language)}
                  >
                    {example.language}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{integrationExamples.find(e => e.language === selectedLanguage)?.code}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You'll Get</h2>
            <p className="text-lg text-gray-600">Everything you need to accept payments professionally</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-indigo-600 mb-4" />
                <CardTitle>Instant Activation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Start accepting payments immediately. No lengthy approval processes or complex setups.
                  Connect your Stripe account and you're ready to go.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 text-indigo-600 mb-4" />
                <CardTitle>Global Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Accept payments from customers in 195+ countries. Support for 135+ currencies with
                  automatic conversion and local payment methods.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-indigo-600 mb-4" />
                <CardTitle>Real-time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track every payment, monitor conversion rates, and understand your revenue trends with
                  comprehensive analytics dashboards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Sparkles className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of businesses already using Enclose.AI to simplify their payment processing.
            Start free with no credit card required.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">
                Start Free Trial
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-indigo-600" asChild>
              <Link href="/contact-sales">
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}