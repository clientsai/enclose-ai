import { cn } from '@/lib/utils'
import React from 'react'

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'display' | 'h1' | 'h2' | 'h3' | 'h4'
  gradient?: boolean
  balance?: boolean
}

export function Heading({
  as: Component = 'h2',
  size,
  gradient = false,
  balance = true,
  className,
  children,
  ...props
}: HeadingProps) {
  const defaultSize = Component === 'h1' ? 'h1' : Component === 'h3' ? 'h3' : Component === 'h4' ? 'h4' : 'h2'
  const actualSize = size || defaultSize

  const sizeClasses = {
    display: 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
    h2: 'text-3xl md:text-4xl font-bold',
    h3: 'text-xl md:text-2xl font-semibold',
    h4: 'text-lg md:text-xl font-semibold'
  }

  return (
    <Component
      className={cn(
        sizeClasses[actualSize],
        gradient && 'bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent',
        balance && 'text-balance',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'div' | 'span'
  size?: 'small' | 'body' | 'lead' | 'large'
  muted?: boolean
  balance?: boolean
}

export function Text({
  as: Component = 'p',
  size = 'body',
  muted = false,
  balance = false,
  className,
  children,
  ...props
}: TextProps) {
  const sizeClasses = {
    small: 'text-sm',
    body: 'text-base',
    lead: 'text-lg md:text-xl leading-relaxed',
    large: 'text-lg md:text-xl'
  }

  return (
    <Component
      className={cn(
        sizeClasses[size],
        muted && 'text-gray-600',
        balance && 'text-balance',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

interface ProseProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'article'
}

export function Prose({
  children,
  className,
  as: Component = 'div'
}: ProseProps) {
  return (
    <Component className={cn(
      'prose prose-gray prose-lg max-w-[72ch]',
      'prose-headings:font-bold',
      'prose-h2:text-2xl md:prose-h2:text-3xl',
      'prose-h3:text-xl md:prose-h3:text-2xl',
      'prose-p:text-gray-600 prose-p:leading-relaxed',
      'prose-strong:text-gray-900 prose-strong:font-semibold',
      'prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline',
      'prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-1 prose-blockquote:px-4',
      'prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none',
      'prose-pre:bg-gray-900',
      className
    )}>
      {children}
    </Component>
  )
}

interface EyebrowProps {
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export function Eyebrow({
  children,
  className,
  icon
}: EyebrowProps) {
  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1 rounded-full',
      'text-sm font-medium bg-indigo-100 text-indigo-800',
      className
    )}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  )
}

interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  className?: string
}

export function Lead({
  children,
  className,
  ...props
}: LeadProps) {
  return (
    <p
      className={cn(
        'text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}