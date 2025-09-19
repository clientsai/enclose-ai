import PageLayout from '@/components/PageLayout'
import { Webhook, Code, Shield, Zap, AlertCircle, CheckCircle, Copy, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function WebhooksPage() {
  const webhookEvents = [
    {
      event: 'payment.completed',
      description: 'Fired when a payment is successfully processed',
      payload: `{
  "event": "payment.completed",
  "timestamp": "2025-01-18T10:30:00Z",
  "data": {
    "payment_id": "pay_abc123xyz",
    "amount": 15000,
    "currency": "USD",
    "customer_email": "customer@example.com",
    "metadata": {
      "order_id": "order_789",
      "agent_id": "agent_456"
    }
  }
}`
    },
    {
      event: 'payment.failed',
      description: 'Fired when a payment attempt fails',
      payload: `{
  "event": "payment.failed",
  "timestamp": "2025-01-18T10:31:00Z",
  "data": {
    "payment_id": "pay_def456uvw",
    "error_code": "card_declined",
    "error_message": "Your card was declined",
    "amount": 8500,
    "currency": "USD"
  }
}`
    },
    {
      event: 'link.created',
      description: 'Fired when a new payment link is created',
      payload: `{
  "event": "link.created",
  "timestamp": "2025-01-18T10:32:00Z",
  "data": {
    "link_id": "link_ghi789rst",
    "url": "https://pay.enclose.ai/link_ghi789rst",
    "amount": 25000,
    "currency": "USD",
    "expires_at": "2025-02-18T10:32:00Z"
  }
}`
    },
    {
      event: 'refund.processed',
      description: 'Fired when a refund is successfully processed',
      payload: `{
  "event": "refund.processed",
  "timestamp": "2025-01-18T10:33:00Z",
  "data": {
    "refund_id": "ref_jkl012mno",
    "payment_id": "pay_abc123xyz",
    "amount": 5000,
    "currency": "USD",
    "reason": "customer_request"
  }
}`
    }
  ]

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
              <Webhook className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Webhooks
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-time event notifications for your payment infrastructure
            </p>
          </div>

          {/* Overview Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">How Webhooks Work</h2>
            <div className="prose prose-lg text-gray-600 max-w-none mb-8">
              <p>
                Webhooks allow your application to receive real-time notifications when events occur in your Enclose.AI account.
                Instead of polling our API for changes, we'll send HTTP POST requests to your specified endpoint whenever
                important events happen.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Updates</h3>
                <p className="text-sm text-gray-600">
                  Receive instant notifications the moment events occur
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Delivery</h3>
                <p className="text-sm text-gray-600">
                  HMAC signatures ensure webhook authenticity
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Automatic Retries</h3>
                <p className="text-sm text-gray-600">
                  Failed deliveries are retried with exponential backoff
                </p>
              </div>
            </div>
          </div>

          {/* Configuration Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Setup</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">1. Configure Your Endpoint</h3>
                <div className="bg-white rounded-lg p-4 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <code className="text-gray-700">POST https://your-domain.com/webhooks/enclose</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy('https://your-domain.com/webhooks/enclose')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">2. Verify Webhook Signatures</h3>
                <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                  <pre>{`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// In your webhook handler
app.post('/webhooks/enclose', (req, res) => {
  const signature = req.headers['x-enclose-signature'];
  const isValid = verifyWebhookSignature(
    JSON.stringify(req.body),
    signature,
    process.env.WEBHOOK_SECRET
  );

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  // Process the webhook event
  const event = req.body;
  console.log('Received event:', event.event);

  res.status(200).send('OK');
});`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">3. Handle Events</h3>
                <p className="text-gray-600">
                  Process webhook events asynchronously to ensure fast response times. Always return a 200 status
                  code immediately, then process the event in the background.
                </p>
              </div>
            </div>
          </div>

          {/* Event Types */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Webhook Events</h2>
            <div className="space-y-6">
              {webhookEvents.map((webhook) => (
                <div key={webhook.event} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 font-mono">{webhook.event}</h3>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(webhook.payload)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Payload
                      </Button>
                    </div>
                    <p className="text-gray-600">{webhook.description}</p>
                  </div>
                  <div className="bg-gray-900 p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm font-mono">{webhook.payload}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Always verify signatures</h3>
                  <p className="text-sm text-gray-600">
                    Validate HMAC signatures to ensure webhooks are from Enclose.AI
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Handle duplicates idempotently</h3>
                  <p className="text-sm text-gray-600">
                    Use event IDs to prevent processing the same event twice
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Return 200 quickly</h3>
                  <p className="text-sm text-gray-600">
                    Acknowledge receipt immediately, process asynchronously
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Log all webhook events</h3>
                  <p className="text-sm text-gray-600">
                    Maintain audit logs for debugging and compliance
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Don't expose sensitive data</h3>
                  <p className="text-sm text-gray-600">
                    Never log full card numbers or sensitive customer data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Monitor webhook failures</h3>
                  <p className="text-sm text-gray-600">
                    Set up alerts for failed webhook deliveries
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testing Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Testing Webhooks</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Test Mode</h3>
                <p className="text-gray-600 mb-4">
                  Use test mode to send webhook events to your development environment without affecting production data.
                </p>
                <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50">
                  <Terminal className="h-4 w-4 mr-2" />
                  Open Webhook Tester
                </Button>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Event Replay</h3>
                <p className="text-gray-600 mb-4">
                  Replay any webhook event from the last 30 days directly from your dashboard for debugging.
                </p>
                <Link href="/dashboard/webhooks">
                  <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50">
                    View Event Logs
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <Code className="h-12 w-12 mx-auto mb-4 text-white/90" />
            <h3 className="text-2xl font-bold mb-4">Ready to Integrate?</h3>
            <p className="mb-6 text-indigo-100">
              Check out our comprehensive API documentation and SDKs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/api-reference">
                <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                  API Reference
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}