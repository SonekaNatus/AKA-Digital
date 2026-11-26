import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-accent font-semibold text-on-primary shadow-glow hover:brightness-110',
  secondary: 'bg-neon font-semibold text-on-primary shadow-secondary hover:brightness-110',
  outline: 'border border-white/20 text-white hover:border-accent/60 hover:bg-white/5',
  ghost: 'text-zinc-300 hover:text-white',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-60';

/**
 * Botão reutilizável.
 * - to:   navega internamente (React Router)
 * - href: link externo (abre em nova aba)
 * - sem to/href: botão comum (type="button" por padrão)
 */
export default function Button({ to, href, variant = 'primary', className = '', children, ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
