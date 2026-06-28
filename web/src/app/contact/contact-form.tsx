"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    console.log("Form data:", data)
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false)
    }, 5000)
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-xl border border-green-200 text-center animate-in fade-in">
        <h3 className="text-xl font-bold mb-2">Message sent successfully!</h3>
        <p>Thank you for reaching out. We will get back to you shortly.</p>
        <Button 
          variant="outline" 
          className="mt-6 border-green-300 text-green-700 hover:bg-green-100"
          onClick={() => setIsSuccess(false)}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full h-12 px-4 rounded-md border border-gray-300 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
            placeholder="John Doe"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full h-12 px-4 rounded-md border border-gray-300 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
            placeholder="john@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-gray-700">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          className="w-full h-12 px-4 rounded-md border border-gray-300 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
          placeholder="How can we help you?"
          {...register("subject")}
        />
        {errors.subject && (
          <p className="text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full p-4 rounded-md border border-gray-300 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors resize-none"
          placeholder="Tell us more about your inquiry..."
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>
      
      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto px-8">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
