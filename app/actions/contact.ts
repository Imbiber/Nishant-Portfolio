"use server"

import { Resend } from "resend"

// Initialize Resend with the API key.
// In development, if process.env.RESEND_API_KEY is not defined, we'll log to console.
// This prevents the application from crashing if the env variable isn't set up yet.
const getResendInstance = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("WARNING: RESEND_API_KEY is not defined in your environment variables. Emails will be logged to the console instead of sent.")
    return null
  }
  return new Resend(apiKey)
}

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(data: ContactFormData) {
  // 1. Server-side validation
  if (!data.name || !data.email || !data.subject || !data.message) {
    return {
      success: false,
      error: "All fields are required. Please fill out the entire form.",
    }
  }

  // Basic email pattern validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return {
      success: false,
      error: "Please enter a valid email address.",
    }
  }

  const resend = getResendInstance()

  // If no Resend API key is configured, run in mock/log mode to aid local testing
  if (!resend) {
    console.log("Mock Email Submission Received:")
    console.log("-------------------------------")
    console.log(`From: ${data.name} <${data.email}>`)
    console.log(`Subject: ${data.subject}`)
    console.log(`Message: ${data.message}`)
    console.log("-------------------------------")
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    return {
      success: true,
      mock: true,
      message: "Form submission received successfully! (Development Mode: Message was logged to console because RESEND_API_KEY is missing)."
    }
  }

  try {
    const contactEmail = process.env.CONTACT_EMAIL || "ng19nishant@gmail.com"

    // Send the email using Resend
    const response = await resend.emails.send({
      // Resend requires a verified domain to send from. 
      // Before verification, you can send to yourself using onboarding@resend.dev.
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: contactEmail,
      subject: `Portfolio: ${data.subject} (from ${data.name})`,
      replyTo: data.email, // Allows replying directly to the sender's email
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Portfolio Contact Message</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              color: #333333;
              line-height: 1.6;
              margin: 0;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              border: 1px solid #e0e0e0;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            .header {
              background: linear-gradient(135deg, #8b5cf6, #ec4899);
              color: #ffffff;
              padding: 24px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 700;
            }
            .content {
              padding: 24px;
            }
            .field {
              margin-bottom: 20px;
              border-bottom: 1px solid #f0f0f0;
              padding-bottom: 12px;
            }
            .field:last-child {
              border-bottom: none;
              padding-bottom: 0;
              margin-bottom: 0;
            }
            .label {
              font-size: 12px;
              font-weight: bold;
              text-transform: uppercase;
              color: #888888;
              margin-bottom: 4px;
            }
            .value {
              font-size: 16px;
              color: #111111;
            }
            .message-box {
              background-color: #f5f5f7;
              padding: 16px;
              border-radius: 6px;
              border-left: 4px solid #8b5cf6;
              white-space: pre-wrap;
              font-size: 15px;
            }
            .footer {
              background-color: #f1f1f1;
              color: #777777;
              text-align: center;
              padding: 16px;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Request</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Sender Name</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Sender Email</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${data.subject}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${data.message}</div>
              </div>
            </div>
            <div class="footer">
              Sent via your Next.js Portfolio Contact Form
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (response.error) {
      console.error("Resend API returned an error:", response.error)
      return {
        success: false,
        error: response.error.message,
      }
    }

    return {
      success: true,
      message: "Your message has been sent successfully!",
    }
  } catch (error: any) {
    console.error("Exception in sendContactEmail action:", error)
    return {
      success: false,
      error: error.message || "An unexpected error occurred while sending your message.",
    }
  }
}
