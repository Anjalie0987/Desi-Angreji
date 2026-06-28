import { Metadata } from "next"
import { Container, Section } from "@/components/layout/container"
import { H1, H2 } from "@/components/ui/typography"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Cookie Policy | Desi Angrezi",
  description: "Learn how we use cookies and tracking technologies.",
}

export default function CookiePolicyPage() {
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
              <BreadcrumbPage>Cookie Policy</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <H1 className="mb-4">Cookie Policy</H1>
        <p className="text-gray-500 mb-12">Last Updated: {lastUpdated}</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents (Sticky on Desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border-l-2 border-gray-100 pl-4 space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">Table of Contents</h4>
              <a href="#what-are-cookies" className="block text-sm text-gray-500 hover:text-brand transition-colors">What Are Cookies</a>
              <a href="#how-we-use" className="block text-sm text-gray-500 hover:text-brand transition-colors">How We Use Cookies</a>
              <a href="#types" className="block text-sm text-gray-500 hover:text-brand transition-colors">Types of Cookies</a>
              <a href="#managing" className="block text-sm text-gray-500 hover:text-brand transition-colors">Managing Cookies</a>
              <a href="#contact" className="block text-sm text-gray-500 hover:text-brand transition-colors">Contact Us</a>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 prose prose-gray max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-brand hover:prose-a:text-brand-hover">
            <h2 id="what-are-cookies">What Are Cookies</h2>
            <p>
              Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored 
              in your web browser and allows the Service or a third party to recognize you and make your next visit easier 
              and the Service more useful to you.
            </p>

            <h2 id="how-we-use">How We Use Cookies</h2>
            <p>
              When you use and access the Service, we may place a number of cookie files in your web browser. We use cookies 
              for the following purposes:
            </p>
            <ul>
              <li>To enable certain functions of the Service</li>
              <li>To provide analytics</li>
              <li>To store your preferences</li>
              <li>To enable advertisement delivery, including behavioral advertising</li>
            </ul>

            <h2 id="types">Types of Cookies We Use</h2>
            <p>We use both session and persistent cookies on the Service and we use different types of cookies to run the Service:</p>
            <ul>
              <li><strong>Essential cookies:</strong> We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>
              <li><strong>Analytics cookies:</strong> We may use analytics cookies to track information how the Service is used so that we can make improvements. We may also use analytics cookies to test new advertisements, pages, features, or new functionality of the Service to see how our users react to them.</li>
              <li><strong>Third-party cookies:</strong> In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service and deliver advertisements on and through the Service.</li>
            </ul>

            <h2 id="managing">Managing Cookies</h2>
            <p>
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages 
              of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able 
              to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not 
              display properly.
            </p>

            <h2 id="contact">Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at 
              <a href="mailto:hello@desiangrezi.com"> hello@desiangrezi.com</a>.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
