/* SDKs & Libraries Page - Comprehensive Developer Resources */
import { Code, Download, Github, BookOpen, Zap, Shield, Globe, Terminal, Package, ArrowRight, CheckCircle, Star, Users, Clock, Gem, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function SDKsPage() {
  const sdks = [
    {
      name: 'JavaScript/TypeScript',
      description: 'Official SDK for modern web applications and Node.js backends',
      icon: <Code className="h-8 w-8 text-blue-500" />,
      version: 'v2.4.1',
      downloads: '2.1M+',
      rating: 4.9,
      features: ['TypeScript support', 'Promise-based API', 'Automatic retries', 'Webhook validation'],
      installCommand: 'npm install @enclose-ai/sdk',
      githubUrl: 'https://github.com/enclose-ai/sdk-js',
      docsUrl: '/docs/javascript',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Python',
      description: 'Comprehensive Python SDK for data science and backend services',
      icon: <Terminal className="h-8 w-8 text-green-500" />,
      version: 'v1.8.3',
      downloads: '850K+',
      rating: 4.8,
      features: ['Async/await support', 'Pandas integration', 'Django/Flask helpers', 'Jupyter notebooks'],
      installCommand: 'pip install enclose-ai',
      githubUrl: 'https://github.com/enclose-ai/sdk-python',
      docsUrl: '/docs/python',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'PHP',
      description: 'Robust PHP SDK for Laravel, Symfony, and custom applications',
      icon: <Package className="h-8 w-8 text-purple-500" />,
      version: 'v3.1.0',
      downloads: '420K+',
      rating: 4.7,
      features: ['Laravel integration', 'PSR-7 compliance', 'Guzzle HTTP', 'Composer support'],
      installCommand: 'composer require enclose-ai/php-sdk',
      githubUrl: 'https://github.com/enclose-ai/sdk-php',
      docsUrl: '/docs/php',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Go',
      description: 'High-performance Go SDK for microservices and cloud applications',
      icon: <Zap className="h-8 w-8 text-cyan-500" />,
      version: 'v1.5.2',
      downloads: '180K+',
      rating: 4.9,
      features: ['Context support', 'Goroutine safe', 'gRPC support', 'Minimal dependencies'],
      installCommand: 'go get github.com/enclose-ai/sdk-go',
      githubUrl: 'https://github.com/enclose-ai/sdk-go',
      docsUrl: '/docs/go',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      name: 'Ruby',
      description: 'Elegant Ruby SDK for Rails applications and Ruby scripts',
      icon: <Gem className="h-8 w-8 text-red-500" />,
      version: 'v2.2.1',
      downloads: '95K+',
      rating: 4.6,
      features: ['Rails integration', 'ActiveRecord support', 'RSpec helpers', 'Gem packaging'],
      installCommand: 'gem install enclose-ai',
      githubUrl: 'https://github.com/enclose-ai/sdk-ruby',
      docsUrl: '/docs/ruby',
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'Java',
      description: 'Enterprise-grade Java SDK for Spring Boot and enterprise applications',
      icon: <Coffee className="h-8 w-8 text-orange-500" />,
      version: 'v4.0.1',
      downloads: '320K+',
      rating: 4.8,
      features: ['Spring Boot starter', 'Maven/Gradle support', 'JAX-RS integration', 'Jackson serialization'],
      installCommand: 'mvn install enclose-ai-java',
      githubUrl: 'https://github.com/enclose-ai/sdk-java',
      docsUrl: '/docs/java',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const frameworks = [
    {
      name: 'React',
      description: 'React components and hooks for payment integration',
      icon: '⚛️',
      package: '@enclose-ai/react',
      features: ['Payment forms', 'Webhook handling', 'State management']
    },
    {
      name: 'Vue.js',
      description: 'Vue.js components for seamless payment experiences',
      icon: '💚',
      package: '@enclose-ai/vue',
      features: ['Composable functions', 'TypeScript support', 'Nuxt.js integration']
    },
    {
      name: 'Angular',
      description: 'Angular services and components for payment processing',
      icon: '🅰️',
      package: '@enclose-ai/angular',
      features: ['Injectable services', 'RxJS observables', 'Angular Material UI']
    },
    {
      name: 'Next.js',
      description: 'Next.js specific utilities and API routes',
      icon: '▲',
      package: '@enclose-ai/nextjs',
      features: ['API route helpers', 'Middleware support', 'SSR optimization']
    },
    {
      name: 'Laravel',
      description: 'Laravel package with artisan commands and middleware',
      icon: '🔴',
      package: 'enclose-ai/laravel',
      features: ['Artisan commands', 'Middleware', 'Eloquent models']
    },
    {
      name: 'Django',
      description: 'Django integration with admin interface and forms',
      icon: '🐍',
      package: 'django-enclose-ai',
      features: ['Admin integration', 'Form widgets', 'Management commands']
    }
  ]

  const quickStartCode = {
    javascript: `// Install the SDK
npm install @enclose-ai/sdk

// Initialize the client
import { EncloseAI } from '@enclose-ai/sdk'

const enclose = new EncloseAI({
  apiKey: process.env.ENCLOSE_API_KEY,
  environment: 'production' // or 'sandbox'
})

// Create a payment
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

console.log('Payment created:', payment.id)`,
    python: `# Install the SDK
pip install enclose-ai

# Initialize the client
from enclose_ai import EncloseAI

enclose = EncloseAI(
    api_key='your_api_key',
    environment='production'  # or 'sandbox'
)

# Create a payment
payment = enclose.payments.create(
    amount=2000,  # $20.00
    currency='usd',
    customer={
        'email': 'customer@example.com'
    },
    metadata={
        'order_id': 'order_123'
    }
)

print(f"Payment created: {payment.id}")`,
    php: `<?php
// Install via Composer
composer require enclose-ai/php-sdk

// Initialize the client
use EncloseAI\\EncloseAI;

$enclose = new EncloseAI([
    'api_key' => 'your_api_key',
    'environment' => 'production' // or 'sandbox'
]);

// Create a payment
$payment = $enclose->payments->create([
    'amount' => 2000, // $20.00
    'currency' => 'usd',
    'customer' => [
        'email' => 'customer@example.com'
    ],
    'metadata' => [
        'order_id' => 'order_123'
    ]
]);

echo "Payment created: " . $payment->id;`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
            <Code className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            SDKs & Libraries
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Official SDKs and libraries for every major programming language and framework. 
            Get started in minutes with our battle-tested, production-ready code.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">6</div>
            <div className="text-sm text-gray-600 mt-1">Official SDKs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">4M+</div>
            <div className="text-sm text-gray-600 mt-1">Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">99.9%</div>
            <div className="text-sm text-gray-600 mt-1">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">24/7</div>
            <div className="text-sm text-gray-600 mt-1">Support</div>
          </div>
        </div>

        {/* Official SDKs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Official SDKs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sdks.map((sdk) => (
              <Card key={sdk.name} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${sdk.color} flex items-center justify-center`}>
                      {sdk.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">v{sdk.version}</div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{sdk.rating}</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{sdk.name}</CardTitle>
                  <CardDescription className="text-gray-600">{sdk.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Downloads</span>
                      <span className="font-medium">{sdk.downloads}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {sdk.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Install command:</div>
                      <code className="text-sm font-mono bg-white px-2 py-1 rounded border w-full block">
                        {sdk.installCommand}
                      </code>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link href={sdk.docsUrl}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Docs
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="flex-1">
                        <a href={sdk.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Framework Integrations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Framework Integrations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((framework) => (
              <Card key={framework.name} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{framework.icon}</span>
                    <CardTitle className="text-lg">{framework.name}</CardTitle>
                  </div>
                  <CardDescription>{framework.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <code className="text-sm font-mono">{framework.package}</code>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {framework.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Start</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-500" />
                  JavaScript/TypeScript
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{quickStartCode.javascript}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-green-500" />
                  Python
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{quickStartCode.python}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-purple-500" />
                  PHP
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{quickStartCode.php}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Community & Support */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Community & Support</h2>
            <p className="text-lg text-gray-600">
              Join our developer community and get help when you need it
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Github className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">GitHub Community</h3>
              <p className="text-gray-600 mb-4">
                Contribute to our open-source SDKs and get help from the community
              </p>
              <Button asChild>
                <a href="https://github.com/enclose-ai" target="_blank" rel="noopener noreferrer">
                  Join GitHub
                </a>
              </Button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Documentation</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive guides, API references, and code examples
              </p>
              <Button asChild variant="outline">
                <Link href="/docs">
                  View Docs
                </Link>
              </Button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Developer Support</h3>
              <p className="text-gray-600 mb-4">
                Get help from our engineering team and developer advocates
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
