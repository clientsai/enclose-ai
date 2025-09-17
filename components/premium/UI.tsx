import { cn } from '@/lib/utils'
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  gradient?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'right',
  gradient = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variantClasses = {
    primary: gradient
      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-900',
    ghost: 'hover:bg-gray-100 text-gray-700'
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5'
  }

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    )
  }

  return (
    <button className={buttonClasses} {...props}>
      {content}
    </button>
  )
}

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  onClick?: () => void
}

export function Card({
  children,
  className,
  hover = false,
  gradient = false,
  onClick
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200',
        'shadow-sm',
        hover && 'transition-all duration-300 hover:border-indigo-200 hover:shadow-xl cursor-pointer',
        gradient && 'bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
}

export function Badge({
  children,
  className,
  variant = 'default',
  size = 'md'
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-indigo-100 text-indigo-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800'
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  }

  return (
    <span className={cn(
      'inline-flex items-center font-medium rounded-full',
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      {children}
    </span>
  )
}

interface DividerProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

export function Divider({
  className,
  orientation = 'horizontal',
  decorative = false
}: DividerProps) {
  return (
    <div
      className={cn(
        orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px',
        decorative
          ? 'bg-gradient-to-r from-transparent via-gray-300 to-transparent'
          : 'bg-gray-200',
        className
      )}
      role="separator"
      aria-orientation={orientation}
    />
  )
}

interface CalloutProps {
  children: React.ReactNode
  className?: string
  variant?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  icon?: React.ReactNode
}

export function Callout({
  children,
  className,
  variant = 'info',
  title,
  icon
}: CalloutProps) {
  const variantClasses = {
    info: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    danger: 'bg-red-50 border-red-200 text-red-900'
  }

  return (
    <div className={cn(
      'rounded-lg border-2 p-4',
      variantClasses[variant],
      className
    )}>
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {title && <h4 className="font-semibold">{title}</h4>}
        </div>
      )}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

interface StatProps {
  value: string | number
  label: string
  delta?: string
  className?: string
}

export function Stat({
  value,
  label,
  delta,
  className
}: StatProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <div className="text-3xl md:text-4xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {delta && (
        <div className="text-sm font-medium text-green-600">{delta}</div>
      )}
    </div>
  )
}

interface TestimonialProps {
  quote: string
  author: string
  role?: string
  company?: string
  avatar?: string
  className?: string
}

export function Testimonial({
  quote,
  author,
  role,
  company,
  avatar,
  className
}: TestimonialProps) {
  return (
    <blockquote className={cn('space-y-4', className)}>
      <p className="text-lg text-gray-600 leading-relaxed italic">
        "{quote}"
      </p>
      <footer className="flex items-center gap-3">
        {avatar && (
          <img
            src={avatar}
            alt={author}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div>
          <cite className="not-italic font-semibold text-gray-900">{author}</cite>
          {(role || company) && (
            <div className="text-sm text-gray-600">
              {role}{role && company && ' at '}{company}
            </div>
          )}
        </div>
      </footer>
    </blockquote>
  )
}

interface FAQItemProps {
  question: string
  answer: string
  className?: string
}

export function FAQItem({
  question,
  answer,
  className
}: FAQItemProps) {
  return (
    <details className={cn('group', className)}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
        {question}
        <div className="ml-4 flex-shrink-0">
          <svg
            className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </summary>
      <div className="pb-4 text-gray-600 leading-relaxed">
        {answer}
      </div>
    </details>
  )
}

interface TabsProps {
  tabs: Array<{ label: string; content: React.ReactNode }>
  className?: string
}

export function Tabs({ tabs, className }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <div className={cn('', className)}>
      <div className="flex space-x-1 border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors',
              activeTab === index
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  )
}

interface CTAProps {
  title: string
  description?: string
  buttonText: string
  buttonHref: string
  variant?: 'default' | 'gradient' | 'dark'
  className?: string
}

export function CTA({
  title,
  description,
  buttonText,
  buttonHref,
  variant = 'default',
  className
}: CTAProps) {
  const variantClasses = {
    default: 'bg-indigo-50',
    gradient: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white',
    dark: 'bg-gray-900 text-white'
  }

  return (
    <div className={cn(
      'rounded-2xl p-8 md:p-12 text-center',
      variantClasses[variant],
      className
    )}>
      <h3 className={cn(
        'text-2xl md:text-3xl font-bold mb-4',
        variant === 'default' ? 'text-gray-900' : ''
      )}>
        {title}
      </h3>
      {description && (
        <p className={cn(
          'text-lg mb-6',
          variant === 'default' ? 'text-gray-600' : 'opacity-90'
        )}>
          {description}
        </p>
      )}
      <Button
        href={buttonHref}
        size="lg"
        variant={variant === 'default' ? 'primary' : 'outline'}
        gradient={variant === 'default'}
        icon={<ArrowRight className="w-5 h-5" />}
      >
        {buttonText}
      </Button>
    </div>
  )
}