"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  honeypot: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Too many requests", {
            description: "Please wait a few minutes before trying again."
          })
        } else {
          toast.error("Failed to send message", {
            description: result.error || "An unexpected error occurred. Please try again."
          })
          if (result.fieldErrors) {
            // Optionally focus first error field, or just let users read the toast
            const firstErrorField = Object.keys(result.fieldErrors)[0] as keyof ContactFormValues
            if (firstErrorField) {
              setFocus(firstErrorField)
            }
          }
        }
        return
      }

      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. We will get back to you shortly."
      })
      reset()
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("Error", {
        description: "Failed to connect to the server. Please try again."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field for spam protection */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Do not fill this out</label>
        <input
          id="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="w-full h-12 px-4 rounded-md border border-gray-300 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
            placeholder="John Doe"
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-red-500" role="alert">{errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full h-12 px-4 rounded-md border border-gray-300 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
            placeholder="desiangreji88@gmail.com"
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-500" role="alert">{errors.email.message}</p>
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
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className="w-full h-12 px-4 rounded-md border border-gray-300 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
          placeholder="How can we help you?"
          {...register("subject")}
        />
        {errors.subject && (
          <p id="subject-error" className="text-sm text-red-500" role="alert">{errors.subject.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full p-4 rounded-md border border-gray-300 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors resize-none"
          placeholder="Tell us more about your inquiry..."
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-red-500" role="alert">{errors.message.message}</p>
        )}
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting} 
        size="lg" 
        className="w-full sm:w-auto px-8"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}

