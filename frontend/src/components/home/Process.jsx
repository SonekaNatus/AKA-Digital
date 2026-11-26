import { processSteps } from '../../data/content.js';
import Reveal from '../common/Reveal.jsx';
import SectionHeading from '../common/SectionHeading.jsx';

export default function Process() {
  return (
    <section id="processo" className="section-y">
      <div className="container-x">
        <SectionHeading
          eyebrow="Processo"
          title="Como trabalhamos"
          description="Um fluxo claro, com etapas definidas e aprovações em cada fase do projeto."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={(index % 3) * 0.1} className="h-full">
              <div className="glass h-full rounded-3xl p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br bg-accent font-display text-lg font-bold text-ink shadow-glow">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
