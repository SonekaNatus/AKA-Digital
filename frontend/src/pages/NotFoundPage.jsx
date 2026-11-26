import useDocumentMeta from '../hooks/useDocumentMeta.js';
import Button from '../components/common/Button.jsx';

export default function NotFoundPage() {
  useDocumentMeta({ title: 'Página não encontrada', description: 'A página que você procura não existe.' });

  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <p className="font-display text-7xl font-bold text-gradient">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-white">Página não encontrada</h1>
      <p className="mt-3 max-w-md text-zinc-400">O endereço pode ter sido alterado ou não existe mais.</p>
      <Button to="/" className="mt-8">Voltar para a página inicial</Button>
    </section>
  );
}
