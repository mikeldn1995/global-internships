import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AlertEmailData {
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  major: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendConfirmationEmail(data: EmailData): Promise<void> {
  const { firstName, lastName, email } = data;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Global Internships</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 40px 20px; text-align: center; background: #2563eb;">
              <img src="${process.env.NEXT_PUBLIC_SITE_URL || 'https://global-internships.com'}/logo.svg" alt="Global Internships" style="height: 60px; width: auto; margin: 0 auto; display: block;" />
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 20px; background-color: #ffffff;">
              <div style="max-width: 600px; margin: 0 auto;">
                <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">
                  Welcome, ${firstName}!
                </h2>
                <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                  Thank you for signing up with Global Internships. We're thrilled that you're taking the first step toward an incredible international experience!
                </p>
                <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                  Our team has received your application and will review it carefully. We'll be in touch soon with personalized internship opportunities in London and New York that match your interests, major, and career goals.
                </p>
                <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 4px;">
                  <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 600;">What happens next?</p>
                  <ul style="margin: 15px 0 0 0; padding-left: 20px; color: #666666; font-size: 14px; line-height: 1.8;">
                    <li>Our team will review your profile and preferences</li>
                    <li>We'll match you with suitable internship opportunities</li>
                    <li>You'll receive personalized recommendations within 5-7 business days</li>
                    <li>We'll guide you through the application process</li>
                  </ul>
                </div>
                <p style="margin: 30px 0 0 0; color: #666666; font-size: 16px; line-height: 1.6;">
                  If you have any questions in the meantime, feel free to reach out to us through our 
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://global-internships.com'}/contact" style="color: #667eea; text-decoration: none;"> contact form</a>.
                </p>
                <p style="margin: 30px 0 0 0; color: #666666; font-size: 16px; line-height: 1.6;">
                  Best of luck on your journey!
                </p>
                <p style="margin: 20px 0 0 0; color: #666666; font-size: 16px; line-height: 1.6;">
                  Warm regards,<br>
                  <strong>Kate</strong><br>
                  Internship Coordinator<br>
                  Global Internships
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 20px; text-align: center; background-color: #f8f9fa; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px;">
                Global Internships &copy; ${new Date().getFullYear()}
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px;">
                You're receiving this email because you signed up at global-internships.com
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const textContent = `
Welcome, ${firstName}!

Thank you for signing up with Global Internships. We're thrilled that you're taking the first step toward an incredible international experience!

Our team has received your application and will review it carefully. We'll be in touch soon with personalized internship opportunities that match your interests, major, and career goals.

What happens next?
- Our team will review your profile and preferences
- We'll match you with suitable internship opportunities
- You'll receive personalized recommendations within 5-7 business days
- We'll guide you through the application process

If you have any questions in the meantime, feel free to reach out to us at contact@global-internships.com.

Best of luck on your journey!

Warm regards,
Kate
Internship Coordinator
Global Internships

Global Internships © ${new Date().getFullYear()}
You're receiving this email because you signed up at global-internships.com
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Welcome to Global Internships - Your Journey Begins!',
      text: textContent,
      html: htmlContent,
    });
    console.log('Confirmation email sent successfully to', email);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
}

export async function sendAlertEmail(data: AlertEmailData): Promise<void> {
  const { firstName, lastName, email, university, major } = data;
  const alertEmail = process.env.ALERT_EMAIL;

  if (!alertEmail) {
    console.warn('ALERT_EMAIL not configured, skipping alert email');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Student Signup - Global Internships</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 30px 20px; background-color: #ffffff;">
              <div style="max-width: 600px; margin: 0 auto;">
                <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">
                  New Student Signup
                </h2>
                <p style="margin: 0 0 15px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                  A new student has completed the signup form:
                </p>
                <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 4px; border-left: 4px solid #667eea;">
                  <p style="margin: 0 0 10px 0; color: #333333; font-size: 16px;">
                    <strong>Name:</strong> ${firstName} ${lastName}
                  </p>
                  <p style="margin: 0 0 10px 0; color: #333333; font-size: 16px;">
                    <strong>Email:</strong> ${email}
                  </p>
                  <p style="margin: 0 0 10px 0; color: #333333; font-size: 16px;">
                    <strong>University:</strong> ${university}
                  </p>
                  <p style="margin: 0; color: #333333; font-size: 16px;">
                    <strong>Major:</strong> ${major}
                  </p>
                </div>
                <p style="margin: 20px 0 0 0; color: #666666; font-size: 14px;">
                  Please review this application in the database.
                </p>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const textContent = `
New Student Signup

A new student has completed the signup form:

Name: ${firstName} ${lastName}
Email: ${email}
University: ${university}
Major: ${major}

Please review this application in the database.
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: alertEmail,
      subject: `New Student Signup: ${firstName} ${lastName}`,
      text: textContent,
      html: htmlContent,
    });
    console.log('Alert email sent successfully to', alertEmail);
  } catch (error) {
    console.error('Error sending alert email:', error);
    // Don't throw - alert email failure shouldn't break the signup
  }
}

