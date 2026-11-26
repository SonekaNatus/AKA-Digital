import { randomUUID } from 'node:crypto';
import { leadRepository } from '../repositories/lead.repository.js';
import { emailService } from './email.service.js';
import { whatsappService } from './whatsapp.service.js';
import { logger } from '../utils/logger.js';

export const contactService = {
  async register(data) {
    const { website, ...fields } = data;

    // Robôs que preenchem o campo oculto recebem sucesso, mas nada é salvo.
    if (website) {
      logger.warn('Campo honeypot preenchido: envio descartado.');
      return { id: null };
    }

    const lead = {
      id: randomUUID(),
      ...fields,
      source: 'site',
      createdAt: new Date().toISOString(),
    };

    await leadRepository.save(lead);

    const results = await Promise.allSettled([
      emailService.notifyNewLead(lead),
      whatsappService.notifyNewLead(lead),
    ]);

    results.forEach((result) => {
      if (result.status === 'rejected') {
        logger.error(`Falha ao enviar notificação do lead ${lead.id}:`, result.reason?.message);
      }
    });

    return { id: lead.id };
  },
};
