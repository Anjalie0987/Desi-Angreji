interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
  userAgent: string;
}

export function getAdminNotificationEmail(data: ContactEmailData) {
  const timestamp = new Date().toLocaleString();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: #1f2937; color: #ffffff; padding: 20px; text-align: center; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #4b5563; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .value { background: #f3f4f6; padding: 12px; border-radius: 4px; font-size: 14px; white-space: pre-wrap; }
        .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">${data.subject}</div>
          </div>
          <div class="field">
            <div class="label">Message</div>
            <div class="value">${data.message}</div>
          </div>
        </div>
        <div class="footer">
          <p style="margin: 2px 0;">Submitted Time: ${timestamp}</p>
          <p style="margin: 2px 0;">IP Address: ${data.ip}</p>
          <p style="margin: 2px 0;">User Agent: ${data.userAgent}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function getAutoReplyEmail(name: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>We received your message</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: #1f2937; color: #ffffff; padding: 20px; text-align: center; }
        .content { padding: 30px; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">We received your message</h2>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          <p>Thank you for contacting Desi Angreji.</p>
          <p>Our team has received your message and will respond as soon as possible.</p>
        </div>
        <div class="footer">
          <p style="margin: 0;">Regards,<br>Team Desi Angreji</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
