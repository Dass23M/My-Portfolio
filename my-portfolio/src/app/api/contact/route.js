import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // SendGrid configuration
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: process.env.CONTACT_EMAIL, // Your email
      from: process.env.FROM_EMAIL, // Verified sender in SendGrid
      subject: `Portfolio Contact: ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}