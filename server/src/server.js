import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ----------------------------------------------------------------
// Security & body parsing
// ----------------------------------------------------------------
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// ----------------------------------------------------------------
// CORS — only allow the configured frontend origin(s)
// ----------------------------------------------------------------
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (e.g. curl, server-to-server, health checks)
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS policy.'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

// ----------------------------------------------------------------
// Rate limiting — protects the form submission endpoints from abuse
// ----------------------------------------------------------------
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.',
  },
});

app.use('/api/contact', formLimiter);
app.use('/api/booking', formLimiter);

// ----------------------------------------------------------------
// Routes
// ----------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/contact', contactRoutes);
app.use('/api/booking', bookingRoutes);

// ----------------------------------------------------------------
// Error handling (must be registered last)
// ----------------------------------------------------------------
app.use(notFound);
app.use(errorHandler);

// ----------------------------------------------------------------
// Start
// ----------------------------------------------------------------
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[Server] Listening on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
  });
});
