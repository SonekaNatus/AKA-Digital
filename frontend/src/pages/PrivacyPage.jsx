import useDocumentMeta from '../hooks/useDocumentMeta.js';
import Reveal from '../components/common/Reveal.jsx';

const sections = [
  {
    title: '1. Dados coletados',
    text: 'Coletamos somente as informações enviadas pelo formulário de contato: nome, nome da empresa, e-mail, número de WhatsApp, serviço de interesse e descrição do projeto.',
  },
  {
    title: '2. Finalidade',
    text: 'Os dados são usados para responder solicitações de orçamento, dar retorno comercial e, quando necessário, prestar o serviço contratado.',
  },
  {
    title: '3. Armazenamento e segurança',
    text: 'Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não autorizados, perda e uso indevido. Os dados são mantidos apenas pelo tempo necessário às finalidades descritas.',
  },
  {
    title: '4. Compartilhamento',
    text: 'Não comercializamos dados pessoais enviados por este site. Podemos utilizar fornecedores de tecnologia (como serviços de e-mail e mensagens) estritamente para a execução das finalidades acima.',
  },
  {
    title: '5. Seus direitos',
    text: 'Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode solicitar a confirmação do tratamento, o acesso, a correção, a anonimização ou a exclusão dos seus dados, entre outros direitos. Para isso, entre em contato pelos canais disponíveis no site.',
  },
  {
    title: '6. Cookies e ferramentas de análise',
    text: 'Caso o site passe a utilizar cookies ou ferramentas de análise de tráfego, esta política será atualizada para informar quais são e como funcionam.',
  },
];

export default function PrivacyPage() {
  useDocumentMeta({
    title: 'Política de privacidade',
    description: 'Como a AKA Digital coleta, utiliza e protege os dados enviados pelo site.',
  });

  return (
    <section className="container-x max-w-3xl pb-24 pt-32 md:pt-40">
      <Reveal>
        <h1 className="font-display text-4xl font-bold text-white md:text-5xl">Política de privacidade</h1>
        <p className="mt-6 leading-relaxed text-zinc-400">
          Esta página explica como a AKA Digital trata os dados pessoais coletados por meio deste site.
        </p>
      </Reveal>

      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <Reveal key={section.title}>
            <h2 className="font-display text-xl font-semibold text-white">{section.title}</h2>
            <p className="mt-3 leading-relaxed text-zinc-300">{section.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
