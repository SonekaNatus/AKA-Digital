import { Link } from 'react-router-dom';

export default function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="AKA Digital - página inicial"
      className={`flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-display text-lg font-black text-ink">
        A
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-white">
        AKA <span className="text-zinc-400">Digital</span>
      </span>
    </Link>
  );
}
