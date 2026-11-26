import { Quote } from 'lucide-react';
import { testimonials } from '../../data/content.js';
import Button from '../common/Button.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHeading from '../common/SectionHeading.jsx';

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export default function Testimonials() {
  const hasItems = testimonials.length > 0;

  return (
    <section id="depoimentos" className="section-y">
      <div className="container-x">
        <SectionHeading
          eyebrow="Depoimentos"
          title="O que nossos clientes dizem"
          description="Espaço reservado para avaliações de clientes que autorizaram a publicação."
        />

        {hasItems ? (
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={`${item.name}-${index}`} delay={(index % 3) * 0.1} className="h-full">
                <figure className="glass flex h-full flex-col rounded-3xl p-8">
                  <Quote className="text-electric" size={28} aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">
                    “{item.text}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {item.photo ? (
                      <img src={item.photo} alt={item.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br bg-accent text-sm font-semibold text-ink">
                        {initials(item.name)}
                      </span>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-zinc-400">
                        {[item.role, item.company].filter(Boolean).join(' • ')}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-16">
            <div className="glass mx-auto max-w-2xl rounded-3xl p-10 text-center">
              <Quote className="mx-auto text-electric" size={32} aria-hidden="true" />
              <p className="mt-4 text-zinc-300">
                Os depoimentos dos nossos clientes serão publicados aqui em breve.
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Quer ser um dos primeiros a contar a sua experiência?
              </p>
              <Button to="/#contato" className="mt-6">
                Solicitar orçamento
              </Button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
