import { aboutContent } from '../../data/content.js';
import Reveal from '../common/Reveal.jsx';

export default function About() {
  return (
    <section id="sobre" className="section-y relative overflow-hidden">
      <span
        aria-hidden="true"
        className="outline-text pointer-events-none absolute -left-4 top-6 select-none font-display text-[14vw] font-black leading-none"
      >
        SOBRE
      </span>

      <div className="container-x relative grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-accent">Sobre a AKA Digital</p>
          <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-white md:text-6xl">
            Somos a AKA Digital. Criamos soluções que conectam empresas a novas oportunidades.
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">{aboutContent.intro}</p>
        </Reveal>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-5 lg:self-end">
          {aboutContent.blocks.map((block, index) => (
            <Reveal key={block.title} delay={index * 0.1}>
              <div className="border-t border-white/20 pt-6">
                <span className="font-display text-sm font-bold text-accent">0{index + 1}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{block.title}</h3>
                {block.text && <p className="mt-3 text-sm leading-relaxed text-zinc-400">{block.text}</p>}
                {block.list && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {block.list.map((value) => (
                      <li key={value} className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-300">
                        {value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
