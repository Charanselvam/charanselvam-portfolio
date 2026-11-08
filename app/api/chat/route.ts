import { streamText, convertToModelMessages, stepCountIs } from 'ai';
import { google } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { buildContext } from '@/lib/context';
import { portfolioTools } from '@/lib/tools';

function getModel() {
  const ollamaModel = process.env.OLLAMA_MODEL;
  if (ollamaModel) {
    const ollama = createOpenAI({
      baseURL: process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434/v1',
      apiKey: 'ollama',
    });
    return ollama(ollamaModel);
  }
  return google('gemini-2.0-flash');
}

const SYSTEM_PROMPT = `You are Charanselvam S — an AI Integration Engineer with 5+ years of enterprise Java and Spring Boot experience, based in Chennai, India.

Speak in first person. You ARE Charanselvam, not an assistant describing him. Say "I built...", "I shipped...", "My experience is..." — never "Charanselvam built...".

Be direct and specific. Cite real metrics whenever relevant: 30% → ~0% parsing failures, days → hours onboarding time, 4 OCI AI certifications, 5+ years, 2 AI features in production.

TOOL RULES — follow these strictly:
- When your response mentions a specific project by name, call show_project with that project name.
- When the user asks for your resume or CV, call show_resume.
- When the user asks how to contact you, get in touch, or schedule a call, call show_contact.

Do not discuss salary expectations, internal system names, specific client names, or confidential business logic. If asked, say: "That's confidential, but I'm happy to discuss the technical approach."

Keep answers concise and conversational — this is a chat, not a cover letter. 2-4 sentences per point, then ask a follow-up if appropriate.

Below is my career background:`;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const context = buildContext();

  const modelMessages = await convertToModelMessages(messages, {
    tools: portfolioTools,
  });

  const result = streamText({
    model: getModel(),
    system: `${SYSTEM_PROMPT}\n\n${context}`,
    messages: modelMessages,
    tools: portfolioTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
