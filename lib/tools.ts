import { tool } from 'ai';
import { z } from 'zod';

const PROJECTS = [
  {
    title: 'AI Document Extraction Service',
    period: '2025',
    description:
      'Google Gemini API service that accepts any Excel format regardless of column structure and extracts structured JSON using engineered prompts. Replaced a failing IBM WatsonX implementation; parsing failures dropped from 30% to near zero. Containerised with Docker and deployed to production.',
    tags: ['Python', 'Gemini API', 'Prompt Engineering', 'Docker'],
    status: 'Live in production',
  },
  {
    title: 'PDF RAG Chatbot',
    period: '2024 – 2025',
    description:
      'Chat with any uploaded PDF using a local LLM. Built with Python, LangChain, ChromaDB, HuggingFace embeddings, and Ollama. Implements hallucination prevention via retrieval-augmented generation. Fully local inference, no external API calls.',
    tags: ['Python', 'LangChain', 'ChromaDB', 'Ollama', 'RAG', 'HuggingFace'],
  },
  {
    title: 'Carrier Mapping Tool with AI Assist',
    period: '2025 – 2026',
    description:
      'Replaced AtlasMap with a JSONata-based mapping engine, reducing new carrier onboarding from days to hours. Features a Monaco-based JSONata editor with an AI-assist panel (Ollama) for Suggest, Explain, and Fix actions.',
    tags: ['Python', 'JSONata', 'Monaco Editor', 'Ollama', 'MySQL', 'React'],
  },
  {
    title: 'Integration Platform Gateway',
    period: '2025 – 2026',
    description:
      'Serverless API gateway on Oracle Cloud Infrastructure using a Leaf + Orchestrator fan-out pattern. A single request fans out to multiple carrier-specific functions in parallel and returns a unified result.',
    tags: ['Node.js', 'TypeScript', 'OCI Functions', 'MySQL', 'Serverless'],
  },
  {
    title: 'Multi-Carrier Insurance Integration Framework',
    period: '2024 – Present',
    description:
      'Table-driven, carrier-agnostic integration platform for an enterprise insurance PAS. Business rules and BPMN workflows handle all policy lifecycle touchpoints for 4 commercial carriers. Zero hardcoded carrier logic.',
    tags: ['Drools DRL', 'BPMN', 'Java', 'MySQL', 'JSONata', 'OAuth2'],
  },
  {
    title: 'JSON-driven Dynamic Form Renderer',
    period: '2021',
    description:
      'React component that drives entire UI rendering from a JSON schema with no code changes per form. Each field type, validation rule, and conditional display logic is declared in the schema.',
    tags: ['React', 'JSON Schema', 'GitHub Actions', 'JavaScript'],
  },
];

export type ProjectData = (typeof PROJECTS)[number];

export const portfolioTools = {
  show_project: tool({
    description:
      'Show a project card inline in the chat response. Call this whenever you mention a specific project by name.',
    inputSchema: z.object({
      projectName: z
        .string()
        .describe('The exact project name as listed in the portfolio'),
    }),
    execute: async ({ projectName }: { projectName: string }) => {
      const project =
        PROJECTS.find((p) =>
          p.title.toLowerCase().includes(projectName.toLowerCase())
        ) ??
        PROJECTS.find((p) =>
          projectName.toLowerCase().includes(p.title.toLowerCase().split(' ')[0])
        );
      return project ?? { title: projectName, period: '', description: '', tags: [] };
    },
  }),

  show_resume: tool({
    description:
      'Show a resume download card. Call this when the user asks for your resume, CV, or wants to download your profile.',
    inputSchema: z.object({}),
    execute: async () => ({
      filename: 'Charanselvam_S_Resume.pdf',
      url: '/resume.pdf',
    }),
  }),

  show_contact: tool({
    description:
      'Show a contact card. Call this when the user asks how to get in touch, wants to schedule a call, or asks for contact details.',
    inputSchema: z.object({}),
    execute: async () => ({
      email: 'charanselvam.csk@gmail.com',
      linkedin: 'https://linkedin.com/in/charanselvam',
    }),
  }),

  show_sources: tool({
    description:
      'Cite which portfolio sections this answer draws from. Call at the end of every response. Available hrefs: /resume, /work, /about, /contact.',
    inputSchema: z.object({
      items: z.array(
        z.object({
          label: z.string().describe('Short display name, e.g. "Resume", "Projects", "About"'),
          href: z.string().describe('Portfolio path, e.g. /resume'),
        })
      ),
    }),
    execute: async ({ items }: { items: { label: string; href: string }[] }) => ({ items }),
  }),
};
