import express from 'express';
import { contactValidationRules } from '../middleware/validators.js';
import { handleValidationErrors } from '../middleware/errorHandler.js';
import { createContactSubmission } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact
router.post('/', contactValidationRules, handleValidationErrors, createContactSubmission);

export default router;
