import xss from "xss";
import { ContactFormData } from "./schema";

export function sanitizeInput(data: ContactFormData): ContactFormData {
  return {
    name: xss(data.name.trim()),
    email: xss(data.email.trim()),
    subject: xss(data.subject.trim()),
    message: xss(data.message.trim()),
    honeypot: data.honeypot ? xss(data.honeypot.trim()) : undefined,
  };
}
