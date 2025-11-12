import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variant === "default" && "bg-blue-100 text-blue-800 border-transparent",
        variant === "secondary" && "bg-gray-100 text-gray-800 border-transparent",
        variant === "outline" && "text-gray-800 border-gray-300",
        className
      )}
      {...props}
    />
  )
}
