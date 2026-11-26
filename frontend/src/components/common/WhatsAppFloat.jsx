import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../config/site.js';

export default function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Iniciar conversa no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink shadow-glow transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:bottom-8 md:right-8"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" aria-hidden="true" />
      <MessageCircle className="relative" size={24} />
    </a>
  );
}
