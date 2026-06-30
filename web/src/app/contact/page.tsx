import { Metadata } from "next"

import { Container, Section } from "@/components/layout/container"
import { H1, H2 } from "@/components/ui/typography"
import { NewsletterSection } from "@/components/article/newsletter-section"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Desi Angrezi",
  description: "Get in touch with the Desi Angrezi team. We'd love to hear from you.",
}

export default function ContactPage() {
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
                <BreadcrumbPage>Contact</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <H1 className="mb-6 text-4xl font-bold lg:text-5xl">Contact Us</H1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            Have a question, feedback, or a story pitch? We&apos;d love to hear from you. 
            Fill out the form below or reach us through our direct channels.
          </p>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100">
            <H2 className="text-2xl mb-8 text-center">Send us a Message</H2>
            <ContactForm />
          </div>
        </Container>
      </Section>

      <NewsletterSection />
    </>
  )
}
