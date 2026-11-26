import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';
import { createContact } from '../controllers/contact.controller.js';

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  limit: config.rateLimit.max,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
  },
});

const router = Router();

// POST /api/contact
router.post('/', limiter, createContact);

export default router;