export async function sendContactConfirmationEmail(data: ContactFormData): Promise<void> {
  const { name, email, subject } = data;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Us - Global Internships</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 40px 20px; text-align: center; background: #2563eb;">
              <img src="${process.env.NEXT_PUBLIC_SITE_URL || 'https://global-internships.com'}/logo.svg" alt="Global Internships" style="height: 60px; width: auto; margin: 0 auto; display: block;" />
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 20px; background-color: #ffffff;">
              <div style="max-width: 600px; margin: 0 auto;">
                <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">
                  Thank You for Contacting Us, ${name.split(' ')[0]}!
                </h2>
                <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                  We've received your message regarding "<strong>${subject}</strong>" and appreciate you taking the time to reach out to us.
                </p>
                <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                  Our team will review your inquiry and get back to you as soon as possible, typically within 24-48 hours during business days.
                </p>
                <div style="background-color: #f8f9fa; border-left: 4px solid #2563eb; padding: 20px; margin: 30px 0; border-radius: 4px;">
                  <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 600;">What happens next?</p>
                  <ul style="margin: 15px 0 0 0; padding-left: 20px; color: #666666; font-size: 14px; line-height: 1.8;">
                    <li>Our team will review your message</li>
                    <li>We'll respond to your inquiry within 24-48 hours</li>
                    <li>If urgent, we'll prioritize your request</li>
                    <li>You'll receive a response at this email address</li>
                  </ul>
                </div>
                <p style="margin: 30px 0 0 0; color: #666666; font-size: 16px; line-height: 1.6;">
                  If you have any additional questions or need immediate assistance, please don't hesitate to reach out to us again.
                </p>
                <p style="margin: 30px 0 0 0; color: #666666; font-size: 16px; line-height: 1.6;">
                  Best regards,
                </p>
                <p style="margin: 20px 0 0 0; color: #666666; font-size: 16px; line-height: 1.6;">
                  <strong>Kate</strong><br>
                  Internship Coordinator<br>
                  Global Internships
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 20px; text-align: center; background-color: #f8f9fa; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px;">
                Global Internships &copy; ${new Date().getFullYear()}
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px;">
                You're receiving this email because you contacted us through our website
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const textContent = `
Thank You for Contacting Us, ${name.split(' ')[0]}!

We've received your message regarding "${subject}" and appreciate you taking the time to reach out to us.

Our team will review your inquiry and get back to you as soon as possible, typically within 24-48 hours during business days.

What happens next?
- Our team will review your message
- We'll respond to your inquiry within 24-48 hours
- If urgent, we'll prioritize your request
- You'll receive a response at this email address

If you have any additional questions or need immediate assistance, please don't hesitate to reach out to us again.

Best regards,
Kate
Internship Coordinator
Global Internships

Global Internships © ${new Date().getFullYear()}
You're receiving this email because you contacted us through our website
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: `We've Received Your Message: ${subject}`,
      text: textContent,
      html: htmlContent,
    });
    console.log('Contact confirmation email sent successfully to', email);
  } catch (error) {
    console.error('Error sending contact confirmation email:', error);
    throw error;
  }
}

export async function sendContactAlertEmail(data: ContactFormData): Promise<void> {
  const { name, email, subject, message } = data;
  const alertEmail = process.env.ALERT_EMAIL;

  if (!alertEmail) {
    console.warn('ALERT_EMAIL not configured, skipping contact alert email');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission - Global Internships</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 40px 20px; text-align: center; background: #2563eb;">
              <img src="${process.env.NEXT_PUBLIC_SITE_URL || 'https://global-internships.com'}/logo.svg" alt="Global Internships" style="height: 60px; width: auto; margin: 0 auto; display: block;" />
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 20px; background-color: #ffffff;">
              <div style="max-width: 600px; margin: 0 auto;">
                <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">
                  New Contact Form Submission
                </h2>
                <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                  A new message has been submitted through the contact form:
                </p>
                <div style="background-color: #f8f9fa; padding: 24px; margin: 20px 0; border-radius: 4px; border-left: 4px solid #2563eb;">
                  <p style="margin: 0 0 12px 0; color: #333333; font-size: 16px;">
                    <strong style="color: #2563eb;">Name:</strong><br>
                    <span style="color: #666666;">${name}</span>
                  </p>
                  <p style="margin: 0 0 12px 0; color: #333333; font-size: 16px;">
                    <strong style="color: #2563eb;">Email:</strong><br>
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                  </p>
                  <p style="margin: 0 0 12px 0; color: #333333; font-size: 16px;">
                    <strong style="color: #2563eb;">Subject:</strong><br>
                    <span style="color: #666666;">${subject}</span>
                  </p>
                  <p style="margin: 0; color: #333333; font-size: 16px;">
                    <strong style="color: #2563eb;">Message:</strong><br>
                    <span style="color: #666666; white-space: pre-wrap;">${message}</span>
                  </p>
                </div>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
                    <strong>Quick Actions:</strong>
                  </p>
                  <p style="margin: 0; color: #666666; font-size: 14px;">
                    <a href="mailto:${email}?subject=Re: ${subject}" style="color: #2563eb; text-decoration: none;">Reply to ${name}</a>
                  </p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 20px; text-align: center; background-color: #f8f9fa; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px;">
                Global Internships &copy; ${new Date().getFullYear()}
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px;">
                This is an automated notification from the contact form
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const textContent = `
New Contact Form Submission

A new message has been submitted through the contact form:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Reply to: ${email}
Subject: Re: ${subject}

Global Internships © ${new Date().getFullYear()}
This is an automated notification from the contact form
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: alertEmail,
      subject: `New Contact Form: ${subject}`,
      text: textContent,
      html: htmlContent,
    });
    console.log('Contact alert email sent successfully to', alertEmail);
  } catch (error) {
    console.error('Error sending contact alert email:', error);
    // Don't throw - alert email failure shouldn't break the contact form
  }
}

