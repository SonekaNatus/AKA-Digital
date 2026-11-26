import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { config } from './config/env.js';
import apiRouter from './routes/index.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './utils/logger.js';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

// CSP desativada aqui para não bloquear fontes e scripts do frontend.
// Em produção, configure a Content-Security-Policy no servidor ou CDN.
app.use(helmet({ contentSecurityPolicy: false }));

app.use(
  cors({
    origin: (origin, callback) => {
      // Requisições sem origem (ex.: curl, Postman) são permitidas.
      if (!origin || config.corsOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    methods: ['GET', 'POST'],
  }),
);

app.use(express.json({ limit: '100kb' }));

app.use('/api', apiRouter);

if (config.serveFrontend) {
  const distPath = path.resolve(process.cwd(), config.frontendDist);

  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    // Fallback para SPA: qualquer rota fora de /api devolve o index.html.
    app.get(/^\/(?!api\/).*/, (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    logger.info(`Servindo frontend a partir de ${distPath}`);
  } else {
    logger.warn(`SERVE_FRONTEND ativo, mas ${distPath} não existe. Rode "npm run build" no frontend.`);
  }
}

app.use(notFound);
app.use(errorHandler);

export default app;
