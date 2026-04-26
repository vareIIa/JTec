import type { ReactNode } from "react";

export type ProjectStatus = "live" | "archived" | "ongoing";
export type ProjectCategory =
  | "IA & Chatbot"
  | "E-commerce"
  | "Landing Page"
  | "SaaS"
  | "Institucional"
  | "Dashboard";

export type Testimonial = {
  author: string;
  role: string;
  company: string;
  initials: string;
  avatarGradient: string;
  rating: 4 | 5;
  text: string;
  date: string;
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  story: string;
  category: ProjectCategory;
  year: number;
  status: ProjectStatus;
  gradient: string;
  tech: string[];
  impact: string;
  impactLabel: string;
  icon: ReactNode;
  featured?: boolean;
  featuredDetail?: {
    context: string;
    solution: string;
    result: string;
    locations?: string[];
    client?: string;
  };
  mockup?: "mycoach" | "ecom" | "landing" | "saas" | "dashboard" | "corporate";
  testimonials?: Testimonial[];
};

export const projects: Project[] = [
  {
    id: "mycoach",
    name: "MyCoach — IA para Educação",
    tagline: "A IA que transformou a sala de aula brasileira.",
    story:
      "Professores passavam horas montando aulas, PDFs e materiais didáticos do zero. O MyCoach mudou isso: com um clique, a IA gera planos de aula completos, provas, resumos e tudo que um professor precisa — em segundos.",
    category: "IA & Chatbot",
    year: 2023,
    status: "live",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    tech: ["Python", "OpenAI", "React", "FastAPI", "PostgreSQL"],
    impact: "5.000+",
    impactLabel: "Professores impactados",
    featured: true,
    featuredDetail: {
      client: "Projeto Desenvolve · PTEC",
      context:
        "Desenvolvido pelos fundadores da JTEC durante passagem pela PTEC, o MyCoach nasceu como resposta à sobrecarga de professores da rede pública. O Projeto Desenvolve levou a solução para Itabira, Bom Despacho e dezenas de cidades pelo Brasil inteiro.",
      solution:
        "Interface ChatGPT-like com menu acadêmico lateral: o professor seleciona matéria, série e objetivo — a IA gera o material completo. Planos de aula, exercícios, PDFs prontos para impressão, simulados e correções automáticas.",
      result:
        "Adotado pelo Projeto Desenvolve em todo o Brasil. Milhares de aulas geradas por semana. Professores relataram economia de 3-5h diárias na preparação de material.",
      locations: ["Itabira · MG", "Bom Despacho · MG", "Todo o Brasil"],
    },
    mockup: "mycoach",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="9" cy="10" r="0.8" fill="currentColor" />
        <circle cx="12" cy="10" r="0.8" fill="currentColor" />
        <circle cx="15" cy="10" r="0.8" fill="currentColor" />
      </svg>
    ),
    testimonials: [
      {
        author: "Ana Beatriz Santos",
        role: "Professora de História — 8° e 9° Ano",
        company: "E.M. Dom Bosco · Itabira, MG",
        initials: "AB",
        avatarGradient: "from-emerald-400 to-teal-500",
        rating: 5,
        text: "Antes eu passava 3 horas preparando uma única semana de aulas. Com o MyCoach, faço isso em 15 minutos e o resultado é melhor — os exercícios chegam formatados, com gabarito, no nível certo para minha turma. Nunca mais imagino trabalhar sem isso.",
        date: "Mar 2024",
      },
      {
        author: "Carlos Eduardo Mendes",
        role: "Coordenador Pedagógico",
        company: "PTEC · Itabira, MG",
        initials: "CE",
        avatarGradient: "from-cyan-400 to-blue-500",
        rating: 5,
        text: "Implantamos o MyCoach em outubro de 2023. Em duas semanas, 100% dos professores usavam diariamente. A resistência inicial durou exatamente um dia de uso. O impacto na qualidade das aulas e na motivação dos alunos foi imediato e mensurável.",
        date: "Jan 2024",
      },
    ],
  },
  {
    id: "advocacia-silva",
    name: "Advocacia Silva & Associados",
    tagline: "Autoridade jurídica traduzida em design.",
    story:
      "Um escritório de advocacia secular precisava de uma presença digital que transmitisse confiança sem perder a modernidade. Criamos uma identidade visual institucional que virou referência no segmento jurídico mineiro.",
    category: "Institucional",
    year: 2024,
    status: "live",
    gradient: "from-slate-600 via-slate-500 to-zinc-500",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    impact: "340%",
    impactLabel: "Aumento em leads qualificados",
    mockup: "corporate",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21V11h6v10" />
        <path d="M12 3v4" />
      </svg>
    ),
    testimonials: [
      {
        author: "Dr. Roberto Silva",
        role: "Sócio-fundador",
        company: "Silva & Associados · Belo Horizonte, MG",
        initials: "RS",
        avatarGradient: "from-slate-400 to-zinc-600",
        rating: 5,
        text: "Trabalhei com outras empresas de tecnologia antes. A JTEC foi a única que entendeu que um escritório de advocacia não precisa de um site bonito — precisa de um site que converta. O resultado em leads qualificados superou qualquer expectativa. Retorno sobre investimento em menos de 60 dias.",
        date: "Ago 2024",
      },
      {
        author: "Isabela Ferreira",
        role: "Coordenadora de Atendimento",
        company: "Silva & Associados · Belo Horizonte, MG",
        initials: "IF",
        avatarGradient: "from-gray-400 to-slate-500",
        rating: 5,
        text: "O processo foi extremamente profissional. Fizeram perguntas que nenhuma outra empresa tinha feito: quem é nosso cliente ideal, qual a principal objeção, o que diferencia nosso escritório. Isso se traduziu num site que realmente nos representa e converte.",
        date: "Set 2024",
      },
    ],
  },
  {
    id: "clinica-beleza-prime",
    name: "Clínica Beleza Prime",
    tagline: "Onde o luxo encontra a conversão.",
    story:
      "Landing page premium para clínica estética de alto padrão em BH. O desafio era converter visitantes céticos em agendamentos. Resultado: taxa de conversão 3x acima do mercado.",
    category: "Landing Page",
    year: 2024,
    status: "live",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    tech: ["Next.js", "Tailwind", "Calendly API", "Vercel"],
    impact: "3×",
    impactLabel: "Taxa de conversão vs. mercado",
    mockup: "landing",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    testimonials: [
      {
        author: "Dra. Carla Monteiro",
        role: "Fundadora e Diretora Clínica",
        company: "Clínica Beleza Prime · Belo Horizonte, MG",
        initials: "CM",
        avatarGradient: "from-rose-400 to-pink-500",
        rating: 5,
        text: "Em três meses com o novo site, nossa agenda ficou cheia com 2 semanas de antecedência. O design transmite exatamente o luxo e a seriedade que nossa clínica representa. A integração com o agendamento online cortou 80% das ligações para marcar consulta.",
        date: "Out 2024",
      },
      {
        author: "Ricardo Henrique",
        role: "Gerente de Marketing",
        company: "Clínica Beleza Prime · Belo Horizonte, MG",
        initials: "RH",
        avatarGradient: "from-pink-400 to-fuchsia-500",
        rating: 4,
        text: "O resultado em conversão surpreendeu até a nós. Antes do site novo, nossa taxa de agendamento online era próxima de zero. Hoje mais de 60% dos novos clientes chegam direto pelo site. O trabalho da JTEC foi muito acima do que esperávamos.",
        date: "Nov 2024",
      },
    ],
  },
  {
    id: "construtech-engenharia",
    name: "ConstruTech Engenharia",
    tagline: "Infraestrutura sólida, presença digital sólida.",
    story:
      "Empresa de engenharia com 20 anos de mercado e site dos anos 2000. Modernizamos toda a identidade digital, criamos portfólio de obras interativo e sistema de orçamento online.",
    category: "Institucional",
    year: 2023,
    status: "live",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    tech: ["Next.js", "Sanity CMS", "Tailwind", "TypeScript"],
    impact: "180%",
    impactLabel: "Crescimento em orçamentos online",
    mockup: "corporate",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h10M7 12h6" />
      </svg>
    ),
    testimonials: [
      {
        author: "Eng. Marcos Vieira",
        role: "Diretor Comercial",
        company: "ConstruTech Engenharia · Contagem, MG",
        initials: "MV",
        avatarGradient: "from-amber-400 to-orange-500",
        rating: 5,
        text: "Nosso site anterior tinha 12 anos e vergonha de mostrar para o cliente. Em 45 dias a JTEC entregou algo que nossa equipe usa com orgulho. O sistema de orçamento online automatizou um processo que antes exigia 3 reuniões presenciais.",
        date: "Dez 2023",
      },
      {
        author: "Lúcia Andrade",
        role: "Gerente Administrativa",
        company: "ConstruTech Engenharia · Contagem, MG",
        initials: "LA",
        avatarGradient: "from-orange-400 to-yellow-500",
        rating: 5,
        text: "O CMS que implementaram é muito intuitivo. Nossa equipe consegue atualizar obras, adicionar fotos e publicar notícias sem precisar chamar desenvolvedor. Esse nível de autonomia era o que mais precisávamos.",
        date: "Jan 2024",
      },
    ],
  },
  {
    id: "fastfood-bella",
    name: "Bella Burger — App & E-commerce",
    tagline: "Pedido em 3 cliques, entrega em 20 minutos.",
    story:
      "Rede de hamburguerias artesanais precisava sair do iFood e ter canal próprio. Desenvolvemos loja completa com cardápio digital, sistema de pedidos, rastreamento em tempo real e fidelidade.",
    category: "E-commerce",
    year: 2024,
    status: "live",
    gradient: "from-orange-500 via-red-500 to-rose-500",
    tech: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "WebSocket"],
    impact: "R$ 85k",
    impactLabel: "Em pedidos no 1° mês",
    mockup: "ecom",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
    testimonials: [
      {
        author: "Diego Fernandes",
        role: "Co-fundador e CEO",
        company: "Bella Burger · Belo Horizonte, MG",
        initials: "DF",
        avatarGradient: "from-orange-400 to-red-500",
        rating: 5,
        text: "Pagávamos 30% de comissão ao iFood e não tínhamos controle nenhum sobre nosso cliente. Hoje 70% dos pedidos vêm pelo nosso próprio app. O sistema de fidelidade que a JTEC desenvolveu aumentou o ticket médio em 40%. Foi o melhor investimento que fizemos.",
        date: "Jun 2024",
      },
      {
        author: "Amanda Souza",
        role: "Gerente de Operações",
        company: "Bella Burger · Belo Horizonte, MG",
        initials: "AS",
        avatarGradient: "from-red-400 to-rose-500",
        rating: 5,
        text: "O painel de controle de pedidos em tempo real salvou nossa operação. Durante o rush do fim de semana, toda a equipe consegue ver o status de cada pedido na tela. Zero confusão, zero pedido perdido. É simplesmente o que precisávamos.",
        date: "Jul 2024",
      },
    ],
  },
  {
    id: "medpanel-saas",
    name: "MedPanel — SaaS Clínico",
    tagline: "Prontuário eletrônico para o século 21.",
    story:
      "Sistema SaaS para gestão de clínicas médicas: agendamentos, prontuário eletrônico, prescrições digitais, faturamento TISS e telemedicina integrada. Hoje atende 60+ clínicas.",
    category: "SaaS",
    year: 2023,
    status: "ongoing",
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    tech: ["Next.js", "Django", "PostgreSQL", "Redis", "WebRTC"],
    impact: "60+",
    impactLabel: "Clínicas usando ativamente",
    mockup: "dashboard",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    testimonials: [
      {
        author: "Dra. Isabella Torres",
        role: "Clínica Geral e Sócia-fundadora",
        company: "Clínica Torres de Med. Integral · Uberlândia, MG",
        initials: "IT",
        avatarGradient: "from-blue-400 to-indigo-500",
        rating: 5,
        text: "Migrei de um sistema que usava há 8 anos para o MedPanel em uma semana. A curva de aprendizado foi quase zero — a interface é muito bem pensada. A telemedicina integrada abriu um segmento novo de atendimento que antes era inviável para mim.",
        date: "Abr 2024",
      },
      {
        author: "Paulo Rodrigues",
        role: "Analista de TI",
        company: "Clínica São Lucas · Belo Horizonte, MG",
        initials: "PR",
        avatarGradient: "from-indigo-400 to-violet-500",
        rating: 5,
        text: "Do ponto de vista técnico, é o sistema mais bem construído que já implantei em ambiente clínico. A API é documentada, os backups são automáticos, e o suporte da JTEC responde em menos de 2 horas. Em 14 meses de uso, zero downtime.",
        date: "Mai 2024",
      },
    ],
  },
  {
    id: "tec-cursos-plataforma",
    name: "TecCursos — Plataforma EAD",
    tagline: "Do vídeo ao certificado em uma plataforma.",
    story:
      "Plataforma de ensino online completa: player de vídeo adaptativo, certificados automáticos, fórum, quiz gamificado e dashboard do aluno. Lançada com 800 alunos no 1° dia.",
    category: "SaaS",
    year: 2024,
    status: "live",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-600",
    tech: ["Next.js", "Node.js", "Mux Video", "Stripe", "Prisma"],
    impact: "800",
    impactLabel: "Alunos no dia de lançamento",
    mockup: "dashboard",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 7l10-4 10 4-10 4-10-4z" />
        <path d="M6 9v6c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5V9" />
      </svg>
    ),
    testimonials: [
      {
        author: "Thiago Cavalcanti",
        role: "Instrutor Sênior e Co-fundador",
        company: "TecCursos · São Paulo, SP",
        initials: "TC",
        avatarGradient: "from-violet-400 to-purple-500",
        rating: 5,
        text: "800 alunos no primeiro dia superou qualquer projeção que tínhamos. O player de vídeo não travou uma única vez durante o lançamento — impressionante. O quiz gamificado aumentou a taxa de conclusão dos cursos de 23% para 71%. Número que muda o negócio.",
        date: "Fev 2024",
      },
      {
        author: "Mariana Pereira",
        role: "Coordenadora de EAD",
        company: "TecCursos · São Paulo, SP",
        initials: "MP",
        avatarGradient: "from-purple-400 to-fuchsia-500",
        rating: 5,
        text: "Os certificados automáticos eram uma funcionalidade que parecia simples mas era o mais pedido pelos alunos. A JTEC entregou com QR code de verificação e integração com o LinkedIn. Detalhe que faz toda a diferença para quem usa o certificado como prova de competência.",
        date: "Mar 2024",
      },
    ],
  },
  {
    id: "imobiliaria-vertice",
    name: "Imobiliária Vértice",
    tagline: "Cada imóvel, uma história. Cada história, uma venda.",
    story:
      "Plataforma imobiliária com busca inteligente, tour 3D virtual, integração com portais e CRM próprio. O tempo médio de venda dos imóveis caiu pela metade após o lançamento.",
    category: "SaaS",
    year: 2023,
    status: "live",
    gradient: "from-teal-500 via-emerald-500 to-lime-600",
    tech: ["Next.js", "Three.js", "Django", "Elasticsearch", "AWS S3"],
    impact: "−52%",
    impactLabel: "Tempo médio de venda",
    mockup: "landing",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    testimonials: [
      {
        author: "Eduardo Vasconcelos",
        role: "Sócio Diretor",
        company: "Imobiliária Vértice · Belo Horizonte, MG",
        initials: "EV",
        avatarGradient: "from-teal-400 to-emerald-500",
        rating: 5,
        text: "O tour 3D virtual mudou completamente o perfil do cliente que chega para visitar o imóvel. Antes visitávamos 12 imóveis com um cliente para fechar 1 negócio. Hoje visitamos 3. O cliente já chega qualificado, tendo visto o imóvel em detalhes online.",
        date: "Nov 2023",
      },
      {
        author: "Sandra Fonseca",
        role: "Corretora Sênior — CRECI 45891",
        company: "Imobiliária Vértice · Belo Horizonte, MG",
        initials: "SF",
        avatarGradient: "from-emerald-400 to-lime-500",
        rating: 4,
        text: "A busca inteligente por filtros avançados — metragem, condomínio, vagas, IPTU — é o que os clientes mais elogiam. E a integração automática com ZAP e OLX economiza horas por semana da nossa equipe. Produto muito bem pensado.",
        date: "Jan 2024",
      },
    ],
  },
  {
    id: "agro-dashboard",
    name: "AgroVision — Dashboard Agrícola",
    tagline: "Dados do campo em tempo real, decisões mais inteligentes.",
    story:
      "Dashboard com telemetria de sensores IoT, previsão climática integrada, controle de estoque e análise de safra com IA. Fazendeiros do interior usam no celular diariamente.",
    category: "Dashboard",
    year: 2024,
    status: "live",
    gradient: "from-lime-500 via-green-500 to-emerald-600",
    tech: ["Next.js", "MQTT", "InfluxDB", "Python", "TensorFlow"],
    impact: "12 fazendas",
    impactLabel: "Monitoradas em tempo real",
    mockup: "dashboard",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 3-6" />
      </svg>
    ),
    testimonials: [
      {
        author: "José Carlos Braga",
        role: "Proprietário Rural — 3ª Geração",
        company: "Fazenda Santa Cruz · Uberaba, MG",
        initials: "JB",
        avatarGradient: "from-lime-400 to-green-500",
        rating: 5,
        text: "Meu pai nunca acreditou em tecnologia no campo. Hoje ele é o primeiro a abrir o AgroVision de manhã. Saber a umidade do solo em tempo real antes de decidir irrigar economizou uns 30% na conta de energia elétrica só no primeiro trimestre.",
        date: "Ago 2024",
      },
      {
        author: "Antônio Luiz Moraes",
        role: "Engenheiro Agrônomo Consultor",
        company: "AgroTec Consultoria · Uberaba, MG",
        initials: "AL",
        avatarGradient: "from-green-400 to-emerald-500",
        rating: 5,
        text: "Atendo 15 propriedades rurais e o AgroVision virou minha principal ferramenta de trabalho. A previsão climática cruzada com os dados dos sensores me permite recomendar o momento exato para cada intervenção. É consultoria baseada em dados, não em achismo.",
        date: "Set 2024",
      },
    ],
  },
];

export const categories: Array<ProjectCategory | "Todos"> = [
  "Todos",
  "IA & Chatbot",
  "E-commerce",
  "Landing Page",
  "SaaS",
  "Institucional",
  "Dashboard",
];
