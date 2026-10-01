// Forge
import forgeProjetos from '../assets/portfolio/forge-ai-software-factory/03-projetos-dark.png';
import forgeProjetoDetalhe from '../assets/portfolio/forge-ai-software-factory/05-projeto-detalhe-dark.png';
import forgeTimeline from '../assets/portfolio/forge-ai-software-factory/09-execucao-timeline-dark.png';
import forgeAprovacao from '../assets/portfolio/forge-ai-software-factory/10-execucao-aprovacao-dark.png';
import forgeExplorador from '../assets/portfolio/forge-ai-software-factory/07-codigo-explorador-dark.png';
import forgeDiff from '../assets/portfolio/forge-ai-software-factory/08-codigo-diff-dark.png';
import forgeAprovacoes from '../assets/portfolio/forge-ai-software-factory/11-aprovacoes-dark.png';
import forgeUsoIa from '../assets/portfolio/forge-ai-software-factory/12-uso-ia-dark.png';
import forgePlayground from '../assets/portfolio/forge-ai-software-factory/13-playground-scorecard-dark.png';
import forgeAuditoria from '../assets/portfolio/forge-ai-software-factory/14-auditoria-dark.png';
import forgeLogin from '../assets/portfolio/forge-ai-software-factory/01-login-dark.png';
import forgeDetalheLight from '../assets/portfolio/forge-ai-software-factory/16-projeto-detalhe-light.png';
import forgeTarefas from '../assets/portfolio/forge-ai-software-factory/19-tarefas-kanban-dark.png';
import forgeBusca from '../assets/portfolio/forge-ai-software-factory/20-busca-global-dark.png';
import forgeDatasets from '../assets/portfolio/forge-ai-software-factory/21-playground-datasets-dark.png';
import forgeConta from '../assets/portfolio/forge-ai-software-factory/22-minha-conta-dark.png';
import forgeUsuarios from '../assets/portfolio/forge-ai-software-factory/23-configuracoes-usuarios-dark.png';
import forgePapeis from '../assets/portfolio/forge-ai-software-factory/24-configuracoes-papeis-dark.png';
import forgePoliticas from '../assets/portfolio/forge-ai-software-factory/25-configuracoes-politicas-dark.png';
import forgeAgentes from '../assets/portfolio/forge-ai-software-factory/26-configuracoes-agentes-dark.png';

// FieldOps
import fieldopsInicio from '../assets/portfolio/fieldops-platform/inicio.png';
import fieldopsDespacho from '../assets/portfolio/fieldops-platform/despacho.png';
import fieldopsOrdens from '../assets/portfolio/fieldops-platform/ordens.png';
import fieldopsRelatorios from '../assets/portfolio/fieldops-platform/relatorios.png';
import fieldopsCopiloto from '../assets/portfolio/fieldops-platform/copiloto.png';

// Nexus Developer Platform
import nexusDashboard from '../assets/portfolio/nexus-developer-platform/dashboard.jpeg';

// Product Analytics OS
import analyticsDashboards from '../assets/portfolio/product-analytics-os/dashboards.png';
import analyticsProductHealth from '../assets/portfolio/product-analytics-os/product-health.png';
import analyticsEventExplorer from '../assets/portfolio/product-analytics-os/event-explorer.png';
import analyticsFunnels from '../assets/portfolio/product-analytics-os/funnels.png';
import analyticsRetention from '../assets/portfolio/product-analytics-os/retention.png';
import analyticsCohorts from '../assets/portfolio/product-analytics-os/cohorts.png';
import analyticsSegmentation from '../assets/portfolio/product-analytics-os/segmentation.png';
import analyticsUserJourney from '../assets/portfolio/product-analytics-os/user-journey.png';
import analyticsFeatureAdoption from '../assets/portfolio/product-analytics-os/feature-adoption.png';
import analyticsRealtime from '../assets/portfolio/product-analytics-os/realtime.png';
import analyticsAiAnalyst from '../assets/portfolio/product-analytics-os/ai-analyst.png';
import analyticsLogin from '../assets/portfolio/product-analytics-os/login.png';

