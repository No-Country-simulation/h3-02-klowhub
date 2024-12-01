import type { ReactNode } from 'react';
import { cn } from '@core/lib/utils';

interface CardsFlexContainerProps<T> {
  children: (item: T, index: number) => ReactNode;
  className?: string;
  items: T[];
}

export default function CardsFlexContainer<T>({
  className = '',
  items,
  children,
}: CardsFlexContainerProps<T>) {
  return (
    <div
      className={cn(
        'hidden flex-row flex-nowrap items-center justify-between gap-8 min-[1240px]:flex',
        className
      )}>
      {items.map((item, i) => children(item, i))}
    </div>
  );
}
