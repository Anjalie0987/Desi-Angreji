import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/email/schema";
import { sanitizeInput } from "@/lib/email/sanitize";
import { checkRateLimit } from "@/lib/email/rateLimit";
import { sendContactEmails } from "@/lib/email/mailer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // 1. Rate Limiting
    const isAllowed = await checkRateLimit(ip);
    if (!isAllowed) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Parse Body
    let body;
    try {
      body = await request.json();
    } catch {
      console.error("Invalid JSON body received.");
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    // 3. Validation
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.flatten().fieldErrors);
      return NextResponse.json(
        {
          error: "Validation failed",
          fieldErrors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // 4. Spam Protection (Honeypot)
    if (validData.honeypot) {
      console.warn(`Honeypot filled by IP: ${ip}. Rejecting as spam.`);
      // Return a 200 OK so bots think it succeeded
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 5. Sanitization
    const sanitizedData = sanitizeInput(validData);

    // 6. Email Sending
    await sendContactEmails({ data: sanitizedData, ip, userAgent });

    // 7. Success Response
    console.log(`Successfully processed contact form for email: ${sanitizedData.email}`);
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Internal Server Error processing contact form:", error);
    // Never expose server internals
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
