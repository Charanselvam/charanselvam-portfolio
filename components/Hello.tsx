'use client';
import React, { useEffect, useRef, useState } from 'react';

const WORDS = [
  ['hello', 'en'], ['வணக்கம்', 'ta'], ['hola', 'es'],
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
        fontFamily: 'var(--font-geist-sans)',
        fontSize: 'clamp(1.4rem, 2.6vw, 2.4rem)',
        fontStyle: 'italic',
        color: 'hsl(var(--foreground) / 0.9)',
        display: 'inline-block',
      }}
    >
      <span className="sr-only">hello, I&apos;m</span>
      <span
        aria-hidden="true"
        key={idx}
        lang={lang}
        style={{ display: 'inline-block', opacity: 1, transition: 'opacity 0.3s ease' }}
      >
        {word}
      </span>
    </span>
  );
}
