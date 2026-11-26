import { whyUs } from '../../data/content.js';
import { iconMap } from '../../lib/icons.js';
import Reveal from '../common/Reveal.jsx';
import SectionHeading from '../common/SectionHeading.jsx';

export default function WhyUs() {
  return (
    <section id="diferenciais" className="section-y">
      <div className="container-x">
        <SectionHeading
          eyebrow="Diferenciais"
          title="Por que escolher a AKA Digital?"
          description="Tecnologia, estratégia e atendimento próximo em cada etapa do seu projeto."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal key={item.title} delay={(index % 3) * 0.1} className="h-full">
                <div className="glass group h-full rounded-3xl p-8 transition duration-300 hover:-translate-y-1 hover:border-neon/50">
                  <span className="mb-5 inline-flex rounded-2xl bg-gradient-to-br from-electric/30 to-neon/30 p-3 text-white">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
