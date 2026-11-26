import { Router } from 'express';
import contactRoutes from './contact.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'aka-digital-api',
    timestamp: new Date().toISOString(),
  });
});

// Novos módulos devem ser registrados aqui (ex.: router.use('/blog', blogRoutes)).
router.use('/contact', contactRoutes);

export default router;
