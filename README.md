# AKA Digital

Site institucional e comercial da AKA Digital, voltado à criação de sites, gestão de tráfego pago e manutenção mensal. O projeto é formado por uma aplicação React no frontend e uma API em Node.js com Express, responsável por receber e validar os pedidos de orçamento.

## Funcionalidades

- Página inicial com seções de serviços, planos, portfólio, processo, perguntas frequentes e contato
- Menu responsivo e navegação por âncoras com rolagem suave
- Formulário de orçamento com validação dos campos e retorno visual de envio e erro
- Botões de orçamento que levam ao formulário com o serviço já selecionado
- Botões de WhatsApp com número configurável e mensagem pré-preenchida
- Portfólio com detalhes por projeto e mockups de desktop e celular
- Metadados por página para SEO básico
- Cena 3D no topo da página, com fallback automático quando o navegador não suporta WebGL

## Tecnologias

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Framer Motion, React Three Fiber, Three.js e Lucide React.

**Backend:** Node.js, Express, Zod (validação), Helmet, express-rate-limit e Nodemailer.

## Estrutura do repositório

```
AKA-Digital/
├── frontend/          Aplicação React (Vite)
│   ├── public/        Arquivos estáticos (favicon, robots.txt)
│   └── src/
│       ├── components/  Layout, seções da página e componentes comuns
│       ├── config/      Configurações do site (WhatsApp, redes, e-mail)
│       ├── data/        Conteúdo editável: serviços, planos, FAQ e portfólio
│       ├── hooks/       Hooks reutilizáveis
│       ├── pages/       Páginas da aplicação
│       └── services/    Comunicação com a API
└── backend/           API em Node.js e Express
    └── src/
        ├── config/       Leitura das variáveis de ambiente
        ├── controllers/  Tratamento das requisições
        ├── middlewares/  Tratamento de erros e rotas inexistentes
        ├── repositories/ Armazenamento dos pedidos de orçamento
        ├── routes/       Definição das rotas da API
        ├── services/     Regras de negócio e integrações (e-mail e WhatsApp)
        └── validators/   Esquemas de validação
```

## Pré-requisitos

- Node.js 18.17 ou superior
- npm (instalado junto com o Node.js)

## Instalação e execução local

Clone o repositório e abra a pasta do projeto:

```bash
git clone https://github.com/SonekaNatus/AKA-Digital.git
cd AKA-Digital
```

Em seguida, configure e inicie a API e o frontend, cada um em um terminal.

**Backend (porta 3001)**

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

No Windows, use `copy .env.example .env` no lugar do `cp`.

**Frontend (porta 5173)**

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Acesse `http://localhost:5173`. O Vite encaminha as chamadas `/api` para o backend automaticamente.

## Variáveis de ambiente

As variáveis ficam nos arquivos `.env` de cada pasta. Os modelos estão em `.env.example`.

### Frontend (`frontend/.env`)

| Variável | Descrição |
| --- | --- |
| `VITE_WHATSAPP_NUMBER` | Número de WhatsApp com DDI e DDD, somente dígitos. Exemplo: `5511999999999` |
| `VITE_WHATSAPP_MESSAGE` | Mensagem inicial sugerida nas conversas |
| `VITE_INSTAGRAM_URL` | Link do Instagram. Quando vazio, o botão não aparece |
| `VITE_CONTACT_EMAIL` | E-mail exibido no site. Quando vazio, não aparece |
| `VITE_API_URL` | URL pública da API. Vazia em desenvolvimento |
| `VITE_SITE_URL` | Endereço público do site, usado em metadados |

As variáveis `VITE_*` são gravadas no momento do build. Após alterá-las, reinicie o `npm run dev` ou gere um novo build.

### Backend (`backend/.env`)

| Variável | Descrição |
| --- | --- |
| `PORT` | Porta da API. Padrão: `3001` |
| `CORS_ORIGIN` | Origens autorizadas a acessar a API, separadas por vírgula |
| `SERVE_FRONTEND` | Quando `true`, a API também entrega o frontend compilado |
| `CONTACT_RATE_LIMIT_MAX` | Número máximo de envios do formulário por IP a cada 15 minutos |
| `SMTP_*`, `EMAIL_FROM`, `CONTACT_EMAIL_TO` | Envio de notificações por e-mail |
| `WHATSAPP_CLOUD_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_NOTIFY_TO` | Notificações por WhatsApp (WhatsApp Cloud API) |

Notificações por e-mail e WhatsApp são opcionais. Enquanto as credenciais não forem preenchidas, os pedidos continuam sendo salvos normalmente e as notificações são ignoradas.

## Scripts

| Pasta | Comando | Função |
| --- | --- | --- |
| `frontend` | `npm run dev` | Servidor de desenvolvimento |
| `frontend` | `npm run build` | Gera a versão de produção em `dist/` |
| `frontend` | `npm start` | Gera o build e serve a versão de produção |
| `backend` | `npm run dev` | API com recarregamento automático |
| `backend` | `npm start` | API em execução normal |

## Endpoints da API

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/health` | Verifica se a API está em execução |
| `POST` | `/api/contact` | Recebe um pedido de orçamento, valida e salva |

## Personalização de conteúdo

Textos, serviços, planos, perguntas frequentes e projetos do portfólio ficam em `frontend/src/data/content.js`. Os projetos marcados com `demo: true` são ilustrativos e devem ser substituídos por trabalhos reais antes da publicação.

Os depoimentos ficam na lista `testimonials`, no mesmo arquivo. Adicione somente depoimentos autorizados pelos clientes.

## Publicação

1. Defina as variáveis de ambiente no painel da hospedagem, sem enviá-las ao repositório.
2. No frontend, gere o build com `npm run build` e publique a pasta `dist/`. Em provedores de SPA, configure o redirecionamento de todas as rotas para `index.html`.
3. No backend, defina `NODE_ENV=production`, ajuste `CORS_ORIGIN` para o domínio do site e execute `npm start`.
4. Mantenha a API atrás de HTTPS.

Se preferir publicar tudo em um único serviço, defina `SERVE_FRONTEND=true` no backend, gere o build do frontend e execute apenas o backend.

## Privacidade

A política de privacidade do site (`frontend/src/pages/PrivacyPage.jsx`) é um ponto de partida e deve ser revisada antes da publicação, considerando a LGPD e as práticas reais de tratamento de dados.

## Licença

Todos os direitos reservados à AKA Digital. O código não é licenciado para uso ou redistribuição sem autorização.
