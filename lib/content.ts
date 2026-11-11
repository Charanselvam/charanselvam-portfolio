export interface Project {
  title: string;
  slug: string;
  period: string;
  description: string;
  tags: string[];
  status?: string;
  category?: string;
  link?: string;
  github?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface SkillGroup {
  group: string;
  items: [string, number][];
}

export interface NowItem {
  key: string;
  text: string;
  link?: [string, string];
}

export interface Profile {
  name: string;
  initials: string;
  title: string;
  location: string;
  timezone: string;
  email: string;
  github: string;
  linkedin: string;
  openTo: string;
  bio: string;
  statement: string;
  sticker: string;
}

export const PROFILE: Profile = {
  name: 'Charanselvam S',
  initials: 'CS',
  title: 'AI Integration Engineer',
  location: 'Chennai, India',
  timezone: 'Asia/Kolkata',
  email: 'charanselvam.csk@gmail.com',
  github: 'https://github.com/charanselvam',
  linkedin: 'https://linkedin.com/in/charanselvam',
  openTo: 'Open to relocate',
  bio: 'I build AI agents, MCP servers, RAG pipelines, and API integration layers that plug into enterprise systems already in production. Shipped features with real users, not prototypes.',
  statement: 'I connect legacy enterprise systems to modern AI.',
  sticker: 'AI Integration Engineer · Solartis · Chennai · 5 years',
};

export const PROJECTS: Project[] = [
  {
    title: 'ThirdParty Service Integration Marketplace',
    slug: 'thirdparty-integration-marketplace',
    period: '2024–Present',
    category: 'INTEGRATION',
    description:
      'Config-driven integration marketplace for an enterprise insurance PAS. Business teams connect any third-party API (pricing engines, document services, data providers) without writing code. Each integration is defined entirely in configuration: field mappings, auth flows, JSONata transformations, and response parsing. 4 live integrations. Zero hardcoded logic.',
    tags: ['Drools DRL', 'BPMN', 'Java', 'JSONata', 'MySQL', 'OAuth2', 'Spring Boot'],
    status: 'live_in_production',
    featured: true,
  },
  {
    title: 'Carrier API Config Generator',
    slug: 'carrier-api-config-generator',
    period: '2024',
    category: 'TOOLS · CODEGEN',
    description:
      'Python CLI that converts declarative YAML specs into MySQL INSERT statements for a third-party API integration platform. Ships a bidirectional workflow: YAML to SQL for new carriers, SQL to YAML to bootstrap from an existing database. Used to onboard 4 insurance carriers across 18+ operations (Quote, Bind, Cancel, Renew) with zero manual SQL authoring.',
    tags: ['Python', 'MySQL', 'YAML', 'CLI', 'Code Generation'],
    status: 'internal_tool',
  },
  {
    title: 'LLM Context Engineering for Legacy Java Systems',
    slug: 'llm-context-engineering',
    period: '2025',
    category: 'AI · LLM',
    description:
      'Engineered structured CLAUDE.md knowledge bases so Claude Code can reason about a 5-year-old Java insurance platform without manual re-explanation each session. Covers Drools DRL patterns, BPMN workflow conventions, MySQL multi-tenant schema, and carrier integration architecture. Reduced AI-assisted feature delivery time significantly by giving the model accurate domain context from the start.',
    tags: ['Claude Code', 'Prompt Engineering', 'Java', 'Knowledge Base', 'Agentic Dev'],
    status: 'internal_tool',
  },
  {
    title: 'Carrier Onboarding Workbench',
    slug: 'carrier-onboarding-workbench',
    period: '2024–2025',
    category: 'FULL-STACK',
    description:
      'Self-service web UI for onboarding insurance carrier APIs onto a third-party integration platform. Business analysts configure carrier endpoints, authentication flows, field mappings, and JSONata transformations through a step-by-step interface. No developer involvement needed. Built on FastAPI and MySQL with a full 9-step guided workflow including live API testing.',
    tags: ['FastAPI', 'React', 'MySQL', 'JSONata', 'Python', 'REST API'],
    status: 'internal_tool',
    featured: true,
  },
  {
    title: 'Carrier Field Mapping Codegen',
    slug: 'carrier-field-mapping-codegen',
    period: '2024',
    category: 'TOOLS · CODEGEN',
    description:
      'Code generator that reads an insurance carrier\'s raw API spec and produces the full field mapping configuration for a JSONata-based integration engine. Automates what used to be hours of manual mapping work per carrier: reads the Solartis data structure (5,500+ JSON paths), cross-references carrier API fields, and outputs a ready-to-deploy YAML mapping file.',
    tags: ['Python', 'JSONata', 'YAML', 'Code Generation', 'API Integration'],
    status: 'internal_tool',
  },
  {
    title: 'PDF RAG Chatbot',
    slug: 'pdf-rag-chatbot',
    period: '2025',
    category: 'AI · RAG',
    description:
      'Local RAG system that lets users chat with any uploaded PDF. HuggingFace embeddings index the document into ChromaDB; Ollama serves a local LLM for inference. Engineered prompts prevent hallucination by grounding every answer in retrieved chunks. Fully local: no external API calls, no data leaves the machine.',
    tags: ['Python', 'LangChain', 'ChromaDB', 'Ollama', 'RAG', 'HuggingFace'],
    status: 'live_in_production',
    github: 'https://github.com/Charanselvam/RAG-Chatbot',
  },
  {
    title: 'MCP Database Query Server',
    slug: 'mcp-database-query-server',
    period: '2025',
    category: 'TOOLS · MCP',
    description:
      'Custom MCP server that exposes MySQL databases to Claude Code as first-class tools. Enables direct SQL queries from the AI assistant during development sessions: look up config rows, trace carrier mappings, inspect multi-tenant schemas without leaving the coding context. Built for the Solartis insurance platform where DB state drives all business logic.',
    tags: ['MCP', 'MySQL', 'TypeScript', 'Claude Code', 'Developer Tools'],
    status: 'internal_tool',
  },
  {
    title: 'AI Document Extractor',
    slug: 'ai-document-extractor',
    period: '2024',
    category: 'AI · LLM',
    description:
      'Extracts structured JSON from any Excel file using Google Gemini, regardless of column layout or format variation. Engineered prompts handle inconsistent headers and merged cells. Replaced a failing IBM WatsonX implementation, cutting parsing failures from 30% to near zero. Containerised with Docker and live in production.',
    tags: ['Java', 'Gemini API', 'Docker', 'Prompt Engineering', 'Spring Boot'],
    status: 'live_in_production',
    github: 'https://github.com/Charanselvam/ai-document-extractor',
  },
  {
    title: 'Smart Glass',
    slug: 'smart-glass',
    period: '2020',
    category: 'IOT · HARDWARE',
    description:
      'Wearable head-mounted display that streams smartphone notifications directly into your line of sight. Arduino Nano (ATmega328) receives data over Bluetooth HC05 and drives a 0.96" OLED (SSD1306 I2C) mounted on eyeglasses. One-time Bluetooth pairing; phone pushes calls, messages, and to-do items in real time. Designed for hands-free use in meetings, on stage, and daily life. Final-year ECE project.',
    tags: ['Arduino', 'Embedded C', 'Bluetooth HC05', 'OLED', 'IoT', 'Hardware'],
    status: 'college_project',
    link: 'https://www.youtube.com/watch?v=ie7aOcAmyUk',
  },
];

export const FLAGSHIPS = PROJECTS.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}

