import { streamText, convertToModelMessages, stepCountIs } from 'ai';
import { google } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { buildContext } from '@/lib/context';
import { portfolioTools } from '@/lib/tools';
import { checkRateLimit } from '@/lib/rate-limit';

export const maxDuration = 30;

function getModel() {
  const provider = process.env.AI_PROVIDER;
  const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const openAIKey = process.env.OPENAI_API_KEY;
  const ollamaModel = process.env.OLLAMA_MODEL;

  if (ollamaModel) {
    const ollama = createOpenAI({
      baseURL: process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434/v1',
      apiKey: 'ollama',
    });
    return ollama(ollamaModel);
  }

  if ((provider === 'openai' || (!provider && !googleKey)) && openAIKey) {
    const openai = createOpenAI({ apiKey: openAIKey });
    return openai('gpt-4o-mini');
  }

  if (googleKey) {
    return google('gemini-3.6-flash');
  }

  return null;
}

const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  parts: z.array(z.record(z.string(), z.unknown())).optional(),
  content: z.string().optional(),
});

const bodySchema = z.object({
  messages: z
    .array(messageSchema)
    .max(20, 'Too many messages in context'),
});

function totalTextLength(messages: z.infer<typeof bodySchema>['messages']): number {
  return messages.reduce((sum, m) => {
    if (typeof m.content === 'string') return sum + m.content.length;
    if (Array.isArray(m.parts)) {
      return sum + m.parts.reduce((s: number, p: Record<string, unknown>) => {
        if (typeof p.text === 'string') return s + p.text.length;
        return s;
      }, 0);
    }
    return sum;
  }, 0);
}

const SYSTEM_PROMPT = `You are Charanselvam S — an AI Integration Engineer with 5+ years of enterprise Java and Spring Boot experience, based in Chennai, India.

Speak in first person. You ARE Charanselvam, not an assistant describing him. Say "I built...", "I shipped...", "My experience is..." — never "Charanselvam built...".

Be direct and specific. Cite real metrics whenever relevant: 30% → ~0% parsing failures, days → hours onboarding time, 4 OCI AI certifications, 5+ years, 2 AI features in production.

TOOL RULES — follow these strictly:
- When your response mentions a specific project by name, call show_project with that project name.
- When the user asks for your resume or CV, call show_resume.
- When the user asks how to contact you, get in touch, or schedule a call, call show_contact.

Stay scoped to portfolio topics: my background, projects, skills, availability, and how to reach me. If asked anything unrelated, respond: "I can only help with questions about my work and background."

Do not discuss salary expectations, internal system names, specific client names, or confidential business logic. If asked, say: "That's confidential, but I'm happy to discuss the technical approach."

Keep answers concise and conversational — this is a chat, not a cover letter. 2-4 sentences per point, then ask a follow-up if appropriate.

SOURCE CITATIONS — REQUIRED: After every response, call show_sources with the portfolio pages the answer references. Use these hrefs: /resume for experience/skills/certifications, /work for projects, /about for personal background, /contact for contact details. Only cite pages actually referenced. If the answer draws from nothing specific, omit the call.

Below is my career background:`;

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  // Per-IP rate limits (in-memory; per-instance on serverless)
  if (!checkRateLimit(`chat:min:${ip}`, { windowMs: 60_000, max: 10 })) {
    return Response.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
  }
  if (!checkRateLimit(`chat:day:${ip}`, { windowMs: 86_400_000, max: 100 })) {
    return Response.json({ error: 'Daily limit reached. Try again tomorrow.' }, { status: 429 });
  }

  const model = getModel();
  if (!model) {
    return Response.json(
      { error: 'AI chat is not available — no provider configured.' },
      { status: 503 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? 'Invalid request.' }, { status: 400 });
  }

  if (totalTextLength(parsed.data.messages) > 4000) {
    return Response.json({ error: 'Request payload too large.' }, { status: 400 });
  }

  try {
    const { messages } = parsed.data;
    const context = buildContext();

    // Strip show_sources tool parts from history — it's display-only and
    // replaying its tool calls triggers Gemini's thoughtSignature warning.
    const filteredMessages = messages.map((m) => ({
      ...m,
      parts: (m.parts as Array<Record<string, unknown>> | undefined)?.filter(
        (p) => p['type'] !== 'tool-show_sources' && p['type'] !== 'tool-result-show_sources'
      ),
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modelMessages = await convertToModelMessages(filteredMessages as any, {
      tools: portfolioTools,
    });

    const result = streamText({
      model,
      system: `${SYSTEM_PROMPT}\n\n${context}`,
      messages: modelMessages,
      tools: portfolioTools,
      stopWhen: stepCountIs(5),
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
