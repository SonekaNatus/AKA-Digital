/*
 * Configurações centrais do site.
 * Os valores vêm das variáveis VITE_* definidas no arquivo frontend/.env
 */
const env = import.meta.env;

const digitsOnly = (value = '') => value.replace(/\D/g, '');

export const siteConfig = {
  name: 'AKA Digital',
  url: env.VITE_SITE_URL || 'http://localhost:5173',
  whatsappNumber: digitsOnly(env.VITE_WHATSAPP_NUMBER || ''),
  whatsappMessage:
    env.VITE_WHATSAPP_MESSAGE ||
    'Olá! Vim pelo site da AKA Digital e gostaria de solicitar um orçamento.',
  instagramUrl: env.VITE_INSTAGRAM_URL || '',
  email: env.VITE_CONTACT_EMAIL || '',
};

/**
 * Gera o link de WhatsApp. Se o número não estiver configurado, o link
 * abre o seletor de contatos do WhatsApp com a mensagem já preenchida.
 */
export function getWhatsAppLink(message) {
  const text = encodeURIComponent(message || siteConfig.whatsappMessage);
  return siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
