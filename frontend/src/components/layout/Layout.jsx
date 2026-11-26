import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ScrollToHash from '../common/ScrollToHash.jsx';
import WhatsAppFloat from '../common/WhatsAppFloat.jsx';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToHash />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
