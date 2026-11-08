'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ModeToggle';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Projects' },
];

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-6 sm:px-8 py-6">
      <Link
        href="/"
        className="text-sm font-semibold text-foreground hover:text-[var(--amber)] transition-colors"
      >
        CS
      </Link>
      <nav className="flex items-center gap-7">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm transition-colors ${
              pathname === href
                ? 'text-foreground font-medium'
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            {label}
          </Link>
        ))}
        <ModeToggle />
      </nav>
    </header>
  );
};

export default React.memo(Header);
