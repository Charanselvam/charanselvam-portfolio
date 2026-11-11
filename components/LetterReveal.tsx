interface Props {
  text: string;
  accentLast?: boolean;
  startDelay?: number; // extra offset in steps added to --i
}

export function LetterReveal({ text, accentLast = false, startDelay = 0 }: Props) {
  const chars = [...text];
  return (
    <span aria-label={text}>
      {chars.map((char, i) => {
        const isLast = i === chars.length - 1;
        const style = {
          '--i': i + startDelay,
          ...(isLast && accentLast ? { color: 'var(--amber)' } : {}),
        } as React.CSSProperties;
        return (
          <span key={i} aria-hidden="true" className="ltr" style={style}>
            {char === ' ' ? ' ' : char}
          </span>
        );
      })}
    </span>
  );
}
