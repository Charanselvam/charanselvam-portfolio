export type QASource = { label: string; href: string };

export type QACard =
  | { type: 'resume'; data: { filename: string; url: string } }
  | { type: 'contact'; data: { email: string; linkedin: string } };

export type QAEntry = {
  question: string;
  answer: string;
  sources: QASource[];
  card?: QACard;
};

export const QA: QAEntry[] = [
  {
    question: 'What projects are you most proud of?',
    answer:
      'The **Multi-Carrier Integration Framework** is my biggest one — it turned carrier onboarding from days of custom Java code into hours of table config, and 4 carriers are live in production today. The **AI Document Extractor** is a close second: I replaced a failing IBM WatsonX pipeline with Gemini and got parsing failures down from 30% to near zero.',
    sources: [
      { label: 'Projects', href: '/work' },
      { label: 'Resume', href: '/resume' },
    ],
  },
  {
    question: 'How did you replace IBM WatsonX with Gemini?',
    answer:
      'WatsonX was struggling with inconsistent Excel column layouts — about 30% of files failed to parse. I built a Gemini-powered pipeline that accepts any Excel format, extracts structured JSON using engineered prompts, and validates the output before it hits the database. Containerised with Docker and deployed to production. Failures dropped to near zero.',
    sources: [{ label: 'Resume', href: '/resume' }],
  },
  {
    question: 'What does your enterprise Java + AI stack look like?',
    answer:
      'Java + Spring Boot for the enterprise core (5 years), Drools DRL + jBPM for business rules and workflows, MySQL for multi-tenant config data. For AI services: Gemini API, Python + FastAPI, LangChain, ChromaDB, Ollama. JSONata handles field mapping between systems. Everything communicates over REST.',
    sources: [
      { label: 'Resume', href: '/resume' },
      { label: 'Projects', href: '/work' },
    ],
  },
  {
    question: 'Can I see your resume?',
    answer: 'Here it is — web version and PDF both available.',
    sources: [{ label: 'Resume', href: '/resume' }],
    card: {
      type: 'resume',
      data: { filename: 'Charanselvam_S_Resume.pdf', url: '/resume.pdf' },
    },
  },
  {
    question: 'How do I contact you?',
    answer: 'Best ways to reach me:',
    sources: [{ label: 'Contact', href: '/contact' }],
    card: {
      type: 'contact',
      data: { email: 'charanselvam.csk@gmail.com', linkedin: 'https://linkedin.com/in/charanselvam' },
    },
  },
  {
    question: 'Are you open to remote or relocation?',
    answer:
      'Yes to both. I am open to fully remote roles anywhere, and also open to relocation. Based in Chennai, India right now.',
    sources: [{ label: 'Contact', href: '/contact' }],
  },
  {
    question: 'What would you build in the first 90 days?',
    answer:
      'First I would map every manual handoff and document how the system actually behaves, not how the docs say it does. Then pick the highest-friction workflow, instrument it with logging to get a baseline, and build a focused automation or AI layer on top of it. Ship something visible in 30 days, refine with real feedback by 90.',
    sources: [],
  },
  {
    question: 'How do you approach integrating AI into legacy systems?',
    answer:
      "I treat the existing system as a data source, not an obstacle. Add a sidecar service that reads from the same database, build a thin integration layer that speaks both old and new APIs, instrument everything before making claims. Both the Gemini extraction pipeline and the carrier integration framework follow this pattern — neither required touching the core system's internals.",
    sources: [{ label: 'Projects', href: '/work' }],
  },
];
