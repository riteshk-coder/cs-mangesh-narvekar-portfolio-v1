import mongoose from 'mongoose';

/**
 * Mirrors the "Schedule Corporate Advisory" booking modal on the
 * portfolio site (src/components/BookingModal.tsx -> handleSubmit).
 */
const bookingSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      maxlength: [100, 'Name must be 100 characters or fewer.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      maxlength: [150, 'Email must be 150 characters or fewer.'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
      maxlength: [20, 'Phone number must be 20 characters or fewer.'],
    },
    date: {
      type: String,
      required: [true, 'Preferred date is required.'],
      trim: true,
    },
    timeSlot: {
      type: String,
      required: [true, 'Preferred time slot is required.'],
      trim: true,
      enum: {
        values: [
          '10:30 AM - 11:30 AM',
          '11:30 AM - 12:30 PM',
          '02:30 PM - 03:30 PM',
          '04:00 PM - 05:00 PM',
          '05:30 PM - 06:30 PM',
        ],
        message: '{VALUE} is not a recognized time slot.',
      },
    },
    serviceType: {
      type: String,
      required: [true, 'Consultation practice division is required.'],
      trim: true,
      enum: {
        values: [
          'Company Law & Secretarial',
          'GST Services',
          'Income Tax Services',
          'Legal & FEMA Compliance',
          'Startup / Business Structuring',
          'General Corporate Advisory',
        ],
        message: '{VALUE} is not a recognized service option.',
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description must be 2000 characters or fewer.'],
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    notificationEmailSent: {
      type: Boolean,
      default: false,
    },
    confirmationEmailSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('BookingSubmission', bookingSubmissionSchema);
