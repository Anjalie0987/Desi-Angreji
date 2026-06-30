import { Metadata } from "next"
import { Container, Section } from "@/components/layout/container"
import { H1 } from "@/components/ui/typography"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Privacy Policy | Desi Angrezi",
  description: "Learn how we collect, use, and protect your data.",
}

export default function PrivacyPage() {
  const lastUpdated = "July 1, 2026"

  return (
    <Section className="py-8">
      <Container className="max-w-4xl">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <H1 className="mb-4">Privacy Policy</H1>
        <p className="text-gray-500 mb-12">Last Updated: {lastUpdated}</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents (Sticky on Desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border-l-2 border-gray-100 pl-4 space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">Table of Contents</h4>
              <a href="#information-collection" className="block text-sm text-gray-500 hover:text-brand transition-colors">Information Collection</a>
              <a href="#use-of-information" className="block text-sm text-gray-500 hover:text-brand transition-colors">Use of Information</a>
              <a href="#data-protection" className="block text-sm text-gray-500 hover:text-brand transition-colors">Data Protection</a>
              <a href="#third-parties" className="block text-sm text-gray-500 hover:text-brand transition-colors">Third-Party Links</a>
              <a href="#contact" className="block text-sm text-gray-500 hover:text-brand transition-colors">Contact Us</a>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 prose prose-gray max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-brand hover:prose-a:text-brand-hover">
            <p>
              At Desi Angrezi, accessible from desiangrezi.com, one of our main priorities is the privacy of our visitors. 
              This Privacy Policy document contains types of information that is collected and recorded by Desi Angrezi and how we use it.
            </p>

            <h2 id="information-collection">Information Collection</h2>
            <p>
              We collect information to provide better services to all our users. The types of information we collect include:
            </p>
            <ul>
              <li><strong>Information you provide to us:</strong> This includes email addresses provided when subscribing to our newsletter or contacting us.</li>
              <li><strong>Information collected automatically:</strong> We use cookies and similar technologies to track usage patterns on our website.</li>
            </ul>

            <h2 id="use-of-information">Use of Information</h2>
            <p>
              We use the information we collect in various ways, including to:
            </p>
            <ul>
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you for customer service, updates, and other information</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h2 id="data-protection">Data Protection</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information when you enter, 
              submit, or access your personal information. However, no method of transmission over the Internet is 100% secure, 
              and we cannot guarantee absolute security.
            </p>

            <h2 id="third-parties">Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. These third-party sites have separate and independent privacy policies. 
              We therefore have no responsibility or liability for the content and activities of these linked sites.
            </p>

            <h2 id="contact">Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at 
              <a href="mailto:hello@desiangrezi.com"> hello@desiangrezi.com</a>.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