export const SKILLS: SkillGroup[] = [
  {
    group: 'AI / LLM',
    items: [
      ['LLM Integration', 5], ['RAG', 5], ['Prompt Engineering', 4],
      ['LangChain', 4], ['Gemini API', 4], ['Ollama', 3], ['ChromaDB', 3],
    ],
  },
  {
    group: 'Languages',
    items: [
      ['Java', 5], ['SQL', 5], ['Python', 4], ['TypeScript', 4], ['JavaScript', 3],
    ],
  },
  {
    group: 'Frameworks',
    items: [
      ['Spring Boot', 5], ['REST APIs', 5], ['React', 4], ['Next.js', 3], ['React Native', 2],
    ],
  },
  {
    group: 'Integration',
    items: [
      ['JSONata', 5], ['OAuth2', 5], ['BPMN', 4], ['Drools DRL', 4], ['ActiveMQ', 3],
    ],
  },
  {
    group: 'Database',
    items: [
      ['MySQL', 5], ['PostgreSQL', 4], ['Oracle DB', 3],
    ],
  },
  {
    group: 'Cloud',
    items: [
      ['Oracle Cloud Infrastructure', 4], ['OCI Functions', 3], ['Serverless', 3],
    ],
  },
  {
    group: 'Tools',
    items: [
      ['GitHub Actions', 4], ['Postman', 4], ['Docker', 3], ['Jenkins', 3], ['Swagger', 3],
    ],
  },
];

export const MARQUEE_TAGS = [
  'AI Agents', 'MCP Servers', 'RAG pipelines', 'API Integration', 'LangChain',
  'Agentic Workflows', 'LLM', 'JSONata', 'Spring Boot', 'Gemini API',
  'Prompt Engineering', 'Docker', 'OCI Serverless', 'Java',
];

export const NOW: NowItem[] = [
  { key: 'Building', text: 'An enterprise integration layer where any third-party API goes live in hours, not sprints. Zero hardcoded fields, 4 carriers in production.' },
  { key: 'Using', text: 'Claude Code as a pair programmer across Java monoliths I did not write. Authored CLAUDE.md knowledge bases so the AI actually understands 5-year-old codebases.' },
  { key: 'Learning', text: 'LangGraph and multi-agent patterns: the real gap between calling an LLM and shipping an agentic system. Writing down what breaks.' },
  { key: 'Open to', text: 'AI engineering roles where the work is wiring production LLMs into real systems, not building demos. Remote or willing to relocate.', link: ['/contact', "Let's talk"] },
];

export const STATS = {
  projects: 9,
  yearsExperience: 5,
  certifications: 4,
  carriersIntegrated: 4,
  aiProjectsInProduction: 2,
};
