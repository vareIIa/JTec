import type { ReactNode } from "react";

export type ProductCategory =
  | "Templates"
  | "IA & LLMs"
  | "Consultoria"
  | "Servidores"
  | "Cursos";

export type Product = {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  billing?: string; // "mês" for subscription, undefined for one-time
  rating: number; // 0-5
  reviews: number;
  sales: number;
  stock?: number; // for scarcity badge
  features: string[];
  badges: Array<{ label: string; tone: "new" | "hot" | "limited" | "default" }>;
  gradient: string;
  icon: ReactNode;
};

export const products: Product[] = [
  {
    id: "starter-next-15",
    name: "Starter Kit Next.js 15 + Tailwind v4",
    description:
      "Kit inicial enxuto e rápido: Next.js 15, TypeScript, Tailwind v4, autenticação, dark-mode e deploy pronto pra Vercel.",
    category: "Templates",
    price: 297,
    originalPrice: 497,
    rating: 4.9,
    reviews: 312,
    sales: 1840,
    features: ["Next.js 15", "Turbopack", "Auth", "Dark Mode", "CI/CD", "Figma"],
    badges: [{ label: "Bestseller", tone: "hot" }],
    gradient: "from-indigo-600 via-violet-500 to-fuchsia-600",
    icon: (
      <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "ai-landing-ia",
    name: "Landing Page IA-Powered",
    description:
      "Landing page premium com chat de IA integrado via Ollama, copy gerada dinamicamente e analytics prontos.",
    category: "Templates",
    price: 497,
    originalPrice: 797,
    rating: 4.8,
    reviews: 187,
    sales: 920,
    stock: 4,
    features: ["Ollama", "Chat IA", "SEO pronto", "A/B Testing", "Analytics"],
    badges: [
      { label: "Novo", tone: "new" },
      { label: "-38%", tone: "limited" },
    ],
    gradient: "from-fuchsia-600 via-pink-500 to-rose-500",
    icon: (
      <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  {
    id: "consult-express",
    name: "Consultoria Técnica Express (1h)",
    description:
      "Sessão 1:1 com arquiteto de software: arquitetura, performance, IA ou deploy. Diagnóstico escrito após a call.",
    category: "Consultoria",
    price: 250,
    rating: 5.0,
    reviews: 74,
    sales: 310,
    features: ["1h video", "Diagnóstico escrito", "Slack 7 dias", "PT · EN · ES · FR"],
    badges: [{ label: "Rápido", tone: "default" }],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    icon: (
      <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    ),
  },
  {
    id: "server-llm-dedic",
    name: "Servidor de IA Dedicado — Ollama",
    description:
      "Servidor dedicado com Ollama, modelos Llama 3.2 e Mistral pré-instalados. Monitoramento 24/7 incluso.",
    category: "Servidores",
    price: 390,
    billing: "mês",
    rating: 4.9,
    reviews: 46,
    sales: 128,
    features: ["Ollama", "Llama.cpp", "SSL", "Backup diário", "SLA 99.9%", "Escala"],
    badges: [{ label: "Premium", tone: "hot" }],
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    icon: (
      <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="5" rx="1" />
        <rect x="3" y="11" width="18" height="5" rx="1" />
        <rect x="3" y="18" width="18" height="3" rx="1" />
        <circle cx="7" cy="6.5" r="0.5" fill="currentColor" />
        <circle cx="7" cy="13.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "course-llm-pratica",
    name: "Curso: LLMs na Prática com Ollama",
    description:
      "Do zero ao deploy de modelos em produção. 12h de vídeo, projetos reais, certificado e comunidade exclusiva.",
    category: "Cursos",
    price: 197,
    originalPrice: 397,
    rating: 4.7,
    reviews: 1240,
    sales: 4680,
    features: ["12h vídeo", "6 projetos", "Certificado", "Comunidade", "Acesso vitalício"],
    badges: [
      { label: "Bestseller", tone: "hot" },
      { label: "-50%", tone: "limited" },
    ],
    gradient: "from-violet-600 via-purple-500 to-fuchsia-600",
    icon: (
      <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 7l10-4 10 4-10 4-10-4z" />
        <path d="M6 9v6c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5V9" />
      </svg>
    ),
  },
  {
    id: "auditoria-infra",
    name: "Auditoria de Infraestrutura",
    description:
      "Análise completa da sua infra: Nginx, SSL, segurança, performance, custos. Relatório com plano de ação.",
    category: "Consultoria",
    price: 890,
    originalPrice: 1290,
    rating: 4.9,
    reviews: 38,
    sales: 95,
    stock: 2,
    features: ["Relatório PDF", "Plano de ação", "2 semanas de suporte", "ROI map"],
    badges: [{ label: "Limitado", tone: "limited" }],
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    icon: (
      <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-0.5-8-4-8-9V7z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: "fullstack-completo",
    name: "Plano Fullstack Completo",
    description:
      "Projeto fullstack entregue chave-na-mão: front-end + back-end + IA + deploy. Inclui 30 dias de suporte.",
    category: "Consultoria",
    price: 2490,
    originalPrice: 3490,
    rating: 5.0,
    reviews: 27,
    sales: 54,
    features: ["Fullstack", "IA integrada", "Deploy", "30 dias suporte", "Figma", "Docs"],
    badges: [
      { label: "Premium", tone: "hot" },
      { label: "Novo", tone: "new" },
    ],
    gradient: "from-cyan-500 via-sky-500 to-indigo-600",
    icon: (
      <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l2-2 3 3 7-7 4 4" />
        <path d="M3 18h18" />
      </svg>
    ),
  },
  {
    id: "ecom-template",
    name: "Template E-commerce Premium",
    description:
      "E-commerce moderno com carrinho, checkout, painel admin e integração Mercado Pago + Stripe.",
    category: "Templates",
    price: 697,
    originalPrice: 997,
    rating: 4.8,
    reviews: 156,
    sales: 610,
    features: ["Carrinho", "Checkout", "Admin", "MP + Stripe", "Multi-idioma IA", "SEO"],
    badges: [{ label: "Top vendido", tone: "hot" }],
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    icon: (
      <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M3 4h2l2.5 12h11L21 7H6" />
      </svg>
    ),
  },
  {
    id: "chatbot-ia",
    name: "Chatbot IA Multilíngue",
    description:
      "Chatbot pronto com treinamento customizado, fluência em +30 idiomas via IA e integração WhatsApp/Web.",
    category: "IA & LLMs",
    price: 1290,
    rating: 4.8,
    reviews: 92,
    sales: 215,
    features: ["+30 idiomas", "WhatsApp", "Web widget", "Treino custom", "Analytics"],
    badges: [
      { label: "Novo", tone: "new" },
      { label: "IA", tone: "hot" },
    ],
    gradient: "from-teal-500 via-emerald-500 to-lime-500",
    icon: (
      <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a8 8 0 0 1-12 7l-5 1 1-5a8 8 0 1 1 16-3z" />
        <circle cx="9" cy="12" r="0.8" fill="currentColor" />
        <circle cx="13" cy="12" r="0.8" fill="currentColor" />
        <circle cx="17" cy="12" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
];

export const categories: Array<ProductCategory | "Todos"> = [
  "Todos",
  "Templates",
  "IA & LLMs",
  "Consultoria",
  "Servidores",
  "Cursos",
];
