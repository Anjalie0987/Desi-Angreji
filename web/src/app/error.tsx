"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle, RefreshCcw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col min-h-[70vh] items-center justify-center p-4">
      <EmptyState
        icon={AlertCircle}
        title="Something went wrong!"
        description="An unexpected error occurred while loading this page. We've been notified and are looking into it."
        action={
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button onClick={() => reset()} variant="default">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
        }
      />
    </div>
  )
}
