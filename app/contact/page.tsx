import { ContactForm } from '@/components/ContactForm';
import { PROFILE } from '@/lib/content';

export const metadata = {
  title: 'Contact | Charanselvam S',
  description: 'Get in touch with Charanselvam S, AI Integration Engineer open to remote and relocation.',
};

export default function ContactPage() {
  return (
    <section className="px-6 sm:px-8 pt-16 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
        {/* Left: intro */}
        <div>
          <p
            className="text-[13px] text-foreground/40 uppercase tracking-widest mb-4"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            Contact
          </p>
          <h1
            className="font-semibold text-foreground leading-tight mb-6"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
          >
            Let&apos;s work together.
          </h1>
          <p className="text-sm text-foreground/60 leading-relaxed mb-8" style={{ maxWidth: '36ch' }}>
            Open to remote or relocation. Available immediately.
            Drop me a note or reach out on the channels below.
          </p>
          <div className="space-y-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="block text-sm text-foreground/50 hover:text-[var(--amber)] transition-colors"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-foreground/50 hover:text-[var(--amber)] transition-colors"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              github.com/charanselvam
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-foreground/50 hover:text-[var(--amber)] transition-colors"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              linkedin.com/in/charanselvam
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
