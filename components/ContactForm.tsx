'use client';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormState = 'idle' | 'sending' | 'sent' | 'error';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  background: 'var(--surface)',
  border: '1px solid hsl(var(--border))',
  color: 'hsl(var(--foreground))',
  fontFamily: 'var(--font-geist-sans)',
  fontSize: '14px',
  outline: 'none',
  borderRadius: '2px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-geist-mono)',
  fontSize: '13px',
  letterSpacing: '0.08em',
  color: 'hsl(var(--muted-foreground))',
  marginBottom: '6px',
  textTransform: 'uppercase',
};

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', email: '', message: '', _pot: '' });
  const [serverError, setServerError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setState('sending');
    try {
      const payload = new FormData();
      payload.append('access_key', '9b53d999-de64-4723-b49b-6f1bd602251d');
      payload.append('name', form.name);
      payload.append('email', form.email);
      payload.append('message', form.message);
      payload.append('subject', `Portfolio contact from ${form.name}`);
      payload.append('from_name', 'Portfolio Contact Form');
      payload.append('botcheck', '');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });
      const json = await res.json() as { success?: boolean; message?: string };
      if (json.success) {
        setState('sent');
      } else {
        setServerError(json.message ?? 'Something went wrong.');
        setState('error');
      }
    } catch {
      setServerError('Network error. Try emailing me directly.');
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div style={{ padding: '2rem 0' }}>
        <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: '#2fd47a', letterSpacing: '0.04em' }}>
          ● Message sent. I&apos;ll reply soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '52ch' }} noValidate>
      {/* Honeypot — hidden from real users, visible to bots */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="_pot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form._pot}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            style={{ ...inputStyle, borderColor: errors.name ? 'hsl(var(--destructive))' : undefined }}
            placeholder="Your name"
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p id="name-error" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'hsl(var(--destructive))', marginTop: '4px' }}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            style={{ ...inputStyle, borderColor: errors.email ? 'hsl(var(--destructive))' : undefined }}
            placeholder="you@example.com"
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="email-error" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'hsl(var(--destructive))', marginTop: '4px' }}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" style={labelStyle}>Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={form.message}
            onChange={handleChange}
            style={{ ...inputStyle, resize: 'vertical', borderColor: errors.message ? 'hsl(var(--destructive))' : undefined }}
            placeholder="What are you working on?"
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p id="message-error" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'hsl(var(--destructive))', marginTop: '4px' }}>
              {errors.message}
            </p>
          )}
        </div>

        {state === 'error' && serverError && (
          <p role="alert" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: 'hsl(var(--destructive))' }}>
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={state === 'sending'}
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '13px',
            letterSpacing: '0.03em',
            padding: '10px 24px',
            background: 'var(--amber)',
            color: 'hsl(30 8% 5%)',
            border: 'none',
            cursor: state === 'sending' ? 'not-allowed' : 'pointer',
            opacity: state === 'sending' ? 0.7 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {state === 'sending' ? 'Sending…' : 'Send message →'}
        </button>
      </div>
    </form>
  );
}
