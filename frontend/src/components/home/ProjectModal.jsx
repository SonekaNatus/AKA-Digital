import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import Button from '../common/Button.jsx';
import DeviceMockup from '../common/DeviceMockup.jsx';

export default function ProjectModal({ project, onClose, onRequest }) {
  useEffect(() => {
    if (!project) return undefined;

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="glass relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-graphite p-6 md:p-10"
          >
            <button
              type="button"
              aria-label="Fechar"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <X size={22} />
            </button>

            <DeviceMockup accent={project.accent} />

            <p className="mt-10 text-xs font-semibold uppercase tracking-wider text-electric">{project.segment}</p>
            <h3 id="project-title" className="mt-2 font-display text-2xl font-bold text-white">
              {project.name}
            </h3>
            <p className="mt-4 leading-relaxed text-zinc-400">{project.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {project.url && (
                <Button href={project.url} variant="outline">
                  Ver site online
                  <ExternalLink size={16} aria-hidden="true" />
                </Button>
              )}
              <Button onClick={onRequest} variant={project.url ? 'outline' : 'primary'}>
                Quero um projeto assim
              </Button>
            </div>

            {project.demo && (
              <p className="mt-6 text-xs text-zinc-500">
                Projeto demonstrativo, criado para ilustrar nosso trabalho. Não representa um cliente real.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
