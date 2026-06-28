import { Metadata } from "next"
import Link from "next/link"
import { Container, Section } from "@/components/layout/container"
import { H1, H2, H3 } from "@/components/ui/typography"
import { NewsletterSection } from "@/components/article/newsletter-section"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us | Desi Angrezi",
  description: "Learn more about Desi Angrezi, our mission, vision, and the team behind the stories.",
}

export default function AboutPage() {
  return (
    <>
      <Section className="pb-8 pt-6">
        <Container>
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <H1 className="mb-6 text-4xl font-bold lg:text-5xl">About Desi Angrezi</H1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            We are the premium destination for modern content, breaking news, and engaging stories that matter to the next generation.
          </p>
        </Container>
      </Section>

      <Section className="py-12 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <H2 className="mb-4">Our Mission</H2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                To empower our readers with accurate, engaging, and culturally relevant stories that inspire conversation and drive change.
              </p>
              
              <H2 className="mb-4 mt-8">Our Vision</H2>
              <p className="text-gray-700 leading-relaxed text-lg">
                To become the most trusted and culturally resonant digital publishing platform, bridging the gap between traditional journalism and modern digital storytelling.
              </p>
            </div>
            <div className="bg-brand/10 p-8 rounded-2xl border border-brand/20">
              <H3 className="text-brand mb-4">Why Desi Angrezi?</H3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white text-sm font-bold mr-3 mt-0.5">1</span>
                  <span className="text-gray-800">Uncompromised journalistic integrity tailored for the digital age.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white text-sm font-bold mr-3 mt-0.5">2</span>
                  <span className="text-gray-800">Stories that matter, curated without the noise.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white text-sm font-bold mr-3 mt-0.5">3</span>
                  <span className="text-gray-800">A community-driven approach to narrative building.</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container className="text-center max-w-2xl mx-auto">
          <H2 className="mb-6">Join Our Journey</H2>
          <p className="text-lg text-gray-600 mb-8">
            Whether you're a reader looking for the latest insights or a writer wanting to share your perspective, there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Read Stories</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <NewsletterSection />
    </>
  )
}
