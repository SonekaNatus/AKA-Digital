import useDocumentMeta from '../hooks/useDocumentMeta.js';
import Hero from '../components/home/Hero.jsx';
import Services from '../components/home/Services.jsx';
import Plans from '../components/home/Plans.jsx';
import About from '../components/home/About.jsx';
import Portfolio from '../components/home/Portfolio.jsx';
import WhyUs from '../components/home/WhyUs.jsx';
import Process from '../components/home/Process.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import FAQ from '../components/home/FAQ.jsx';
import Contact from '../components/home/Contact.jsx';

export default function HomePage() {
  useDocumentMeta({
    title: 'Criação de sites e tráfego pago',
    description:
      'AKA Digital: criação de sites profissionais, gestão de tráfego pago no Google Ads e Meta Ads e manutenção mensal de sites. Solicite seu orçamento.',
  });

  return (
    <>
      <Hero />
      <Services />
      <Plans />
      <About />
      <Portfolio />
      <WhyUs />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
