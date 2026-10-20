import { comTextos, type FeaturedProjectText } from './featuredProjects';

// Textos em portugues dos projetos em destaque, indexados por slug (so a rota / importa este modulo).
const textosPt: Record<string, FeaturedProjectText> = {
  'forge-ai-software-factory': {
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
  },
  fieldops: {
    subtitle: 'Plataforma de Operações de Serviços em Campo',
    description:
      'Plataforma completa para gestão, despacho e execução de serviços em campo. Conta com roteamento inteligente de equipes, gestão de ordens de serviço (OS), suporte PWA para técnicos operarem offline e um Copiloto de IA integrado para auxílio operacional e diagnósticos em tempo real.',
    highlights: [
      'Monorepo pnpm / Turborepo de nível enterprise com Next.js e NestJS',
      'Despacho inteligente e gestão em tempo real de ordens de serviço (OS)',
      'Suporte a técnicos em campo com funcionamento offline (PWA) e sincronização automática',
      'Copiloto de IA integrado para apoio operacional, diagnósticos técnicos e triagem',
    ],
    demoUrlLabel: 'Demo',
    demoMobileUrlLabel: 'Demo Técnico Mobile',
  },
  'nexus-developer-platform': {
    subtitle: 'Portal interno (IDP) para catálogo de serviços, deploys e incidentes',
    description:
      'Portal interno de desenvolvedor (IDP): um só lugar onde times de engenharia acompanham catálogo de serviços, deployments, incidentes e observabilidade (logs, traces e métricas) de toda a operação. Inclui feature flags, pipelines de CI/CD, integrações reais com GitHub, Sentry, Grafana e Slack (com fallback automático para modo demo) e um AI Engineering Copilot com tool calling real que só age após aprovação humana explícita.',
    highlights: [
      '20 fases de implementação arquitetural documentadas com 19 ADRs',
      'AI Engineering Copilot com 16 tools reais e human-in-the-loop',
      'Adapters reais para GitHub, Sentry, Grafana e Slack com fallback automático',
      'Observabilidade avançada com gráficos ECharts e waterfall de traces',
      'Feature flags (boolean, percentual, por usuário/organização e por regras) e pipelines Build → Testes → Segurança → Deploy',
      'Realtime via SSE com toasts de deploys, incidentes e execuções de IA, e KPIs por time (uptime, MTTR, frequência de deploy)',
    ],
  },
  'product-analytics-os': {
    subtitle: 'Ferramenta de product analytics para medir o uso de um produto digital',
    description:
      'Ferramenta de product analytics (no estilo PostHog, Mixpanel e Amplitude): um painel onde é possível acompanhar como as pessoas usam um produto digital, com métricas de DAU, retenção, funil de ativação e churn, dashboards customizáveis em drag-and-drop e análises de cohort, funil e jornada do usuário. Tem também um AI Analyst que explica automaticamente variações nessas métricas, como "por que a conversão caiu essa semana?", com causa-raiz e evidências calculadas a partir do próprio dataset.',
    highlights: [
      'AI Analyst estatístico com diagnóstico de causa-raiz e evidências calculadas',
      'Dashboards customizáveis com drag-and-drop (dnd-kit) e persistência',
      'Análises de Cohorts (heatmap), Funis, Segmentação e User Journey',
      'Motor de dados sintéticos determinístico gerado no cliente',
    ],
  },
  'ai-customer-operations-platform': {
    subtitle: 'Plataforma de atendimento ao cliente (B2B) com triagem automática por IA',
    description:
      'Plataforma de atendimento ao cliente para empresas (B2B): um inbox de suporte, no estilo Intercom + Linear, onde os tickets chegam, são organizados e respondidos por uma equipe, com suporte a múltiplas empresas na mesma instância (multi-tenant). A IA participa do fluxo de verdade — classifica cada ticket por sentimento e prioridade, busca contexto na base de conhecimento via RAG e sugere uma resposta usando GroqCloud.',
    highlights: [
      'Arquitetura multi-tenant nativa com RBAC e isolamento de organizações',
      'Triagem automática com IA (GroqCloud LLM) e RAG em base de conhecimento',
      'Fila de background assíncrona com BullMQ e Redis',
      'Notificações reais por e-mail com Resend API',
    ],
  },
  'command-center': {
    subtitle: 'Central de operações em tempo real para uma frota de dispositivos IoT',
    description:
      'Central de operações para monitorar em tempo real milhares de dispositivos IoT simulados num mapa interativo (MapLibre GL) com clustering, alertas ao vivo e telemetria em gráficos ECharts. Traz uma tabela virtualizada para lidar com grandes volumes, um Command Palette (Ctrl+K) para localizar qualquer dispositivo e um modo Event Replay que reproduz de forma determinística o estado da operação numa janela de tempo escolhida.',
    highlights: [
      'Mapa interativo de alta performance com MapLibre GL e clustering',
      'Event Replay determinístico para viagens no tempo e análise de incidentes',
      'Tabela virtualizada para milhares de dispositivos simultâneos',
      'Command Palette acessível por teclado (Ctrl+K)',
    ],
  },
  'ai-workflow-studio': {
    subtitle: 'Editor visual no-code para montar workflows de automação com IA',
    description:
      'Editor visual no-code para montar workflows de automação com IA (gatilhos → classificação → condições → ações), inspirado no n8n. Tem canvas infinito com zoom/pan/minimap (React Flow), 5 tipos de node configuráveis, execução simulada com log por node e gráfico de duração, JSON Inspector no Monaco Editor, e um AI Copilot que monta o workflow inteiro a partir de um pedido em português.',
    highlights: [
      'Canvas infinito interativo com React Flow e zoom/pan/minimap',
      'AI Copilot (Vercel AI SDK + Groq) para geração de workflows via linguagem natural',
      'Undo/redo robusto com zundo e aglutinação de gestos de drag',
      'JSON Inspector (Monaco Editor) e gráfico de performance (ECharts)',
    ],
  },
};

export const featuredProjects = comTextos(textosPt);
