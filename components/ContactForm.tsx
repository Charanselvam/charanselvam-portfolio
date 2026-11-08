'use client';
import { useState } from 'react';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  };

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
    fontSize: '11px',
    letterSpacing: '0.08em',
    color: 'hsl(var(--muted-foreground))',
    marginBottom: '6px',
    textTransform: 'uppercase',
  };

  if (state === 'sent') {
    return (
      <div style={{ padding: '2rem 0' }}>
        <p
          style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '13px', color: '#2fd47a', letterSpacing: '0.04em' }}
        >
          ● Message sent — I&apos;ll reply soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '52ch' }}>
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
            style={inputStyle}
            placeholder="Your name"
          />
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
            style={inputStyle}
            placeholder="you@example.com"
          />
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
            style={{ ...inputStyle, resize: 'vertical' }}
            placeholder="What are you working on?"
          />
        </div>
        {state === 'error' && (
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '12px', color: 'hsl(var(--destructive))' }}>
            Something went wrong — try emailing me directly.
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
