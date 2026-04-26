import type { ReactNode } from "react";

export type ProjectStatus = "live" | "archived" | "ongoing";
export type ProjectCategory =
  | "IA & Chatbot"
  | "E-commerce"
  | "Landing Page"
  | "SaaS"
  | "Institucional"
  | "Dashboard";

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
        "Desenvolvido por João Vitor Varella durante sua passagem pela PTEC, o MyCoach nasceu como resposta à sobrecarga de professores da rede pública. O Projeto Desenvolve levou a solução para Itabira, Bom Despacho e dezenas de cidades pelo Brasil inteiro.",
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
