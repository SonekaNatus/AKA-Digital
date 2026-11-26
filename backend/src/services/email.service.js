import nodemailer from 'nodemailer';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

let transporter = null;

function isConfigured() {
  return Boolean(config.email.host && config.email.from && config.email.to);
}

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: config.email.user
        ? { user: config.email.user, pass: config.email.pass }
        : undefined,
    });
  }
  return transporter;
}

function buildText(lead) {
  return [
    'Novo pedido de orçamento recebido pelo site da AKA Digital.',
    '',
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company || '-'}`,
    `E-mail: ${lead.email}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Serviço: ${lead.service}`,
    '',
    'Descrição do projeto:',
    lead.description,
    '',
    `Recebido em: ${lead.createdAt}`,
    `ID: ${lead.id}`,
  ].join('\n');
}

export const emailService = {
  isConfigured,

  async notifyNewLead(lead) {
    if (!isConfigured()) {
      logger.info(`E-mail não configurado: notificação do lead ${lead.id} ignorada.`);
      return;
    }

    await getTransporter().sendMail({
      from: config.email.from,
      to: config.email.to,
      replyTo: lead.email,
      subject: `Novo pedido de orçamento: ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
      text: buildText(lead),
    });
  },
};
