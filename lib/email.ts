import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendLeadNotification(data: {
  name: string;
  email: string;
  industry?: string;
  volume?: string;
  source: string;
}) {
  if (!resend || !process.env.NOTIFICATION_EMAIL) {
    console.log('[Email] Skipping email notification (not configured):', data);
    return { success: true, message: 'Email not configured' };
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New ${data.source === 'waitlist' ? 'Waitlist' : 'Demo'} Request`,
      html: `
        <h2>New ${data.source === 'waitlist' ? 'Waitlist' : 'Demo'} Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.industry ? `<p><strong>Industry:</strong> ${data.industry}</p>` : ''}
        ${data.volume ? `<p><strong>Lead Volume:</strong> ${data.volume}</p>` : ''}
        <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('[Email] Failed to send notification:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  if (!resend) {
    console.log('[Email] Skipping welcome email (not configured):', email);
    return { success: true, message: 'Email not configured' };
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: 'Welcome to Dealism!',
      html: `
        <h2>Welcome to Dealism, ${name}!</h2>
        <p>Thank you for joining us. We're excited to have you on board.</p>
        <p>Get started by exploring our features and tools.</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('[Email] Failed to send welcome email:', error);
    return { success: false, error };
  }
}
