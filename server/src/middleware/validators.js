import { body } from 'express-validator';

const CONTACT_SERVICES = [
  'Company Law & Secretarial',
  'GST Services',
  'Income Tax Services',
  'Legal & FEMA Compliance',
  'General Corporate Advisory',
];

const BOOKING_SERVICES = [
  'Company Law & Secretarial',
  'GST Services',
  'Income Tax Services',
  'Legal & FEMA Compliance',
  'Startup / Business Structuring',
  'General Corporate Advisory',
];

const BOOKING_TIME_SLOTS = [
  '10:30 AM - 11:30 AM',
  '11:30 AM - 12:30 PM',
  '02:30 PM - 03:30 PM',
  '04:00 PM - 05:00 PM',
  '05:30 PM - 06:30 PM',
];

/**
 * Validation rules for the "Direct Advisory Requisition" contact form.
 * Mirrors the client-side checks in src/App.tsx (handleContactSubmit).
 */
export const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Please provide your name.')
    .isLength({ max: 100 })
    .withMessage('Name must be 100 characters or fewer.'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Please provide your email address.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Please provide your telephone number.')
    .custom((value) => value.replace(/\D/g, '').length >= 10)
    .withMessage('Please enter a valid 10-digit telephone number.'),

  body('service')
    .trim()
    .notEmpty()
    .withMessage('Please select a compliance division.')
    .isIn(CONTACT_SERVICES)
    .withMessage('Please select a valid compliance division.'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Please provide a brief of your regulatory inquiry.')
    .isLength({ max: 2000 })
    .withMessage('Message must be 2000 characters or fewer.'),
];

/**
 * Validation rules for the "Schedule Corporate Advisory" booking form.
 * Mirrors the client-side checks in src/components/BookingModal.tsx
 * (handleSubmit).
 */
export const bookingValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Please provide your full name.')
    .isLength({ max: 100 })
    .withMessage('Name must be 100 characters or fewer.'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Please provide your email address.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Please provide your mobile number.')
    .custom((value) => value.replace(/\D/g, '').length >= 10)
    .withMessage('Please provide a valid 10-digit mobile number.'),

  body('date')
    .trim()
    .notEmpty()
    .withMessage('Please select a preferred date.')
    .isISO8601()
    .withMessage('Please select a valid date.'),

  body('timeSlot')
    .trim()
    .notEmpty()
    .withMessage('Please select a preferred time slot.')
    .isIn(BOOKING_TIME_SLOTS)
    .withMessage('Please select a valid time slot.'),

  body('serviceType')
    .trim()
    .notEmpty()
    .withMessage('Please select a consultation practice division.')
    .isIn(BOOKING_SERVICES)
    .withMessage('Please select a valid consultation practice division.'),

  body('description')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description must be 2000 characters or fewer.'),
];
