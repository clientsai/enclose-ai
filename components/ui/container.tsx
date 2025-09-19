import * as React from "react"
import { cn } from "@/lib/utils"

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  }
>(({ className, size = "xl", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-2xl": size === "sm",
          "max-w-4xl": size === "md", 
          "max-w-6xl": size === "lg",
          "max-w-7xl": size === "xl",
          "max-w-[1400px]": size === "2xl",
          "max-w-none": size === "full",
        },
        className
      )}
      {...props}
    />
  )
})
Container.displayName = "Container"

export { Container }
