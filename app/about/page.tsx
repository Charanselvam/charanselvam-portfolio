import { AICanvas } from '@/components/AICanvas';
import { LetterReveal } from '@/components/LetterReveal';
import { NextPageNav } from '@/components/NextPageNav';
import { AboutStory } from '@/components/AboutStory';
import { StatusCards } from '@/components/StatusCards';
import { SkillsGrid } from '@/components/SkillsGrid';
import { CertCards } from '@/components/CertCards';
import { BioBlock } from '@/components/BioBlock';

export const metadata = {
  title: 'About | Charanselvam S',
  description: 'Five years at the intersection of enterprise and AI. AI Integration Engineer based in Chennai, India.',
};

export default function AboutPage() {
  return (
    <>
      {/* Page hero with attention canvas backdrop */}
      <section className="page-hero px-6 sm:px-8 py-16 sm:py-20">
        <AICanvas kind="attention" className="page-hero-canvas" />
        <div className="page-hero-content">
          <p
            className="text-[13px] text-foreground/40 uppercase tracking-widest mb-6"
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            story
          </p>
          <h1
            className="font-bold text-foreground"
            style={{ fontSize: 'clamp(48px, 8vw, 120px)', letterSpacing: '-0.04em', lineHeight: 0.9 }}
          >
            <LetterReveal text="ABOUT" />
            <span style={{ color: 'var(--amber)' }} aria-hidden="true">.</span>
          </h1>
        </div>
      </section>

      <AboutStory />
      <BioBlock />
      <StatusCards />
      <SkillsGrid />

      <CertCards />

      <NextPageNav href="/work" label="Work" />
    </>
  );
}
