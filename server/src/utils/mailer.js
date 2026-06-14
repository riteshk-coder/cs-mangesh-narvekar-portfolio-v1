import nodemailer from 'nodemailer';

let cachedTransporter = null;

// Skip email entirely if credentials are placeholders or missing
function emailConfigured() {
  const { EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS) return false;
  if (EMAIL_USER.includes('your-gmail') || EMAIL_PASS.includes('your-')) return false;
  return true;
}

function buildTransporter() {
  const { EMAIL_SERVICE, EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASS } =
    process.env;

  if (EMAIL_HOST) {
    return nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT) || 587,
      secure: EMAIL_SECURE === 'true',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    });
  }

  return nodemailer.createTransport({
    service: EMAIL_SERVICE || 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });
}

function getTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = buildTransporter();
  }
  return cachedTransporter;
}

/**
 * Sends an email using the configured transporter.
 * Returns silently (without throwing) if email is not configured,
 * so the form submission always succeeds even if email is not set up yet.
 */
export async function sendMail({ to, subject, html, replyTo }) {
  if (!emailConfigured()) {
    console.log('[Email] Skipped — credentials not configured yet.');
    return null;
  }

  const transporter = getTransporter();
  const fromName = process.env.EMAIL_FROM_NAME || 'CS Mangesh Narvekar Portfolio';
  const fromAddress = process.env.EMAIL_USER;

  return transporter.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
}
