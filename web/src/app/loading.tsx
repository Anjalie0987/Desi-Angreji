import { Container, Section } from "@/components/layout/container"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-[70vh]">
      <Section className="pt-8 pb-16">
        <Container>
          <Skeleton className="h-10 w-1/3 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="w-full aspect-[4/3] rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
