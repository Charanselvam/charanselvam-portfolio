import Link from 'next/link';

interface Props {
  href: string;
  label: string;
}

export function NextPageNav({ href, label }: Props) {
  return (
    <Link href={href} className="next-page-nav" aria-label={`Next: ${label}`}>
      <span className="next-page-label">Next page</span>
      <div className="next-page-row">
        <span className="next-page-title">{label}</span>
        <div className="next-page-arrow" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
