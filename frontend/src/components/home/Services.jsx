import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { services } from '../../data/content.js';
import { iconMap } from '../../lib/icons.js';
import Button from '../common/Button.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHeading from '../common/SectionHeading.jsx';

export default function Services() {
  const navigate = useNavigate();

  return (
    <section id="servicos" className="section-y relative overflow-hidden">
      <span
        aria-hidden="true"
        className="outline-text pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 select-none whitespace-nowrap font-display text-[18vw] font-black leading-none"
      >
        SERVIÇOS
      </span>

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Serviços"
          title="Soluções completas para crescer no digital"
          description="Da criação do seu site às campanhas de aquisição e à manutenção contínua, cuidamos de cada etapa da sua presença online."
        />

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Reveal key={service.id} delay={index * 0.12} className="h-full">
                <article className="glass group flex h-full flex-col rounded-[2rem] p-8 transition duration-500 hover:-translate-y-2 hover:border-accent/60 hover:shadow-glow">
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-black">
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    <span className="font-display text-sm font-bold text-accent">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-bold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{service.summary}</p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-zinc-300">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    className="mt-8 w-full text-xs uppercase tracking-wider"
                    onClick={() => navigate('/#contato', { state: { service: service.id } })}
                  >
                    Solicitar orçamento
                  </Button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
