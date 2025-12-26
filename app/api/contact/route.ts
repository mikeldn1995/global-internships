import { NextRequest, NextResponse } from 'next/server';
import { sendContactConfirmationEmail, sendContactAlertEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send confirmation email to user
    try {
      await sendContactConfirmationEmail({ name, email, subject, message });
    } catch (emailError) {
      console.error('Failed to send contact confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    // Send alert email to admin about the contact form submission
    try {
      await sendContactAlertEmail({ name, email, subject, message });
    } catch (emailError) {
      console.error('Failed to send contact form alert email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully. We\'ll get back to you soon!'
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while sending your message. Please try again.' },
      { status: 500 }
    );
  }
}

