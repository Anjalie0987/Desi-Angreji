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
  title: "Terms & Conditions | Desi Angreji",
  description: "Terms and conditions for using the Desi Angreji platform.",
}

export default function TermsPage() {
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
              <BreadcrumbPage>Terms & Conditions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <H1 className="mb-4">Terms & Conditions</H1>
        <p className="text-gray-500 mb-12">Last Updated: {lastUpdated}</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents (Sticky on Desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border-l-2 border-gray-100 pl-4 space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-4">Table of Contents</h4>
              <a href="#acceptance" className="block text-sm text-gray-500 hover:text-brand transition-colors">Acceptance of Terms</a>
              <a href="#intellectual-property" className="block text-sm text-gray-500 hover:text-brand transition-colors">Intellectual Property</a>
              <a href="#user-content" className="block text-sm text-gray-500 hover:text-brand transition-colors">User Content</a>
              <a href="#limitations" className="block text-sm text-gray-500 hover:text-brand transition-colors">Limitations</a>
              <a href="#contact" className="block text-sm text-gray-500 hover:text-brand transition-colors">Contact Us</a>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 prose prose-gray max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-brand hover:prose-a:text-brand-hover [&_p]:text-justify [&_li]:text-justify">
            <p>
              Welcome to Desi Angreji. By accessing this website, we assume you accept these terms and conditions. 
              Do not continue to use Desi Angreji if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 id="acceptance">Acceptance of Terms</h2>
            <p>
              These Terms and Conditions govern your use of our website and services. By accessing or using our platform, 
              you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.
            </p>

            <h2 id="intellectual-property">Intellectual Property Rights</h2>
            <p>
              Unless otherwise stated, Desi Angreji and/or its licensors own the intellectual property rights for all material on 
              Desi Angreji. All intellectual property rights are reserved. You may access this from Desi Angreji for your own 
              personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul>
              <li>Republish material from Desi Angreji without credit</li>
              <li>Sell, rent or sub-license material from Desi Angreji</li>
              <li>Reproduce, duplicate or copy material from Desi Angreji</li>
              <li>Redistribute content from Desi Angreji</li>
            </ul>

            <h2 id="user-content">User Content</h2>
            <p>
              Certain parts of this website may offer the opportunity for users to post and exchange opinions and information. 
              Desi Angreji does not filter, edit, publish or review Comments prior to their presence on the website. Comments do 
              not reflect the views and opinions of Desi Angreji, its agents, or affiliates.
            </p>

            <h2 id="limitations">Limitations of Liability</h2>
            <p>
              In no event shall Desi Angreji, nor any of its officers, directors and employees, shall be held liable for anything 
              arising out of or in any way connected with your use of this website whether such liability is under contract. 
              Desi Angreji, including its officers, directors and employees shall not be held liable for any indirect, consequential 
              or special liability arising out of or in any way related to your use of this website.
            </p>

            <h2 id="contact">Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Terms & Conditions, do not hesitate to contact us at 
              <a href="mailto:desiangreji88@gmail.com"> desiangreji88@gmail.com</a>.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
