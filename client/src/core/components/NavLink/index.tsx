'use client';

import type { ReactNode } from 'react';
import { Link, usePathname } from '../../lib/i18nRouting';
import { cn } from '../../lib/utils';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className = '' }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'text-base font-semibold leading-5 transition-colors ease-in hover:text-primary-A-200',
        isActive ? 'text-primary-B-200' : 'text-primary-B-100',
        className
      )}>
      {children}
    </Link>
  );
};

export default NavLink;
