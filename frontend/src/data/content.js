/*
 * CONTEÚDO EDITÁVEL DO SITE
 * ---------------------------------------------------------------
 * Altere textos, serviços, planos, FAQ e projetos diretamente aqui.
 * Não há valores de preço fixos: a precificação é sempre sob consulta.
 * Revise a história, a missão, a visão e os valores com a equipe antes de publicar.
 */

export const navItems = [
  { label: 'Serviços', to: '/#servicos' },
  { label: 'Planos', to: '/#planos' },
  { label: 'Portfólio', to: '/#portfolio' },
  { label: 'Sobre', to: '/#sobre' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Contato', to: '/#contato' },
];

/* Opções do campo "Serviço desejado" do formulário.
   Os valores devem existir em backend/src/validators/contact.schema.js */
export const serviceOptions = [
  { value: 'criacao-sites', label: 'Criação de sites' },
  { value: 'gestao-trafego', label: 'Gestão de tráfego pago' },
  { value: 'manutencao-mensal', label: 'Manutenção mensal' },
  { value: 'pacote-personalizado', label: 'Pacote personalizado' },
  { value: 'outro', label: 'Outro assunto' },
];

export const services = [
  {
    id: 'criacao-sites',
    title: 'Criação de Sites',
    icon: 'Globe',
    summary:
      'Sites profissionais e páginas de alta conversão, pensados para apresentar sua marca e gerar contatos.',
    items: [
      'Sites institucionais',
      'Landing pages de alta conversão',
      'Sites comerciais',
      'Páginas de vendas',
      'Sites personalizados para empresas',
    ],
  },
  {
    id: 'gestao-trafego',
    title: 'Gestão de Tráfego Pago',
    icon: 'Target',
    summary:
      'Campanhas no Google Ads e Meta Ads focadas em geração de leads e captação de novos clientes.',
    items: [
      'Campanhas no Google Ads',
      'Campanhas no Meta Ads (Instagram e Facebook)',
      'Estratégias para geração de leads',
      'Captação de novos clientes',
      'Monitoramento e otimização de campanhas',
    ],
  },
  {
    id: 'manutencao-mensal',
    title: 'Manutenção Mensal',
    icon: 'RefreshCw',
    summary:
      'Seu site sempre atualizado, seguro e rápido, com suporte contínuo após a entrega.',
    items: [
      'Atualizações de conteúdo',
      'Correção de erros',
      'Melhorias de desempenho',
      'Atualizações de segurança',
      'Suporte técnico',
      'Monitoramento e acompanhamento do site',
    ],
  },
];

export const plans = [
  {
    id: 'criacao-sites',
    name: 'Site Essencial',
    tagline: 'Presença profissional na internet',
    highlight: false,
    features: [
      'Desenvolvimento de site profissional',
      'Layout responsivo',
      'Design personalizado',
      'Formulário de contato',
      'Integração com WhatsApp',
      'Otimização básica para SEO',
    ],
  },
  {
    id: 'gestao-trafego',
    name: 'Gestão de Tráfego',
    tagline: 'Anúncios com foco em resultados',
    highlight: true,
    features: [
      'Planejamento de campanhas',
      'Configuração de anúncios',
      'Gestão de campanhas',
      'Monitoramento de resultados',
      'Otimizações periódicas',
    ],
  },
  {
    id: 'manutencao-mensal',
    name: 'Manutenção Mensal',
    tagline: 'Cuidado contínuo para o seu site',
    highlight: false,
    features: [
      'Atualizações do site',
      'Suporte técnico',
      'Correções e melhorias',
      'Monitoramento',
      'Manutenção preventiva',
    ],
  },
];

export const aboutContent = {
  intro:
    'A AKA Digital nasceu com o propósito de ajudar empresas e empreendedores a fortalecerem sua presença no ambiente digital. Unimos tecnologia, criatividade e estratégias de marketing para desenvolver soluções que valorizam marcas, atraem clientes e impulsionam negócios.',
  blocks: [
    {
      title: 'Nossa história',
      text: 'Acompanhamos cada projeto de perto, do primeiro contato à manutenção contínua, construindo uma relação de confiança com quem nos procura.',
    },
    {
      title: 'Nossa missão',
      text: 'Ajudar empresas e empreendedores a fortalecerem sua presença digital com soluções técnicas e estratégicas.',
    },
    {
      title: 'Nossa visão',
      text: 'Ser referência em soluções digitais que transformam visitantes em clientes.',
    },
    {
      title: 'Nossos valores',
      list: ['Transparência', 'Qualidade técnica', 'Foco em resultados', 'Atendimento próximo', 'Evolução constante'],
    },
  ],
};

export const whyUs = [
  {
    icon: 'Sparkles',
    title: 'Sites modernos e personalizados',
    text: 'Layouts exclusivos, alinhados à identidade da sua marca, sem cara de template genérico.',
  },
  {
    icon: 'Smartphone',
    title: 'Experiência otimizada para celulares',
    text: 'Todo projeto é pensado primeiro para a tela do celular, onde a maioria dos visitantes navega.',
  },
  {
    icon: 'Gauge',
    title: 'Foco em conversão e resultados',
    text: 'Chamadas para ação, formulários e caminhos claros para transformar visitas em oportunidades.',
  },
  {
    icon: 'Target',
    title: 'Estratégias digitais personalizadas',
    text: 'Cada negócio tem um público e um momento diferentes. Planejamos a estratégia sob medida.',
  },
  {
    icon: 'Headphones',
    title: 'Suporte e manutenção contínua',
    text: 'Você não fica sozinho após a publicação: contamos com suporte técnico e manutenção mensal.',
  },
  {
    icon: 'MessageCircle',
    title: 'Atendimento próximo e transparente',
    text: 'Comunicação direta, prazos combinados e acompanhamento claro em cada etapa.',
  },
];

export const processSteps = [
  {
    title: 'Primeiro contato',
    text: 'Entendemos o seu negócio, os seus objetivos e o que você espera do seu site ou das suas campanhas.',
  },
  {
    title: 'Planejamento da estratégia',
    text: 'Definimos escopo, páginas, mensagens, público e as metas que orientam o projeto.',
  },
  {
    title: 'Desenvolvimento do projeto',
    text: 'Criamos o layout, desenvolvemos as páginas e configuramos as integrações necessárias.',
  },
  {
    title: 'Aprovação e ajustes',
    text: 'Você acompanha as entregas e aprova cada etapa, com ajustes feitos antes da publicação.',
  },
  {
    title: 'Publicação e entrega',
    text: 'Colocamos o projeto no ar, testamos em celulares e computadores e entregamos o acesso.',
  },
  {
    title: 'Suporte e acompanhamento',
    text: 'Seguimos com suporte, manutenção e acompanhamento para que o seu site evolua com o negócio.',
  },
];

export const faqs = [
  {
    question: 'Quanto custa criar um site?',
    answer:
      'Não trabalhamos com tabela fixa. O valor depende do escopo, do número de páginas, das funcionalidades e dos objetivos do projeto. Solicite um orçamento e enviaremos uma proposta personalizada.',
  },
  {
    question: 'Quanto tempo demora para desenvolver um site?',
    answer:
      'O prazo varia conforme a complexidade do projeto e a agilidade no envio de materiais e aprovações. Após o alinhamento inicial, informamos o cronograma previsto.',
  },
  {
    question: 'O site funciona em celulares?',
    answer:
      'Sim. Todos os projetos são desenvolvidos com layout responsivo, pensado para celulares, tablets e computadores.',
  },
  {
    question: 'Vocês oferecem manutenção mensal?',
    answer:
      'Sim. Oferecemos o plano de Manutenção Mensal, com atualizações de conteúdo, correções, melhorias de desempenho, atualizações de segurança e suporte técnico.',
  },
  {
    question: 'A AKA Digital também gerencia anúncios?',
    answer:
      'Sim. Atuamos com gestão de tráfego pago no Google Ads e no Meta Ads, com planejamento, configuração, monitoramento e otimizações periódicas.',
  },
  {
    question: 'Posso contratar somente a criação do site?',
    answer:
      'Sim. Você pode contratar apenas a criação do site e, quando quiser, adicionar outros serviços, como tráfego pago ou manutenção.',
  },
  {
    question: 'Como funciona o suporte após a entrega?',
    answer:
      'Após a entrega, você conta com um canal de suporte. Para acompanhamento contínuo, recomendamos o plano de Manutenção Mensal.',
  },
];

/*
 * PORTFÓLIO
 * Projetos marcados com demo: true são demonstrações e não representam clientes reais.
 * Para adicionar um trabalho real, copie um item, defina demo: false e preencha a url.
 * O campo accent aceita classes de gradiente do Tailwind.
 */
export const portfolioProjects = [
  {
    id: 'demo-clinica',
    name: 'Clínica Exemplo',
    segment: 'Saúde',
    description:
      'Site institucional com apresentação de serviços, chamadas para agendamento via WhatsApp e layout otimizado para celulares.',
    demo: true,
    url: '',
  },
  {
    id: 'demo-loja',
    name: 'Loja Exemplo',
    segment: 'Varejo',
    description:
      'Landing page de alta conversão com destaque para ofertas, prova social e formulário de captação de leads.',
    demo: true,
    url: '',
  },
  {
    id: 'demo-consultoria',
    name: 'Consultoria Exemplo',
    segment: 'Serviços profissionais',
    description:
      'Site institucional com apresentação de soluções, páginas de conteúdo e formulário de contato integrado.',
    demo: true,
    url: '',
  },
];

/*
 * DEPOIMENTOS
 * Adicione objetos no formato abaixo somente com autorização dos clientes:
 * { name: 'Nome', company: 'Empresa', role: 'Cargo', photo: '/depoimentos/nome.jpg', text: 'Depoimento' }
 * Enquanto a lista estiver vazia, a seção exibe uma mensagem de espera.
 */
export const testimonials = [];
