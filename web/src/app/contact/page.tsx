import { Metadata } from "next"
import { Mail, MapPin, Phone, Clock } from "lucide-react"
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
            Have a question, feedback, or a story pitch? We'd love to hear from you. 
            Fill out the form below or reach us through our direct channels.
          </p>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <H2 className="text-2xl mb-6">Get in Touch</H2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-brand mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                      <a href="mailto:hello@desiangrezi.com" className="text-gray-600 hover:text-brand transition-colors">
                        hello@desiangrezi.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-brand mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                      <a href="tel:+919876543210" className="text-gray-600 hover:text-brand transition-colors">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-brand mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Office</h4>
                      <p className="text-gray-600">
                        123 Publishing Avenue<br />
                        Media City, Mumbai<br />
                        Maharashtra 400001
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-brand mt-1 mr-4 shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Business Hours</h4>
                      <p className="text-gray-600">
                        Monday - Friday<br />
                        9:00 AM - 6:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-xl overflow-hidden border border-gray-200 h-64 bg-gray-100 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <MapPin className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Google Maps Integration</span>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100">
              <H2 className="text-2xl mb-8">Send us a Message</H2>
              <ContactForm />
            </div>

          </div>
        </Container>
      </Section>

      <NewsletterSection />
    </>
  )
}
