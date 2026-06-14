import mongoose from 'mongoose';

/**
 * Mirrors the "Direct Advisory Requisition" contact form on the
 * portfolio site (src/App.tsx -> handleContactSubmit).
 */
const contactSubmissionSchema = new mongoose.Schema(
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
    service: {
      type: String,
      required: [true, 'Service selection is required.'],
      trim: true,
      enum: {
        values: [
          'Company Law & Secretarial',
          'GST Services',
          'Income Tax Services',
          'Legal & FEMA Compliance',
          'General Corporate Advisory',
        ],
        message: '{VALUE} is not a recognized service option.',
      },
    },
    message: {
      type: String,
      required: [true, 'Message is required.'],
      trim: true,
      maxlength: [2000, 'Message must be 2000 characters or fewer.'],
    },
    status: {
      type: String,
      enum: ['new', 'responded', 'archived'],
      default: 'new',
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

export default mongoose.model('ContactSubmission', contactSubmissionSchema);
