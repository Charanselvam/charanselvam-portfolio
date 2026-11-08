import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="px-6 sm:px-8 pt-20 pb-10 mt-8">
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ fontFamily: 'var(--font-geist-mono)' }}
      >
        <p className="text-[13px] text-foreground/50">
          charanselvam s · chennai, india
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="mailto:charanselvam.csk@gmail.com"
            className="text-[13px] text-foreground/50 hover:text-foreground transition-colors"
          >
            email
          </Link>
          <Link
            href="https://github.com/charanselvam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-foreground/50 hover:text-foreground transition-colors"
          >
            github
          </Link>
          <Link
            href="https://linkedin.com/in/charanselvam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-foreground/50 hover:text-foreground transition-colors"
          >
            linkedin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
