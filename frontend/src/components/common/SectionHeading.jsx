import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <Reveal className={`relative max-w-4xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      )}
      <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-white md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-base leading-relaxed text-zinc-400 md:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
