import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioProjects } from '../../data/content.js';
import Button from '../common/Button.jsx';
import DeviceMockup from '../common/DeviceMockup.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import ProjectModal from './ProjectModal.jsx';

// Layout assimétrico: cada projeto ocupa uma composição diferente na grade.
const layouts = ['lg:col-span-7', 'lg:col-span-5 lg:mt-32', 'lg:col-span-12'];

export default function Portfolio() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleRequest = () => {
    setSelected(null);
    navigate('/#contato', { state: { service: 'criacao-sites' } });
  };

  return (
    <section id="portfolio" className="section-y relative overflow-hidden">
      <span
        aria-hidden="true"
        className="outline-text pointer-events-none absolute right-0 top-10 select-none whitespace-nowrap font-display text-[16vw] font-black leading-none"
      >
        PORTFÓLIO
      </span>

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Portfólio"
          title="Projetos com identidade e desempenho"
          description="Sites desenvolvidos com foco em design, velocidade e conversão. Os projetos abaixo são demonstrativos."
          align="left"
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          {portfolioProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1} className={layouts[index] ?? 'lg:col-span-6'}>
              <article className="glass group flex h-full flex-col rounded-[2rem] p-6 transition duration-500 hover:border-accent/60 md:p-10">
                <DeviceMockup variant={index === 1 ? 'phone' : 'both'} />

                <div className="mt-10 flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{project.segment}</span>
                    {project.demo && (
                      <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] text-zinc-300">
                        Projeto demonstrativo
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">{project.name}</h3>
                  <p className="mt-3 max-w-xl flex-1 text-sm leading-relaxed text-zinc-400">{project.description}</p>
                  <Button variant="outline" className="mt-8 w-fit text-xs uppercase tracking-wider" onClick={() => setSelected(project)}>
                    Visualizar projeto
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <p className="text-zinc-400">Quer ver o seu negócio em um projeto como esses?</p>
          <Button to="/#contato" className="mt-6 text-xs uppercase tracking-wider">
            Solicitar orçamento
          </Button>
        </Reveal>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} onRequest={handleRequest} />
    </section>
  );
}
