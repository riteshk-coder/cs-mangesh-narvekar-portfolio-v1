import ContactSubmission from '../models/ContactSubmission.js';
import { sendMail } from '../utils/mailer.js';
import { contactAdminEmail, contactUserEmail } from '../utils/emailTemplates.js';

/**
 * POST /api/contact
 *
 * Handles submissions from the "Direct Advisory Requisition" contact
 * form (src/App.tsx -> handleContactSubmit):
 *   1. Persists the submission to MongoDB Atlas.
 *   2. Emails the full submission details to the admin (Nagesh Narvekar).
 *   3. Emails an automatic confirmation to the submitting user.
 *
 * The submission is considered successful as soon as it is saved to
 * the database — email delivery issues are logged but do not cause
 * the API request to fail, since the inquiry has already been
 * captured and can be viewed in MongoDB Atlas.
 */
export async function createContactSubmission(req, res, next) {
  try {
    const { name, email, phone, service, message } = req.body;

    const submission = await ContactSubmission.create({
      name,
      email,
      phone,
      service,
      message,
    });

    const submittedAt = submission.createdAt.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const adminEmail = process.env.ADMIN_EMAIL;

    const results = await Promise.allSettled([
      adminEmail
        ? sendMail({
            to: adminEmail,
            subject: `New Advisory Requisition from ${name}`,
            html: contactAdminEmail({ name, email, phone, service, message, submittedAt }),
            replyTo: email,
          })
        : Promise.reject(new Error('ADMIN_EMAIL is not configured.')),
      sendMail({
        to: email,
        subject: 'We Have Received Your Inquiry — CS Mangesh Narvekar',
        html: contactUserEmail({ name, service }),
      }),
    ]);

    const [adminResult, userResult] = results;

    if (adminResult.status === 'fulfilled') {
      submission.notificationEmailSent = true;
    } else {
      console.error('[Email] Failed to send admin notification (contact form):', adminResult.reason?.message);
    }

    if (userResult.status === 'fulfilled') {
      submission.confirmationEmailSent = true;
    } else {
      console.error('[Email] Failed to send user confirmation (contact form):', userResult.reason?.message);
    }

    if (submission.isModified()) {
      await submission.save();
    }

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully.',
      data: { id: submission._id },
    });
  } catch (error) {
    next(error);
  }
}
