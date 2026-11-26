import { Link } from 'react-router-dom';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import Logo from './Logo.jsx';
import { navItems, services } from '../../data/content.js';
import { getWhatsAppLink, siteConfig } from '../../config/site.js';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="completa" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
            Criamos sites profissionais, estratégias de tráfego pago e manutenção mensal para empresas que querem crescer no digital.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Navegação</h2>
          <ul className="mt-4 space-y-3 text-sm text-zinc-400">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Serviços</h2>
          <ul className="mt-4 space-y-3 text-sm text-zinc-400">
            {services.map((service) => (
              <li key={service.id}>
                <Link to="/#servicos" className="transition hover:text-white">{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm text-zinc-400">
            <li>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp
              </a>
            </li>
            {siteConfig.email && (
              <li>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 transition hover:text-white">
                  <Mail size={16} aria-hidden="true" /> {siteConfig.email}
                </a>
              </li>
            )}
            {siteConfig.instagramUrl && (
              <li>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
                  <Instagram size={16} aria-hidden="true" /> Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© {year} AKA Digital. Todos os direitos reservados.</p>
          <Link to="/politica-de-privacidade" className="transition hover:text-white">
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
