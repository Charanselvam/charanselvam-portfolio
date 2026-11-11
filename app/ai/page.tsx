import type { Metadata } from 'next';
import { ChatInterface } from '@/components/ChatInterface';

export const metadata: Metadata = {
  title: 'Ask My AI | Charanselvam S',
  description: 'Chat with an AI that knows everything about Charanselvam — projects, experience, tech stack, and availability.',
};

export default function AIPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: 'clamp(80px, 14vw, 180px)',
          paddingBottom: '56px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="px-6 sm:px-8" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'hsl(var(--muted-foreground))',
              display: 'block',
              marginBottom: '24px',
            }}
          >
            AI · Portfolio Interface
          </span>
          <h1
            style={{
              fontSize: 'clamp(56px, 13vw, 140px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              margin: '0 0 28px',
            }}
          >
            Ask My AI<span style={{ color: 'var(--amber)' }}>.</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              lineHeight: 1.65,
              color: 'hsl(var(--muted-foreground))',
              maxWidth: '480px',
              margin: 0,
            }}
          >
            I know Charan&apos;s work inside out — projects, stack, experience, and how to reach him.
          </p>
        </div>
      </section>

      {/* Chat */}
      <section style={{ padding: '56px 0 110px' }}>
        <div className="px-6 sm:px-8" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '24px',
              overflow: 'hidden',
            }}
          >
            {/* Chat panel header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 24px',
                borderBottom: '1px solid hsl(var(--foreground)/0.08)',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'hsl(var(--amber) / 0.12)',
                  border: '1px solid hsl(var(--amber) / 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.06em',
                  color: 'var(--amber)',
                  flexShrink: 0,
                }}
              >
                CS
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '13px',
                    letterSpacing: '0.07em',
                    color: 'var(--amber)',
                  }}
                >
                  CHARAN&apos;S AI
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '10px',
                    color: 'hsl(var(--foreground)/0.3)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  Answers from portfolio context
                </div>
              </div>
            </div>

            {/* Chat body */}
            <div style={{ padding: '24px 24px 20px' }}>
              <ChatInterface />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
