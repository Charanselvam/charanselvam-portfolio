'use client';
import React, { useEffect, useRef, useState } from 'react';

const WORDS = [
  ['hello', 'en'], ['நமஸ்காரம்', 'ta'], ['hola', 'es'],
  ['bonjour', 'fr'], ['こんにちは', 'ja'], ['ciao', 'it'],
  ['hallo', 'de'], ['olá', 'pt'], ['你好', 'zh'], ['안녕하세요', 'ko'],
] as const;

export function Hello(): React.JSX.Element {
  const [idx, setIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setIdx((i) => (i + 1) % WORDS.length);
      }, 1100);
    }, 1000);

    return () => {
      clearTimeout(delay);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const [word, lang] = WORDS[idx];

  return (
    <span
      style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
        color: 'var(--amber)',
        display: 'inline-block',
      }}
    >
      <span className="sr-only">hello, I&apos;m</span>
      <span
        aria-hidden="true"
        key={idx}
        lang={lang}
        className="anim-fade-in inline-block"
      >
        {word}
      </span>
    </span>
  );
}
