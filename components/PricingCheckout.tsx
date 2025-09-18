'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface PricingCheckoutProps {
  plan: 'starter' | 'professional' | 'enterprise'
  billing: 'monthly' | 'yearly'
  highlighted?: boolean
  cta: string
}

export default function PricingCheckout({ plan, billing, highlighted, cta }: PricingCheckoutProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    // For enterprise plan, redirect to contact sales
    if (plan === 'enterprise') {
      router.push('/contact-sales')
      return
    }

    setLoading(true)

    try {
      // Call checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          billing,
        }),
      })

      const data = await response.json()

      if (data.error) {
        console.error('Checkout error:', data.error)
        alert(`Error: ${data.error}`)
        setLoading(false)
        return
      }

      // Handle demo mode
      if (data.mode === 'demo') {
        window.location.href = data.url
      } else if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else {
        // Fallback to registration
        router.push('/register')
      }
    } catch (error) {
      console.error('Checkout failed:', error)
      alert('Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <Button
      className={`w-full ${
        highlighted
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
          : ''
      }`}
      variant={highlighted ? 'default' : 'outline'}
      onClick={handleCheckout}
      disabled={loading}
    >
      <span className="flex items-center justify-center">
        {loading ? 'Processing...' : cta}
        {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
      </span>
    </Button>
  )
}