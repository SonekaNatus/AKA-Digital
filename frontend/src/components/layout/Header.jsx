import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import { navItems } from '../../data/content.js';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-ink/90 backdrop-blur-md transition-colors duration-300 ${
        scrolled || open ? 'border-b border-white/10' : ''
      }`}
    >
      <nav aria-label="Navegação principal" className="container-x flex h-20 items-center justify-between gap-6">
        <Logo />

        <ul className="hidden items-center gap-7 xl:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="text-xs font-medium uppercase tracking-[0.18em] text-white/75 transition hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/#contato"
          className="hidden items-center gap-2 rounded-full bg-accent py-2.5 pl-5 pr-2.5 text-xs font-bold uppercase tracking-wider text-ink shadow-glow transition hover:brightness-95 xl:inline-flex"
        >
          Orçamento
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-accent">
            <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </Link>

        <button
          type="button"
          className="rounded-full border border-white/20 p-2.5 text-white xl:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden xl:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pb-6">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 text-sm uppercase tracking-[0.18em] text-white/80 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-5">
                <Link
                  to="/#contato"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-accent px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-ink"
                >
                  Solicitar orçamento
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
