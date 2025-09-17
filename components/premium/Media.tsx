import { cn } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'

interface PictureProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  quality?: number
}

export function Picture({
  src,
  alt,
  className,
  width = 1200,
  height = 800,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85
}: PictureProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        quality={quality}
        className="w-full h-auto object-cover"
      />
    </div>
  )
}

interface FigureProps {
  children: React.ReactNode
  caption?: string
  className?: string
}

export function Figure({
  children,
  caption,
  className
}: FigureProps) {
  return (
    <figure className={cn('space-y-2', className)}>
      {children}
      {caption && (
        <figcaption className="text-sm text-gray-500 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  poster?: string
  className?: string
}

export function Video({
  poster,
  className,
  ...props
}: VideoProps) {
  return (
    <video
      className={cn('w-full rounded-lg', className)}
      poster={poster}
      controls
      playsInline
      {...props}
    />
  )
}