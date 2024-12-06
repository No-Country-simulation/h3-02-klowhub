'use client';

import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { Link, usePathname } from '../../lib/i18nRouting';
import { cn } from '../../lib/utils';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const navLinkStyles = cva(
  'text-base font-semibold leading-5 transition-colors ease-in hover:text-primary-A-200',
  {
    variants: {
      active: {
        true: 'text-primary-B-200',
        false: 'text-primary-B-100',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const NavLink = ({ href, children, className = '' }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={cn(navLinkStyles({ active: isActive }), className)}>
      {children}
    </Link>
  );
};

export default NavLink;
