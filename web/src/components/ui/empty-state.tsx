import * as React from "react"
import { SearchX, FileQuestion, type LucideIcon } from "lucide-react"
import { H3 } from "./typography"
import { cn } from "@/lib/utils"

export interface EmptyStateProps {
  title: string
  description?: string
  icon?: LucideIcon
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ 
  title, 
  description, 
  icon: Icon = FileQuestion,
  action,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn("flex min-h-[400px] flex-col items-center justify-center text-center p-8", className)}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-6">
        <Icon className="h-10 w-10 text-gray-400" />
      </div>
      <H3 className="mb-2 text-gray-900 border-0 pb-0">{title}</H3>
      {description && (
        <p className="max-w-md text-gray-500 mb-6">{description}</p>
      )}
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  )
}
