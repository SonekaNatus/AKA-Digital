import 'dotenv/config';

const toBool = (value, fallback = false) => {
  if (value === undefined || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
};

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3001,
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  serveFrontend: toBool(process.env.SERVE_FRONTEND, false),
  frontendDist: process.env.FRONTEND_DIST_PATH || '../frontend/dist',
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: Number(process.env.CONTACT_RATE_LIMIT_MAX) || 10,
  },
  email: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: toBool(process.env.SMTP_SECURE, false),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.EMAIL_FROM || '',
    to: process.env.CONTACT_EMAIL_TO || '',
  },
  whatsapp: {
    token: process.env.WHATSAPP_CLOUD_TOKEN || '',
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    notifyTo: process.env.WHATSAPP_NOTIFY_TO || '',
    apiVersion: process.env.WHATSAPP_API_VERSION || 'v21.0',
  },
};
