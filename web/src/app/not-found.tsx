import Link from "next/link"
import { Search, Home, FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[70vh] items-center justify-center p-4">
      <EmptyState
        icon={FileQuestion}
        title="404 - Page Not Found"
        description="The page you are looking for doesn't exist or has been moved."
        action={
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button asChild variant="default">
              <Link href="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/search" className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Search Stories
              </Link>
            </Button>
          </div>
        }
      />
    </div>
  )
}
