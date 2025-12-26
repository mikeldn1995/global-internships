import { NextRequest, NextResponse } from 'next/server';
import { query, initDatabase } from '@/lib/db';
import { sendConfirmationEmail, sendAlertEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Initialize database if needed (idempotent)
    try {
      await initDatabase();
    } catch (initError) {
      console.error('Database initialization error (may already exist):', initError);
    }
    const formData = await request.formData();
    
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const university = formData.get('university') as string;
    const major = formData.get('major') as string;
    const message = formData.get('message') as string | null;
    const cvFile = formData.get('cv') as File | null;

    // Validate required fields
    if (!firstName || !lastName || !email || !address || !university || !major) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Handle CV upload (for now, we'll just store the filename)
    // In production, you'd want to upload to S3 or similar
    let cvUrl = null;
    if (cvFile && cvFile.size > 0) {
      // For now, we'll just store metadata
      // In production, upload to cloud storage
      cvUrl = `cv_${Date.now()}_${cvFile.name}`;
    }

    // Insert into database
    const result = await query(
      `INSERT INTO student_signups 
       (first_name, last_name, email, address, university, major, cv_url, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [firstName, lastName, email, address, university, major, cvUrl, message]
    );

    // Send confirmation email
    try {
      await sendConfirmationEmail({ firstName, lastName, email });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    // Send alert email to admin
    try {
      await sendAlertEmail({ firstName, lastName, email, university, major });
    } catch (alertError) {
      console.error('Failed to send alert email:', alertError);
      // Don't fail the request if alert email fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Signup successful! Check your email for confirmation.',
        id: result.rows[0].id 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    
    // Handle duplicate email error
    if (error.code === '23505' || error.message?.includes('unique')) {
      return NextResponse.json(
        { error: 'This email address is already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred during signup. Please try again.' },
      { status: 500 }
    );
  }
}

