import { lazy, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Instagram, MessageCircle } from 'lucide-react';
import Button from '../common/Button.jsx';
import ErrorBoundary from '../common/ErrorBoundary.jsx';
import Reveal from '../common/Reveal.jsx';
import { getWhatsAppLink, siteConfig } from '../../config/site.js';

// Carregamento sob demanda: a cena 3D não bloqueia a primeira pintura da página.
const MonitorScene = lazy(() => import('../three/MonitorScene.jsx'));

const TITLE = 'AKA DIGITAL';

const iconButton =
  'grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:border-accent hover:text-accent';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black pt-20"
    >
      {/* Tipografia gigante ao fundo (parallax suave) */}
      <div className="pointer-events-none absolute inset-x-0 top-[38%] z-0 -translate-y-1/2">
        <motion.h1
          style={{ y: titleY, fontSize: 'clamp(2.2rem, 13.5vw, 14rem)' }}
          className="select-none whitespace-nowrap text-center font-display font-black leading-[0.8] tracking-[-0.05em] text-white"
        >
          {TITLE.split('').map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.15 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* Objeto 3D sobreposto ao título */}
      <motion.div
        style={{ y: sceneY }}
        className="absolute inset-x-0 top-[10%] z-10 h-[64%] lg:top-[8%] lg:h-[72%]"
      >
        <ErrorBoundary
          fallback={<div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl" />}
        >
          <Suspense
            fallback={<div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />}
          >
            <MonitorScene />
          </Suspense>
        </ErrorBoundary>
      </motion.div>

      {/* Indicador decorativo de interação */}
      <span aria-hidden="true" className="absolute right-[22%] top-[26%] z-20 hidden h-2.5 w-2.5 animate-pulse rounded-full bg-accent shadow-glow lg:block" />
      <span aria-hidden="true" className="absolute left-[24%] bottom-[30%] z-20 hidden h-2 w-2 rounded-full bg-accent/70 lg:block" />

      {/* Setas laterais: navegação entre as seções */}
      <button
        type="button"
        aria-label="Voltar ao topo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`${iconButton} absolute left-5 top-1/2 z-30 hidden -translate-y-1/2 xl:grid`}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Ir para os serviços"
        onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}
        className={`${iconButton} absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 xl:grid`}
      >
        <ChevronRight size={20} />
      </button>

      {/* Conteúdo textual */}
      <div className="container-x relative z-20 flex flex-1 flex-col justify-end gap-10 pb-28 pt-[62vh] lg:grid lg:grid-cols-2 lg:items-end lg:pt-0">
        <Reveal delay={0.2}>
          <div className="max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              We create digital experiences.
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white md:text-3xl">
              Sua empresa merece uma presença digital que gera resultados.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Transformamos ideias em experiências digitais que atraem clientes, fortalecem marcas e impulsionam negócios.
            </p>
            <Button to="/#servicos" className="mt-7 text-xs uppercase tracking-wider">
              Conheça nossos serviços
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.35} className="lg:justify-self-end">
          <div className="w-full max-w-[300px] rounded-[2rem] bg-white p-6 text-black shadow-2xl">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-black">
              <ArrowUpRight size={20} aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-black uppercase leading-none">Ready to grow?</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Seu próximo projeto digital começa com uma boa ideia. Vamos tirar a sua do papel?
            </p>
            <Button to="/#contato" className="mt-6 w-full text-xs uppercase tracking-wider">
              Fale com a AKA
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Redes sociais */}
      <div className="absolute bottom-6 left-5 z-30 flex gap-3 md:left-10">
        {siteConfig.instagramUrl && (
          <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram da AKA Digital" className={iconButton}>
            <Instagram size={18} />
          </a>
        )}
        <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da AKA Digital" className={iconButton}>
          <MessageCircle size={18} />
        </a>
      </div>

      {/* Indicador de rolagem */}
      <a
        href="#servicos"
        aria-label="Rolar para os serviços"
        className="absolute bottom-6 left-1/2 z-30 grid h-12 w-12 -translate-x-1/2 animate-bounce place-items-center rounded-full bg-accent text-black transition hover:scale-105"
      >
        <ChevronDown size={20} />
      </a>
    </section>
  );
}
