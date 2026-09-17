export interface FeaturedProject {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  stack: string[];
  githubUrl: string;
  demoUrl?: string;
  image: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'nexus-developer-platform',
    title: 'Nexus Developer Platform',
    subtitle: 'Internal Developer Portal (IDP) Production-Grade',
    description:
      'Portal do Desenvolvedor completo de nível enterprise com catálogo de serviços, deployments, gestão de incidentes, observabilidade (logs, traces, métricas), feature flags, pipelines de CI/CD, integrações em tempo real via SSE e um AI Engineering Copilot com tool calling e aprovação humana explícita.',
    highlights: [
      '20 fases de implementação arquitetural documentadas com 19 ADRs',
      'AI Engineering Copilot com 16 tools reais e human-in-the-loop',
      'Adapters reais para GitHub, Sentry, Grafana e Slack com fallback automático',
      'Observabilidade avançada com gráficos ECharts e waterfall de traces',
    ],
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'NestJS 12',
      'Drizzle ORM',
      'PostgreSQL',
      'Vercel AI SDK v7',
      'Tailwind CSS v4',
      'Turborepo',
    ],
    githubUrl: 'https://github.com/saullobueno/nexus-developer-platform',
    demoUrl: 'https://nexus-developer-platform-rho.vercel.app',
    image: '/assets/portfolio/nexus-developer-platform.svg',
  },
  {
    slug: 'fieldops',
    title: 'FieldOps',
    subtitle: 'Plataforma de Operações de Serviços em Campo',
    description:
      'Plataforma completa para gestão, despacho e execução de serviços em campo. Conta com roteamento inteligente de equipes, gestão de ordens de serviço (OS), suporte PWA para técnicos operarem offline e um Copiloto de IA integrado para auxílio operacional e diagnósticos em tempo real.',
    highlights: [
      'Monorepo pnpm / Turborepo de nível enterprise com Next.js e NestJS',
      'Despacho inteligente e gestão em tempo real de ordens de serviço (OS)',
      'Suporte a técnicos em campo com funcionamento offline (PWA) e sincronização automática',
      'Copiloto de IA integrado para apoio operacional, diagnósticos técnicos e triagem',
    ],
    stack: [
      'Next.js 16',
      'NestJS 12',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'PWA / Offline First',
      'Vercel AI SDK',
      'Tailwind CSS v4',
      'Turborepo',
    ],
    githubUrl: 'https://github.com/saullobueno/fieldops',
    image: '/assets/portfolio/fieldops.svg',
  },
  {
    slug: 'product-analytics-os',
    title: 'Product Analytics OS',
    subtitle: 'Plataforma de Analytics & AI Insights',
    description:
      'Plataforma de Product Analytics estilo PostHog/Mixpanel/Amplitude focada em UX avançada. Conta com métricas de Product Health (DAU, Retenção, Funil de Ativação, Churn), motor determinístico de dados sintéticos, widgets customizáveis em drag & drop e um AI Analyst que diagnostica causas-raiz de variações em métricas com evidências reais.',
    highlights: [
      'AI Analyst estatístico com diagnóstico de causa-raiz e evidências calculadas',
      'Dashboards customizáveis com drag-and-drop (dnd-kit) e persistência',
      'Análises de Cohorts (heatmap), Funis, Segmentação e User Journey',
      'Motor de dados sintéticos determinístico gerado no cliente',
    ],
    stack: [
      'React 19',
      'Vite',
      'TypeScript',
      'Tailwind CSS v4',
      'Recharts',
      'dnd-kit',
      'Zustand',
      'React Router',
    ],
    githubUrl: 'https://github.com/saullobueno/product-analytics-os',
    demoUrl: 'https://product-analytics-os.vercel.app',
    image: '/assets/portfolio/product-analytics-os.svg',
  },
  {
    slug: 'ai-customer-operations-platform',
    title: 'AI Customer Operations Platform',
    subtitle: 'Atendimento B2B Multi-Tenant com IA',
    description:
      'Plataforma de atendimento B2B multi-tenant que combina inbox no estilo Intercom/Linear com inteligência artificial generativa. Realiza triagem automática de tickets por sentimento e severidade com GroqCloud LLM, busca RAG em Base de Conhecimento, processamento assíncrono em fila BullMQ e disparo de e-mails de convite e notificação via Resend.',
    highlights: [
      'Arquitetura multi-tenant nativa com RBAC e isolamento de organizações',
      'Triagem automática com IA (GroqCloud LLM) e RAG em base de conhecimento',
      'Fila de background assíncrona com BullMQ e Redis',
      'Notificações reais por e-mail com Resend API',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'Drizzle ORM',
      'Better Auth',
      'GroqCloud LLM',
      'PostgreSQL',
      'BullMQ',
      'Resend',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/saullobueno/ai-customer-operations-platform',
    demoUrl: 'https://ai-customer-operations-platform-gamma.vercel.app',
    image: '/assets/portfolio/ai-customer-operations-platform.svg',
  },
  {
    slug: 'command-center',
    title: 'Command Center',
    subtitle: 'IoT Operations & Real-Time Dashboard',
    description:
      'Centro de operações em tempo real para monitoramento de milhares de dispositivos IoT simulados. Apresenta mapa interativo de alta performance (MapLibre GL com clustering), alertas ao vivo, telemetria em gráficos ECharts, tabela virtualizada (TanStack Table), Command Palette (Ctrl+K) e modo Event Replay determinístico para reprodução de incidentes históricos.',
    highlights: [
      'Mapa interativo de alta performance com MapLibre GL e clustering',
      'Event Replay determinístico para viagens no tempo e análise de incidentes',
      'Tabela virtualizada para milhares de dispositivos simultâneos',
      'Command Palette acessível por teclado (Ctrl+K)',
    ],
    stack: [
      'React 19',
      'Vite',
      'TypeScript',
      'MapLibre GL',
      'TanStack Query',
      'Zustand',
      'TanStack Table',
      'ECharts',
      'MSW',
      'Tailwind CSS v4',
    ],
    githubUrl: 'https://github.com/saullobueno/command-center',
    demoUrl: 'https://command-center-ten-umber.vercel.app',
    image: '/assets/portfolio/command-center.svg',
  },
  {
    slug: 'ai-workflow-studio',
    title: 'AI Workflow Studio',
    subtitle: 'Editor Visual de Workflows de IA',
    description:
      'Editor visual no-code/low-code para construção de fluxos de automação com IA (estilo n8n). Oferece canvas infinito com zoom/pan/minimap (React Flow), 5 tipos de nodes interativos, undo/redo (zundo), validação Zod compartilhada, modo de execução simulado com gráfico de duração e inspeção de payloads no Monaco Editor, além de AI Copilot que gera fluxos a partir de prompts em português.',
    highlights: [
      'Canvas infinito interativo com React Flow e zoom/pan/minimap',
      'AI Copilot (Vercel AI SDK + Groq) para geração de workflows via linguagem natural',
      'Undo/redo robusto com zundo e aglutinação de gestos de drag',
      'JSON Inspector (Monaco Editor) e gráfico de performance (ECharts)',
    ],
    stack: [
      'React 19',
      'Vite',
      'TypeScript',
      'React Flow',
      'Zustand',
      'zundo',
      'Zod',
      'Monaco Editor',
      'ECharts',
      'Vercel AI SDK',
      'Groq',
    ],
    githubUrl: 'https://github.com/saullobueno/ai-workflow-studio',
    demoUrl: 'https://ai-workflow-studio-phi.vercel.app',
    image: '/assets/portfolio/ai-workflow-studio.svg',
  },
];
