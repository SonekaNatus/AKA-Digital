import app from './app.js';
import { config } from './config/env.js';
import { logger } from './utils/logger.js';

const server = app.listen(config.port, () => {
  logger.info(`API da AKA Digital em execução na porta ${config.port} (${config.env}).`);
});

const shutdown = () => {
  server.close(() => process.exit(0));
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
