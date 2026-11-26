import { Link } from 'react-router-dom';

/*
 * Logo oficial da AKA Digital.
 * variant="simbolo": apenas o símbolo (cabeçalho)
 * variant="completa": símbolo com a palavra AKA DIGITAL (rodapé)
 */
export default function Logo({ variant = 'simbolo', className = '' }) {
  const isSymbol = variant === 'simbolo';

  return (
    <Link
      to="/"
      aria-label="AKA Digital - página inicial"
      className={`inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      <img
        src={isSymbol ? '/logo-aka-simbolo.png' : '/logo-aka-completa.png'}
        alt="AKA Digital"
        className={isSymbol ? 'h-12 w-auto' : 'h-24 w-auto'}
        decoding="async"
      />
    </Link>
  );
}
