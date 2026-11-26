import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

function isConfigured() {
  const { token, phoneNumberId, notifyTo } = config.whatsapp;
  return Boolean(token && phoneNumberId && notifyTo);
}

/*
 * Notifica a equipe por WhatsApp usando a WhatsApp Cloud API (Meta).
 * Observação: mensagens iniciadas pelo negócio fora da janela de 24 horas
 * exigem um template aprovado pela Meta. Ajuste o "body" conforme necessário.
 */
export const whatsappService = {
  isConfigured,

  async notifyNewLead(lead) {
    if (!isConfigured()) return;

    const { token, phoneNumberId, notifyTo, apiVersion } = config.whatsapp;
    const url = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

    const body = {
      messaging_product: 'whatsapp',
      to: notifyTo,
      type: 'text',
      text: {
        body: [
          'Novo pedido de orçamento - AKA Digital',
          `Nome: ${lead.name}`,
          `Empresa: ${lead.company || '-'}`,
          `WhatsApp: ${lead.whatsapp}`,
          `Serviço: ${lead.service}`,
        ].join('\n'),
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`WhatsApp API respondeu ${response.status}: ${detail}`);
    }

    logger.info(`Notificação de WhatsApp enviada para o lead ${lead.id}.`);
  },
};
