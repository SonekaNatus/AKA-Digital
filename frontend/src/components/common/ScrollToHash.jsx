import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/*
 * Rola até a seção indicada no hash (ex.: /#contato) e volta ao topo
 * ao trocar de página. Necessário porque o React Router não faz isso sozinho.
 */
export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    return undefined;
  }, [pathname, hash, key]);

  return null;
}
