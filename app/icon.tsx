import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#1c1813',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
        }}
      >
        <span
          style={{
            color: '#c97d1a',
            fontSize: 13,
            fontWeight: 700,
            fontFamily: 'sans-serif',
            letterSpacing: '-0.5px',
          }}
        >
          CS
        </span>
      </div>
    ),
    { ...size }
  );
}
