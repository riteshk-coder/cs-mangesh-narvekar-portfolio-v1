const NAVY = '#0F2747';
const GOLD = '#C8A45D';

/**
 * Escapes user-supplied text before interpolating it into HTML emails.
 */
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(value = '') {
  return escapeHtml(value).replace(/\n/g, '<br />');
}

/**
 * Shared wrapper styling so every notification/confirmation email
 * has a consistent, professional look matching the site's branding.
 */
function wrapTemplate({ title, intro, bodyHtml, footerNote }) {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f1f4f8; padding:24px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #e2e8f0;">
      <div style="background:${NAVY}; padding:22px 28px; border-bottom:3px solid ${GOLD};">
        <h2 style="margin:0; color:#ffffff; font-size:18px; font-family: Arial, Helvetica, sans-serif;">${escapeHtml(title)}</h2>
      </div>
      <div style="padding:28px; color:#1e293b; font-size:14px; line-height:1.65;">
        ${intro ? `<p style="margin-top:0;">${intro}</p>` : ''}
        ${bodyHtml}
        ${footerNote ? `<p style="margin-bottom:0; margin-top:24px; color:#475569;">${footerNote}</p>` : ''}
      </div>
      <div style="padding:16px 28px; background:#f8fafc; border-top:1px solid #e2e8f0; font-size:12px; color:#64748b;">
        CS Mangesh Narvekar &mdash; FCS, MBA, LLB | Corporate Compliance &amp; Corporate Taxation Advisory
      </div>
    </div>
  </div>`;
}

function detailsTable(rows) {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px; font-weight:bold; color:#0F2747; background:#f8fafc; border:1px solid #e2e8f0; width:200px; vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px; border:1px solid #e2e8f0; vertical-align:top;">${value}</td>
      </tr>`
    )
    .join('');

  return `<table style="width:100%; border-collapse:collapse; margin:16px 0; font-size:13px;">${rowsHtml}</table>`;
}

/**
 * Email sent to the admin (Nagesh Narvekar) when the Contact form is submitted.
 */
export function contactAdminEmail({ name, email, phone, service, message, submittedAt }) {
  return wrapTemplate({
    title: 'New Contact Form Submission',
    intro: 'A new advisory requisition has been submitted via the website contact form.',
    bodyHtml: detailsTable([
      ['Name', escapeHtml(name)],
      ['Email', `<a href="mailto:${escapeHtml(email)}" style="color:${NAVY};">${escapeHtml(email)}</a>`],
      ['Phone', escapeHtml(phone)],
      ['Compliance Division', escapeHtml(service)],
      ['Message', nl2br(message)],
      ['Submitted At', escapeHtml(submittedAt)],
    ]),
    footerNote: 'Reply directly to this email to respond to the sender.',
  });
}

/**
 * Confirmation email sent to the user after submitting the Contact form.
 */
export function contactUserEmail({ name, service }) {
  return wrapTemplate({
    title: 'We Have Received Your Inquiry',
    intro: `Dear ${escapeHtml(name)},`,
    bodyHtml: `
      <p>Thank you for reaching out regarding <strong>${escapeHtml(service)}</strong>. Your compliance detail has been logged successfully, and our team will review your request and respond within 12 business hours.</p>
      <p>If your matter is urgent, you are welcome to reach out directly via the contact details listed on our website.</p>
    `,
    footerNote: 'This is an automated confirmation — please do not reply directly to this email.',
  });
}

/**
 * Email sent to the admin (Nagesh Narvekar) when the consultation Booking form is submitted.
 */
export function bookingAdminEmail({ name, email, phone, date, timeSlot, serviceType, description, submittedAt }) {
  return wrapTemplate({
    title: 'New Consultation Booking',
    intro: 'A new consultation has been scheduled via the website booking form.',
    bodyHtml: detailsTable([
      ['Name', escapeHtml(name)],
      ['Email', `<a href="mailto:${escapeHtml(email)}" style="color:${NAVY};">${escapeHtml(email)}</a>`],
      ['Phone', escapeHtml(phone)],
      ['Practice Division', escapeHtml(serviceType)],
      ['Preferred Date', escapeHtml(date)],
      ['Preferred Time Slot', escapeHtml(timeSlot)],
      ['Requirement Brief', description ? nl2br(description) : '<span style="color:#94a3b8;">Not provided</span>'],
      ['Submitted At', escapeHtml(submittedAt)],
    ]),
    footerNote: 'Reply directly to this email to respond to the sender.',
  });
}

/**
 * Confirmation email sent to the user after submitting the Booking form.
 */
export function bookingUserEmail({ name, date, timeSlot, serviceType }) {
  return wrapTemplate({
    title: 'Consultation Request Received',
    intro: `Dear ${escapeHtml(name)},`,
    bodyHtml: `
      <p>Thank you for scheduling a consultation regarding <strong>${escapeHtml(serviceType)}</strong>.</p>
      ${detailsTable([
        ['Preferred Date', escapeHtml(date)],
        ['Preferred Time Slot', escapeHtml(timeSlot)],
        ['Representative', 'CS Mangesh Narvekar (FCS)'],
      ])}
      <p>Our team will reach out to confirm your appointment shortly.</p>
    `,
    footerNote: 'This is an automated confirmation — please do not reply directly to this email.',
  });
}
