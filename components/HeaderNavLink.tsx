'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderNavLinkProps {
  href: string;
  children: ReactNode;
}

const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Link
      href={href}
      className={active ? 'active' : ''} // Add a class conditionally
    >
      {children}
    </Link>
  );
};

export default React.memo(HeaderNavLink);
