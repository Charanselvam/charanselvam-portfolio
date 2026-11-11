export const PORTFOLIO_CONTEXT = `
# About Me

I am Charanselvam S, an AI Integration Engineer with 5+ years of experience at an enterprise insurance platform company in Chennai, India. I specialise in integrating LLM-powered features into real production enterprise systems, not demos or side projects. My background is enterprise Java and Spring Boot, which means I can integrate AI into systems with real users, compliance requirements, and years of legacy constraints.

I am open to remote opportunities and relocation.

## Current Role

Senior Software Engineer, AI Integration at Solartis Technology Services Pvt. Ltd, Chennai, India.
July 2021 to Present (5+ years)

## AI Work Shipped to Production

### AI Document Extraction Service (2025)
I replaced a failing IBM WatsonX implementation with a Google Gemini API service. The service accepts any Excel format regardless of column structure and extracts structured JSON via engineered prompts. Parsing failures dropped from 30% to near zero. Built with Python, containerised with Docker, deployed to production. This is live and actively used.

### PDF RAG Chatbot (2024–2025)
I built a local RAG chatbot using Python, LangChain, ChromaDB, HuggingFace embeddings, and Ollama. Users can chat with any uploaded PDF via a local LLM with hallucination prevention. Fully local inference, no external API calls. Runs on an RTX 4060 GPU.

### Carrier Mapping Tool with AI Assist (2025–2026)
I replaced AtlasMap with a JSONata-based mapping engine, reducing new carrier onboarding from days to hours. Non-technical QA and BA teams can now onboard carriers independently. Features a Monaco-based JSONata editor with an AI-assist panel (Ollama) for Suggest, Explain, and Fix actions, a validate-and-retry loop, and a full audit log.

### CLAUDE.md Knowledge Bases (2025–2026)
I authored CLAUDE.md knowledge bases across 5 legacy repositories, parsing 15 years of undocumented platform code into structured markdown, enabling AI-assisted development. I use Claude Code as my primary development tool for migration and integration work.

## Architecture and Engineering Work

### ThirdParty Service Integration Marketplace (2024–Present)
Config-driven integration marketplace for an enterprise insurance PAS. Business teams connect any third-party API (pricing engines, document services, data providers) without writing code. Each integration is defined entirely in configuration: field mappings, auth flows, JSONata transformations, and response parsing. 4 live integrations. Zero hardcoded logic.

### Integration Platform Gateway (2025–2026)
I architected a serverless API gateway on Oracle Cloud Infrastructure using a Leaf + Orchestrator fan-out pattern. A single request fans out to multiple carrier-specific serverless functions in parallel and returns a unified result. Built locally in 6 hours, deployed to OCI in 4 hours.

### Payment Integration Bug Fix
4–5% of high-value homeowner policy transactions were silently failing, each worth $900–$5,000. The root cause was buried across UI and transaction layers: an unhandled exception in the payment script during transaction ID capture, combined with a session timeout mismatch. I traced it across both layers, implemented defensive exception handling with a 10-attempt retry mechanism, and reduced silent failures to near zero. This was a production system, real money, and the kind of bug that is hard to even reproduce reliably.

### JSON-driven Dynamic Form Renderer (2021)
I built a React component that drives entire UI rendering from a JSON schema with no code changes per form. Delivered with GitHub Actions for automated deployment.

## Key Metrics

- Document parsing failures: 30% to near zero (Gemini API replacing IBM WatsonX)
- Carrier onboarding: Days to Hours (JSONata replacing AtlasMap)
- Multi-carrier API prototype: Built locally in 6 hours, deployed to OCI in 4 hours
- 4 third-party API integrations live in production
- 2 AI features shipped to production
- 5+ years at the same enterprise platform

## Technical Skills

**AI / ML:** LLM Integration, RAG, Prompt Engineering, LangChain, ChromaDB, Gemini API, Ollama, Claude Code
**Languages:** Java, Python, JavaScript, TypeScript, SQL
**Frameworks:** Spring Boot, React, Next.js, React Native
**Integration:** JSONata, REST APIs, OAuth2, Docker, ActiveMQ
**Database:** PostgreSQL, MySQL
**Cloud:** Oracle Cloud Infrastructure (OCI), Serverless (OCI Functions)
**Tools:** GitHub Actions, Swagger, Postman, Jenkins, Grafana

## Certifications (all earned 2025)

- Oracle Cloud Infrastructure Generative AI Professional
- Oracle Cloud Infrastructure AI Vector Search Professional
- Oracle Cloud Infrastructure AI Foundations Professional
- Oracle Cloud Infrastructure AI Data Science Professional

## Availability

Based in Chennai, India (IST, UTC+5:30).
Open to remote or relocation roles.
Not requiring visa sponsorship for remote work.
Available to start immediately.

## Contact

Email: charanselvam.csk@gmail.com
LinkedIn: https://linkedin.com/in/charanselvam
GitHub: https://github.com/charanselvam
`;
