export interface Project {
  title: string;
  period: string;
  description: string;
  tags: string[];
  status?: string;
  link?: string;
  featured?: boolean;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export const PROFILE = {
  name: 'Charanselvam S',
  initials: 'CS',
  title: 'AI Integration Engineer',
  location: 'Chennai, India',
  timezone: 'Asia/Kolkata',
  email: 'charanselvam.csk@gmail.com',
  github: 'https://github.com/charanselvam',
  linkedin: 'https://linkedin.com/in/charanselvam',
  openTo: 'Open to remote · Europe · Singapore',
  bio: 'Five years inside enterprise systems — real carriers, real production, real constraints. I build AI tools that remove repetitive work from enterprise workflows.',
  statement: 'I connect legacy enterprise systems to modern AI.',
  sticker: 'AI Integration Engineer · Solartis · Chennai · 5 years',
};

export const PROJECTS: Project[] = [
  {
    title: 'AI Document Extraction Service',
    period: '2025',
    description:
      'Google Gemini API service that accepts any Excel format regardless of column structure and extracts structured JSON using engineered prompts. Replaced a failing IBM WatsonX implementation; parsing failures dropped from 30% to near zero. Containerised with Docker and deployed to production.',
    tags: ['Python', 'Gemini API', 'Prompt Engineering', 'Docker'],
    status: 'live_in_production',
    featured: true,
  },
  {
    title: 'PDF RAG Chatbot',
    period: '2024–2025',
    description:
      'Chat with any uploaded PDF using a local LLM. Built with Python, LangChain, ChromaDB, HuggingFace embeddings, and Ollama. Implements hallucination prevention via retrieval-augmented generation. Fully local inference — no external API calls. Runs on RTX 4060 GPU.',
    tags: ['Python', 'LangChain', 'ChromaDB', 'Ollama', 'RAG', 'HuggingFace'],
    featured: true,
  },
  {
    title: 'Carrier Mapping Tool with AI Assist',
    period: '2025–2026',
    description:
      'Replaced AtlasMap with a JSONata-based mapping engine — reducing new carrier onboarding from days to hours and enabling non-technical QA and BA teams to onboard independently. Features a Monaco-based JSONata expression editor with an AI-assist panel (Ollama) for Suggest, Explain, and Fix actions; a validate-and-retry loop; and a full audit log.',
    tags: ['Python', 'JSONata', 'Monaco Editor', 'Ollama', 'MySQL', 'React'],
    featured: true,
  },
  {
    title: 'Integration Platform Gateway',
    period: '2025–2026',
    description:
      'Serverless API gateway on Oracle Cloud Infrastructure using a Leaf + Orchestrator fan-out pattern. The Orchestrator fans requests to multiple carrier-specific Leaf functions in parallel, collects responses, and returns a unified result — enabling one request to invoke multiple commercial carriers simultaneously.',
    tags: ['Node.js', 'TypeScript', 'OCI Functions', 'MySQL', 'Serverless'],
  },
  {
    title: 'Multi-Carrier Insurance Integration Framework',
    period: '2024–Present',
    description:
      'Table-driven, carrier-agnostic integration platform for an enterprise insurance PAS. Business rules and BPMN workflows handle all policy lifecycle touchpoints — rating, quoting, binding, cancellation, renewal — for 4 commercial carriers. Zero hardcoded carrier logic; all field mappings, auth flows, and value translations live in configuration tables.',
    tags: ['Drools DRL', 'BPMN', 'Java', 'MySQL', 'JSONata', 'OAuth2'],
  },
  {
    title: 'JSON-driven Dynamic Form Renderer',
    period: '2021',
    description:
      'React component that drives entire UI rendering from a JSON schema with no code changes per form. Each field type, validation rule, and conditional display logic is declared in the schema. Delivered with GitHub Actions for automated deployment.',
    tags: ['React', 'JSON Schema', 'GitHub Actions', 'JavaScript'],
  },
];

export const FLAGSHIPS = PROJECTS.filter((p) => p.featured);

export const SKILLS: SkillGroup[] = [
  { group: 'AI / LLM', items: ['LLM Integration', 'RAG', 'Prompt Engineering', 'LangChain', 'ChromaDB', 'Gemini API', 'Ollama'] },
  { group: 'Languages', items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL'] },
  { group: 'Frameworks', items: ['Spring Boot', 'React', 'Next.js', 'React Native'] },
  { group: 'Integration', items: ['JSONata', 'REST APIs', 'OAuth2', 'ActiveMQ', 'Docker'] },
  { group: 'Database', items: ['PostgreSQL', 'MySQL'] },
  { group: 'Cloud', items: ['Oracle Cloud Infrastructure', 'OCI Functions', 'Serverless'] },
  { group: 'Tools', items: ['GitHub Actions', 'Postman', 'Jenkins', 'Swagger'] },
  { group: 'Certifications', items: ['OCI Gen AI Professional', 'OCI AI Vector Search', 'OCI AI Foundations', 'OCI Data Science'] },
];

export const MARQUEE_TAGS = [
  'JSONata', 'LangChain', 'RAG pipelines', 'Java', 'OCI Serverless',
  'Gemini API', 'Drools DRL', 'BPMN', 'React', 'Docker',
  'Prompt Engineering', 'Spring Boot',
];

export const NOW = [
  { key: 'Building', text: 'Multi-carrier insurance integration framework — table-driven, carrier-agnostic, 4 carriers live.' },
  { key: 'Using', text: 'Claude Code as primary dev tool across 5 legacy repos, authored CLAUDE.md knowledge bases.' },
  { key: 'Learning', text: 'LangGraph, agentic systems, MCP server patterns.' },
  { key: 'Open to', text: 'Fully remote roles in Europe and Singapore. Available immediately.', link: ['/contact', "Let's talk"] as [string, string] },
];

export const STATS = {
  projects: 6,
  yearsExperience: 5,
  certifications: 4,
  carriersIntegrated: 4,
  aiProjectsInProduction: 2,
};
