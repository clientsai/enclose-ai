import { cn } from '@/lib/utils'
import React from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  as?: 'section' | 'article' | 'div'
  width?: 'default' | 'narrow' | 'full'
  spacing?: 'default' | 'large' | 'small'
}

export function Section({
  children,
  className,
  as: Component = 'section',
  width = 'default',
  spacing = 'default'
}: SectionProps) {
  const widthClasses = {
    default: 'max-w-7xl',
    narrow: 'max-w-5xl',
    full: 'max-w-full'
  }

  const spacingClasses = {
    small: 'py-8 md:py-12',
    default: 'py-12 md:py-20',
    large: 'py-20 md:py-32'
  }

  return (
    <Component className={cn(
      'w-full',
      spacingClasses[spacing],
      className
    )}>
      <div className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        widthClasses[width]
      )}>
        {children}
      </div>
    </Component>
  )
}

interface SplitProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  align?: 'start' | 'center' | 'end'
}

export function Split({
  children,
  className,
  reverse = false,
  align = 'center'
}: SplitProps) {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end'
  }

  return (
    <div className={cn(
      'grid gap-12 lg:grid-cols-2 lg:gap-16',
      reverse && 'lg:grid-flow-col-dense',
      alignClasses[align],
      className
    )}>
      {children}
    </div>
  )
}

interface GridProps {
  children: React.ReactNode
  className?: string
  cols?: 2 | 3 | 4
  gap?: 'default' | 'large' | 'small'
}

export function Grid({
  children,
  className,
  cols = 3,
  gap = 'default'
}: GridProps) {
  const colClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }

  const gapClasses = {
    small: 'gap-4',
    default: 'gap-6 lg:gap-8',
    large: 'gap-8 lg:gap-12'
  }

  return (
    <div className={cn(
      'grid',
      colClasses[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

interface ClusterProps {
  children: React.ReactNode
  className?: string
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  wrap?: boolean
}

export function Cluster({
  children,
  className,
  justify = 'start',
  wrap = true
}: ClusterProps) {
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around'
  }

  return (
    <div className={cn(
      'flex items-center gap-4',
      wrap && 'flex-wrap',
      justifyClasses[justify],
      className
    )}>
      {children}
    </div>
  )
}

interface StackProps {
  children: React.ReactNode
  className?: string
  gap?: 'default' | 'large' | 'small' | 'none'
  align?: 'start' | 'center' | 'end'
}

export function Stack({
  children,
  className,
  gap = 'default',
  align = 'start'
}: StackProps) {
  const gapClasses = {
    none: '',
    small: 'space-y-2',
    default: 'space-y-4',
    large: 'space-y-8'
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end'
  }

  return (
    <div className={cn(
      'flex flex-col',
      gapClasses[gap],
      alignClasses[align],
      className
    )}>
      {children}
    </div>
  )
}