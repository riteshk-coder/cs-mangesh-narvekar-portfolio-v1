import BookingSubmission from '../models/BookingSubmission.js';
import { sendMail } from '../utils/mailer.js';
import { bookingAdminEmail, bookingUserEmail } from '../utils/emailTemplates.js';

/**
 * POST /api/booking
 *
 * Handles submissions from the "Schedule Corporate Advisory" booking
 * modal (src/components/BookingModal.tsx -> handleSubmit):
 *   1. Persists the submission to MongoDB Atlas.
 *   2. Emails the full submission details to the admin (Nagesh Narvekar).
 *   3. Emails an automatic confirmation to the submitting user.
 *
 * The submission is considered successful as soon as it is saved to
 * the database — email delivery issues are logged but do not cause
 * the API request to fail, since the booking has already been
 * captured and can be viewed in MongoDB Atlas.
 */
export async function createBookingSubmission(req, res, next) {
  try {
    const { name, email, phone, date, timeSlot, serviceType, description } = req.body;

    const submission = await BookingSubmission.create({
      name,
      email,
      phone,
      date,
      timeSlot,
      serviceType,
      description,
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
            subject: `New Consultation Booking from ${name}`,
            html: bookingAdminEmail({
              name,
              email,
              phone,
              date,
              timeSlot,
              serviceType,
              description,
              submittedAt,
            }),
            replyTo: email,
          })
        : Promise.reject(new Error('ADMIN_EMAIL is not configured.')),
      sendMail({
        to: email,
        subject: 'Consultation Request Received — CS Mangesh Narvekar',
        html: bookingUserEmail({ name, date, timeSlot, serviceType }),
      }),
    ]);

    const [adminResult, userResult] = results;

    if (adminResult.status === 'fulfilled') {
      submission.notificationEmailSent = true;
    } else {
      console.error('[Email] Failed to send admin notification (booking form):', adminResult.reason?.message);
    }

    if (userResult.status === 'fulfilled') {
      submission.confirmationEmailSent = true;
    } else {
      console.error('[Email] Failed to send user confirmation (booking form):', userResult.reason?.message);
    }

    if (submission.isModified()) {
      await submission.save();
    }

    return res.status(201).json({
      success: true,
      message: 'Your consultation has been booked successfully.',
      data: { id: submission._id },
    });
  } catch (error) {
    next(error);
  }
}
