import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/content.js';
import Reveal from '../common/Reveal.jsx';
import SectionHeading from '../common/SectionHeading.jsx';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-y">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <SectionHeading
          align="left"
          eyebrow="Perguntas frequentes"
          title="Tire suas dúvidas"
          description="Reunimos as perguntas mais comuns. Se a sua não estiver aqui, fale com a gente."
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <Reveal key={faq.question} delay={(index % 3) * 0.05}>
                <div className={`glass overflow-hidden rounded-2xl transition ${isOpen ? 'border-electric/40' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium text-white"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                        className={`shrink-0 text-electric transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
