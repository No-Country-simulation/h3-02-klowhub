import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface H2SimpleSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  titleVariant?: 'textBase' | 'textXl';
}

const h2SimpleSectionStyle = cva('text-white', {
  variants: {
    title: {
      textBase: 'font-semibold text-base',
      textXl: 'font-bold text-xl',
    },
  },
  defaultVariants: {
    title: 'textBase',
  },
});

export default function H2SimpleSection({
  title,
  children,
  className = '',
  titleVariant = 'textBase',
}: H2SimpleSectionProps) {
  return (
    <div className={cn('space-y-5', className)}>
      <h2 className={h2SimpleSectionStyle({ title: titleVariant })}>{title}</h2>
      {children}
    </div>
  );
}
