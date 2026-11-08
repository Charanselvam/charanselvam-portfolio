'use client';

import { motion, Variants } from 'framer-motion';

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fade-up' | 'panel';
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 },
  }),
};

const panel: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(6% 0 0 0)' },
  visible: (delay: number) => ({
    opacity: 1,
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 },
  }),
};

export function AnimateIn({ children, className = '', delay = 0, variant = 'fade-up' }: AnimateInProps) {
  const variants = variant === 'panel' ? panel : fadeUp;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
