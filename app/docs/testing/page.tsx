/* Testing Guide Page - Comprehensive Testing Documentation */
import { TestTube, CheckCircle, AlertTriangle, Code, Play, Bug, Shield, Zap, Clock, Users, BookOpen, Download, ArrowRight, Copy, Terminal, FileText, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function TestingGuidePage() {
  const testingTypes = [
    {
      title: 'Unit Testing',
      description: 'Test individual functions and components in isolation',
      icon: <TestTube className="h-6 w-6 text-blue-500" />,
      frameworks: ['Jest', 'Mocha', 'Pytest', 'PHPUnit', 'RSpec'],
      examples: [
        'Payment validation functions',
        'Webhook signature verification',
        'Currency conversion utilities',
        'Error handling logic'
      ]
    },
    {
      title: 'Integration Testing',
      description: 'Test how different parts of your system work together',
      icon: <Zap className="h-6 w-6 text-green-500" />,
      frameworks: ['Supertest', 'Cypress', 'Playwright', 'Postman', 'Newman'],
      examples: [
        'API endpoint responses',
        'Database interactions',
        'Third-party service calls',
        'Authentication flows'
      ]
    },
    {
      title: 'End-to-End Testing',
      description: 'Test complete user workflows from start to finish',
      icon: <Play className="h-6 w-6 text-purple-500" />,
      frameworks: ['Cypress', 'Playwright', 'Selenium', 'TestCafe', 'Puppeteer'],
      examples: [
        'Complete payment flows',
        'User registration and login',
        'Webhook delivery and processing',
        'Error recovery scenarios'
      ]
    },
    {
      title: 'Load Testing',
      description: 'Test system performance under various load conditions',
      icon: <Clock className="h-6 w-6 text-orange-500" />,
      frameworks: ['Artillery', 'k6', 'JMeter', 'Gatling', 'Locust'],
      examples: [
        'High-volume payment processing',
        'Concurrent webhook handling',
        'Database performance under load',
        'API rate limiting behavior'
      ]
    }
  ]

  const testEnvironments = [
    {
      name: 'Sandbox',
      description: 'Safe environment for development and testing',
      url: 'https://api.sandbox.enclose.ai',
      features: ['Test payments', 'Mock webhooks', 'No real money', 'Full API access'],
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Staging',
      description: 'Production-like environment for final testing',
      url: 'https://api.staging.enclose.ai',
      features: ['Production data', 'Real webhooks', 'Performance testing', 'Security testing'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Production',
      description: 'Live environment for real transactions',
      url: 'https://api.enclose.ai',
      features: ['Real payments', 'Live webhooks', 'Customer data', 'Full monitoring'],
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const codeExamples = {
    javascript: `// Jest test example
import { EncloseAI } from '@enclose-ai/sdk'

describe('Payment Processing', () => {
  let enclose: EncloseAI

  beforeEach(() => {
    enclose = new EncloseAI({
      apiKey: process.env.ENCLOSE_TEST_API_KEY,
      environment: 'sandbox'
    })
  })

  test('should create a payment successfully', async () => {
    const paymentData = {
      amount: 2000,
      currency: 'usd',
      customer: {
        email: 'test@example.com'
      }
    }

    const payment = await enclose.payments.create(paymentData)
    
    expect(payment.id).toBeDefined()
    expect(payment.amount).toBe(2000)
    expect(payment.status).toBe('pending')
  })

  test('should handle payment failures gracefully', async () => {
    const invalidData = {
      amount: -100, // Invalid amount
      currency: 'usd'
    }

    await expect(enclose.payments.create(invalidData))
      .rejects
      .toThrow('Amount must be positive')
  })
})`,
    python: `# Pytest test example
import pytest
from enclose_ai import EncloseAI
from enclose_ai.exceptions import EncloseAIError

class TestPaymentProcessing:
    @pytest.fixture
    def enclose(self):
        return EncloseAI(
            api_key='test_key',
            environment='sandbox'
        )

    def test_create_payment_success(self, enclose):
        payment_data = {
            'amount': 2000,
            'currency': 'usd',
            'customer': {
                'email': 'test@example.com'
            }
        }
        
        payment = enclose.payments.create(payment_data)
        
        assert payment.id is not None
        assert payment.amount == 2000
        assert payment.status == 'pending'

    def test_payment_validation_error(self, enclose):
        invalid_data = {
            'amount': -100,  # Invalid amount
            'currency': 'usd'
        }
        
        with pytest.raises(EncloseAIError) as exc_info:
            enclose.payments.create(invalid_data)
        
        assert 'Amount must be positive' in str(exc_info.value)`,
    php: `<?php
// PHPUnit test example
use PHPUnit\\Framework\\TestCase;
use EncloseAI\\EncloseAI;
use EncloseAI\\Exceptions\\EncloseAIException;

class PaymentProcessingTest extends TestCase
{
    private $enclose;

    protected function setUp(): void
    {
        $this->enclose = new EncloseAI([
            'api_key' => 'test_key',
            'environment' => 'sandbox'
        ]);
    }

    public function testCreatePaymentSuccess()
    {
        $paymentData = [
            'amount' => 2000,
            'currency' => 'usd',
            'customer' => [
                'email' => 'test@example.com'
            ]
        ];

        $payment = $this->enclose->payments->create($paymentData);

        $this->assertNotNull($payment->id);
        $this->assertEquals(2000, $payment->amount);
        $this->assertEquals('pending', $payment->status);
    }

    public function testPaymentValidationError()
    {
        $invalidData = [
            'amount' => -100, // Invalid amount
            'currency' => 'usd'
        ];

        $this->expectException(EncloseAIException::class);
        $this->expectExceptionMessage('Amount must be positive');

        $this->enclose->payments->create($invalidData);
    }
}`
  }

  const webhookTesting = {
    setup: `# Webhook testing setup
import { EncloseAI } from '@enclose-ai/sdk'

const enclose = new EncloseAI({
  apiKey: process.env.ENCLOSE_API_KEY,
  environment: 'sandbox'
})

// Create a test webhook endpoint
const webhookEndpoint = await enclose.webhooks.create({
  url: 'https://your-app.com/webhooks/enclose',
  events: ['payment.succeeded', 'payment.failed'],
  secret: 'whsec_test_123456789'
})

console.log('Webhook created:', webhookEndpoint.id)`,
    verification: `# Webhook signature verification
import crypto from 'crypto'

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex')
  
  const receivedSignature = signature.replace('sha256=', '')
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(receivedSignature, 'hex')
  )
}

// In your webhook handler
app.post('/webhooks/enclose', (req, res) => {
  const signature = req.headers['enclose-signature']
  const payload = JSON.stringify(req.body)
  
  if (!verifyWebhookSignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(400).send('Invalid signature')
  }
  
  // Process the webhook
  console.log('Webhook received:', req.body)
  res.status(200).send('OK')
})`,
    testing: `# Webhook testing with ngrok
# 1. Install ngrok
npm install -g ngrok

# 2. Start your local server
npm start

# 3. Expose your local server
ngrok http 3000

# 4. Update webhook URL in Enclose dashboard
# Use the ngrok URL: https://abc123.ngrok.io/webhooks/enclose

# 5. Test webhook delivery
curl -X POST https://api.sandbox.enclose.ai/v1/webhooks/test \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"webhook_id": "wh_123456789"}'
`
  }

  const bestPractices = [
    {
      category: 'Test Data Management',
      practices: [
        'Use consistent test data across environments',
        'Clean up test data after each test run',
        'Use factories or builders for test data creation',
        'Never use production data in tests'
      ]
    },
    {
      category: 'API Testing',
      practices: [
        'Test all HTTP status codes and error responses',
        'Validate request and response schemas',
        'Test rate limiting and authentication',
        'Use realistic payload sizes and data'
      ]
    },
    {
      category: 'Webhook Testing',
      practices: [
        'Test webhook signature verification',
        'Handle duplicate webhook deliveries',
        'Test webhook retry logic',
        'Monitor webhook delivery success rates'
      ]
    },
    {
      category: 'Security Testing',
      practices: [
        'Test input validation and sanitization',
        'Verify authentication and authorization',
        'Test for common vulnerabilities (OWASP Top 10)',
        'Use security scanning tools'
      ]
    },
    {
      category: 'Performance Testing',
      practices: [
        'Set realistic performance benchmarks',
        'Test under various load conditions',
        'Monitor memory usage and response times',
        'Test database query performance'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
            <TestTube className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Testing Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive testing strategies and best practices for building reliable payment applications. 
            Learn how to test every aspect of your integration with confidence.
          </p>
        </div>

        {/* Testing Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Testing Types</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testingTypes.map((type) => (
              <Card key={type.title} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    {type.icon}
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Popular Frameworks:</h4>
                      <div className="flex flex-wrap gap-1">
                        {type.frameworks.map((framework) => (
                          <span key={framework} className="px-2 py-1 bg-gray-100 text-xs rounded">
                            {framework}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Common Examples:</h4>
                      <ul className="space-y-1">
                        {type.examples.map((example) => (
                          <li key={example} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            {example}
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

        {/* Test Environments */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Test Environments</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testEnvironments.map((env) => (
              <Card key={env.name} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${env.color} flex items-center justify-center mb-4`}>
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{env.name}</CardTitle>
                  <CardDescription className="text-gray-600">{env.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">API Endpoint:</div>
                      <code className="text-sm font-mono">{env.url}</code>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {env.features.map((feature) => (
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

        {/* Code Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Code Examples</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-500" />
                  JavaScript/TypeScript
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{codeExamples.javascript}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-green-500" />
                  Python
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{codeExamples.python}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-500" />
                  PHP
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{codeExamples.php}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Webhook Testing */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Webhook Testing</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-500" />
                  Setup
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{webhookTesting.setup}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Verification
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{webhookTesting.verification}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TestTube className="h-5 w-5 text-purple-500" />
                  Testing
                </h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{webhookTesting.testing}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Best Practices</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestPractices.map((category) => (
              <Card key={category.category} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.practices.map((practice) => (
                      <li key={practice} className="flex items-start gap-3 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {practice}
                      </li>
                    ))}
                  </ul>
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
              Tools, documentation, and community resources to help you test effectively
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Testing Documentation</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive guides and API references for testing
              </p>
              <Button asChild>
                <Link href="/docs">
                  View Docs
                </Link>
              </Button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Testing Tools</h3>
              <p className="text-gray-600 mb-4">
                Download our testing utilities and sample code
              </p>
              <Button asChild variant="outline">
                <Link href="/docs/testing/tools">
                  Get Tools
                </Link>
              </Button>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-gray-600 mb-4">
                Get help from our developer community and experts
              </p>
              <Button asChild variant="outline">
                <Link href="/community">
                  Join Community
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
