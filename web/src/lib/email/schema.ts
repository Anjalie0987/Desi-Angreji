import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string({ message: "Name is required." })
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be at most 80 characters."),
  email: z
    .string({ message: "Email is required." })
    .email("Please enter a valid email address."),
  subject: z
    .string({ message: "Subject is required." })
    .min(5, "Subject must be at least 5 characters.")
    .max(120, "Subject must be at most 120 characters."),
  message: z
    .string({ message: "Message is required." })
    .min(20, "Message must be at least 20 characters.")
    .max(3000, "Message must be at most 3000 characters."),
  honeypot: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
