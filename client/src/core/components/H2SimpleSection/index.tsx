import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface H2SimpleSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  titleVariant?: 'textbase' | 'textxl';
}

const h2SimpleSectionStyle = cva('text-white', {
  variants: {
    title: {
      textbase: 'font-semibold text-base',
      textxl: 'font-bold text-xl',
    },
  },
  defaultVariants: {
    title: 'textbase',
  },
});

export default function H2SimpleSection({
  title,
  children,
  className = '',
  titleVariant = 'textbase',
}: H2SimpleSectionProps) {
  return (
    <div className={cn('space-y-5', className)}>
      <h2 className={h2SimpleSectionStyle({ title: titleVariant })}>{title}</h2>
      {children}
    </div>
  );
}
