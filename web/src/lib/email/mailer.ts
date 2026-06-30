import nodemailer from "nodemailer";
import { getAdminNotificationEmail, getAutoReplyEmail } from "./templates";
import { ContactFormData } from "./schema";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface SendEmailParams {
  data: ContactFormData;
  ip: string;
  userAgent: string;
}

export async function sendContactEmails({ data, ip, userAgent }: SendEmailParams) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("SMTP credentials are not configured in environment variables.");
  }

  // 1. Send notification to admin
  const adminHtml = getAdminNotificationEmail({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    ip,
    userAgent,
  });

  const adminMailOptions = {
    from: `"Desi Angreji Contact Form" <${process.env.GMAIL_USER}>`,
    to: "desiangreji88@gmail.com",
    subject: `New Contact Submission: ${data.subject}`,
    html: adminHtml,
  };

  // 2. Send auto-reply to user
  const userHtml = getAutoReplyEmail(data.name);

  const userMailOptions = {
    from: `"Desi Angreji" <${process.env.GMAIL_USER}>`,
    to: data.email,
    subject: "We received your message",
    html: userHtml,
  };

  try {
    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);
  } catch (error) {
    console.error("Error sending emails via Nodemailer:", error);
    throw error;
  }
}
