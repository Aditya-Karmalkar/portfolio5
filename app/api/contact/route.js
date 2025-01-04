import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465, // Use 465 for secure (SSL), 587 for non-secure (TLS)
  secure: false, // Use `true` for 465, `false` for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS, // Your Gmail address
    pass: process.env.GMAIL_PASSKEY, // App-specific password
  },
});

// HTML email template
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

// Send email helper function
async function sendEmail(payload) {
  const { name, email, message: userMessage } = payload;

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_ADDRESS}>`, // Sender address
    to: process.env.EMAIL_ADDRESS, // Your email to receive the message
    subject: `New Message From ${name}`, // Subject line
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${userMessage}`, // Plain text body
    html: generateEmailTemplate(name, email, userMessage), // HTML body
    replyTo: email, // Allows replying directly to the sender's email
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error while sending email:', error.message);
    return false;
  }
}

// POST request handler
export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message: userMessage } = payload;

    // Validate input
    if (!name || !email || !userMessage) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Send email
    const emailSuccess = await sendEmail(payload);

    if (emailSuccess) {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully!' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to send email.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json(
      { success: false, message: 'Server error occurred.' },
      { status: 500 }
    );
  }
}
