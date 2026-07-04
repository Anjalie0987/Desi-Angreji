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
  title: "Disclaimer | Desi Angreji",
  description: "Legal disclaimer for Desi Angreji platform.",
}

export default function DisclaimerPage() {
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
              <BreadcrumbPage>Disclaimer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <H1 className="mb-4">Disclaimer</H1>
        <p className="text-gray-500 mb-12">Last Updated: {lastUpdated}</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents (Sticky on Desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border-l-2 border-gray-100 pl-4 space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">Table of Contents</h4>
              <a href="#general" className="block text-sm text-gray-500 hover:text-brand transition-colors">General Information</a>
              <a href="#external-links" className="block text-sm text-gray-500 hover:text-brand transition-colors">External Links</a>
              <a href="#professional-advice" className="block text-sm text-gray-500 hover:text-brand transition-colors">Professional Advice</a>
              <a href="#contact" className="block text-sm text-gray-500 hover:text-brand transition-colors">Contact Us</a>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 prose prose-gray max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-brand hover:prose-a:text-brand-hover [&_p]:text-justify [&_li]:text-justify">
            <h2 id="general">General Information</h2>
            <p>
              The information provided by Desi Angreji on desiangreji.com is for general informational purposes only. 
              All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, 
              express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any 
              information on the Site.
            </p>

            <h2 id="external-links">External Links Disclaimer</h2>
            <p>
              The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or 
              originating from third parties or links to websites and features in banners or other advertising. Such external links 
              are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
            </p>
            <p>
              We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered 
              by third-party websites linked through the site or any website or feature linked in any banner or other advertising.
            </p>

            <h2 id="professional-advice">Professional Advice Disclaimer</h2>
            <p>
              The Site cannot and does not contain financial, legal, or medical advice. The information is provided for general 
              informational and educational purposes only and is not a substitute for professional advice.
            </p>
            <p>
              Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate 
              professionals. We do not provide any kind of professional advice. The use or reliance of any information contained on this 
              site is solely at your own risk.
            </p>

            <h2 id="contact">Contact Us</h2>
            <p>
              If you have any questions about this disclaimer, please contact us at 
              <a href="mailto:desiangreji88@gmail.com"> desiangreji88@gmail.com</a>.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
