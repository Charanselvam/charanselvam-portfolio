import { z } from 'zod';
import { NextRequest } from 'next/server';

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  _pot: z.string().max(0, 'Bot detected').optional(),
});

// In-memory rate limit: max 3 submissions per IP per minute
const submissions = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 3;
  const times = (submissions.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (times.length >= max) return false;
  times.push(now);
  submissions.set(ip, times);
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: 'Too many submissions. Please wait a moment.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    const message = result.error.issues[0]?.message ?? 'Invalid form data.';
    return Response.json({ error: message }, { status: 400 });
  }

  const { _pot, ...data } = result.data;
  if (_pot) {
    // Honeypot triggered — silently succeed to avoid tipping off bots
    return Response.json({ success: true });
  }

  const web3Res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_KEY,
      name: data.name,
      email: data.email,
      message: data.message,
      subject: `Portfolio contact from ${data.name}`,
      from_name: 'Portfolio Contact Form',
    }),
  });

  const rawText = await web3Res.text();
  console.log('[web3forms status]', web3Res.status);
  console.log('[web3forms raw]', rawText.slice(0, 300));
  let web3Data: { success: boolean; message?: string };
  try {
    web3Data = JSON.parse(rawText) as { success: boolean; message?: string };
  } catch {
    return Response.json({ error: `Web3Forms error: ${rawText.slice(0, 100)}` }, { status: 500 });
  }
  if (!web3Data.success) {
    return Response.json({ error: web3Data.message ?? 'Failed to send message. Try emailing me directly.' }, { status: 500 });
  }

  return Response.json({ success: true });
}
