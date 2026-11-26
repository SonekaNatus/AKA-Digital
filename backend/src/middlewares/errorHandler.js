import { logger } from '../utils/logger.js';

// Express exige os 4 parâmetros para reconhecer um middleware de erro.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Corpo da requisição inválido.' });
  }

  const status = err.statusCode || err.status || 500;

  if (status >= 500) {
    logger.error(err.stack || err.message);
  }

  const payload = {
    success: false,
    message: status >= 500 ? 'Erro interno. Tente novamente mais tarde.' : err.message,
  };

  if (err.details) payload.errors = err.details;

  res.status(status).json(payload);
}
