// Textos em ingles dos projetos em destaque, indexados por slug.
// Os campos que nao mudam entre idiomas (stack, links, imagens) ficam em featuredProjects.ts.
export interface FeaturedProjectText {
  subtitle: string;
  description: string;
  highlights: string[];
  demoUrlLabel?: string;
  demoMobileUrlLabel?: string;
}

export const featuredProjectsEn: Record<string, FeaturedProjectText> = {
  'forge-ai-software-factory': {
    subtitle: 'AI Software Factory',
    description:
      'A platform where AI agents receive engineering tasks, propose changes to real code and only apply them after a person approves. The execution timeline (plan, inspect, implement, test and review) updates live over SSE, and the approved patch is applied to an isolated copy of the repository. It includes multi-tenant RBAC, a complete audit trail, OpenTelemetry observability and AI cost control. It also ships Kanban tasks, global search, administration of users, roles, policies and agents, and secure sessions with revocation and 2FA.',
    highlights: [
      'Human in control: code writes by the AI wait for approval from a tech lead or admin',
      'Multi-tenant with backend-validated RBAC, plus tool and agent policies configurable per organization',
      'Per-project AI (mock, Groq, Gemini, Anthropic) with live streaming and versioned datasets in the Playground',
      'RAG over real file indexing, hybrid ranking and prompt injection defense',
      'Kanban tasks with dependencies, global search (Ctrl+K), notifications and single-use invites',
      'Revocable sessions, TOTP 2FA, OpenTelemetry observability, CI with bundle budgets and e2e tests',
    ],
  },
  fieldops: {
    subtitle: 'Field Service Operations Platform',
    description:
      'A complete platform for managing, dispatching and executing field services. It offers smart crew routing, work order management, PWA support so technicians can work offline, and an integrated AI Copilot for operational support and real-time diagnostics.',
    highlights: [
      'Enterprise-grade pnpm / Turborepo monorepo with Next.js and NestJS',
      'Smart dispatch and real-time work order management',
      'Field technician support with offline operation (PWA) and automatic sync',
      'Integrated AI Copilot for operational support, technical diagnostics and triage',
    ],
    demoUrlLabel: 'Demo',
    demoMobileUrlLabel: 'Technician Mobile Demo',
  },
  'nexus-developer-platform': {
    subtitle: 'Internal developer portal (IDP) for service catalog, deploys and incidents',
    description:
      'An internal developer portal (IDP): one place where engineering teams track the service catalog, deployments, incidents and observability (logs, traces and metrics) across the whole operation. It includes feature flags, CI/CD pipelines, real integrations with GitHub, Sentry, Grafana and Slack (with automatic fallback to demo mode) and an AI Engineering Copilot with real tool calling that only acts after explicit human approval.',
    highlights: [
      '20 architectural implementation phases documented with 19 ADRs',
      'AI Engineering Copilot with 16 real tools and human-in-the-loop',
      'Real adapters for GitHub, Sentry, Grafana and Slack with automatic fallback',
      'Advanced observability with ECharts graphs and trace waterfalls',
      'Feature flags (boolean, percentage, per user/organization and rule-based) and Build → Tests → Security → Deploy pipelines',
      'Realtime over SSE with toasts for deploys, incidents and AI runs, plus per-team KPIs (uptime, MTTR, deploy frequency)',
    ],
  },
  'product-analytics-os': {
    subtitle: 'Product analytics tool to measure how a digital product is used',
    description:
      'A product analytics tool (in the style of PostHog, Mixpanel and Amplitude): a dashboard to follow how people use a digital product, with DAU, retention, activation funnel and churn metrics, drag-and-drop customizable dashboards, and cohort, funnel and user journey analyses. It also has an AI Analyst that automatically explains changes in those metrics, such as "why did conversion drop this week?", with root cause and evidence computed from the dataset itself.',
    highlights: [
      'Statistical AI Analyst with root-cause diagnosis and computed evidence',
      'Customizable dashboards with drag-and-drop (dnd-kit) and persistence',
      'Cohort (heatmap), Funnel, Segmentation and User Journey analyses',
      'Deterministic synthetic data engine generated on the client',
    ],
  },
  'ai-customer-operations-platform': {
    subtitle: 'B2B customer support platform with automatic AI triage',
    description:
      'A customer support platform for businesses (B2B): a support inbox, in the style of Intercom + Linear, where tickets arrive, get organized and are answered by a team, with support for multiple companies on the same instance (multi-tenant). The AI is part of the real workflow: it classifies each ticket by sentiment and priority, looks up context in the knowledge base via RAG and suggests a reply using GroqCloud.',
    highlights: [
      'Natively multi-tenant architecture with RBAC and organization isolation',
      'Automatic triage with AI (GroqCloud LLM) and RAG over a knowledge base',
      'Asynchronous background queue with BullMQ and Redis',
      'Real email notifications through the Resend API',
    ],
  },
  'command-center': {
    subtitle: 'Real-time operations center for a fleet of IoT devices',
    description:
      'An operations center that monitors thousands of simulated IoT devices in real time on an interactive map (MapLibre GL) with clustering, live alerts and telemetry in ECharts graphs. It features a virtualized table to handle large volumes, a Command Palette (Ctrl+K) to find any device, and an Event Replay mode that deterministically replays the state of the operation over a chosen time window.',
    highlights: [
      'High-performance interactive map with MapLibre GL and clustering',
      'Deterministic Event Replay for time travel and incident analysis',
      'Virtualized table for thousands of simultaneous devices',
      'Keyboard-accessible Command Palette (Ctrl+K)',
    ],
  },
  'ai-workflow-studio': {
    subtitle: 'No-code visual editor to build AI automation workflows',
    description:
      'A no-code visual editor to build AI automation workflows (triggers → classification → conditions → actions), inspired by n8n. It has an infinite canvas with zoom/pan/minimap (React Flow), 5 configurable node types, simulated execution with a per-node log and duration chart, a JSON Inspector in Monaco Editor, and an AI Copilot that builds the entire workflow from a request written in plain language.',
    highlights: [
      'Interactive infinite canvas with React Flow and zoom/pan/minimap',
      'AI Copilot (Vercel AI SDK + Groq) that generates workflows from natural language',
      'Robust undo/redo with zundo and merged drag gestures',
      'JSON Inspector (Monaco Editor) and performance chart (ECharts)',
    ],
  },
};
