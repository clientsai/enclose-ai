import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'light'
}

export default function Logo({ className = '', showText = true, size = 'md', variant = 'default' }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: 'text-xl' },
    md: { icon: 36, text: 'text-2xl' },
    lg: { icon: 48, text: 'text-3xl' },
  }

  const currentSize = sizes[size]
  const isLight = variant === 'light'

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.svg"
        alt="Enclose.AI Logo"
        width={currentSize.icon}
        height={currentSize.icon}
        className="drop-shadow-sm"
      />
      {showText && (
        <span className={`${currentSize.text} font-bold ${isLight ? 'text-white' : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'}`}>
          Enclose.AI
        </span>
      )}
    </Link>
  )
}