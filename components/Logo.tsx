import Link from 'next/link'
import { CreditCard } from 'lucide-react'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-xl' },
    md: { icon: 24, text: 'text-2xl' },
    lg: { icon: 32, text: 'text-3xl' },
  }

  const currentSize = sizes[size]

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur-lg opacity-75" />
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
          <CreditCard className="text-white" size={currentSize.icon} />
        </div>
      </div>
      {showText && (
        <span className={`${currentSize.text} font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
          Enclose.AI
        </span>
      )}
    </Link>
  )
}