// AI Customer Operations Platform
import aiOpsInbox from '../assets/portfolio/ai-customer-operations-platform/03-inbox-dark.png';
import aiOpsLanding from '../assets/portfolio/ai-customer-operations-platform/01-landing-dark.png';
import aiOpsSignIn from '../assets/portfolio/ai-customer-operations-platform/02-sign-in-dark.png';
import aiOpsTicketDetail from '../assets/portfolio/ai-customer-operations-platform/04-ticket-detail-dark.png';
import aiOpsKnowledgeBase from '../assets/portfolio/ai-customer-operations-platform/05-knowledge-base-dark.png';
import aiOpsAnalytics from '../assets/portfolio/ai-customer-operations-platform/06-analytics-dark.png';
import aiOpsBilling from '../assets/portfolio/ai-customer-operations-platform/07-billing-dark.png';
import aiOpsMembers from '../assets/portfolio/ai-customer-operations-platform/08-members-dark.png';
import aiOpsTicketLight from '../assets/portfolio/ai-customer-operations-platform/ticket.jpeg';

// Command Center
import commandDashboardDark from '../assets/portfolio/command-center/dashboard-dark.png';
import commandDeviceDetail from '../assets/portfolio/command-center/device-detail.png';
import commandEventReplay from '../assets/portfolio/command-center/event-replay.png';
import commandLogin from '../assets/portfolio/command-center/login.png';
import commandDashboardLight from '../assets/portfolio/command-center/dashboard-light.png';

// AI Workflow Studio
import workflowEditorDark from '../assets/portfolio/ai-workflow-studio/workflow-editor-dark.png';
import workflowListDark from '../assets/portfolio/ai-workflow-studio/workflow-list-dark.png';
import workflowCopilotDark from '../assets/portfolio/ai-workflow-studio/copilot-dark.png';
import workflowExecutionHistoryDark from '../assets/portfolio/ai-workflow-studio/execution-history-dark.png';
import workflowLoginDark from '../assets/portfolio/ai-workflow-studio/login-dark.png';
import workflowFlowLight from '../assets/portfolio/ai-workflow-studio/flow.jpeg';
import workflowListLight from '../assets/portfolio/ai-workflow-studio/workflow-list-light.png';

