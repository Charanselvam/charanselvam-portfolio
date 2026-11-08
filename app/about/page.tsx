import { AboutStory } from '@/components/AboutStory';
import { StatusCards } from '@/components/StatusCards';
import { SkillsGrid } from '@/components/SkillsGrid';
import { BioBlock } from '@/components/BioBlock';

export const metadata = {
  title: 'About — Charanselvam S',
  description: 'Five years at the intersection of enterprise and AI. AI Integration Engineer based in Chennai, India.',
};

export default function AboutPage() {
  return (
    <>
      <AboutStory />
      <BioBlock />
      <StatusCards />
      <SkillsGrid />
    </>
  );
}
