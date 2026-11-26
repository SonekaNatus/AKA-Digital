import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { plans } from '../../data/content.js';
import Button from '../common/Button.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHeading from '../common/SectionHeading.jsx';

export default function Plans() {
  const navigate = useNavigate();
  const requestQuote = (service) => navigate('/#contato', { state: { service } });

  return (
    <section id="planos" className="section-y">
      <div className="container-x">
        <SectionHeading
          eyebrow="Planos"
          title="Escolha o caminho ideal para o seu negócio"
          description="Valores sob consulta, de acordo com o escopo, o prazo e os objetivos do seu projeto. Você também pode contratar cada serviço separadamente ou montar um pacote personalizado."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 0.1} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-3xl p-8 ${
                  plan.highlight
                    ? 'border border-electric/60 bg-ink shadow-glow'
                    : 'glass'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r bg-accent px-3 py-1 text-xs font-semibold text-ink">
                    Destaque
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{plan.tagline}</p>
                <p className="mt-6 font-display text-xl text-white">Valor sob consulta</p>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-zinc-300">
                      <Check size={18} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-8 w-full"
                  variant={plan.highlight ? 'primary' : 'outline'}
                  onClick={() => requestQuote(plan.id)}
                >
                  Solicitar orçamento
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="glass flex flex-col items-start justify-between gap-6 rounded-3xl p-8 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-xl font-semibold text-white">Pacote personalizado</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                Combine criação de site, tráfego pago e manutenção em uma proposta sob medida para a sua necessidade.
              </p>
            </div>
            <Button variant="outline" onClick={() => requestQuote('pacote-personalizado')}>
              Montar meu pacote
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
