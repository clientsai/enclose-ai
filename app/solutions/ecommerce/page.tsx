import PageLayout from '@/components/PageLayout'
import { ShoppingCart, TrendingUp, Globe, Shield, Zap, CreditCard, Package, BarChart, CheckCircle, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function EcommerceSolutionPage() {
  const features = [
    {
      icon: <ShoppingCart className="h-8 w-8 text-indigo-600" />,
      title: 'One-Click Checkout',
      description: 'Reduce cart abandonment with streamlined payment flows that convert browsers into buyers in seconds.',
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: 'Global Payment Methods',
      description: 'Accept 135+ currencies and local payment methods including Alipay, WeChat Pay, SEPA, and more.',
    },
    {
      icon: <Package className="h-8 w-8 text-green-600" />,
      title: 'Inventory Management',
      description: 'Automatic stock updates, backorder handling, and real-time inventory synchronization across channels.',
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-600" />,
      title: 'Conversion Analytics',
      description: 'Track cart abandonment, identify friction points, and optimize your checkout funnel with AI insights.',
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: 'Fraud Prevention',
      description: 'Machine learning algorithms detect and prevent fraudulent transactions while minimizing false declines.',
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: 'Instant Settlements',
      description: 'Get paid faster with accelerated settlement times and transparent fee structures.',
    },
  ]

  const metrics = [
    { value: '47%', label: 'Higher Conversion', description: 'Average increase in checkout completion' },
    { value: '2.3s', label: 'Checkout Time', description: 'From cart to confirmation' },
    { value: '89%', label: 'Less Abandonment', description: 'Reduction in cart abandonment' },
    { value: '$127M+', label: 'Processed Monthly', description: 'Trusted by major retailers' },
  ]

  const testimonials = [
    {
      quote: "Enclose.AI transformed our checkout experience. We saw a 52% increase in conversions within the first month.",
      author: "Emma Thompson",
      role: "CEO, Fashion Forward",
      rating: 5,
    },
    {
      quote: "The global payment support opened up international markets we couldn't reach before. Game-changing.",
      author: "David Kim",
      role: "Founder, TechGear Pro",
      rating: 5,
    },
  ]

  const useCases = [
    {
      title: 'Flash Sales & Promotions',
      description: 'Handle traffic spikes with infrastructure that scales automatically. Process thousands of transactions per second without performance degradation.',
    },
    {
      title: 'Subscription Commerce',
      description: 'Manage recurring billing, trial periods, and subscription lifecycles with intelligent dunning and retry logic.',
    },
    {
      title: 'Marketplace Payments',
      description: 'Split payments between multiple vendors, handle escrow, and manage complex payout schedules automatically.',
    },
    {
      title: 'Mobile Commerce',
      description: 'Optimized checkout flows for mobile devices with biometric authentication and one-tap payments.',
    },
  ]

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-6">
                <ShoppingCart className="h-4 w-4 mr-2" />
                E-Commerce Solution
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Payment Processing Built for
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Modern E-Commerce
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Transform your online store with intelligent payment processing that increases conversions,
                reduces abandonment, and scales with your business. From flash sales to global expansion,
                we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50">
                    Watch Demo
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">No credit card required • 14-day free trial</p>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.map((metric) => (
                <div key={metric.label} className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {metric.value}
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">{metric.label}</div>
                  <div className="text-sm text-gray-600">{metric.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The E-Commerce Payment Challenge</h2>
              <div className="prose prose-lg text-gray-600 max-w-none mb-8">
                <p>
                  Every e-commerce business faces the same critical challenge: converting visitors into paying customers.
                  Studies show that 69.8% of online shopping carts are abandoned, with complicated checkout processes being
                  the primary cause. Each additional step in your payment flow increases abandonment by 7%.
                </p>
                <p>
                  Traditional payment solutions treat e-commerce as an afterthought, forcing you to cobble together multiple
                  services for payments, fraud prevention, analytics, and international support. This fragmented approach
                  creates technical debt, security vulnerabilities, and poor customer experiences.
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Enclose.AI: Purpose-Built for E-Commerce</h3>
                <p className="text-gray-700 mb-6">
                  We've reimagined payment processing specifically for e-commerce businesses. Our platform combines
                  Stripe's robust infrastructure with intelligent optimization algorithms that understand e-commerce
                  dynamics—from seasonal traffic spikes to international expansion challenges.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">One-click checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Global payment methods</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">AI fraud prevention</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Real-time analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Instant settlements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">24/7 support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Sell Online</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive features designed specifically for e-commerce success
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Built for Every E-Commerce Model</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Seamless Integration with Your Stack</h2>
              <p className="text-xl text-gray-600">Works with the tools you already use and love</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-2">🛍️</div>
                  <h4 className="font-semibold text-gray-900">Shopify</h4>
                  <p className="text-sm text-gray-600">One-click integration</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🛒</div>
                  <h4 className="font-semibold text-gray-900">WooCommerce</h4>
                  <p className="text-sm text-gray-600">WordPress plugin</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">💎</div>
                  <h4 className="font-semibold text-gray-900">Magento</h4>
                  <p className="text-sm text-gray-600">Native extension</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🚀</div>
                  <h4 className="font-semibold text-gray-900">Custom Builds</h4>
                  <p className="text-sm text-gray-600">RESTful API</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Trusted by Leading E-Commerce Brands</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your E-Commerce Payments?</h2>
              <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
                Join thousands of online retailers using Enclose.AI to increase conversions and grow revenue
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="px-8 bg-white text-indigo-600 hover:bg-gray-100">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact-sales">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Talk to Sales
                  </Button>
                </Link>
              </div>
              <p className="mt-8 text-indigo-200">
                ✓ 14-day free trial &nbsp;&nbsp; ✓ No credit card required &nbsp;&nbsp; ✓ Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}