export interface FeaturedProject {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  stack: string[];
  githubUrl: string;
  demoUrl?: string;
  demoUrlLabel?: string;
  demoMobileUrl?: string;
  demoMobileUrlLabel?: string;
  images: string[];
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'forge-ai-software-factory',
    title: 'Forge',
    subtitle: 'Fábrica de Software com IA',
    description:
      'Plataforma onde agentes de IA recebem tarefas de engenharia, propõem mudanças em código de verdade e só as aplicam depois da aprovação de uma pessoa. A timeline da execução (planejar, inspecionar, implementar, testar e revisar) atualiza ao vivo via SSE, e o patch aprovado é aplicado numa cópia isolada do repositório. Conta com RBAC multi-tenant, trilha de auditoria completa, observabilidade com OpenTelemetry e controle de custo de IA. Inclui ainda tarefas em Kanban, busca global, administração de usuários, papéis, políticas e agentes, e segurança com sessões revogáveis e 2FA.',
    highlights: [
      'Humano no controle: escritas de código da IA ficam aguardando aprovação de tech lead/admin',
      'Multi-tenant com RBAC validado no backend, políticas de ferramentas e agentes configuráveis por organização',
      'IA por projeto (mock, Groq, Gemini, Anthropic) com streaming ao vivo e datasets versionados no Playground',
      'RAG com indexação de arquivos reais, ranking híbrido e defesa contra prompt injection',
      'Tarefas em Kanban com dependências, busca global (Ctrl+K), notificações e convites de uso único',
      'Sessões revogáveis, 2FA TOTP, observabilidade OpenTelemetry, CI com budgets de bundle e testes e2e',
    ],
    stack: [
      'Next.js 16',
      'NestJS',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'Drizzle ORM',
      'BullMQ / Redis',
      'OpenTelemetry',
      'Vercel AI SDK',
      'Monaco Editor',
      'Playwright',
      'Tailwind CSS',
      'Turborepo',
    ],
    githubUrl: 'https://github.com/saullobueno/forge-ai-software-factory',
    demoUrl: 'https://forge-ai-software-factory.vercel.app',
    images: [
      forgeDiff,
      forgeProjetos,
      forgeProjetoDetalhe,
      forgeTimeline,
      forgeAprovacao,
      forgeExplorador,
      forgeAprovacoes,
      forgeUsoIa,
      forgePlayground,
      forgeAuditoria,
      forgeTarefas,
      forgeBusca,
      forgeDatasets,
      forgeUsuarios,
      forgePapeis,
      forgePoliticas,
      forgeAgentes,
      forgeConta,
      forgeLogin,
      forgeDetalheLight,
    ],
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
    demoUrl: 'https://fieldops-platformweb.vercel.app',
    demoUrlLabel: 'Demo',
    demoMobileUrl: 'https://fieldops-mobile.vercel.app',
    demoMobileUrlLabel: 'Demo Técnico Mobile',
    images: [fieldopsInicio, fieldopsDespacho, fieldopsOrdens, fieldopsRelatorios, fieldopsCopiloto],
  },
  {
    slug: 'nexus-developer-platform',
    title: 'Nexus Developer Platform',
    subtitle: 'Portal interno (IDP) para catálogo de serviços, deploys e incidentes',
    description:
      'Portal interno de desenvolvedor (IDP): um só lugar onde times de engenharia acompanham catálogo de serviços, deployments, incidentes e observabilidade (logs, traces e métricas) de toda a operação. Inclui feature flags, pipelines de CI/CD, integrações reais com GitHub, Sentry, Grafana e Slack (com fallback automático para modo demo) e um AI Engineering Copilot com tool calling real que só age após aprovação humana explícita.',
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
    images: [nexusDashboard],
  },
  {
    slug: 'product-analytics-os',
    title: 'Product Analytics OS',
    subtitle: 'Ferramenta de product analytics para medir o uso de um produto digital',
    description:
      'Ferramenta de product analytics (no estilo PostHog, Mixpanel e Amplitude): um painel onde é possível acompanhar como as pessoas usam um produto digital, com métricas de DAU, retenção, funil de ativação e churn, dashboards customizáveis em drag-and-drop e análises de cohort, funil e jornada do usuário. Tem também um AI Analyst que explica automaticamente variações nessas métricas, como "por que a conversão caiu essa semana?", com causa-raiz e evidências calculadas a partir do próprio dataset.',
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
    images: [
      analyticsDashboards,
      analyticsProductHealth,
      analyticsEventExplorer,
      analyticsFunnels,
      analyticsRetention,
      analyticsCohorts,
      analyticsSegmentation,
      analyticsUserJourney,
      analyticsFeatureAdoption,
      analyticsRealtime,
      analyticsAiAnalyst,
      analyticsLogin,
    ],
  },
  {
    slug: 'ai-customer-operations-platform',
    title: 'AI Customer Operations Platform',
    subtitle: 'Plataforma de atendimento ao cliente (B2B) com triagem automática por IA',
    description:
      'Plataforma de atendimento ao cliente para empresas (B2B): um inbox de suporte, no estilo Intercom + Linear, onde os tickets chegam, são organizados e respondidos por uma equipe, com suporte a múltiplas empresas na mesma instância (multi-tenant). A IA participa do fluxo de verdade — classifica cada ticket por sentimento e prioridade, busca contexto na base de conhecimento via RAG e sugere uma resposta usando GroqCloud.',
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
    images: [
      aiOpsInbox,
      aiOpsLanding,
      aiOpsSignIn,
      aiOpsTicketDetail,
      aiOpsKnowledgeBase,
      aiOpsAnalytics,
      aiOpsBilling,
      aiOpsMembers,
      aiOpsTicketLight,
    ],
  },
  {
    slug: 'command-center',
    title: 'Command Center',
    subtitle: 'Central de operações em tempo real para uma frota de dispositivos IoT',
    description:
      'Central de operações para monitorar em tempo real milhares de dispositivos IoT simulados num mapa interativo (MapLibre GL) com clustering, alertas ao vivo e telemetria em gráficos ECharts. Traz uma tabela virtualizada para lidar com grandes volumes, um Command Palette (Ctrl+K) para localizar qualquer dispositivo e um modo Event Replay que reproduz de forma determinística o estado da operação numa janela de tempo escolhida.',
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
    images: [
      commandDashboardDark,
      commandDeviceDetail,
      commandEventReplay,
      commandLogin,
      commandDashboardLight,
    ],
  },
  {
    slug: 'ai-workflow-studio',
    title: 'AI Workflow Studio',
    subtitle: 'Editor visual no-code para montar workflows de automação com IA',
    description:
      'Editor visual no-code para montar workflows de automação com IA (gatilhos → classificação → condições → ações), inspirado no n8n. Tem canvas infinito com zoom/pan/minimap (React Flow), 5 tipos de node configuráveis, execução simulada com log por node e gráfico de duração, JSON Inspector no Monaco Editor, e um AI Copilot que monta o workflow inteiro a partir de um pedido em português.',
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
    images: [
      workflowEditorDark,
      workflowListDark,
      workflowCopilotDark,
      workflowExecutionHistoryDark,
      workflowLoginDark,
      workflowFlowLight,
      workflowListLight,
    ],
  },
];
