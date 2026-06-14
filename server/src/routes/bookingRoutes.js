import express from 'express';
import { bookingValidationRules } from '../middleware/validators.js';
import { handleValidationErrors } from '../middleware/errorHandler.js';
import { createBookingSubmission } from '../controllers/bookingController.js';

const router = express.Router();

// POST /api/booking
router.post('/', bookingValidationRules, handleValidationErrors, createBookingSubmission);

export default router;
